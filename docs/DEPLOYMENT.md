# Deployment and operations
Use `.env.example` only for local values. Production secrets belong in Azure Key Vault, AWS Secrets Manager, HashiCorp Vault or the platform equivalent.

Build: `docker compose build`; initialise by starting API, which runs Flyway. Health: `/actuator/health`. Put NGINX/Traefik or a managed ingress in front, terminate TLS, allow only the web origin, and keep PostgreSQL private.

Backups: daily full plus continuous WAL/PITR, 35-day retention as a starting point, quarterly restore drills. Before upgrade, back up and rehearse Flyway in staging. Roll back application images only when migrations are backward-compatible; destructive changes use expand/migrate/contract releases.

Runbooks: if API is unhealthy check DB connectivity/Flyway before restarting; if balance reconciliation differs, stop affected postings, preserve evidence and rebuild the projection from ledger after review; if an idempotency conflict occurs, reuse the original payload or choose a new key; if storage is near capacity, scale before vacuum/backup failure.
