declare const process: {
  env: Record<string, string | undefined>;
};

declare module 'babysea' {
  export class BabySea {
    constructor(options: {
      apiKey: string;
      maxRetries?: number;
      region?: 'us' | 'eu' | 'jp';
    });

    generate(
      model: string,
      params: Record<string, unknown>,
      options?: { idempotencyKey?: string },
    ): Promise<{
      data: { generation_id: string };
      request_id: string;
    }>;

    getGeneration(generationId: string): Promise<{
      data: { generation_status?: string };
    }>;
  }

  export class BabySeaRetryError extends Error {
    attempts: number;
    lastError?: { requestId?: string };
  }

  export class BabySeaNetworkError extends Error {
    attempts: number;
  }
}

declare module 'babysea/webhooks' {
  export function verifyWebhook(
    rawBody: string,
    signature: string,
    secret: string,
  ): Promise<{
    webhook_data: {
      generation_error?: string;
      generation_id: string;
      generation_output_file?: string[];
    };
  }>;

  export function isGenerationCompleted(payload: unknown): payload is {
    webhook_data: { generation_id: string; generation_output_file?: string[] };
  };

  export function isGenerationFailed(payload: unknown): payload is {
    webhook_data: { generation_error?: string; generation_id: string };
  };
}
