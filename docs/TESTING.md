# Testing strategy
Backend: JUnit domain tests, repository tests with Testcontainers PostgreSQL, MockMvc API/security tests, and concurrent posting tests using barriers. Frontend: Vitest component tests and Playwright workflows. Python: pytest. CI must migrate a fresh DB, run all suites, build artefacts and scan dependencies.

Required scenarios include oversell, retries, partial operations, pre/post posting cancellation, returns, expired/damaged locations, duplicate serials, mixed tracking, simultaneous dispatches, cross-tenant access, decimal rounding and partially invalid imports.

Commands are in the root README. In this generated environment npm and Python tests were executed; Maven tests could not run because Maven is not installed and no Docker daemon is available.
