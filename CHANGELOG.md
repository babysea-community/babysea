# Changelog

All notable changes will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Fixed

- Corrected the SDK README CodeQL and Package check badge image URLs to use the validated `babysea-community/babysea` workflow repository.

## [2.0.0] - 2026-05-27

### Added

- Added GitHub issue templates (`.github/ISSUE_TEMPLATE/bug_report.yml`, `feature_request.yml`, `config.yml`) and `.github/PULL_REQUEST_TEMPLATE.md` so contributors get a consistent intake form. The template set is identical across all BabySea OSS repos (primitives, starters, SDK) so it can be reused without project-specific adjustments.
- Added a GitLab CI pipeline (`.gitlab-ci.yml`) for the standalone SDK repository covering format/lint/typecheck/examples-typecheck verify jobs, coverage tests with Cobertura + LCOV artifacts, tsup build with `exports:check` and `pack:dry-run`, gated SHA256-verified Codecov upload, `pnpm audit --prod --audit-level=high`, pinned Gitleaks secret scan, and the GitLab SAST/Dependency-Scanning/Secret-Detection/Code-Quality templates with Advanced SAST and historic secret scanning enabled.
- Added SDK contributing and code-of-conduct docs, and included them in the package publish surface.
- Added SDK lcov coverage generation and Package Check Codecov upload using `coverage/lcov.info`.
- Added repository `codecov.yml`, trusted CircleCI package/audit/Codecov upload jobs, and a Snyk Security workflow for the standalone BabySea SDK repository.
- Added an explicit `--repo-only` SDK GitHub deploy mode for same-version repository refreshes that do not change package versions, push release tags, or create GitHub Releases.
- Added Dependabot version-update configuration for the standalone BabySea SDK repository.

### Changed

- **Breaking:** Raised the SDK package engine and documented runtime floor to Node.js 22+, including the README runtime badge shape. Node.js 18 and Node.js 20 are no longer supported by new SDK releases.
- Updated SDK Package Check, CodeQL, and Sentry workflows to the same Node 24-compatible GitHub Action majors used by the other BabySea OSS repositories.
- Constrained SDK Codecov uploads to the explicit LCOV report and required `CODECOV_TOKEN` for trusted GitHub Actions and CircleCI uploads.
- Aligned the SDK Sentry Project Check with the other OSS repositories so explicitly allowed Sentry API permission denials skip strict validation instead of failing repository CI.
- Expanded SDK Dependabot version updates to check npm dependencies daily and GitHub Actions weekly.

### Fixed

- Added `.prettierignore` and `.pnpm-store` to `.gitignore` so the GitLab CI `verify:format` job no longer recurses into the pnpm content-addressable store and fails on vendored Markdown/JSON inside `.pnpm-store/`, matching the babychain starter's prettier-ignore parity.
- Replaced SDK base URL trailing-slash normalization with a bounded string scan, resolving the CodeQL polynomial ReDoS alert.
- Added TypeScript 6 deprecation handling for SDK declaration builds without changing the published package version.
- Replaced Sentry URL trailing-slash regex normalization with a bounded string scan to avoid CodeQL ReDoS noise.

## [1.4.6] - 2026-05-21

### Changed

- Update badge icon.

### Maintenance

- No public API changes.
- No runtime behavior changes.
- No breaking changes. All 1.4.4 call sites compile and run unchanged.

## [1.4.5] - 2026-05-20

### Added

- Added icon packs for button and hero, and provide link for buttons.
- Updated `README.md`.

### Maintenance

- No public API changes.
- No runtime behavior changes.
- No breaking changes. All 1.4.4 call sites compile and run unchanged.

## [1.4.4] - 2026-05-16

### Added

- Fix table formatting in `README.md`.
- Documented production reliability, enterprise controls, cost-governance
  guidance, polling helpers, typed error handling, webhook type guards,
  and informational webhook delivery headers in `README.md`.
- Exported the `BabySeaImplementation` provider-profile type from the
  public package entry point.
- Added a 30-second summary, direct-provider comparison, SDK reliability contract, framework examples index, and incident-handling documentation.
- Added `SECURITY.md` guidance for API keys, browser usage, scoped keys, webhook verification, idempotency, logging boundaries, and vulnerability disclosure.
- Added framework examples for Next.js App Router generation/webhooks, Vercel Edge, Cloudflare Workers, backend scoped-key generation, Node queue workers, and browser read-only/status flows.
- Added runtime tests for idempotency headers, safe retry behavior, non-idempotent network failure handling, ESM/CJS exports, and webhook HMAC verification.
- Added `typecheck:examples`, `test`, `exports:check`, `pack:dry-run`, and `audit:prod` package scripts.
- Added standalone SDK repository workflows under `.github/workflows/` for CodeQL and SDK publish checks.
- Added README workflow badges for the standalone CodeQL and SDK Publish Check workflows.
- Added Sentry code-guard documentation and a README badge for the public `babysea-ai/babysea` SDK repository; no Sentry SDK, DSN, tracing, error-reporting client, or runtime telemetry is bundled.
- Added `scripts/sentry-project-check.mjs`, a `sentry:check` package script, a README badge, ignored local `.sentryclirc` support, and a scheduled `Sentry Project Check` workflow. The workflow reads Sentry org/project configuration from GitHub Actions secrets, verifies the configured project slug, active status, `other` platform, ownership, and Code Guard rules, and does not add runtime tracking.

