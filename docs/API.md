# REST API conventions
Base path `/api/v1`; JSON; ISO-8601 UTC timestamps; cursor/page pagination; `sort=field,asc`; RFC-like error object `{timestamp, code, message, fieldErrors, traceId}`. Every mutating stock request requires `Idempotency-Key`.

Implemented:
- `POST /inventory/receipts/post` permission `inventory.receive`
- `POST /inventory/dispatches/post` permission `inventory.dispatch`
- `GET /inventory/balances?companyId=` permission `inventory.view`
- `GET /inventory/movements?companyId=` permission `inventory.view`

Example request:
```json
{"companyId":"00000000-0000-0000-0000-000000000001","locationId":"00000000-0000-0000-0000-000000000030","variantId":"00000000-0000-0000-0000-000000000060","lotKey":"-","quantity":10.000000,"unitCost":2500.0000,"documentId":"11111111-1111-1111-1111-111111111111","actorId":"22222222-2222-2222-2222-222222222222"}
```
Response: `201 {"movementId":"..."}`. Same key and same payload returns the original ID; same key with a different payload fails. Posting is one transaction and locks the balance row. Failed validation rolls back entirely. After posting, cancellation creates a reversing movement.

Planned endpoints follow `/companies`, `/warehouses`, `/products`, `/partners`, `/purchase-orders`, `/sales-orders`, `/transfers`, `/returns`, `/counts`, `/reorder-rules`, `/reports` and `/exports`; their controllers are not yet implemented.
