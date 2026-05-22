import type {
  CreditAlertWebhookPayload,
  GenerationWebhookPayload,
  WebhookPayload,
} from './types';

/**
 * Verify and parse BabySea webhook signatures (Stripe-style HMAC-SHA256).
 *
 * @example
 * ```ts
 * import { verifyWebhook } from 'babysea/webhooks';
 *
 * const payload = await verifyWebhook(rawBody, signatureHeader, secret);
 * console.log(payload.webhook_event); // 'generation.completed'
 * ```
 */

/**
 * Default tolerance window for replay protection (5 minutes).
 */
const DEFAULT_TOLERANCE_SECONDS = 300;

/**
 * Verify a BabySea webhook signature and return the parsed payload.
 *
 * @param rawBody - The raw request body as a string.
 * @param signature - The `X-BabySea-Signature` header value.
 * @param secret - Your webhook signing secret.
 * @param toleranceSeconds - Max age in seconds (default: 300 = 5 min).
 * @returns The parsed and verified webhook payload.
 * @throws {Error} If the signature is invalid, missing, or the timestamp is outside tolerance.
 */
export async function verifyWebhook(
  rawBody: string,
  signature: string,
  secret: string,
  toleranceSeconds: number = DEFAULT_TOLERANCE_SECONDS,
): Promise<WebhookPayload> {
  if (!signature) {
    throw new Error('Missing X-BabySea-Signature header');
  }

  if (!secret) {
    throw new Error('Missing webhook secret');
  }

  // Parse signature: t=<unix_ts>,v1=<hex_digest>
  const parts = signature.split(',');
  const timestampPart = parts.find((p) => p.startsWith('t='));
  const signaturePart = parts.find((p) => p.startsWith('v1='));

  if (!timestampPart || !signaturePart) {
    throw new Error(
      'Invalid signature format. Expected: t=<timestamp>,v1=<hex>',
    );
  }

  const timestamp = timestampPart.slice(2);
  const expectedHex = signaturePart.slice(3);

  if (!timestamp || !expectedHex) {
    throw new Error('Invalid signature: empty timestamp or digest');
  }

  // Replay protection
  const timestampNum = parseInt(timestamp, 10);

  if (isNaN(timestampNum)) {
    throw new Error('Invalid signature: non-numeric timestamp');
  }

  const now = Math.floor(Date.now() / 1000);
  const age = Math.abs(now - timestampNum);

  if (age > toleranceSeconds) {
    throw new Error(
      `Webhook timestamp too old: ${age}s (max ${toleranceSeconds}s)`,
    );
  }

  // Compute expected HMAC-SHA256
  const signedContent = `${timestamp}.${rawBody}`;
  const computedHex = await hmacSha256Hex(secret, signedContent);

  // Timing-safe comparison
  if (!timingSafeEqual(computedHex, expectedHex)) {
    throw new Error('Invalid webhook signature');
  }

  return JSON.parse(rawBody) as WebhookPayload;
}

// ─── Crypto Helpers (isomorphic) ───

async function hmacSha256Hex(key: string, message: string): Promise<string> {
  // Use Web Crypto API (works in Node 18+, Edge runtimes, browsers)
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const msgData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

// ─── Type Guards ───
//
// Narrow a `WebhookPayload` to a specific event variant so callers can
// access event-specific fields without manual discriminated-union checks.
//
// Status payloads (`generation.started`, `generation.completed`,
// `generation.failed`, `generation.canceled`, `webhook.test`) all share
// the `GenerationWebhookPayload` shape and are distinguished by their
// `webhook_event` discriminator and `webhook_data.generation_status`.

/**
 * Narrow to a generation lifecycle event (any of: `generation.started`,
 * `generation.completed`, `generation.failed`, `generation.canceled`,
 * `webhook.test`).
 */
export function isGenerationEvent(
  payload: WebhookPayload,
): payload is GenerationWebhookPayload {
  return payload.webhook_event !== 'credits.low_balance';
}

/** Narrow to `generation.started`. */
export function isGenerationStarted(
  payload: WebhookPayload,
): payload is GenerationWebhookPayload & {
  webhook_event: 'generation.started';
} {
  return payload.webhook_event === 'generation.started';
}

/** Narrow to `generation.completed`. */
export function isGenerationCompleted(
  payload: WebhookPayload,
): payload is GenerationWebhookPayload & {
  webhook_event: 'generation.completed';
} {
  return payload.webhook_event === 'generation.completed';
}

/** Narrow to `generation.failed`. */
export function isGenerationFailed(
  payload: WebhookPayload,
): payload is GenerationWebhookPayload & {
  webhook_event: 'generation.failed';
} {
  return payload.webhook_event === 'generation.failed';
}

/** Narrow to `generation.canceled`. */
export function isGenerationCanceled(
  payload: WebhookPayload,
): payload is GenerationWebhookPayload & {
  webhook_event: 'generation.canceled';
} {
  return payload.webhook_event === 'generation.canceled';
}

/** Narrow to `credits.low_balance`. */
export function isCreditLowBalance(
  payload: WebhookPayload,
): payload is CreditAlertWebhookPayload {
  return payload.webhook_event === 'credits.low_balance';
}

/** Narrow to `webhook.test` (delivery test event). */
export function isWebhookTest(
  payload: WebhookPayload,
): payload is GenerationWebhookPayload & { webhook_event: 'webhook.test' } {
  return payload.webhook_event === 'webhook.test';
}
