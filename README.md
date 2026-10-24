# StockFlow Inventory Management

StockFlow is a React, Spring Boot, and PostgreSQL inventory management application.

## Run locally

1. Copy `.env.example` to `.env` and set local values.
2. Run `docker compose up --build` from this folder.
3. Open the web UI at `http://localhost:5173` and API documentation at `http://localhost:8080/swagger-ui.html`.

## Deploy publicly

The `render.yaml` file defines the web app, API, and PostgreSQL database for Render. Push the repository to GitHub, verify your Render account email, then create a Blueprint from this repository in the Render dashboard and deploy it. Render will provide a public `onrender.com` URL for the web app.

The Blueprint currently uses Render's free PostgreSQL plan for a demo; that database is temporary and must not store important or production data. Select a persistent paid database plan before using real inventory data.

## Development checks

```bash
cd frontend && npm ci && npm run test && npm run build
cd analytics && python -m pip install -r requirements.txt && pytest
```

See `docs/` for system requirements, API details, security considerations, testing, and operations. Some enterprise modules remain planned; see `docs/STATUS.md`.

