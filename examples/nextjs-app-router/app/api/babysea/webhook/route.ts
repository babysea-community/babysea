// Copy this file into a Next.js app that has `babysea` installed.
import {
  isGenerationCompleted,
  isGenerationFailed,
  verifyWebhook,
} from 'babysea/webhooks';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('X-BabySea-Signature') ?? '';

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
    await saveGenerationOutput(
      payload.webhook_data.generation_id,
      payload.webhook_data.generation_output_file ?? [],
    );
  }

  if (isGenerationFailed(payload)) {
    await markGenerationFailed(
      payload.webhook_data.generation_id,
      payload.webhook_data.generation_error ?? 'generation_failed',
    );
  }

  return new Response('OK');
}

async function saveGenerationOutput(generationId: string, urls: string[]) {
  console.log('save generation output', { generationId, urls });
}

async function markGenerationFailed(generationId: string, reason: string) {
  console.log('mark generation failed', { generationId, reason });
}
