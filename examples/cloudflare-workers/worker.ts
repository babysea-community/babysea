// Copy this file into a Cloudflare Workers project that has `babysea` installed.
import { BabySea } from 'babysea';

export interface Env {
  BABYSEA_API_KEY: string;
}

const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9_.:-]{1,255}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidIdempotencyKey(value: unknown): value is string {
  return typeof value === 'string' && IDEMPOTENCY_KEY_PATTERN.test(value);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return Response.json({ error: 'invalid_json' }, { status: 400 });
    }

    if (!isRecord(payload)) {
      return Response.json({ error: 'invalid_body' }, { status: 400 });
    }

    const prompt = payload.prompt;
    const operationId = payload.operationId;
    const idempotencyKey =
      request.headers.get('Idempotency-Key') ?? operationId;

    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return Response.json({ error: 'prompt_required' }, { status: 400 });
    }

    if (!isValidIdempotencyKey(idempotencyKey)) {
      return Response.json(
        { error: 'valid_idempotency_key_required' },
        { status: 400 },
      );
    }

    const client = new BabySea({
      apiKey: env.BABYSEA_API_KEY,
      region: 'us',
    });

    const created = await client.generate(
      'bfl/flux-schnell',
      {
        generation_prompt: prompt,
        generation_provider_order: 'fastest',
      },
      { idempotencyKey },
    );

    return Response.json({ generationId: created.data.generation_id });
  },
};
