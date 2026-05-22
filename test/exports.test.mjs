import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

test('ESM exports expose client and webhook helpers', async () => {
  const sdk = await import('../dist/index.js');
  const webhooks = await import('../dist/webhooks.js');

  assert.equal(typeof sdk.BabySea, 'function');
  assert.equal(typeof sdk.BabySeaError, 'function');
  assert.equal(typeof webhooks.verifyWebhook, 'function');
});

test('CommonJS exports expose client and webhook helpers', () => {
  const require = createRequire(import.meta.url);
  const sdk = require('../dist/index.cjs');
  const webhooks = require('../dist/webhooks.cjs');

  assert.equal(typeof sdk.BabySea, 'function');
  assert.equal(typeof sdk.BabySeaError, 'function');
  assert.equal(typeof webhooks.verifyWebhook, 'function');
});
