# Incident handling with the BabySea SDK

Use this playbook when a production generation path needs deterministic behavior during provider, network, billing, or rate-limit incidents.

## Log these fields first

For every failed SDK call, log the fields below before deciding whether to retry or show a user-facing error:

- `requestId`
- `code`
- `type`
- `status`
- `retryable`
- `rateLimit.retryAfter`
- `body.error.provider_errors`
- `idempotency_replayed`

Do not log prompts, input URLs containing secrets, webhook secrets, or full API keys.

## 429 rate limit

```ts
import { BabySeaError } from 'babysea';

try {
  await client.generate(
    'bfl/flux-schnell',
    { generation_prompt: 'a baby seal on Arctic ice' },
    { idempotencyKey },
  );
} catch (error) {
  if (error instanceof BabySeaError && error.status === 429) {
    const retryAfterSeconds = error.rateLimit?.retryAfter ?? 30;

    return {
      retryAfterSeconds,
      requestId: error.requestId,
      userMessage: 'Generation capacity is busy. Try again shortly.',
    };
  }

  throw error;
}
```

If the SDK receives a retryable `429` with `Retry-After`, it respects that delay within the configured `maxRetries` budget. Your application should still apply queue-level backpressure so users do not resubmit repeatedly.

## Insufficient credits

```ts
import { BabySeaError } from 'babysea';

try {
  await client.generate('bfl/flux-schnell', {
    generation_prompt: 'a cinematic baby seal portrait',
  });
} catch (error) {
  if (error instanceof BabySeaError && error.type === 'insufficient_credits') {
    return {
      requestId: error.requestId,
      userMessage: 'Add credits before starting this generation.',
    };
  }

  throw error;
}
```

Use `estimate()` before `generate()` when the product should disable submit buttons or show the maximum affordable count before execution.

## Provider failure details

```ts
import { BabySeaError } from 'babysea';

try {
  await client.generate('bfl/flux-schnell', {
    generation_prompt: 'a glass penguin on a bridge',
    generation_provider_order: 'fastest',
  });
} catch (error) {
  if (error instanceof BabySeaError) {
    const providerErrors = error.body?.error?.provider_errors;

    logGenerationIncident({
      requestId: error.requestId,
      code: error.code,
      type: error.type,
      retryable: error.retryable,
      providerErrors,
    });
  }

  throw error;
}
```

Per-provider errors are useful for internal dashboards and support escalation. Do not show raw provider error bodies directly to end users.

## Generation polling timeout

```ts
import { BabySeaGenerationTimeoutError } from 'babysea';

try {
  const created = await client.generate('bfl/flux-schnell', {
    generation_prompt: 'a baby seal under northern lights',
  });

  await client.waitForGeneration(created.data.generation_id, {
    timeout: 120_000,
    interval: 2_000,
  });
} catch (error) {
  if (error instanceof BabySeaGenerationTimeoutError) {
    return {
      generationId: error.generation_id,
      lastStatus: error.lastStatus,
      userMessage:
        'The generation is still running. We will notify you when it finishes.',
    };
  }

  throw error;
}
```

A local polling timeout does not mean the upstream generation failed. For production throughput, use `generate()` plus webhooks and treat polling as a user-interface convenience.

## Retry exhaustion

```ts
import { BabySeaNetworkError, BabySeaRetryError } from 'babysea';

try {
  await client.generate(
    'bfl/flux-schnell',
    { generation_prompt: 'a seal-shaped cloud over the ocean' },
    { idempotencyKey },
  );
} catch (error) {
  if (error instanceof BabySeaRetryError) {
    // Structured retryable API responses exhausted the configured retry budget.
    queueRetry({
      idempotencyKey,
      attempts: error.attempts,
      lastRequestId: error.lastError?.requestId,
    });

    return { accepted: true };
  }

  if (error instanceof BabySeaNetworkError) {
    // Transport retries were exhausted before a structured API response arrived.
    queueRetry({
      idempotencyKey,
      attempts: error.attempts,
      lastRequestId: undefined,
    });

    return { accepted: true };
  }

  throw error;
}
```

Always reuse the same idempotency key when an application queue retries a generation write. Generating a new key creates a new write intent.

## Webhook incident checklist

- Verify the raw body before parsing JSON.
- Reject invalid signatures with a non-2xx response.
- Store `webhook_delivery_id` before performing side effects when you need idempotent processing.
- Handle `generation.completed`, `generation.failed`, and `generation.canceled` as terminal states.
- Treat webhook retries as normal; they should not double-save artifacts or double-send user notifications.
