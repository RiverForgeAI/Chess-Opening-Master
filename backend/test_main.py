import json
from pathlib import Path

import chess
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)
DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "openings.json"
OPENINGS = json.loads(DATA_FILE.read_text(encoding="utf-8"))
OPENINGS_BY_ID = {opening["id"]: opening for opening in OPENINGS}


def start_training(opening_id="italian", depth=5):
    return client.post(
        "/training/start",
        json={"opening_id": opening_id, "depth": depth},
    )


def play_training_move(opening_id="italian", depth=5, history=None, move="e4"):
    payload = {
        "opening_id": opening_id,
        "depth": depth,
        "history": history or [],
        "move": move,
    }
    return client.post("/training/move", json=payload)


def validate_request(**overrides):
    payload = {
        "opening_id": "italian",
        "depth": 5,
        "history": [],
        "move": "e4",
    }
    payload.update(overrides)
    return client.post("/validate-move", json=payload)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "chess-opening-master-api",
    }


def test_list_openings_returns_all_frontend_opening_ids_and_names():
    response = client.get("/openings")

    assert response.status_code == 200
    assert response.json() == [
        {"id": "italian", "name": "Italian Game"},
        {"id": "ruy-lopez", "name": "Ruy Lopez (Spanish Opening)"},
        {"id": "scotch", "name": "Scotch Game"},
        {"id": "queens-gambit", "name": "Queen's Gambit"},
        {"id": "london", "name": "London System"},
        {"id": "vienna", "name": "Vienna Game"},
        {"id": "english", "name": "English Opening"},
        {"id": "king-indian-attack", "name": "King's Indian Attack"},
    ]


def test_opening_details_include_both_supported_move_depths():
    for opening_id in [
        "italian",
        "ruy-lopez",
        "scotch",
        "queens-gambit",
        "london",
        "vienna",
        "english",
        "king-indian-attack",
    ]:
        response = client.get(f"/openings/{opening_id}")

        assert response.status_code == 200
        assert set(response.json()["moves"]) == {"5", "10"}
        assert len(response.json()["moves"]["5"]) == 9
        assert len(response.json()["moves"]["10"]) == 19


def test_italian_opening_matches_the_validated_repertoire():
    response = client.get("/openings/italian")

    assert response.status_code == 200
    opening = response.json()
    assert opening["name"] == "Italian Game"
    assert opening["moves"]["5"] == [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3",
    ]
    assert opening["moves"]["10"] == [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3",
        "d6", "O-O", "O-O", "Re1", "a6", "Bb3", "Ba7", "Nbd2", "Re8", "h3",
    ]


def test_queens_gambit_matches_the_validated_repertoire():
    response = client.get("/openings/queens-gambit")

    assert response.status_code == 200
    assert response.json()["moves"]["10"] == [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7", "e3", "O-O",
        "Nf3", "h6", "Bh4", "b6", "cxd5", "exd5", "Bd3", "Bb7", "O-O",
    ]


def test_unknown_opening_returns_404_with_a_clear_message():
    response = client.get("/openings/not-an-opening")

    assert response.status_code == 404
    assert response.json() == {"detail": "Opening 'not-an-opening' not found"}


def validate_request(**overrides):
    payload = {
        "opening_id": "italian",
        "depth": 5,
        "history": [],
        "move": "e4",
    }
    payload.update(overrides)
    return client.post("/validate-move", json=payload)


