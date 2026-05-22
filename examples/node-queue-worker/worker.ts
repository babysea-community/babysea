// Copy this file into a Node worker project that has `babysea` installed.
import { BabySea, BabySeaNetworkError, BabySeaRetryError } from 'babysea';

interface GenerationJob {
  id: string;
  model: string;
  prompt: string;
}

const client = new BabySea({
  apiKey: process.env.BABYSEA_API_KEY!,
  region: 'us',
  maxRetries: 2,
});

export async function handleGenerationJob(job: GenerationJob) {
  try {
    const created = await client.generate(
      job.model,
      {
        generation_prompt: job.prompt,
        generation_provider_order: 'fastest',
      },
      { idempotencyKey: job.id },
    );

    await markJobSubmitted(job.id, created.data.generation_id);
  } catch (error) {
    if (
      error instanceof BabySeaRetryError ||
      error instanceof BabySeaNetworkError
    ) {
      await retryLater(job.id, error.attempts);
      return;
    }

    throw error;
  }
}

async function markJobSubmitted(jobId: string, generationId: string) {
  console.log('job submitted', { jobId, generationId });
}

async function retryLater(jobId: string, attempts: number) {
  console.log('retry job later', { jobId, attempts });
}
