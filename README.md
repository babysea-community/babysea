<div align="center">

<p>
  <img src="public/icon.png" width="100" alt="BabySea SDK icon" />
</p>

<h1>
  BabySea SDK
</h1>

<p>
  Production TypeScript SDK for the BabySea execution control plane for generative media. One API, one schema, one lifecycle across image and video inference providers.
</p>

<p>
  <strong>Works across Node.js + Edge runtimes + browsers.</strong>
</p>

<br />

[![BabySea Website](https://custom-icon-badges.demolab.com/badge/babysea-website-0D9488?style=for-the-badge&logo=babysea&logoColor=white)](https://babysea.ai)
[![BabySea Docs](https://custom-icon-badges.demolab.com/badge/babysea-docs-0D9488?style=for-the-badge&logo=babysea&logoColor=white)](https://docs.babysea.ai)
[![BabySea Playground](https://custom-icon-badges.demolab.com/badge/babysea-playground-0D9488?style=for-the-badge&logo=babysea&logoColor=white)](https://us.babysea.ai/playground)

<br />

<img src="public/card.png" alt="BabySea SDK card" />

<br/>
<br/>

<strong>Project</strong>

[![BabySea OSS SDK](https://custom-icon-badges.demolab.com/badge/oss-sdk-7C3AED?style=for-the-badge&logo=babysea&logoColor=white)](#babysea-oss-taxonomy)
[![BabySea OSS Status Production](https://custom-icon-badges.demolab.com/badge/oss_status-production-C026D3?style=for-the-badge&logo=babysea&logoColor=white)](#status)
[![License](https://custom-icon-badges.demolab.com/badge/license-apache_2.0-059669?style=for-the-badge&logo=apache&logoColor=white)](LICENSE)

<br/>

<strong>Assistants & Bots</strong>

![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)
![OpenAI](https://custom-icon-badges.demolab.com/badge/openai-000000?style=for-the-badge&logo=openai&logoColor=white)

<br/>

<strong>Checks</strong>

[![CircleCI](https://img.shields.io/badge/circleci-passed-003740?style=for-the-badge&logo=circleci&logoColor=white)](https://dl.circleci.com/status-badge/redirect/circleci/2uTLcwc4naeNuKDP41es88/J9zUiRVPXjfZ9YvzjBpnvo/tree/main)
[![Codecov](https://img.shields.io/codecov/c/github/babysea-community/babysea?style=for-the-badge&label=codecov&logo=codecov&logoColor=white&color=FF0077&token=FDUBOJu692)](https://codecov.io/github/babysea-community/babysea)
[![Snyk](https://img.shields.io/github/actions/workflow/status/babysea-community/babysea/snyk-security.yml?branch=main&style=for-the-badge&label=snyk&logo=snyk&logoColor=white)](https://github.com/babysea-community/babysea/actions/workflows/snyk-security.yml)
[![Sentry](https://img.shields.io/github/actions/workflow/status/babysea-community/babysea/sentry-check.yml?style=for-the-badge&label=sentry&logo=sentry&logoColor=white)](https://github.com/babysea-community/babysea/actions/workflows/sentry-check.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/babysea-ai/babysea/codeql.yml?style=for-the-badge&label=codeql&logo=github&logoColor=white)](https://github.com/babysea-community/babysea/actions/workflows/codeql.yml)
[![Package](https://img.shields.io/github/actions/workflow/status/babysea-ai/babysea/publish-check.yml?style=for-the-badge&label=package&logo=npm&logoColor=white)](https://github.com/babysea-community/babysea/actions/workflows/publish-check.yml)

<br/>

<strong>Runtime</strong>

[![npm Version](https://img.shields.io/npm/v/babysea?style=for-the-badge&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/babysea)
[![Node.js](https://img.shields.io/badge/runtime-Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Edge](https://custom-icon-badges.demolab.com/badge/runtime-edge-000000?style=for-the-badge&logo=cloud&logoColor=white)](#configuration)
[![Browser](https://custom-icon-badges.demolab.com/badge/runtime-browser-3399CC?style=for-the-badge&logo=browser&logoColor=white)](#configuration)
[![Zero Dependencies](https://custom-icon-badges.demolab.com/badge/dependencies-zero-3450D1?style=for-the-badge&logo=pulse&logoColor=white)](#configuration)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## BabySea OSS taxonomy

BabySea open source projects are organized into three categories:

[![BabySea OSS SDK](https://custom-icon-badges.demolab.com/badge/oss-sdk-7C3AED?style=for-the-badge&logo=babysea&logoColor=white)](#babysea-oss-taxonomy)
[![BabySea OSS Primitive](https://custom-icon-badges.demolab.com/badge/oss-primitive-EA580c?style=for-the-badge&logo=babysea&logoColor=white)](#babysea-oss-taxonomy)
[![BabySea OSS Starter](https://custom-icon-badges.demolab.com/badge/oss-starter-2563EB?style=for-the-badge&logo=babysea&logoColor=white)](#babysea-oss-taxonomy)

| Category      | Description                                                                                                                                       |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SDK**       | Typed developer entry points for creating, tracking, and managing BabySea workloads from application code.                                        |
| **Primitive** | Reusable infrastructure boundaries extracted from BabySea's execution control plane. Each primitive focuses on one system concern.                |
| **Starter**   | Deployable reference applications that combine product UI, auth, storage, and BabySea execution patterns. Some starters may also include billing. |

## Status

BabySea OSS projects are published into three status levels:

[![BabySea OSS Status Working](https://custom-icon-badges.demolab.com/badge/oss_status-working-DB2777?style=for-the-badge&logo=babysea&logoColor=white)](#status)
[![BabySea OSS Status Production](https://custom-icon-badges.demolab.com/badge/oss_status-production-C026D3?style=for-the-badge&logo=babysea&logoColor=white)](#status)
[![BabySea OSS Status Alpha](https://custom-icon-badges.demolab.com/badge/oss_status-alpha-D97706?style=for-the-badge&logo=babysea&logoColor=white)](#status)

| Status         | Description                                                                                                                                                                          |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Working**    | Fully implemented and deployable. All documented capabilities function as described. Suitable for personal and small-team use. No breaking-change guarantees between versions.       |
| **Production** | Working plus a hardened public runtime contract. Validated against a stated infrastructure stack with deterministic behavior, explicit failure modes, and a documented upgrade path. |
| **Alpha**      | Early-stage implementation. Core structure exists but some capabilities may be incomplete, undocumented, or subject to breaking changes. Not recommended for production deployments. |

`babysea` is a **production** OSS SDK. It is built and validated against the BabySea execution control plane for image and video generation across Node.js, Edge runtimes, and browsers. See [`CHANGELOG.md`](CHANGELOG.md).

## Table of contents

1. [Overview](#1-overview)
   - [What this is](#what-this-is)
   - [Short version](#short-version)
   - [Production lineage](#production-lineage)
   - [Grounding rule](#grounding-rule)
   - [Adoption path](#adoption-path)
2. [Runtime contract](#2-runtime-contract)
3. [Terminology](#3-terminology)
4. [Boundaries](#4-boundaries)
5. [Architecture](#5-architecture)
6. [Quick start](#6-quick-start)
   - [Installation](#installation)
   - [Create a client](#create-a-client)
   - [Preview cost and generate](#preview-cost-and-generate)
   - [Wait for completion](#wait-for-completion)
   - [Verify webhooks](#verify-webhooks)
   - [Framework examples](#framework-examples)
7. [Core capabilities](#7-core-capabilities)
   - [Why it exists](#why-it-exists)
   - [Why not call providers directly](#why-not-call-providers-directly)
   - [Models and pricing](#models-and-pricing)
   - [Production reliability](#production-reliability)
   - [Security and enterprise controls](#security-and-enterprise-controls)
   - [Rate limits](#rate-limits)
   - [SDK telemetry](#sdk-telemetry)
   - [Regions and providers](#regions-and-providers)
8. [API reference](#8-api-reference)
   - [Configuration](#configuration)
   - [Methods](#methods)
   - [Error handling](#error-handling)
   - [Webhooks](#webhooks)
   - [API key scopes](#api-key-scopes)
   - [Response envelope](#response-envelope)
9. [Version surface](#9-version-surface)
10. [Community](#10-community)
    - [Resources](#resources)
    - [Contributing](#contributing)
11. [License](#11-license)

---

## 1. Overview

### What this is

`babysea` is the TypeScript SDK for BabySea's execution control plane. It gives applications one typed entry point for generative media execution: preview cost, create image and video generations, poll or wait for completion, verify webhooks, inspect account usage, read platform health, and handle structured errors.

### Short version

`babysea` is the typed TypeScript SDK into BabySea's generative-media execution control plane: create, estimate, wait, cancel, verify webhooks, inspect usage, and handle structured errors without wiring directly to provider APIs.

BabySea standardizes how image and video workloads run across inference providers. Provider selection, failover, billing, and observability are managed by the platform; provider selection adapts over time based on real execution outcomes.

80+ image and video models. 12+ AI labs. 8+ inference providers. 3 regional endpoints. One contract.

### Production lineage

`babysea` is the production SDK used to access BabySea's execution control plane. The public package exposes the stable client boundary: typed request helpers, retry behavior, idempotency headers, webhook verification, response envelopes, structured errors, runtime metadata headers, and examples for common runtimes.

### Grounding rule

Public SDK behavior is limited to this package: a zero-dependency TypeScript client that talks to BabySea API endpoints, verifies BabySea webhook signatures, retries eligible failures, surfaces typed responses/errors, and exports TypeScript types. Provider routing, credit settlement, failover, storage, and billing execution live in the BabySea service layer behind the SDK.

### Adoption path

Install `babysea`, create a BabySea API key, keep write-capable keys server-side, call `estimate()` before `generate()` for product UX, use `generate()` plus webhooks for production throughput, and use scoped read-only keys only for browser/status flows.

## 2. Runtime contract

| Layer               | SDK surface                                                              | Runtime responsibility                                                                                              |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Workload submission | `generate(model, params, options?)`                                      | Use TypeScript request types where possible, send one normalized request, and return the generation id immediately. |
| Cost preview        | `estimate(model, options?)`                                              | Ask the API for model-aware credit estimates before execution.                                                      |
| Lifecycle reads     | `getGeneration()`, `listGenerations()`, `waitForGeneration()`            | Track async completion without exposing provider-specific polling behavior.                                         |
| Lifecycle control   | `cancelGeneration()`, `deleteGeneration()`                               | Forward cancellation and deletion requests through the BabySea API.                                                 |
| Operations          | `status()`, `account()`, `billing()`, `usage()`, `health.*`, `library.*` | Expose account, health, usage, provider, and model catalog data through one typed client.                           |
| Event delivery      | `verifyWebhook()` from `babysea/webhooks`                                | Verify HMAC-signed webhook payloads before processing generation events.                                            |

No provider SDK, queue client, storage client, or framework adapter is required. The package uses only platform `fetch` and `crypto.subtle`.

The SDK supports Node.js 18+, Edge runtimes, browsers, Bun, Deno-compatible fetch runtimes, ESM, and CJS package consumers.

## 3. Terminology

| Term             | Meaning in this SDK                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Generation       | One image or video workload submitted through BabySea and tracked by `generation_id`.            |
| Model identifier | Stable model string such as `bfl/flux-schnell`, passed to `generate()` and `estimate()`.         |
| Provider order   | `generation_provider_order`, either `fastest` or an explicit failover order string.              |
| Cost estimate    | A model-aware credit preview returned by `estimate()` before execution.                          |
| Idempotency key  | Caller-supplied write intent key that lets safe retries replay the original generation response. |
| Request id       | API correlation id surfaced on successful responses and structured errors.                       |
| Scoped key       | API key limited to scopes such as `generation:write`, `generation:read`, or `monitor_only`.      |
| Webhook delivery | HMAC-signed lifecycle event delivered by BabySea to your backend.                                |

## 4. Boundaries

- Not a model host, inference provider SDK, queue, storage client, data pipeline, or billing engine.
- Not a direct provider abstraction. The SDK talks to BabySea's control plane, not provider APIs.
- Not a browser-first write-key pattern. Production generation writes should normally run from your backend.
- Not a replacement for webhook idempotency in your app. Store `webhook_delivery_id` when side effects must be deduplicated.
- Not a Sentry runtime telemetry integration. Sentry code guard is repository-only; no Sentry SDK, DSN, tracing, or error-reporting client is bundled.

The SDK is intentionally small: it normalizes client calls, verifies webhook signatures, retries safe failures, and surfaces structured API responses.

## 5. Architecture

```text
Your application
  ├─ backend generation route / queue worker
  ├─ webhook receiver
  └─ optional browser read/status flow
      │
      ▼
babysea TypeScript SDK
  ├─ request envelope + SDK/runtime headers
  ├─ typed generation, estimate, health, usage, and library methods
  ├─ retry, timeout, idempotency, and rate-limit handling
  └─ HMAC webhook verification
      │
      ▼
BabySea regional API endpoint
  ├─ us  https://api.us.babysea.ai
  ├─ eu  https://api.eu.babysea.ai
  └─ jp  https://api.jp.babysea.ai
      │
      ▼
BabySea execution control plane
  ├─ model schema normalization
  ├─ provider selection and failover
  ├─ credit estimation and settlement
  ├─ lifecycle state and storage handoff
  └─ signed webhook delivery
```

The default production pattern is `estimate()` ➜ `generate()` with an idempotency key ➜ webhook terminal handling. Use `waitForGeneration()` or `generateAndWait()` for demos, CLIs, tests, and controlled synchronous workflows.

## 6. Quick start

### Installation

```bash
npm install babysea
# or
pnpm add babysea
# or
yarn add babysea
```

New accounts receive **$1 in free credits** on signup, enough for ~100-330 test generations depending on the model. No credit card required.

### Create a client

```ts
import { BabySea } from 'babysea';

const client = new BabySea({
  apiKey: process.env.BABYSEA_API_KEY!,
  region: 'us',
});
```

Keep full-access and write-capable keys server-side. Use the narrowest possible scoped key for browser read/status flows.

### Preview cost and generate

```ts
import { randomUUID } from 'node:crypto';

const estimate = await client.estimate('bfl/flux-schnell', { count: 2 });

console.log(estimate.data.credit_balance_can_afford); // true
console.log(estimate.data.cost_total_consumed); // 0.010

const created = await client.generate(
  'bfl/flux-schnell',
  {
    generation_prompt: 'A baby seal plays in the Arctic',
    generation_ratio: '16:9',
    generation_output_format: 'png',
    generation_output_number: 1,
    generation_provider_order: 'fastest',
  },
  { idempotencyKey: randomUUID() },
);

console.log(created.data.generation_id);
// ➜ "550e8400-e29b-41d4-a716-446655440000"
```

Generations are async. You receive a `generation_id` immediately. Use `getGeneration()`, `waitForGeneration()`, or webhooks to handle completion. For production throughput, prefer webhooks.

### Wait for completion

```ts
const completed = await client.waitForGeneration(created.data.generation_id, {
  timeout: 120_000,
  interval: 2_000,
});

console.log(completed.data.generation_output_file);
```

### Verify webhooks

```ts
import {
  isGenerationCompleted,
  isGenerationFailed,
  verifyWebhook,
} from 'babysea/webhooks';

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('X-BabySea-Signature') ?? '';

  let payload;
  try {
    payload = await verifyWebhook(
      rawBody,
      signature,
      process.env.BABYSEA_WEBHOOK_SECRET!,
    );
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  if (isGenerationCompleted(payload)) {
    await saveToDatabase(
      payload.webhook_data.generation_id,
      payload.webhook_data.generation_output_file ?? [],
    );
  }

  if (isGenerationFailed(payload)) {
    console.error(payload.webhook_data.generation_error);
  }

  return new Response('OK');
}
```

### Framework examples

- [examples/nextjs-app-router/](examples/nextjs-app-router/) - server generation route plus raw-body webhook verification.
- [examples/vercel-edge/](examples/vercel-edge/) - Edge runtime generation route.
- [examples/cloudflare-workers/](examples/cloudflare-workers/) - Cloudflare Worker using platform `fetch` and `crypto.subtle`.
- [examples/node-queue-worker/](examples/node-queue-worker/) - backend worker with job-id idempotency keys.
- [examples/browser-readonly/](examples/browser-readonly/) - browser status reads with a narrow scoped key.
- [examples/scoped-key-backend/](examples/scoped-key-backend/) - generate-only backend key pattern.

## 7. Core capabilities

### Why it exists

Building generative media products is not just about calling models.

In production, teams have to deal with:

- different provider APIs
- different model schemas
- async job handling
- retries and timeouts
- failover across providers
- webhook verification
- cost estimation before execution
- providers that drift in latency, cost, and quality from week to week

As more providers and models emerge, these differences compound. BabySea turns inconsistent provider behavior into a predictable execution system with one public contract at the request boundary.

The SDK gives you:

- unified schema across 80+ models from 12+ AI labs and 8+ inference providers
- async execution with full generation lifecycle control
- automatic retries, timeouts, and cross-provider failover
- webhook verification for event-driven completion
- cost estimation before execution
- health and library endpoints for operational visibility
- structured error codes, request IDs, and retryability flags for production incident handling
- scoped API keys for least-privilege backend, monitoring, and read-only access
- zero dependencies, using only `fetch` and `crypto.subtle`

The platform behind the SDK adapts provider selection over time based on real execution outcomes: latency, cost, and success rate. You can also pin the order explicitly with `generation_provider_order`.

### Why not call providers directly

Direct provider integration works for prototypes, but production generative-media systems need an execution layer around the model call.

| Direct provider integration                                      | BabySea execution control plane                                                             |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| One request schema per provider and model.                       | One typed generation request lifecycle.                                                     |
| Provider-specific polling, callbacks, and status names.          | Unified lifecycle reads, cancellation, deletion, and webhooks.                              |
| Outage handling, retry policy, and failover are app code.        | Provider routing, retries, and failover are platform behavior.                              |
| Cost estimation and billing coupling are rebuilt per app.        | Cost preview, credit balance, usage, and billing surfaces are typed endpoints.              |
| Incident debugging depends on provider-specific error shapes.    | Structured `BabySeaError` codes, request IDs, retryability, and optional `provider_errors`. |
| Browser keys and backend keys need custom least-privilege rules. | Scoped API key presets separate generate-only, read-only, and monitoring access.            |

Use direct provider APIs when you want a single-provider experiment. Use BabySea when the product needs a reliable multi-provider execution control plane.

### Models and pricing

The full model catalog, per-model pricing, and per-model input schemas are published on babysea.ai. They are the source of truth for what each model accepts and how much each generation costs.

| Page                                                         | What you get                                                                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [babysea.ai/model-pricing](https://babysea.ai/model-pricing) | Credits per generation for every image model, per-second/per-resolution/audio pricing for video models, with the BabySea credit-to-USD rate.     |
| [babysea.ai/model-schema](https://babysea.ai/model-schema)   | Full input schema per model: prompt, ratios, output formats, durations, resolutions, audio, supported provider stack, and runnable code samples. |
| [babysea.ai/pricing-plan](https://babysea.ai/pricing-plan)   | Subscription plans, included credits, rate limits, and SLAs.                                                                                     |

The same data is also available programmatically:

```ts
const { data } = await client.library.models();

// data.models[].model_type         ➜ 'image' | 'video'
// data.models[].model_pricing      ➜ number | Record<string, number> | undefined
// data.models[].model_supported_provider
// data.models[].schema             ➜ input fields accepted by the model
```

And you can preview cost for a specific request before executing it with `client.estimate()`.

### Production reliability

The SDK is intentionally small, but it is built for production execution paths:

| Concern                  | SDK behavior                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Retry storms             | Retry backoff uses exponential backoff with full jitter, capped at 30 seconds, to avoid thundering-herd behavior during incidents.                     |
| Network transients       | DNS hiccups, connection resets, socket hangups, Undici socket errors, and retryable API errors are handled through typed retry paths.                  |
| Duplicate-safe creation  | Supply an `Idempotency-Key` for generation writes so safe retries can replay the original response; replayed responses surface `idempotency_replayed`. |
| Request correlation      | Every success response has a `request_id`; `BabySeaError` exposes `requestId` when the API provides one, plus `code`, `type`, and `retryable`.         |
| Multi-provider debugging | Structured API errors can include per-provider failure details in `error.body.error.provider_errors`.                                                  |
| Operational visibility   | `health.*`, `library.*`, `usage()`, `billing()`, and `status()` expose platform, model, provider, account, and usage state through one client.         |

SDK reliability contract:

| Contract                                            | What to do in your application                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Retried generation writes need idempotency keys.    | Pass `idempotencyKey` on `generate()`/`generateAndWait()` whenever client, network, or retryable API failures could trigger a retry. |
| Webhook verification requires the raw request body. | Read the body as text/bytes before JSON parsing and verify `X-BabySea-Signature` with `verifyWebhook()`.                             |
| Browser generation should use narrow scoped keys.   | Keep full-access and long-lived write keys server-side; use scoped keys for browser status/read-only flows.                          |
| `generateAndWait()` is a convenience path.          | Use it for demos, CLIs, tests, and controlled flows; use `generate()` plus webhooks for production throughput.                       |
| Regional endpoints pin API traffic.                 | Set `region` to `us`, `eu`, or `jp`; upstream provider behavior still depends on provider availability in that region.               |
| Structured errors are the incident interface.       | Log `requestId`, `code`, `type`, `retryable`, rate-limit metadata, and any `provider_errors` for support.                            |

For incident-oriented recipes covering `429`s, insufficient credits, provider failures, generation polling timeouts, and exhausted retries, see [docs/incident-handling.md](docs/incident-handling.md).

### Security and enterprise controls

| Control                 | Details                                                                                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scoped API keys         | Use `generate_only`, `read_only`, `monitor_only`, or custom scopes to enforce least privilege. Keep write-capable keys server-side.                                                                         |
| Webhook verification    | `verifyWebhook()` validates HMAC-SHA256 signatures with timestamp replay protection and timing-safe comparison.                                                                                             |
| Idempotent generation   | `Idempotency-Key` prevents duplicate generations during safe retries and exposes replay state in the SDK response.                                                                                          |
| Regional endpoints      | `us`, `eu`, and `jp` endpoints keep requests pinned to the region you configure.                                                                                                                            |
| No runtime dependencies | No provider SDKs, queue clients, storage clients, or framework adapters are bundled.                                                                                                                        |
| Minimal SDK telemetry   | SDK headers contain package/runtime metadata only; prompts, request bodies, and PII are not added to telemetry headers.                                                                                     |
| Sentry code guard       | The public SDK repo uses a private, repository-specific Sentry project for ownership, Seer, and scheduled project-wiring checks; no Sentry runtime SDK, DSN, tracing, or error-reporting client is bundled. |

Browser runtime support is available, but production generation writes should normally run from your backend with a server-side API key. If you call BabySea from browser code, issue the narrowest possible scoped key for that use case.

See [SECURITY.md](SECURITY.md) for vulnerability reporting and SDK security boundaries.

### Rate limits

Rate limits are enforced by the API and can vary by plan and route.

The SDK surfaces rate-limit metadata through `BabySeaError.rateLimit` when the API includes these headers:

| Header                  | Description                                   |
| ----------------------- | --------------------------------------------- |
| `X-RateLimit-Limit`     | Maximum requests in the current window        |
| `X-RateLimit-Remaining` | Requests remaining in the current window      |
| `X-RateLimit-Reset`     | Unix timestamp when the current window resets |
| `Retry-After`           | Seconds to wait before retrying after a `429` |

When parsed rate-limit metadata includes `Retry-After`, the SDK respects `Retry-After` and retries up to `maxRetries`.

When `Retry-After` is not present, retry delays use exponential backoff with full jitter, capped at 30 seconds. This spreads client retries during regional or upstream incidents instead of creating a thundering herd.

Transient network failures are also retried under the same `maxRetries` budget. To preserve exactly-once semantics, non-idempotent methods (`POST`, `PUT`, `PATCH`) are only retried on network failure when you supply an `Idempotency-Key`.

### SDK telemetry

Every request carries a small set of diagnostic headers so the platform can correlate behavior with client versions and runtimes:

| Header                          | Example value                                            |
| ------------------------------- | -------------------------------------------------------- |
| `X-BabySea-SDK-Name`            | `babysea-node`                                           |
| `X-BabySea-SDK-Version`         | `<package-version>`                                      |
| `X-BabySea-SDK-Runtime`         | `node`/`deno`/`bun`/`workerd`/`edge`/`browser`/`unknown` |
| `X-BabySea-SDK-Runtime-Version` | `20.11.1` when known                                     |
| `User-Agent`                    | `babysea-node/<package-version> (node/20.11.1)`          |

No request bodies, prompts, or PII are added by these headers. They contain only SDK and runtime metadata.

### Regions and providers

| Region | Endpoint                    |
| ------ | --------------------------- |
| `us`   | `https://api.us.babysea.ai` |
| `eu`   | `https://api.eu.babysea.ai` |
| `jp`   | `https://api.jp.babysea.ai` |

Custom base URLs are supported via the `baseUrl` option.

BabySea selects a provider from the set supported by each model and current account configuration. Selection adapts over time based on observed latency, cost, and success rate; you can pin or constrain the order with `generation_provider_order`.

Supported inference providers:

| Provider      | ID             |
| ------------- | -------------- |
| Alibaba Cloud | `alibabacloud` |
| BFL           | `bfl`          |
| BytePlus      | `byteplus`     |
| Cloudflare    | `cloudflare`   |
| FAL           | `fal`          |
| OpenAI        | `openai`       |
| Replicate     | `replicate`    |
| Runway        | `runway`       |

Pass `generation_provider_order: 'fastest'` to let the platform pick. Pass an explicit ordering string such as `'replicate, fal'` or `'bfl, replicate, cloudflare'` to pin failover yourself. Use `client.library.models()` to see the exact stack each model supports.

## 8. API reference

### Configuration

```ts
const client = new BabySea({
  /** API key (required). Create one in your BabySea dashboard. */
  apiKey: 'bye_...',

  /**
   * Region endpoint.
   * - 'us' ➜ https://api.us.babysea.ai  (default)
   * - 'eu' ➜ https://api.eu.babysea.ai
   * - 'jp' ➜ https://api.jp.babysea.ai (APAC)
   */
  region: 'us',

  /**
   * Defaults to 'us' when omitted.
   * Override the base URL entirely.
   * Takes precedence over `region`.
   */
  baseUrl: 'https://acme.api.us.babysea.ai',

  /** Request timeout in milliseconds. Default: 30 000 (30s). */
  timeout: 30_000,

  /** Max automatic retries on retryable API errors. Default: 2. */
  maxRetries: 2,
});
```

### Methods

#### `generate(model, params, options?)` - Create an image generation

```ts
const result = await client.generate('bfl/flux-schnell', {
  // Required
  generation_prompt: 'A serene Japanese garden in spring',

  // Optional
  generation_ratio: '16:9',
  generation_output_format: 'png',
  generation_output_number: 1,
  generation_input_file: ['https://example.com/reference.jpg'],
  generation_provider_order: 'fastest',
});

const { generation_id, generation_provider_order } = result.data;
```

Pass `fastest` to let BabySea's predictive router select the provider at request time based on real execution outcomes. Pass an explicit string like `replicate, fal` to pin the failover order yourself.

##### Idempotency, recommended for production

Pass an `Idempotency-Key` so retries replay the original response instead of creating duplicate generations:

```ts
import { randomUUID } from 'node:crypto';

const created = await client.generate(
  'bfl/flux-schnell',
  { generation_prompt: 'A baby seal plays in the Arctic' },
  { idempotencyKey: randomUUID() },
);

if (created.idempotency_replayed) {
  // Server replayed the original response from the idempotency cache.
}
```

- Keys are valid for 24 h.
- Replaying with a **different** body returns `BSE2015`.
- Replaying while the original is still processing returns `BSE2016`.
- Format: 1-255 chars, `[A-Za-z0-9_\-:.]`. UUIDs are a good default.

#### `generate(model, params, options?)` - Create a video generation

```ts
// Duration-only video model
const result = await client.generate('google/veo-2', {
  generation_prompt: 'A baby seal plays in the Arctic',
  generation_duration: 5,
  generation_ratio: '16:9',
  generation_output_format: 'mp4',
  generation_input_file: ['https://example.com/reference.jpg'],
  generation_provider_order: 'fastest',
});

// Duration + resolution video model
const hd = await client.generate('bytedance/seedance-1-pro', {
  generation_prompt: 'Cinematic drone shot over a coral reef',
  generation_duration: 8,
  generation_resolution: '1080p',
  generation_ratio: '16:9',
});

// Audio-priced video model
const audio = await client.generate('bytedance/seedance-1.5-pro', {
  generation_prompt: 'A music video with rhythmic visuals',
  generation_duration: 5,
  generation_generate_audio: true,
  generation_ratio: '16:9',
});

const { generation_id, generation_provider_order } = result.data;
```

#### `estimate(model, options?)` - Preview cost before generating

```ts
// Image model - estimate 5 generations
const est = await client.estimate('bfl/flux-schnell', { count: 5 });

est.data.cost_per_generation; // 0.005 credits
est.data.cost_total_consumed; // 0.025 credits
est.data.credit_balance; // 10.000, or null when balance lookup is unavailable
est.data.credit_balance_can_afford; // true, false, or null
est.data.credit_balance_max_affordable; // 2000, or null

// Video model - estimate with duration
const vid = await client.estimate('google/veo-2', { duration: 8 });

// Resolution-priced video model - estimate with duration + resolution
const hd = await client.estimate('bytedance/seedance-1-pro', {
  duration: 8,
  resolution: '1080p',
});

// Audio-priced video model - estimate with/without audio
const withAudio = await client.estimate('bytedance/seedance-1.5-pro', {
  duration: 5,
  resolution: '1080p',
  audio: true,
});
const noAudio = await client.estimate('bytedance/seedance-1.5-pro', {
  duration: 5,
  resolution: '1080p',
  audio: false,
});

// Shorthand, backwards-compatible: estimate(model, count)
const short = await client.estimate('bfl/flux-schnell', 5);
```

Use `estimate()` before execution when you need deterministic product UX: disable submit buttons when balance is insufficient, show per-generation cost, calculate max affordable generations, and preview duration-, resolution-, or audio-sensitive pricing before creating a workload.

For reporting, `usage(days?)` returns endpoint-level and provider-level submission/cost breakdowns, and `billing()` returns current credit balance and subscription state.

#### `getGeneration(id)` - Fetch a single generation

```ts
const gen = await client.getGeneration('550e8400-e29b-41d4-a716-446655440000');

gen.data.generation_status; // 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled'
gen.data.generation_output_file; // string[] of output URLs when succeeded
```

#### `waitForGeneration(id, options?)` - Poll until terminal state

Use this for scripts, demos, tests, and synchronous product flows that do not have a webhook receiver. Production systems with sustained volume should prefer webhooks.

```ts
const created = await client.generate('bfl/flux-schnell', {
  generation_prompt: 'A baby seal plays in the Arctic',
});

const completed = await client.waitForGeneration(created.data.generation_id, {
  timeout: 120_000,
  interval: 2_000,
});

console.log(completed.data.generation_output_file);
```

Throws `BabySeaGenerationFailedError` when the generation reaches `failed` or `canceled`, and `BabySeaGenerationTimeoutError` when the deadline expires. Pass an `AbortSignal` in `options.signal` to cancel a local wait.

#### `generateAndWait(model, params, options?)` - Generate and wait

One-call helper over `generate()` + `waitForGeneration()`.

```ts
const completed = await client.generateAndWait(
  'bfl/flux-schnell',
  { generation_prompt: 'A baby seal plays in the Arctic' },
  {
    idempotencyKey,
    timeout: 120_000,
  },
);

console.log(completed.data.generation_output_file);
```

Use this for demos and controlled synchronous flows. For production queues, web apps, and high-throughput systems, prefer `generate()` plus webhooks.

#### `listGenerations(options?)` - List with pagination

```ts
const page = await client.listGenerations({ limit: 20, offset: 0 });

page.total;
page.data.generations;
```

#### `cancelGeneration(id)` - Cancel an in-progress generation

```ts
const cancel = await client.cancelGeneration(
  '550e8400-e29b-41d4-a716-446655440000',
);

cancel.data.generation_status; // 'canceled'
cancel.data.credits_refunded; // true
cancel.data.provider_cancel_sent; // true, best-effort signal to provider
```

Only available while status is `pending` or `processing`. Sends a cancel signal to the upstream provider, best-effort, and refunds credits.

#### `deleteGeneration(id)` - Delete a generation and its files

```ts
const del = await client.deleteGeneration(
  '550e8400-e29b-41d4-a716-446655440000',
);

del.data.files_deleted;
```

#### `status()` - Verify API key and connectivity

```ts
const s = await client.status();

s.data.account_id;
s.data.apikey_prefix;
s.data.apikey_last_used_at;
s.data.apikey_expires_at;
```

#### `account()` - Account details

```ts
const acct = await client.account();

acct.data.account_name;
acct.data.account_email;
acct.data.account_is_personal;
```

#### `billing()` - Credit balance and subscription

```ts
const bill = await client.billing();

bill.data.billing_credit_balance;
bill.data.billing_plan;
bill.data.billing_period_ends_at;
```

#### `usage(days?)` - Usage analytics

```ts
const u = await client.usage(30);

u.data.usage_total_generations;
u.data.usage_total_estimated_cost;
u.data.usage_providers;
u.data.usage_endpoints;
```

#### `health.*` - Infrastructure health

```ts
const prov = await client.health.providers();
prov.data.providers;

const healthModels = await client.health.models();
healthModels.data.models.forEach((m) => {
  console.log(m.model_identifier, m.model_pricing);
});

const cache = await client.health.cache();
cache.data.latency_ms;

const storage = await client.health.storage();
storage.data.latency_ms;
```

#### `library.*` - Model and provider catalog

```ts
const models = await client.library.models();
models.data.models.forEach((m) => {
  if (typeof m.model_pricing === 'number') {
    console.log(m.model_identifier, m.model_pricing);
  } else if (m.model_pricing) {
    console.log(m.model_identifier, m.model_pricing);
  } else {
    console.log(m.model_identifier, 'pricing unavailable');
  }
});

const providers = await client.library.providers();
```

### Error handling

```ts
import {
  BabySea,
  BabySeaError,
  BabySeaGenerationFailedError,
  BabySeaGenerationTimeoutError,
  BabySeaNetworkError,
  BabySeaRetryError,
  BabySeaTimeoutError,
} from 'babysea';

try {
  await client.generate('bfl/flux-schnell', {
    generation_prompt: 'A rainy city street',
  });
} catch (err) {
  if (err instanceof BabySeaError) {
    console.error(err.code);
    console.error(err.type);
    console.error(err.message);
    console.error(err.status);
    console.error(err.retryable);
    console.error(err.requestId);
    console.error(err.body.error.provider_errors);

    if (err.rateLimit) {
      console.error(err.rateLimit.remaining);
      console.error(err.rateLimit.retryAfter);
    }
  }

  if (err instanceof BabySeaTimeoutError) {
    // Request exceeded the configured `timeout`.
  }

  if (err instanceof BabySeaNetworkError) {
    console.error(err.attempts);
    console.error(err.retryable);
  }

  if (err instanceof BabySeaRetryError) {
    console.error(err.attempts);
    console.error(err.lastError);
  }

  if (err instanceof BabySeaGenerationFailedError) {
    console.error(err.generation_id);
    console.error(err.generation_error_code);
  }

  if (err instanceof BabySeaGenerationTimeoutError) {
    console.error(err.generation_id);
    console.error(err.lastStatus);
  }
}
```

Every error response is structured for application logic:

| Field                        | Use                                                                    |
| ---------------------------- | ---------------------------------------------------------------------- |
| `code`                       | Stable BabySea error code, such as `BSE1004`.                          |
| `type`                       | Machine-readable category, such as `insufficient_credits`.             |
| `retryable`                  | Whether the failed operation can be retried safely.                    |
| `requestId`                  | Correlation id for logs, dashboards, and support tickets when present. |
| `rateLimit`                  | Parsed `X-RateLimit-*` and `Retry-After` metadata when present.        |
| `body.error.provider_errors` | Per-provider failure details when multi-provider execution fails.      |

### Webhooks

Receive real-time generation events on your server. BabySea signs every delivery with HMAC-SHA256: `t=<ts>,v1=<hex>`.

Webhook signatures use HMAC-SHA256 with an embedded timestamp and a default 5-minute replay window. `verifyWebhook()` uses timing-safe comparison and returns a typed payload. The `babysea/webhooks` entry point also exports type guards:

- `isGenerationEvent()`
- `isGenerationStarted()`
- `isGenerationCompleted()`
- `isGenerationFailed()`
- `isGenerationCanceled()`
- `isCreditLowBalance()`
- `isWebhookTest()`

Every webhook includes `webhook_delivery_id`; store it if your handler needs idempotent processing across retries.

BabySea also sends informational delivery headers on webhook requests: `X-BabySea-Event`, `X-BabySea-Timestamp`, and `X-BabySea-Delivery-Id`. They are useful for logging and deduplication, but signature verification only requires `X-BabySea-Signature` plus the raw request body.

Webhook events:

| Event                  | When                                         |
| ---------------------- | -------------------------------------------- |
| `generation.started`   | Generation accepted, provider called         |
| `generation.completed` | Provider succeeded, output files available   |
| `generation.failed`    | All providers failed or infrastructure error |
| `generation.canceled`  | Canceled by user, credits refunded           |
| `credits.low_balance`  | Credit balance crossed an alert threshold    |
| `webhook.test`         | Test ping from the dashboard                 |

### API key scopes

BabySea supports scoped API keys. Issue a read-only key for your analytics dashboard, a generate-only key for your backend, and a full-access key for internal tools.

| Scope               | Routes                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------- |
| `generation:write`  | POST `/v1/generate/image/:model`, POST `/v1/generate/video/:model`                     |
| `generation:read`   | GET `/v1/content/:generationId`, GET `/v1/content/list`                                |
| `generation:delete` | DELETE `/v1/content/:generationId`, POST `/v1/content/generation/cancel/:generationId` |
| `account:read`      | GET `/v1/user/account`, `/v1/user/billing`, `/v1/usage`, `/v1/status`                  |
| `health:read`       | GET `/v1/health/*`                                                                     |
| `library:read`      | GET `/v1/library/*`, `/v1/estimate/*`                                                  |

Preset bundles:

| Preset          | Included scopes                                                  |
| --------------- | ---------------------------------------------------------------- |
| `full_access`   | All scopes                                                       |
| `generate_only` | `generation:write`, `generation:read`, `library:read`            |
| `read_only`     | `generation:read`, `account:read`, `health:read`, `library:read` |
| `monitor_only`  | `health:read`, `library:read`                                    |

### Response envelope

All successful responses share this shape:

```ts
interface ApiResponse<T> {
  status: 'success';
  request_id: string;
  message: string;
  timestamp: string;
  data: T;
  /**
   * Set by the SDK when the server returned `Idempotency-Replayed: true`,
   * meaning the response was replayed from the idempotency cache rather
   * than newly executed.
   */
  idempotency_replayed?: boolean;
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number;
  limit: number;
  offset: number;
}
```

## 9. Status

`babysea` is the production TypeScript SDK for BabySea and is published to npm. It targets Node.js 18+, Edge runtimes, and browsers. Release metadata is sourced from package metadata during build; this README does not rely on generated local badge SVGs.

Current SDK surface:

- [x] Typed ESM and CJS package exports
- [x] Zero runtime dependencies
- [x] Image and video generation helpers
- [x] Cost estimates before execution
- [x] Generation polling and wait helpers
- [x] Cancellation and deletion helpers
- [x] Account, billing, usage, health, and library reads
- [x] Idempotency replay metadata
- [x] Structured `BabySeaError` and retry metadata
- [x] Network, timeout, retry, and terminal generation error classes
- [x] HMAC webhook verification and event type guards
- [x] Scoped API key documentation
- [x] Lcov package coverage and Codecov upload when repository credentials are available
- [x] Runtime examples for Node.js, Next.js, Edge, Cloudflare Workers, and browser read-only flows

## 10. Community

### Resources

#### Product

| Page                                                         | Description                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------------- |
| [docs.babysea.ai](https://docs.babysea.ai)                   | Full documentation: setup, dashboard, API reference, and changelog. |
| [babysea.ai/model-pricing](https://babysea.ai/model-pricing) | Per-model pricing for every image and video model.                  |
| [babysea.ai/model-schema](https://babysea.ai/model-schema)   | Per-model input schema and runnable code samples.                   |
| [babysea.ai/pricing-plan](https://babysea.ai/pricing-plan)   | Subscription plans, included credits, rate limits, SLAs.            |
| [babysea.ai/faq](https://babysea.ai/faq)                     | Frequently asked questions.                                         |
| [babysea.ai/support](https://babysea.ai/support)             | Contact support.                                                    |
| [status.babysea.ai](https://status.babysea.ai)               | Real-time platform status and incident history.                     |

#### Legal and compliance

Use the pages below for procurement, vendor review, and compliance review. If you need a counter-signed copy of the DPA or the current subprocessor list for your records, request one from [babysea.ai/support](https://babysea.ai/support).

| Document                                                                        | When you need it                                                               |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Terms of Use](https://babysea.ai/terms-of-use)                                 | Master agreement governing your use of BabySea.                                |
| [API & Inference Terms](https://babysea.ai/api-and-inference)                   | Terms specific to the API, SDK, and inference workloads.                       |
| [Service Level Terms](https://babysea.ai/service-level-terms)                   | Uptime SLA, support response, and credit remedies.                             |
| [Account & Workspace Terms](https://babysea.ai/account-and-workspace)           | Account, workspace, and team-membership terms.                                 |
| [Billing & Credit Terms](https://babysea.ai/billing-and-credit)                 | Credit lifecycle, refunds, plan changes, and invoicing.                        |
| [Privacy Policy](https://babysea.ai/privacy-policy)                             | What we collect, how we use it, your rights.                                   |
| [Data Processing Agreement (DPA)](https://babysea.ai/data-processing-agreement) | GDPR/UK GDPR processor terms. BabySea acts as **processor** for customer data. |
| [List of Subprocessors](https://babysea.ai/list-of-subprocessors)               | Current subprocessors: inference providers, infra, and observability.          |
| [Data Sovereignty](https://babysea.ai/data-sovereignty)                         | Where each region stores and processes data: US, EU, JP.                       |
| [Data Lifecycle](https://babysea.ai/data-lifecycle)                             | Retention, deletion, and export of generations and account data.               |
| [Cookies Policy](https://babysea.ai/cookies-policy)                             | Cookies used by babysea.ai.                                                    |
| [AI Principles](https://babysea.ai/ai-principles)                               | Our principles for operating a generative-media control plane.                 |
| [AI Service Terms](https://babysea.ai/ai-service-terms)                         | Acceptable use of generated content.                                           |
| [AI Providers Policy](https://babysea.ai/ai-providers-policy)                   | How upstream providers fit into our service.                                   |
| [Security](https://babysea.ai/security)                                         | Security overview, controls, and disclosure program.                           |
| [Acknowledgments](https://babysea.ai/acknowledgments)                           | Security researchers credited for responsible disclosure.                      |

### Contributing

We welcome PRs, issues, and design discussion. See [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [SECURITY.md](SECURITY.md).

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## 11. License

[Apache License 2.0](LICENSE). Use it, fork it, ship it. Just keep the notice.