def test_italian_first_move_is_correct_and_returns_resulting_fen():
    response = validate_request()

    assert response.status_code == 200
    assert response.json() == {
        "outcome": "correct",
        "legal": True,
        "repertoire_correct": True,
        "move": "e4",
        "expected_move": "e4",
        "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    }


def test_legal_move_outside_repertoire_is_not_reported_as_illegal():
    response = validate_request(move="d4")

    assert response.status_code == 200
    assert response.json()["outcome"] == "off_repertoire"
    assert response.json()["legal"] is True
    assert response.json()["repertoire_correct"] is False
    assert response.json()["expected_move"] == "e4"
    assert response.json()["fen"].startswith("rnbqkbnr/pppppppp/8/8/3P4/")


def test_illegal_move_is_reported_as_an_outcome_without_a_resulting_fen():
    response = validate_request(move="e5")

    assert response.status_code == 200
    assert response.json() == {
        "outcome": "illegal",
        "legal": False,
        "repertoire_correct": False,
        "move": "e5",
        "message": "The proposed move is not legal in this position",
    }


def test_validated_multi_move_history_checks_the_next_white_move():
    response = validate_request(
        history=["e4", "e5", "Nf3", "Nc6"],
        move="Bc4",
    )

    assert response.status_code == 200
    assert response.json()["outcome"] == "correct"
    assert response.json()["expected_move"] == "Bc4"


def test_legal_but_off_repertoire_history_is_rejected():
    response = validate_request(history=["d4"], move="Nf3")

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "inconsistent_history"
    assert response.json()["error"]["history_index"] == 0


def test_illegal_history_is_rejected():
    response = validate_request(history=["e5"], move="Nf3")

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "inconsistent_history"


def test_history_must_leave_white_to_move():
    response = validate_request(history=["e4"], move="e5")

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "white_to_move_required"


def test_unknown_opening_id_is_a_structured_error():
    response = validate_request(opening_id="unknown")

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "opening_not_found"


def test_unsupported_depth_is_a_structured_error():
    response = validate_request(depth=15)

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "unsupported_depth"


def test_malformed_request_has_a_structured_validation_error():
    response = client.post("/validate-move", json={"opening_id": "italian"})

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "invalid_request"
    assert response.json()["error"]["details"]


def test_castling_move_matches_italian_ten_move_repertoire():
    response = validate_request(
        depth=10,
        history=["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3", "d6"],
        move="O-O",
    )

    assert response.status_code == 200
    assert response.json()["outcome"] == "correct"
    assert response.json()["fen"].startswith("r1bqk2r/ppp2ppp/")


def test_completed_repertoire_returns_a_structured_error():
    response = validate_request(
        history=["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3"]
    )

    assert response.status_code == 409
    assert response.json()["error"]["code"] == "repertoire_completed"


def test_start_italian_game_at_5_moves():
    response = start_training("italian", 5)

    assert response.status_code == 200
    payload = response.json()
    assert payload["opening_id"] == "italian"
    assert payload["depth"] == 5
    assert payload["status"] == "in_progress"
    assert payload["history"] == []
    assert payload["fen"] == chess.Board().fen()
    assert payload["current_white_move"] == 1
    assert payload["remaining_white_moves"] == 5


def test_start_another_opening_at_10_moves():
    response = start_training("english", 10)

    assert response.status_code == 200
    payload = response.json()
    assert payload["opening_id"] == "english"
    assert payload["depth"] == 10
    assert payload["status"] == "in_progress"
    assert payload["history"] == []
    assert payload["fen"] == chess.Board().fen()
    assert payload["current_white_move"] == 1
    assert payload["remaining_white_moves"] == 10


def test_correct_e4_produces_automatic_e5():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=[],
        move="e4",
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "in_progress"
    assert payload["outcome"] == "correct"
    assert payload["history"] == ["e4", "e5"]
    assert payload["black_reply"] == "e5"
    assert payload["current_white_move"] == 2
    assert payload["remaining_white_moves"] == 4

    board = chess.Board()
    board.push_san("e4")
    board.push_san("e5")
    assert payload["fen"] == board.fen()


def test_correct_nf3_after_e4_e5_produces_nc6():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=["e4", "e5"],
        move="Nf3",
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "in_progress"
    assert payload["outcome"] == "correct"
    assert payload["history"] == ["e4", "e5", "Nf3", "Nc6"]
    assert payload["black_reply"] == "Nc6"
    assert payload["current_white_move"] == 3
    assert payload["remaining_white_moves"] == 3

    board = chess.Board()
    for san in ["e4", "e5", "Nf3", "Nc6"]:
        board.push_san(san)
    assert payload["fen"] == board.fen()


def test_legal_off_repertoire_d4_resets_history_and_board():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=[],
        move="d4",
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "restarted"
    assert payload["outcome"] == "off_repertoire"
    assert payload["history"] == []
    assert payload["fen"] == chess.Board().fen()
    assert payload["current_white_move"] == 1
    assert payload["remaining_white_moves"] == 5
    assert payload["black_reply"] is None
    assert "restart" in payload["message"].lower()


def test_illegal_e5_preserves_the_starting_position():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=[],
        move="e5",
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "in_progress"
    assert payload["outcome"] == "illegal"
    assert payload["history"] == []
    assert payload["fen"] == chess.Board().fen()
    assert payload["current_white_move"] == 1
    assert payload["remaining_white_moves"] == 5
    assert payload["black_reply"] is None


def test_illegal_move_after_several_valid_moves_preserves_existing_history():
    history = ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5"]
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=history,
        move="e5",
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "in_progress"
    assert payload["outcome"] == "illegal"
    assert payload["history"] == history
    board = chess.Board()
    for san in history:
        board.push_san(san)
    assert payload["fen"] == board.fen()
    assert payload["current_white_move"] == 4


def test_malformed_or_off_repertoire_history_is_rejected():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=["d4"],
        move="Nf3",
    )
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "inconsistent_history"

    malformed = client.post(
        "/training/move",
        json={
            "opening_id": "italian",
            "depth": 5,
            "history": ["e5"],
            "move": "Nf3",
        },
    )
    assert malformed.status_code == 422
    assert malformed.json()["error"]["code"] == "inconsistent_history"


