import json
from pathlib import Path

import chess
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field

app = FastAPI()
DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "openings.json"
OPENINGS = json.loads(DATA_FILE.read_text(encoding="utf-8"))
OPENINGS_BY_ID = {opening["id"]: opening for opening in OPENINGS}


class ValidateMoveRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    opening_id: str = Field(min_length=1)
    depth: int = Field(strict=True)
    history: list[str]
    move: str = Field(min_length=1)


class StartTrainingRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    opening_id: str = Field(min_length=1)
    depth: int = Field(strict=True)


class TrainingMoveRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    opening_id: str = Field(min_length=1)
    depth: int = Field(strict=True)
    history: list[str]
    move: str = Field(min_length=1)


class TrainingValidationError(ValueError):
    def __init__(self, status_code: int, code: str, message: str, **details):
        self.status_code = status_code
        self.code = code
        self.message = message
        self.details = details

    def as_response(self):
        return error_response(
            self.status_code,
            self.code,
            self.message,
            **self.details,
        )


def error_response(status_code: int, code: str, message: str, **details):
    return JSONResponse(
        status_code=status_code,
        content={"error": {"code": code, "message": message, **details}},
    )


def resolve_opening_and_depth(opening_id: str, depth: int):
    opening = OPENINGS_BY_ID.get(opening_id)
    if opening is None:
        raise TrainingValidationError(
            404,
            "opening_not_found",
            f"Opening '{opening_id}' not found",
        )
    if depth not in (5, 10):
        raise TrainingValidationError(
            422,
            "unsupported_depth",
            "Depth must be 5 or 10",
        )
    return opening, opening["moves"][str(depth)]


def validate_history_prefix(opening_id: str, depth: int, history: list[str]):
    _, repertoire = resolve_opening_and_depth(opening_id, depth)
    if len(history) > len(repertoire):
        raise TrainingValidationError(
            422,
            "inconsistent_history",
            "History extends beyond the selected repertoire",
        )

    board = chess.Board()
    for index, san in enumerate(history):
        try:
            actual_move = board.parse_san(san)
        except ValueError:
            raise TrainingValidationError(
                422,
                "inconsistent_history",
                f"History move at index {index} is not legal SAN",
                history_index=index,
            )

        expected_move = board.parse_san(repertoire[index])
        if actual_move != expected_move:
            raise TrainingValidationError(
                422,
                "inconsistent_history",
                f"History move at index {index} does not match the selected repertoire",
                history_index=index,
            )
        board.push(actual_move)

    return board, repertoire


def validate_training_history(
    opening_id: str,
    depth: int,
    history: list[str],
    completed_code: str = "training_completed",
):
    board, repertoire = validate_history_prefix(opening_id, depth, history)
    if len(history) == len(repertoire):
        raise TrainingValidationError(
            409,
            completed_code,
            "The selected training session is already completed",
        )
    if board.turn != chess.WHITE:
        raise TrainingValidationError(
            422,
            "white_to_move_required",
            "The validated history does not leave White to move",
        )
    return board, repertoire


def white_moves_played(history: list[str]) -> int:
    return len(history) // 2 if len(history) % 2 == 0 else (len(history) + 1) // 2


def next_white_move_number(history: list[str]) -> int:
    return white_moves_played(history) + 1


def remaining_white_moves(history: list[str], depth: int) -> int:
    return max(depth - white_moves_played(history), 0)


def history_after_white_move(history: list[str], move_san: str, black_san: str | None = None):
    updated = list(history)
    updated.append(move_san)
    if black_san is not None:
        updated.append(black_san)
    return updated


@app.exception_handler(RequestValidationError)
async def handle_validation_error(
    request: Request, exception: RequestValidationError
):
    errors = [
        {
            "location": list(error["loc"]),
            "message": error["msg"],
            "type": error["type"],
        }
        for error in exception.errors()
    ]
    return error_response(
        422,
        "invalid_request",
        "The request body is malformed or missing required fields",
        details=errors,
    )


@app.get("/openings")
def list_openings():
    return [{"id": opening["id"], "name": opening["name"]} for opening in OPENINGS]


@app.get("/openings/{opening_id}")
def get_opening(opening_id: str):
    opening = OPENINGS_BY_ID.get(opening_id)
    if opening is None:
        raise HTTPException(
            status_code=404,
            detail=f"Opening '{opening_id}' not found",
        )
    return opening


