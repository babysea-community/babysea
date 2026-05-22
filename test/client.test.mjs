import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';

import {
  BabySea,
  BabySeaError,
  BabySeaNetworkError,
  BabySeaRetryError,
} from '../dist/index.js';

const originalFetch = globalThis.fetch;
const originalRandom = Math.random;

afterEach(() => {
  globalThis.fetch = originalFetch;
  Math.random = originalRandom;
});

/**
 * @param {unknown} body
 * @param {ResponseInit} [init]
 */
function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

test('generate sends durable idempotency keys and exposes replay state', async () => {
  let calls = 0;

  globalThis.fetch = async (url, init) => {
    calls += 1;
    assert.equal(
      String(url),
      'https://unit.test/v1/generate/image/bfl/flux-schnell',
    );
    const headers = new Headers(init?.headers);
    assert.equal(init?.method, 'POST');
    assert.equal(headers.get('authorization'), 'Bearer bye_test');
    assert.equal(headers.get('idempotency-key'), 'job:unit-test-1');
    assert.equal(JSON.parse(String(init?.body)).generation_prompt, 'a seal');
    return jsonResponse(
      { data: { generation_id: 'gen_123' }, request_id: 'req_123' },
      { headers: { 'idempotency-replayed': 'true' } },
    );
  };

  const client = new BabySea({
    apiKey: 'bye_test',
    baseUrl: 'https://unit.test',
    maxRetries: 0,
  });

  const created = await client.generate(
    'bfl/flux-schnell',
    { generation_prompt: 'a seal' },
    { idempotencyKey: 'job:unit-test-1' },
  );

  assert.equal(calls, 1);
  assert.equal(created.data.generation_id, 'gen_123');
  assert.equal(created.idempotency_replayed, true);
});

test('non-idempotent POST network failures are not retried', async () => {
  let calls = 0;

  globalThis.fetch = async () => {
    calls += 1;
    throw new TypeError('fetch failed');
  };

  const client = new BabySea({
    apiKey: 'bye_test',
    baseUrl: 'https://unit.test',
    maxRetries: 2,
  });

  await assert.rejects(
    () => client.generate('bfl/flux-schnell', { generation_prompt: 'a seal' }),
    (error) => {
      assert.ok(error instanceof BabySeaNetworkError);
      assert.equal(error.retryable, false);
      assert.equal(error.attempts, 1);
      return true;
    },
  );
  assert.equal(calls, 1);
});

test('idempotent POST network failures can be retried safely', async () => {
  Math.random = () => 0;
  let calls = 0;

  globalThis.fetch = async () => {
    calls += 1;
    if (calls === 1) {
      throw new TypeError('fetch failed');
    }
    return jsonResponse({
      data: { generation_id: 'gen_retry' },
      request_id: 'req_retry',
    });
  };

  const client = new BabySea({
    apiKey: 'bye_test',
    baseUrl: 'https://unit.test',
    maxRetries: 1,
  });

  const created = await client.generate(
    'bfl/flux-schnell',
    { generation_prompt: 'a seal' },
    { idempotencyKey: 'job:retry-safe' },
  );

  assert.equal(calls, 2);
  assert.equal(created.data.generation_id, 'gen_retry');
});

test('malformed JSON API errors are normalized without becoming network errors', async () => {
  let calls = 0;

  globalThis.fetch = async () => {
    calls += 1;
    return jsonResponse(
      { message: 'upstream returned an unexpected shape' },
      { status: 502, statusText: 'Bad Gateway' },
    );
  };

  const client = new BabySea({
    apiKey: 'bye_test',
    baseUrl: 'https://unit.test',
    maxRetries: 0,
  });

  await assert.rejects(
    () => client.library.models(),
    (error) => {
      assert.ok(error instanceof BabySeaRetryError);
      assert.ok(error.lastError instanceof BabySeaError);
      assert.equal(error.lastError.status, 502);
      assert.equal(error.lastError.code, 'HTTP_502');
      assert.equal(error.lastError.type, 'api_error');
      assert.equal(error.lastError.message, 'HTTP 502');
      assert.equal(error.lastError.retryable, true);
      return true;
    },
  );
  assert.equal(calls, 1);
});
