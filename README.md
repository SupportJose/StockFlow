# StockFlow Inventory Management

Production-oriented multi-tenant stock and inventory monorepo. Stock is changed only by posted business documents, never by direct balance updates.

## Implemented scope
- Tenant-safe company, warehouse, location and product model
- Immutable inventory movement ledger, cached balances and idempotent posting
- Purchase receipt and sales dispatch REST workflows with pessimistic balance locking
- Weighted-average inventory cost model and valuation-ready cost layers
- React/TypeScript operational dashboard and receiving/dispatch forms connected to the API
- Python read-only reconciliation/import-validation job
- Flyway migrations, OpenAPI, JWT-ready Spring Security boundary, audit fields
- Unit/integration test examples, Docker Compose and GitHub Actions CI

## Quick start
1. Copy `.env.example` to `.env`.
2. Run `docker compose up --build`.
3. Open UI at `http://localhost:5173`, API docs at `http://localhost:8080/swagger-ui.html`.

Development commands:
```bash
cd backend && ./mvnw test && ./mvnw spring-boot:run
cd frontend && npm ci && npm run test && npm run build
cd analytics && python -m pip install -r requirements.txt && pytest
```

## Default policy
Java 17; Spring Boot 3.4.6; PostgreSQL 16; React 19.1; TypeScript 5.8; Python 3.12. UTC persistence; configurable display timezone; base currency UGX; weighted-average costing; negative stock prohibited; quantities decimal(19,6), money decimal(19,4).

## Documentation
See [`docs/`](docs/) for requirements, architecture, data model, API, security, deployment, operations and user workflows.

## Known limitations
This delivery implements the architectural core and representative end-to-end receipt/dispatch workflows. Returns, transfers, counts, serial scanning and all administration screens are specified and schema-supported but require additional controllers/UI forms before production launch. The completion checklist in `docs/STATUS.md` is authoritative.
