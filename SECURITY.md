# Security policy

## Reporting vulnerabilities

Please report suspected vulnerabilities privately to [dev@babysea.ai](mailto:dev@babysea.ai). Do not open public issues for secrets, authentication bypasses, webhook verification issues, scoped-key bypasses, or request-signing problems.

Include:

- affected SDK version
- runtime environment
- reproduction steps
- expected and actual behavior
- impact assessment

## SDK security boundaries

- Keep full-access API keys server-side.
- Use scoped keys for browser, read-only, monitoring, or generate-only flows.
- Verify BabySea webhooks with the raw request body and `X-BabySea-Signature`.
- Store webhook secrets and API keys in deployment secrets, not in source code.
- Use `Idempotency-Key` for generation writes that may be retried.
- Log `request_id`, structured error code, and retryability metadata instead of prompts, secret URLs, API keys, or webhook secrets.
- Keep Package Check green: SDK linting, type checks, example type checks, lcov coverage, formatting, and package dry-run should pass before publishing.

## Sentry code guard

The public SDK repository is connected to a private, repository-specific Sentry project for repository ownership, Seer-assisted review, and issue routing. The Sentry organization slug and project slug are intentionally not committed to this public repo.

This repo keeps Sentry as a repository guardrail, not runtime telemetry. It ships `scripts/sentry-project-check.mjs` and a scheduled `Sentry Project Check` workflow that verifies the configured project slug, active status, `other` platform, and Code Guard ownership rules using GitHub Actions secrets only. Use `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` as repository secrets. Local `.sentryclirc` files are ignored by git. No Sentry SDK, DSN, tracing, error-reporting client, or Sentry runtime telemetry is included in this package; SDK diagnostic headers remain limited to package/runtime metadata and never include prompts or request bodies.

## Supported versions

Security fixes target the latest published `babysea` SDK version. Upgrade promptly when security releases are published.