@app.post("/validate-move")
def validate_move(request: ValidateMoveRequest):
    try:
        _, repertoire = resolve_opening_and_depth(request.opening_id, request.depth)
        board, _ = validate_training_history(
            request.opening_id,
            request.depth,
            request.history,
            completed_code="repertoire_completed",
        )
    except TrainingValidationError as exc:
        return exc.as_response()

    try:
        proposed_move = board.parse_san(request.move)
    except ValueError:
        return {
            "outcome": "illegal",
            "legal": False,
            "repertoire_correct": False,
            "move": request.move,
            "message": "The proposed move is not legal in this position",
        }

    expected_move = board.parse_san(repertoire[len(request.history)])
    expected_san = board.san(expected_move)
    repertoire_correct = proposed_move == expected_move
    board.push(proposed_move)

    return {
        "outcome": "correct" if repertoire_correct else "off_repertoire",
        "legal": True,
        "repertoire_correct": repertoire_correct,
        "move": request.move,
        "expected_move": expected_san,
        "fen": board.fen(),
    }


@app.post("/training/start")
def start_training(request: StartTrainingRequest):
    try:
        opening, repertoire = resolve_opening_and_depth(request.opening_id, request.depth)
    except TrainingValidationError as exc:
        return exc.as_response()

    return {
        "opening_id": opening["id"],
        "depth": request.depth,
        "status": "in_progress",
        "history": [],
        "fen": chess.Board().fen(),
        "current_white_move": 1,
        "remaining_white_moves": request.depth,
    }


@app.post("/training/move")
def training_move(request: TrainingMoveRequest):
    try:
        _, repertoire = resolve_opening_and_depth(request.opening_id, request.depth)
        board, _ = validate_training_history(
            request.opening_id,
            request.depth,
            request.history,
            completed_code="completed_session",
        )
    except TrainingValidationError as exc:
        return exc.as_response()
    try:
        proposed_move = board.parse_san(request.move)
    except ValueError:
        return {
            "opening_id": request.opening_id,
            "depth": request.depth,
            "status": "in_progress",
            "outcome": "illegal",
            "history": request.history,
            "fen": board.fen(),
            "black_reply": None,
            "current_white_move": next_white_move_number(request.history),
            "remaining_white_moves": remaining_white_moves(request.history, request.depth),
            "legal": False,
            "repertoire_correct": False,
            "message": "The proposed move is not legal in this position",
        }

    expected_move = board.parse_san(repertoire[len(request.history)])
    if proposed_move != expected_move:
        return {
            "opening_id": request.opening_id,
            "depth": request.depth,
            "status": "restarted",
            "outcome": "off_repertoire",
            "history": [],
            "fen": chess.Board().fen(),
            "black_reply": None,
            "current_white_move": 1,
            "remaining_white_moves": request.depth,
            "legal": True,
            "repertoire_correct": False,
            "message": "This move is legal but outside the selected opening repertoire. The training attempt must restart.",
        }

    board.push(proposed_move)
    next_history = history_after_white_move(request.history, request.move)
    if len(next_history) >= len(repertoire):
        return {
            "opening_id": request.opening_id,
            "depth": request.depth,
            "status": "completed",
            "outcome": "correct",
            "history": next_history,
            "fen": board.fen(),
            "black_reply": None,
            "current_white_move": None,
            "remaining_white_moves": 0,
            "legal": True,
            "repertoire_correct": True,
            "message": "The repertoire is complete after the final correct White move.",
        }

    black_reply = repertoire[len(next_history)]
    black_move = board.parse_san(black_reply)
    board.push(black_move)
    final_history = history_after_white_move(request.history, request.move, black_reply)
    return {
        "opening_id": request.opening_id,
        "depth": request.depth,
        "status": "in_progress",
        "outcome": "correct",
        "history": final_history,
        "fen": board.fen(),
        "black_reply": black_reply,
        "current_white_move": next_white_move_number(final_history),
        "remaining_white_moves": remaining_white_moves(final_history, request.depth),
        "legal": True,
        "repertoire_correct": True,
        "message": "Correct White move; Black reply played automatically.",
    }


@app.get("/health")
def health():
    return {"status": "ok", "service": "chess-opening-master-api"}
