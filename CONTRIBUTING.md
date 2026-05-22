# Contributing

Thanks for improving the BabySea SDK.

`babysea` is the production TypeScript SDK for the BabySea execution control
plane. Good contributions keep the public API stable, keep browser and server
runtimes predictable, and keep all customer prompts, API keys, webhook secrets,
and provider details out of public examples.

## Development flow

1. Install dependencies.

   In the standalone SDK repository:

   ```bash
   pnpm install
   ```

   In the BabySea monorepo, install from the workspace root:

   ```bash
   pnpm install --frozen-lockfile
   ```

2. Build the package:

   ```bash
   pnpm run build
   ```

3. Run the SDK checks:

   ```bash
   pnpm run check
   pnpm run pack:dry-run
   ```

   In the monorepo, use the package filter when running from the workspace
   root:

   ```bash
   pnpm --filter babysea run check
   pnpm --filter babysea run pack:dry-run
   ```

## Before opening a pull request

Run these checks from the SDK package root:

```bash
pnpm run lint
pnpm run typecheck
pnpm run typecheck:examples
pnpm run test:coverage
pnpm run format
pnpm run pack:dry-run
```

When changing package exports, also run:

```bash
pnpm run exports:check
```

## Contribution guidelines

- Keep all contributions under Apache 2.0. By submitting a PR you agree to
  license it under Apache 2.0.
- Keep the SDK zero-runtime-dependency unless a dependency is clearly required
  for the public API and is justified in the PR.
- Keep Sentry as a repository code guard only. Do not add runtime Sentry SDKs,
  DSNs, tracing, or telemetry to the package.
- Keep API keys, scoped keys, webhook secrets, prompts, signed URLs, generated
  media, and customer payloads out of examples, tests, logs, and screenshots.
- Preserve ESM and CommonJS exports together. Export-shape changes must update
  tests, README examples, and package metadata.
- Preserve browser and Edge compatibility. Avoid Node-only APIs in code paths
  documented for browser, Edge, or Workers runtimes.
- Keep structured errors stable and incident-friendly: include request ids,
  retryability, rate-limit metadata, and documented error types.
- Prefer focused changes. Avoid unrelated refactors in generated types,
  examples, docs, or packaging metadata.

## Documentation standard

SDK docs are part of the public runtime contract. Keep them factual,
operator-ready, and tied to behavior that exists in this repository.

- Start from the README contract: what the SDK is, what it is not, how to
  install it, how to validate it, and how to recover from common failures.
- Use exact method names, type names, package export paths, header names,
  environment variable names, commands, and file paths.
- Document validation steps beside operational claims. If a path is
  production-ready, include the check, workflow, or test that proves it.
- Keep security guidance concrete: where API keys live, which scoped keys are
  browser-safe, how webhook signatures are verified, and what should never be
  posted publicly.
- Update `CHANGELOG.md` for user-visible docs, configuration, security, SDK
  behavior, examples, exports, or package metadata changes.
- Avoid roadmap language in the public contract. New features stay out of
  README claims until implemented, documented, and validated.

When a change touches these areas, update the matching docs before opening a PR:

| Change area                          | Required docs to review                                 |
| :----------------------------------- | :------------------------------------------------------ |
| Public methods, types, or exports    | README API sections, examples, export tests, changelog  |
| Error, retry, or rate-limit behavior | README reliability contract, incident guide, tests      |
| Webhook verification                 | README webhook sections, examples, SECURITY.md, tests   |
| Browser, Edge, or Workers behavior   | README runtime sections, framework examples, typecheck  |
| Package metadata or publish surface  | README install section, package exports, `pack:dry-run` |
| Sentry or CI workflows               | README checks, SECURITY.md, this guide                  |
| Security or secret handling          | README security controls, SECURITY.md, examples         |

## Issue triage

- `bug` - reproducible defect, with logs, a failing test, or a minimal
  reproduction.
- `proposal` - scoped design idea with the user problem, implementation sketch,
  and validation path.
- `good first issue` - small, well-scoped change that can be validated without
  production credentials.

## Conduct

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Be respectful, assume good
faith, and keep discussion focused on the work and the people using it.

## Security-sensitive changes

Open security fixes privately through the process in [`SECURITY.md`](SECURITY.md).
Do not include real BabySea API keys, scoped keys, webhook secrets, prompts,
signed URLs, generated media, request bodies, customer payloads, Sentry auth
tokens, or unreleased vulnerability details in public issues, pull requests,
test fixtures, logs, or screenshots.
