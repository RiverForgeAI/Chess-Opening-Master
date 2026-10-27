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


def error_response(status_code: int, code: str, message: str, **details):
    return JSONResponse(
        status_code=status_code,
        content={"error": {"code": code, "message": message, **details}},
    )


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
    opening = OPENINGS_BY_ID.get(request.opening_id)
    if opening is None:
        return error_response(
            404,
            "opening_not_found",
            f"Opening '{request.opening_id}' not found",
        )
    if request.depth not in (5, 10):
        return error_response(
            422,
            "unsupported_depth",
            "Depth must be 5 or 10",
        )

    repertoire = opening["moves"][str(request.depth)]
    if len(request.history) > len(repertoire):
        return error_response(
            422,
            "inconsistent_history",
            "History extends beyond the selected repertoire",
        )

    board = chess.Board()
    for index, san in enumerate(request.history):
        try:
            actual_move = board.parse_san(san)
        except ValueError:
            return error_response(
                422,
                "inconsistent_history",
                f"History move at index {index} is not legal SAN",
                history_index=index,
            )

        expected_move = board.parse_san(repertoire[index])
        if actual_move != expected_move:
            return error_response(
                422,
                "inconsistent_history",
                f"History move at index {index} does not match the selected repertoire",
                history_index=index,
            )
        board.push(actual_move)

    if len(request.history) == len(repertoire):
        return error_response(
            409,
            "repertoire_completed",
            "The selected repertoire is complete",
        )
    if board.turn != chess.WHITE:
        return error_response(
            422,
            "white_to_move_required",
            "The validated history does not leave White to move",
        )

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


@app.get("/health")
def health():
    return {"status": "ok", "service": "chess-opening-master-api"}
