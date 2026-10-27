from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


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
