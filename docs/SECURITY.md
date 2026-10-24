# Security and privacy
Use an external OIDC provider (Microsoft Entra ID, Keycloak or equivalent) for production; local credentials, if enabled, require Argon2id. Access tokens should be short-lived, validated for issuer/audience/signature, and never stored in localStorage when a secure BFF cookie approach is adopted. Apply RBAC plus tenant membership on every service call. Prevent IDOR by querying `(company_id,id)`, not ID alone.

Controls: parameterised JPA queries; bean validation; React output encoding; restrictive CSP; HSTS; HTTPS/TLS 1.2+; exact-origin CORS; CSRF protection for cookies; rate limits at gateway; login throttling/MFA; secret manager; encrypted volumes/backups; log redaction; immutable audit; dependency and container scanning.

Threat review: spoofed tenant IDs, duplicate posting, concurrent oversell, forged approval, poisoned CSV, formula injection in exports, serial duplication, log leakage and privileged insider reversal. Tests must cover each. Retention, data subject rights, taxation and backup residency require local professional/legal review.