### Changed

- Tightened JSDoc on `GenerationProviderOrderFastest` to document the
  server-side resolution semantics of the `'fastest'` sentinel:
  continuously recomputed rankings served from a low-latency cache,
  fail-open behavior on cache miss, and the relationship to
  `generation_provider_used`. No type-shape or runtime change.
- Tightened JSDoc on `Generation.generation_provider_used` to clarify
  it reports the post-failover, post-adaptive-routing provider that
  actually served the request, and is `null` until the generation
  reaches a terminal state. No type-shape or runtime change.
- Reorder the badge.
- Refreshed the README to match the `adaptive-island` format with a
  centered header, grouped Shields badges, runtime contract summary,
  status section, and clearer positioning for the SDK.
- Added a signed deploy helper for publishing `packages/sdk` to the
  standalone `babysea-ai/babysea` repository with the same guarded flow
  used by the OSS package deploy scripts.
- Added a guarded npm publish helper for the SDK with validate-only,
  dry-run, dist-tag, OTP, token-auth, version-existence, and package
  contents checks before `npm publish`.
- Added SDK release-flow documentation covering public repo deploy and
  npm publish validation/dry-run/publish steps.
- Made the SDK package metadata and lint/format config self-contained so
  the standalone public repository can install, check, and build without
  private monorepo `workspace:` or `catalog:` dependencies.
- Restored the README npm version badge using the live npm badge source
  instead of a generated local SVG.
- Replaced hard-coded telemetry version examples in the README with a
  release-agnostic `<package-version>` placeholder.
- Normalized the Apache 2.0 `LICENSE` wording and copyright notice to
  the current BabySea package format.
- Validated the SDK type surface against the live `apps/web/app/v1` API
  implementation and aligned response types for health models, provider
  catalog delivery methods, estimates with nullable balance fields,
  generation audio flags, and removed-file markers.
- Tightened README examples and pricing notes to match the actual model
  catalog, estimate response semantics, regional endpoints, idempotency
  behavior, retry/backoff behavior, and webhook verification contract.
- Hardened generation examples to require caller-supplied durable idempotency keys, validate JSON bodies, validate prompts, and reject invalid idempotency-key formats before calling `client.generate()`.
- Wired SDK `check` to run lint, package typecheck, example typecheck, runtime tests, and Prettier.
- Corrected the monorepo convenience script to call the existing SDK npm publish helper.
- Typed runtime test helpers and header assertions so SDK JavaScript tests remain clean under editor `checkJs` diagnostics.
- Kept the SDK README focused on the production SDK by removing primitive taxonomy, primitive architecture framing, and primitive cross-promotion from the SDK package docs.

### Fixed

- Hardened API error parsing so malformed or non-standard error envelopes are
  reported as structured BabySea errors instead of throwing while reading
  `error.message`, preventing retry exhaustion from surfacing as a misleading
  network error.

### Validated

- Ran SDK lint, typecheck, example typecheck, runtime tests, build, Prettier, and package dry-run.
- Confirmed SDK examples type-check through an examples-specific TypeScript project and local ambient shim without adding a nested workspace package.

### Removed

- Removed BetterStack status badges from the SDK README.
- Removed generated local README badge assets, the badge generation
  script, and the `badge-maker` development dependency. Runtime SDK
  version generation remains in place for telemetry and public
  `SDK_VERSION`/`SDK_NAME` exports.

## [1.4.3] - 2026-05-01

### Added

- **`waitForGeneration(id, options?)`.** Polls a generation to a terminal
  state (`succeeded`/`failed`/`canceled`). Convenience over
  `getGeneration()` for scripts, demos, and synchronous flows; production
  workloads should still prefer webhooks. Configurable `timeout`
  (default 10 min), `interval` (default 2 s, clamped to ≥ 500 ms), and
  `AbortSignal` support. Throws `BabySeaGenerationFailedError` on
  terminal failure and `BabySeaGenerationTimeoutError` on deadline.
- **`generateAndWait(model, params, options?)`.** Sugar over
  `generate()` + `waitForGeneration()` for one-shot use cases. Carries
  the same `idempotencyKey`, `timeout`, `interval`, and `signal`
  options. Idempotency-replayed canceled records short-circuit to a
  fresh `getGeneration()` instead of polling.
