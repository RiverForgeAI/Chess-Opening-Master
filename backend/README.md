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

## CORS configuration

The backend accepts an explicit, comma-separated list of allowed origins from the
`CORS_ALLOWED_ORIGINS` environment variable. For example:

```bash
export CORS_ALLOWED_ORIGINS="http://localhost:5173,http://127.0.0.1:5173,https://YOUR-CODESPACE-5173.app.github.dev,https://YOUR-CODESPACE-8000.app.github.dev"
```

This keeps CORS limited to the actual forwarded frontend port and the local Vite
server instead of using a wildcard origin.

If you are using a GitHub Codespaces preview for the Vite frontend, add both the
frontend preview origin (for example `https://YOUR-CODESPACE-5173.app.github.dev`)
and the backend preview origin (for example `https://YOUR-CODESPACE-8000.app.github.dev`)
to that environment variable. The browser will then allow the frontend request
without opening the API to all origins.

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
