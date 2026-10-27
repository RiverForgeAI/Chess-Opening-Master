# Chess Opening Master API

This Python backend is independent of the Vite frontend. It provides a health
check and read-only endpoints for the shared opening repertoire.

The version-controlled `data/openings.json` file at the repository root is the
single source of truth for opening IDs, names, metadata, and five- and
ten-White-move sequences. The Vite frontend imports this JSON file, and this
API reads the same file directly.

## Requirements

- Python 3.11 or newer
- `pip`

## Set up

Run these commands from the repository's `backend/` directory:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

On Windows PowerShell, activate the environment with:

```powershell
.venv\Scripts\Activate.ps1
```

## Start the development server

With the virtual environment activated, run from `backend/`:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The health endpoint is available at <http://localhost:8000/health>. Browse all
opening IDs and names at <http://localhost:8000/openings>; request an opening's
full metadata and move sequences at <http://localhost:8000/openings/italian>.
FastAPI's interactive API documentation is at <http://localhost:8000/docs>.

In `/docs`, select **GET /openings** or **GET /openings/{opening_id}**, click
**Try it out**, and then **Execute**. For the detail endpoint, enter an ID such
as `italian` in the `opening_id` field. An unknown ID returns HTTP 404.

## Run tests

With the virtual environment activated, run from `backend/`:

```bash
python -m pytest
```

`httpx` is included in the dependencies because FastAPI's `TestClient` uses it
to make test requests to the application.