- **`BabySeaNetworkError`.** New error class wrapping transport-layer
  failures (DNS, ECONNRESET, socket hangup, undici socket errors,
  generic `fetch` `TypeError`, etc.). Closes the gap where raw `fetch`
  errors could leak past `request()` after retry exhaustion or on
  non-retry-eligible methods. Carries `cause`, `attempts`, and
  `retryable`.
- **`BabySeaGenerationFailedError`** and
  **`BabySeaGenerationTimeoutError`.** Typed terminal/deadline errors
  for the new wait helpers, with the full `Generation` record attached
  for inspection of `generation_error`, `generation_error_code`, and
  partial output.
- **Webhook event type guards** (`babysea/webhooks`):
  `isGenerationEvent`, `isGenerationStarted`, `isGenerationCompleted`,
  `isGenerationFailed`, `isGenerationCanceled`, `isCreditLowBalance`,
  `isWebhookTest`. Replaces hand-rolled discriminated-union checks in
  webhook handlers with single-line, type-narrowing predicates.
- **Public `SDK_VERSION`/`SDK_NAME` exports.** Surfaced from the new
  generated `version.ts` so applications can read the active SDK
  version at runtime (useful for support tickets, telemetry, and
  conditional behavior across SDK upgrades).

### Changed

- **`SDK_VERSION` is now generated at build time** from `package.json`
  by `scripts/generate-version.mjs` (wired into `prebuild`). Removes
  the manual-drift class of bug between the runtime constant and the
  published artifact version.
- **CHANGELOG: corrected provider-order count.** The 1.4.2 entry
  claimed 26 strings from `ALL_GENERATION_PROVIDER_ORDERS`; the actual
  count (and the SDK union) is **25**. Both 1.4.2 and 1.4.3 ship the
  full server-aligned union.

### Maintenance

- No breaking changes. All 1.4.2 call sites compile and run unchanged.
- Network errors that previously bubbled up as raw `TypeError` /
  Node-platform errors are now `BabySeaNetworkError`. Any consumer
  relying on `instanceof TypeError` for that path should migrate to
  `instanceof BabySeaNetworkError`.

## [1.4.2] - 2026-05-01

### Added

- **`'fastest'` provider order sentinel.** `GenerationProviderOrder` now
  includes `'fastest'`, the default for every multi-provider model.
  BabySea's predictive router resolves it at request time from the
  regional Databricks Gold ranking cache (latency, cost, success rate),
  with circuit-breaker and ML re-scoring layered on top. Pass an explicit
  ordering string to bypass adaptive selection and pin the failover stack
  yourself.
- **Full 8-provider `InferenceProvider` union.** Added `'alibabacloud'`
  and `'runway'` so the SDK type surface matches the platform exactly:
  Alibaba Cloud, BFL, BytePlus, Cloudflare, FAL, OpenAI, Replicate, Runway.
- **`GenerationProviderOrder` covers every server-accepted ordering.**
  All 25 strings from `ALL_GENERATION_PROVIDER_ORDERS` are now part of the
  exported union (was: 10). The image and video parameter types share the
  same union instead of redefining a partial copy.
- **SDK telemetry headers.** Every request now sends
  `X-BabySea-SDK-Name`, `X-BabySea-SDK-Version`, `X-BabySea-SDK-Runtime`
  (`node`/`deno`/`bun`/`workerd`/`edge`/`browser`/`unknown`),
  `X-BabySea-SDK-Runtime-Version` (when known), and a Stripe-style
  `User-Agent` (skipped in browsers where it is a forbidden header).
  Helps the platform correlate behavior with client versions and runtimes.
- **Network-level retry.** Transient `fetch` failures (DNS, connection
  reset, socket hangup, undici socket errors) are now retried under the
  same `maxRetries` budget. Non-idempotent methods (`POST`, `PUT`,
  `PATCH`) are only retried when the caller supplied an `Idempotency-Key`,
  preserving exactly-once semantics.
- **Full jitter on retry backoff.** Retry delays now use exponential
  backoff with full jitter to avoid thundering-herd retries during
  upstream incidents.

### Exported

- `InferenceProvider`, `GenerationProviderOrder`,
  `GenerationProviderOrderFastest` are now part of the public type
  surface.

### Maintenance

- No breaking changes. All 1.4.1 call sites compile and run unchanged.

## [1.4.1] - 2026-04-30

### Changed

- Enabled [npm provenance](https://docs.npmjs.com/generating-provenance-statements)
  on every published artifact. Releases are now signed by GitHub Actions and
  the attestation is verifiable on npm.
- Documented the release flow in `CHANGELOG.md` (this file).

### Maintenance

- No public API changes.
- No runtime behavior changes.
- Build, types, and bundle output are byte-identical to 1.4.0 except for the
  version constant.

## [1.4.0] - 2026-04-15

Initial public reference for this changelog. See the [GitHub Releases page](https://github.com/babysea-community/babysea/releases)
for prior history.