def test_history_ending_on_black_turn_is_rejected_for_new_white_move():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=["e4"],
        move="e5",
    )

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "white_to_move_required"


def test_final_fifth_white_move_completes_without_black_reply():
    history = ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6"]
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=history,
        move="d3",
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "completed"
    assert payload["outcome"] == "correct"
    assert payload["history"] == history + ["d3"]
    assert payload["black_reply"] is None
    assert payload["current_white_move"] is None
    assert payload["remaining_white_moves"] == 0
    assert payload["fen"]


def test_final_tenth_white_move_completes_without_black_reply():
    history = [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3", "d6",
        "O-O", "O-O", "Re1", "a6", "Bb3", "Ba7", "Nbd2", "Re8",
    ]
    response = play_training_move(
        opening_id="italian",
        depth=10,
        history=history,
        move="h3",
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "completed"
    assert payload["outcome"] == "correct"
    assert payload["history"] == history + ["h3"]
    assert payload["black_reply"] is None
    assert payload["current_white_move"] is None
    assert payload["remaining_white_moves"] == 0


def test_further_moves_after_completion_are_rejected_cleanly():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3"],
        move="Qe2",
    )

    assert response.status_code == 409
    assert response.json()["error"]["code"] == "completed_session"


def test_invalid_opening_id_and_depth_return_clear_errors():
    bad_opening = client.post(
        "/training/start",
        json={"opening_id": "not-real", "depth": 5},
    )
    assert bad_opening.status_code == 404
    assert bad_opening.json()["error"]["code"] == "opening_not_found"

    bad_depth = client.post(
        "/training/start",
        json={"opening_id": "italian", "depth": 7},
    )
    assert bad_depth.status_code == 422
    assert bad_depth.json()["error"]["code"] == "unsupported_depth"


def test_validate_move_and_get_endpoints_remain_unchanged():
    response = validate_request()
    assert response.status_code == 200
    assert response.json()["outcome"] == "correct"

    opening = client.get("/openings/italian")
    assert opening.status_code == 200
    assert opening.json()["id"] == "italian"


def test_history_is_canonical_san_and_matches_actual_board_state():
    response = play_training_move(
        opening_id="italian",
        depth=5,
        history=["e4", "e5"],
        move="Nf3",
    )

    payload = response.json()
    assert payload["history"] == ["e4", "e5", "Nf3", "Nc6"]
    board = chess.Board()
    board.push_san("e4")
    board.push_san("e5")
    board.push_san("Nf3")
    board.push_san("Nc6")
    assert payload["fen"] == board.fen()
