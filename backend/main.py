import json
from pathlib import Path

from fastapi import FastAPI
from fastapi import HTTPException

app = FastAPI()
DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "openings.json"
OPENINGS = json.loads(DATA_FILE.read_text(encoding="utf-8"))
OPENINGS_BY_ID = {opening["id"]: opening for opening in OPENINGS}


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


@app.get("/health")
def health():
    return {"status": "ok", "service": "chess-opening-master-api"}
