# Product requirements
## Goals and assumptions
Multi-tenant inventory for retailers, wholesalers and multi-warehouse organisations. PostgreSQL is authoritative. All timestamps are UTC and rendered in the company timezone (default Africa/Kampala). UGX is the demo base currency; currencies and tax codes are configurable. Weighted-average costing is the supported method. Negative stock is prohibited. Fractional quantities follow each UOM's 0-6 decimal precision.

## Roles and permission matrix
| Capability | Admin | Inventory manager | Purchasing | Sales | Warehouse | Accountant | Auditor |
|---|---:|---:|---:|---:|---:|---:|---:|
| View master/stock | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create/edit products | ✓ | ✓ |  |  |  |  |  |
| Approve PO / receive | ✓ | ✓ | ✓ |  | Receive |  |  |
| Reserve / dispatch | ✓ | ✓ |  | Create | Dispatch |  |  |
| Adjust / write off | ✓ | Approve |  |  | Create | Review |  |
| Export / valuation | ✓ | ✓ | ✓ | ✓ |  | ✓ | Read |
| Users/roles/company | ✓ |  |  |  |  |  |  |
| Reverse posted movement | ✓ | ✓ with reason |  |  |  | Review |  |

## Workflows and acceptance criteria
1. **Purchase/receipt:** draft PO → approval → partial/full receipt → immutable receipt movement. Quantity cannot exceed outstanding PO quantity without override permission. Retry with the same key returns the same movement.
2. **Sale/dispatch:** draft order → reserve → pick → dispatch. Available = on-hand − reserved. A database lock prevents concurrent oversell. Partial dispatch leaves a backorder.
3. **Transfer:** approve → issue from source into TRANSIT → receive at destination. Cancellation after issue requires reversal, never deletion.
4. **Return:** reference original shipment/receipt; quarantine by default; inspection moves accepted goods to sellable, rejected goods to damaged/write-off.
5. **Count:** freeze scope or record snapshot → blind count → variance review → approved adjustment movements.

## Non-functional requirements
99.9% target availability; p95 common API under 500 ms at 100 concurrent users; WCAG 2.2 AA target; RPO 15 minutes and RTO 4 hours; append-only audit for posted events; tenant-scoped indexes/queries; observability and reproducible migrations.

## Out of scope / future
General ledger posting, payroll, jurisdiction-specific tax returns, route planning, offline mobile synchronisation, ML forecasting and marketplace integrations.

## Business confirmations
Confirm approval thresholds, whether backorders are allowed, expiry allocation rule (FEFO recommended), return valuation, tax rules, serial warranty behaviour, count freeze policy and whether weighted-average costing satisfies the accountant/auditor.

## Risk register
- Concurrent oversell: pessimistic row locks, atomic transactions and load tests.
- Tenant leakage: mandatory company scope, authorisation tests and optional PostgreSQL RLS defence-in-depth.
- Ledger/cache divergence: same transaction plus nightly read-only reconciliation.
- Migration failure: Flyway, backups, staging rehearsal and forward-compatible releases.
- Cost rounding: numeric types, explicit scale and period-close reconciliation.
- Insider misuse: least privilege, dual approval and immutable audit.
