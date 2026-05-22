import assert from 'node:assert/strict';
import { test } from 'node:test';

import { isGenerationCompleted, verifyWebhook } from '../dist/webhooks.js';

test('verifyWebhook validates HMAC signatures and narrows completed events', async () => {
  const secret = 'whsec_unit_test';
  const rawBody = JSON.stringify({
    webhook_event: 'generation.completed',
    webhook_data: {
      generation_id: 'gen_123',
      generation_status: 'succeeded',
    },
  });
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = `t=${timestamp},v1=${await hmacSha256Hex(secret, `${timestamp}.${rawBody}`)}`;

  const payload = await verifyWebhook(rawBody, signature, secret);

  assert.equal(payload.webhook_event, 'generation.completed');
  assert.equal(isGenerationCompleted(payload), true);
});

test('verifyWebhook rejects invalid signatures', async () => {
  const rawBody = JSON.stringify({
    webhook_event: 'webhook.test',
    webhook_data: {},
  });
  const timestamp = Math.floor(Date.now() / 1000);
  const invalidDigest = '0'.repeat(64);

  await assert.rejects(
    () =>
      verifyWebhook(
        rawBody,
        `t=${timestamp},v1=${invalidDigest}`,
        'whsec_unit_test',
      ),
    /Invalid webhook signature/,
  );
});

/**
 * @param {string} key
 * @param {string} message
 */
async function hmacSha256Hex(key, message) {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(message),
  );
  return Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}
