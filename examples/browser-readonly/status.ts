// Copy this file into a browser app that has `babysea` installed.
import { BabySea } from 'babysea';

const client = new BabySea({
  apiKey: window.BABYSEA_GENERATION_READ_KEY,
  region: 'us',
});

export async function renderGenerationStatus(generationId: string) {
  const generation = await client.getGeneration(generationId);
  const status = generation.data.generation_status;

  const statusNode = document.querySelector('[data-generation-status]');
  if (statusNode) {
    statusNode.textContent = status ?? 'unknown';
  }
}

declare global {
  interface Window {
    BABYSEA_GENERATION_READ_KEY: string;
  }
}
