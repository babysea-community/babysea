import {
  BabySeaError,
  BabySeaGenerationFailedError,
  BabySeaGenerationTimeoutError,
  BabySeaNetworkError,
  BabySeaRetryError,
  BabySeaTimeoutError,
} from './errors';
import type {
  AccountData,
  ApiErrorBody,
  ApiResponse,
  BabySeaOptions,
  BabySeaRegion,
  BillingData,
  EstimateData,
  Generation,
  GenerationCancelData,
  GenerationData,
  GenerationDeleteData,
  GenerationListData,
  GenerationParams,
  HealthCacheData,
  HealthModelsData,
  HealthProvidersData,
  HealthStorageData,
  LibraryModelsData,
  LibraryProvidersData,
  PaginatedResponse,
  RateLimitInfo,
  StatusData,
  UsageData,
} from './types';
import { SDK_NAME, SDK_VERSION } from './version';

const API_BASE_DOMAIN = 'babysea.ai';

const REGION_URLS: Record<BabySeaRegion, string> = {
  us: `https://api.us.${API_BASE_DOMAIN}`,
  eu: `https://api.eu.${API_BASE_DOMAIN}`,
  jp: `https://api.jp.${API_BASE_DOMAIN}`,
};

const DEFAULT_BASE_URL = REGION_URLS.us;
const DEFAULT_TIMEOUT = 30_000;
const DEFAULT_MAX_RETRIES = 2;

/** Defaults for `waitForGeneration()` polling. */
const DEFAULT_WAIT_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const DEFAULT_WAIT_INTERVAL_MS = 2_000;
const MIN_WAIT_INTERVAL_MS = 500;

/**
 * Coarse runtime classification used in SDK telemetry headers.
 * Detection is best-effort and never throws.
 */
type SdkRuntime =
  | 'node'
  | 'deno'
  | 'bun'
  | 'workerd'
  | 'edge'
  | 'browser'
  | 'unknown';

function detectRuntime(): { runtime: SdkRuntime; version?: string } {
  const g = globalThis as Record<string, unknown>;

  // Bun
  const bun = g.Bun as { version?: string } | undefined;
  if (bun) return { runtime: 'bun', version: bun.version };

  // Deno
  const deno = g.Deno as { version?: { deno?: string } } | undefined;
  if (deno) return { runtime: 'deno', version: deno.version?.deno };

  // Cloudflare Workers (workerd)
  const navigatorRef = g.navigator as { userAgent?: string } | undefined;
  if (navigatorRef?.userAgent === 'Cloudflare-Workers') {
    return { runtime: 'workerd' };
  }

  // Generic edge runtimes (Vercel Edge, Netlify Edge)
  if (typeof g.EdgeRuntime === 'string' || g.EdgeRuntime !== undefined) {
    return { runtime: 'edge' };
  }

  // Node.js
  const proc = g.process as
    | { versions?: { node?: string; bun?: string } }
    | undefined;
  if (proc?.versions?.node) {
    return { runtime: 'node', version: proc.versions.node };
  }

  // Browser
  if (typeof g.window !== 'undefined' && typeof g.document !== 'undefined') {
    return { runtime: 'browser' };
  }

  return { runtime: 'unknown' };
}

const RUNTIME_INFO = detectRuntime();
const SDK_USER_AGENT = `${SDK_NAME}/${SDK_VERSION} (${RUNTIME_INFO.runtime}${
  RUNTIME_INFO.version ? `/${RUNTIME_INFO.version}` : ''
})`;
const IS_BROWSER = RUNTIME_INFO.runtime === 'browser';

/**
 * BabySea API client
 *
 * @example
 * ```ts
 * import { BabySea } from 'babysea';
 *
 * // Explicit US region
 * const client = new BabySea({ apiKey: 'bye_...', region: 'us' });
 *
 * // EU region
 * const eu = new BabySea({ apiKey: 'bye_...', region: 'eu' });
 *
 * // Generate an image
 * const result = await client.generate('bfl/flux-schnell', {
 *   generation_prompt: 'A baby seal plays in the Arctic',
 * });
 *
 * console.log(result.data.generation_id);
 * ```
 */
export class BabySea {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly maxRetries: number;

  /** HEALTH */
  readonly health: {
    /**
     * Provider health
     *
     * `GET /v1/health/inference/providers`
     */
    providers: () => Promise<ApiResponse<HealthProvidersData>>;

    /**
     * Model health
     *
     * `GET /v1/health/inference/models`
     */
    models: () => Promise<ApiResponse<HealthModelsData>>;

    /**
     * Storage health
     *
     * `GET /v1/health/storage`
     */
    storage: () => Promise<ApiResponse<HealthStorageData>>;

    /**
     * Cache health
     *
     * `GET /v1/health/cache`
     */
    cache: () => Promise<ApiResponse<HealthCacheData>>;
  };

  /** LIBRARY */
  readonly library: {
    /**
     * Available providers
     *
     * `GET /v1/library/providers`
     */
    providers: () => Promise<ApiResponse<LibraryProvidersData>>;

    /**
     * Available models
     *
     * `GET /v1/library/models`
     */
    models: () => Promise<ApiResponse<LibraryModelsData>>;
  };

  constructor(options: BabySeaOptions) {
    if (!options.apiKey) {
      throw new Error(
        `BabySea: apiKey is required. Get one at https://${REGION_URLS.us.replace('https://api.', '')}`,
      );
    }

    this.apiKey = options.apiKey;
    this.baseUrl = (
      options.baseUrl ??
      (options.region ? REGION_URLS[options.region] : undefined) ??
      DEFAULT_BASE_URL
    ).replace(/\/+$/, '');
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;

    // Bind LIBRARY namespace methods
    this.library = {
      providers: () =>
        this.request<LibraryProvidersData>('GET', '/v1/library/providers'),
      models: () =>
        this.request<LibraryModelsData>('GET', '/v1/library/models'),
    };

    // Bind HEALTH namespace methods
    this.health = {
      providers: () =>
        this.request<HealthProvidersData>(
          'GET',
          '/v1/health/inference/providers',
        ),
      models: () =>
        this.request<HealthModelsData>('GET', '/v1/health/inference/models'),
      storage: () =>
        this.request<HealthStorageData>('GET', '/v1/health/storage'),
      cache: () => this.request<HealthCacheData>('GET', '/v1/health/cache'),
    };
  }

  // ─── Public API methods ───

  /**
   * API status
   *
   * `GET /v1/status`
   */
  async status(): Promise<ApiResponse<StatusData>> {
    return this.request<StatusData>('GET', '/v1/status');
  }

  /**
   * API usage
   *
   * `GET /v1/usage`
   *
   * @param days - Lookback window in days (1-90, default 30).
   */
  async usage(days?: number): Promise<ApiResponse<UsageData>> {
    const params = days !== undefined ? `?days=${days}` : '';
    return this.request<UsageData>('GET', `/v1/usage${params}`);
  }

  /**
   * User account
   *
   * `GET /v1/user/account`
   */
  async account(): Promise<ApiResponse<AccountData>> {
    return this.request<AccountData>('GET', '/v1/user/account');
  }

  /**
   * User billing
   *
   * `GET /v1/user/billing`
   */
  async billing(): Promise<ApiResponse<BillingData>> {
    return this.request<BillingData>('GET', '/v1/user/billing');
  }

  /**
   * Cost estimate
   *
   * `GET /v1/estimate/{model_identifier}`
   *
   * @param modelIdentifier - Model identifier (e.g. `"bfl/flux-schnell"`).
   * @param options.count - Number of generations to estimate (default 1).
   * @param options.duration - Duration in seconds (video models only).
   * @param options.resolution - Output resolution, e.g. `"1080p"` (resolution-priced video models only).
   * @param options.audio - Whether to include audio pricing (audio-priced video models only).
   */
  async estimate(
    modelIdentifier: string,
    options?:
      | number
      | {
          count?: number;
          duration?: number;
          resolution?: string;
          audio?: boolean;
        },
  ): Promise<ApiResponse<EstimateData>> {
    const params = new URLSearchParams();

    if (typeof options === 'number') {
      // Backwards-compatible: estimate(model, 5)
      params.set('count', String(options));
    } else if (options) {
      if (options.count !== undefined) {
        params.set('count', String(options.count));
      }

      if (options.duration !== undefined) {
        params.set('duration', String(options.duration));
      }

      if (options.resolution !== undefined) {
        params.set('resolution', options.resolution);
      }

      if (options.audio !== undefined) {
        params.set('audio', String(options.audio));
      }
    }

    const qs = params.toString();
    return this.request<EstimateData>(
      'GET',
      `/v1/estimate/${modelIdentifier}${qs ? `?${qs}` : ''}`,
    );
  }

  /**
   * Cancel generation
   *
   * `POST /v1/content/generation/cancel/{generation_id}`
   *
   * @param generationId - The `generation_id` of the generation to cancel.
   */
  async cancelGeneration(
    generationId: string,
  ): Promise<ApiResponse<GenerationCancelData>> {
    return this.request<GenerationCancelData>(
      'POST',
      `/v1/content/generation/cancel/${generationId}`,
    );
  }

  /**
   * Delete generation
   *
   * `DELETE /v1/content/{generation_id}`
   *
   * @param generationId - The `generation_id` of the generation to delete.
   */
  async deleteGeneration(
    generationId: string,
  ): Promise<ApiResponse<GenerationDeleteData>> {
    return this.request<GenerationDeleteData>(
      'DELETE',
      `/v1/content/${generationId}`,
    );
  }

  /**
   * Content info
   *
   * `GET /v1/content/{generation_id}`
   *
   * @param generationId - The `generation_id` to retrieve.
   */
  async getGeneration(generationId: string): Promise<ApiResponse<Generation>> {
    return this.request<Generation>('GET', `/v1/content/${generationId}`);
  }

  /**
   * List content
   *
   * `GET /v1/content/list`
   *
   * @param options.limit - Page size (1-100, default 50).
   * @param options.offset - Offset (default 0).
   */
  async listGenerations(options?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<GenerationListData>> {
    const params = new URLSearchParams();

    if (options?.limit !== undefined) {
      params.set('limit', String(options.limit));
    }

    if (options?.offset !== undefined) {
      params.set('offset', String(options.offset));
    }

    const qs = params.toString();
    const path = `/v1/content/list${qs ? `?${qs}` : ''}`;

    return this.request<GenerationListData>('GET', path) as Promise<
      PaginatedResponse<GenerationListData>
    >;
  }

  /**
   * Generate image or video
   *
   * Automatically routes to the correct endpoint based on the parameters:
   * - If `generation_duration` is present ➜ `POST /v1/generate/video/{model_identifier}`
   * - Otherwise ➜ `POST /v1/generate/image/{model_identifier}`
   *
   * @param modelIdentifier - Model identifier (e.g. `"bfl/flux-schnell"`, `"google/veo-2"`).
   * @param params - Generation parameters. See {@link GenerationParams}.
   * @param options.idempotencyKey - Optional client-supplied key (1-255 chars,
   * `[A-Za-z0-9_-:.]`). Identical retries within 24h replay the original
   * response with `idempotency_replayed: true`. Same key with a different
   * request body returns `BSE2015`. Same key while the original is still
   * processing returns `BSE2016`. Recommended for production workloads.
   *
   * @example
   * ```ts
   * import { randomUUID } from 'node:crypto';
   *
   * // Image generation
   * await client.generate('bfl/flux-schnell', {
   *   generation_prompt: 'A baby seal plays in the Arctic',
   * });
   *
   * // Video generation
   * await client.generate('google/veo-2', {
   *   generation_prompt: 'A baby seal plays in the Arctic',
   *   generation_duration: 5,
   * });
   *
   * // Production: opt into idempotency for retry safety
   * const idempotencyKey = randomUUID();
   * const created = await client.generate(
   *   'bfl/flux-schnell',
   *   { generation_prompt: 'A baby seal plays in the Arctic' },
   *   { idempotencyKey },
   * );
   *
   * if (created.idempotency_replayed) {
   *   console.log('Server replayed the original response');
   * }
   * ```
   */
  async generate(
    modelIdentifier: string,
    params: GenerationParams,
    options?: { idempotencyKey?: string },
  ): Promise<ApiResponse<GenerationData>> {
    const route =
      'generation_duration' in params &&
      params.generation_duration !== undefined
        ? 'video'
        : 'image';
    return this.request<GenerationData>(
      'POST',
      `/v1/generate/${route}/${modelIdentifier}`,
      params,
      options?.idempotencyKey
        ? { 'Idempotency-Key': options.idempotencyKey }
        : undefined,
    );
  }

  /**
   * Poll a generation until it reaches a terminal state (`succeeded`,
   * `failed`, or `canceled`).
   *
   * Convenience wrapper over `getGeneration()`. Production workloads
   * should prefer webhooks; this helper exists for scripts, demos, and
   * synchronous app flows that don't have a webhook receiver.
   *
   * @param generationId - The `generation_id` returned from `generate()`.
   * @param options.timeout - Max wall-clock time to wait, in ms.
   * Default: 10 minutes. Throws `BabySeaGenerationTimeoutError` if exceeded.
   * @param options.interval - Polling interval in ms. Default: 2000.
   * Minimum 500ms (smaller values are clamped to avoid hammering the API).
   * @param options.signal - Optional `AbortSignal` to cancel the wait.
   *
   * @throws {BabySeaGenerationFailedError} when `generation_status` is `failed` or `canceled`.
   * @throws {BabySeaGenerationTimeoutError} when the deadline elapses.
   *
   * @example
   * ```ts
   * const created = await client.generate('bfl/flux-schnell', {
   *   generation_prompt: 'A baby seal plays in the Arctic',
   * });
   *
   * const generation = await client.waitForGeneration(
   *   created.data.generation_id,
   *   { timeout: 120_000, interval: 2_000 },
   * );
   *
   * console.log(generation.data.generation_output_file);
   * ```
   */
  async waitForGeneration(
    generationId: string,
    options?: {
      timeout?: number;
      interval?: number;
      signal?: AbortSignal;
    },
  ): Promise<ApiResponse<Generation>> {
    const timeoutMs = options?.timeout ?? DEFAULT_WAIT_TIMEOUT_MS;
    const intervalMs = Math.max(
      MIN_WAIT_INTERVAL_MS,
      options?.interval ?? DEFAULT_WAIT_INTERVAL_MS,
    );
    const deadline = Date.now() + timeoutMs;
    const signal = options?.signal;

    while (true) {
      if (signal?.aborted) {
        throw signal.reason instanceof Error
          ? signal.reason
          : new Error('waitForGeneration aborted');
      }

      const last = await this.getGeneration(generationId);
      const status = last.data.generation_status;

      if (status === 'succeeded') {
        return last;
      }

      if (status === 'failed' || status === 'canceled') {
        throw new BabySeaGenerationFailedError(last.data);
      }

      if (Date.now() + intervalMs >= deadline) {
        throw new BabySeaGenerationTimeoutError(
          generationId,
          timeoutMs,
          status,
        );
      }

      await sleep(intervalMs);
    }
  }

  /**
   * Create a generation and wait for it to reach a terminal state in a
   * single call. Sugar over `generate()` + `waitForGeneration()`.
   *
   * Useful for CLIs, demos, and one-shot scripts. Production workloads
   * with sustained throughput should prefer the async pattern
   * (`generate()` + webhook).
   *
   * @example
   * ```ts
   * const result = await client.generateAndWait('bfl/flux-schnell', {
   *   generation_prompt: 'A baby seal plays in the Arctic',
   * });
   *
   * console.log(result.data.generation_output_file);
   * ```
   */
  async generateAndWait(
    modelIdentifier: string,
    params: GenerationParams,
    options?: {
      idempotencyKey?: string;
      timeout?: number;
      interval?: number;
      signal?: AbortSignal;
    },
  ): Promise<ApiResponse<Generation>> {
    const created = await this.generate(modelIdentifier, params, {
      idempotencyKey: options?.idempotencyKey,
    });

    if (
      'generation_status' in created.data &&
      created.data.generation_status === 'canceled'
    ) {
      // Edge case: idempotency replay of a canceled record. Surface the
      // current full generation record without polling.
      return this.getGeneration(created.data.generation_id);
    }

    return this.waitForGeneration(created.data.generation_id, {
      timeout: options?.timeout,
      interval: options?.interval,
      signal: options?.signal,
    });
  }

  // ─── HTTP Layer ───

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    extraHeaders?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    let lastError: BabySeaError | undefined;
    const maxAttempts = this.maxRetries + 1;
    // POST/PUT/PATCH are only safe to retry on network failure when the
    // caller opted into idempotency. GET/DELETE/HEAD are always safe.
    const isIdempotentMethod =
      method === 'GET' || method === 'DELETE' || method === 'HEAD';
    const hasIdempotencyKey = Boolean(extraHeaders?.['Idempotency-Key']);
    const canRetryNetwork = isIdempotentMethod || hasIdempotencyKey;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await this.doRequest<T>(method, path, body, extraHeaders);
      } catch (err) {
        // Structured retryable API error (5xx, 429, etc.)
        if (err instanceof BabySeaError && err.retryable) {
          lastError = err;

          if (attempt >= maxAttempts) {
            throw new BabySeaRetryError(err, maxAttempts);
          }

          // If we got Retry-After, use that; otherwise exponential backoff
          const waitMs = err.rateLimit?.retryAfter
            ? err.rateLimit.retryAfter * 1000
            : computeBackoffMs(attempt);

          await sleep(waitMs);
          continue;
        }

        // Network-level transient failure (DNS, ECONNRESET, fetch TypeError,
        // socket hangup, etc.). Only retry when it's safe to do so.
        if (canRetryNetwork && isRetryableNetworkError(err)) {
          if (attempt >= maxAttempts) {
            throw new BabySeaNetworkError(err, maxAttempts, true);
          }

          await sleep(computeBackoffMs(attempt));
          continue;
        }

        // Any remaining transport-layer error (non-retryable network failure
        // on a non-idempotent method, unknown fetch error, etc.) is wrapped
        // so consumers get a single typed error family. BabySeaError and
        // BabySeaTimeoutError are passed through unchanged.
        if (err instanceof BabySeaError || err instanceof BabySeaTimeoutError) {
          throw err;
        }

        if (isRetryableNetworkError(err)) {
          throw new BabySeaNetworkError(err, attempt, false);
        }

        throw err;
      }
    }

    // Should not reach here, but safety net
    throw new BabySeaRetryError(lastError!, maxAttempts);
  }

  private async doRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    extraHeaders?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${path}`;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: 'application/json',
      'X-BabySea-SDK-Name': SDK_NAME,
      'X-BabySea-SDK-Version': SDK_VERSION,
      'X-BabySea-SDK-Runtime': RUNTIME_INFO.runtime,
      ...(RUNTIME_INFO.version
        ? { 'X-BabySea-SDK-Runtime-Version': RUNTIME_INFO.version }
        : {}),
      ...extraHeaders,
    };

    // `User-Agent` is a forbidden header in the browser fetch spec and will
    // be stripped (with a console warning) in user agents. Set it everywhere
    // else so server logs/observability can see SDK + runtime info.
    if (!IS_BROWSER) {
      headers['User-Agent'] = SDK_USER_AGENT;
    }

    if (body) {
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const rateLimit = parseRateLimitHeaders(response.headers);

      if (!response.ok) {
        let errorBody: ApiErrorBody;

        try {
          errorBody = (await response.json()) as ApiErrorBody;
        } catch {
          // Non-JSON error response (e.g. Cloudflare 502 HTML page)
          errorBody = {
            status: 'error',
            error: {
              code: `HTTP_${response.status}`,
              type: 'api_error',
              message: `HTTP ${response.status} ${response.statusText}`,
              retryable: response.status >= 500,
            },
          };
        }

        throw new BabySeaError(response.status, errorBody, rateLimit);
      }

      const parsed = (await response.json()) as ApiResponse<T>;

      // Surface server-side idempotency replay flag from response header
      if (response.headers.get('idempotency-replayed') === 'true') {
        parsed.idempotency_replayed = true;
      }

      return parsed;
    } catch (err) {
      if (err instanceof BabySeaError) {
        throw err;
      }

      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new BabySeaTimeoutError(this.timeout);
      }

      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

// ─── Helpers ───

function parseRateLimitHeaders(headers: Headers): RateLimitInfo | undefined {
  const limit = headers.get('X-RateLimit-Limit');

  if (!limit) {
    return undefined;
  }

  return {
    limit: parseInt(limit, 10),
    remaining: parseInt(headers.get('X-RateLimit-Remaining') ?? '0', 10),
    reset: parseInt(headers.get('X-RateLimit-Reset') ?? '0', 10),
    retryAfter: headers.has('Retry-After')
      ? parseInt(headers.get('Retry-After')!, 10)
      : undefined,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Exponential backoff with full jitter, capped at 30s.
 * Spreading retries with jitter prevents thundering-herd when many
 * clients retry the same upstream incident at the same time.
 */
function computeBackoffMs(attempt: number): number {
  const base = Math.min(1000 * Math.pow(2, attempt - 1), 30_000);
  return Math.floor(Math.random() * base);
}

/**
 * Detect transient network failures that are safe to retry on idempotent
 * requests. We deliberately do NOT retry application errors, SSL failures,
 * or `AbortError` (those bubble up as `BabySeaTimeoutError`).
 */
function isRetryableNetworkError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;

  // `BabySeaTimeoutError` is intentionally not retried here - the caller
  // configured an explicit timeout and we should respect it.
  if (err.name === 'BabySeaTimeoutError') return false;
  if (err.name === 'BabySeaError') return false;

  // `fetch()` throws `TypeError` for network-level failures across Node,
  // Undici, browsers, Workers, and Deno (e.g. DNS, connection reset,
  // socket hangup, "fetch failed").
  if (err.name === 'TypeError') return true;

  // Node/Undici expose a `code` property for socket-level errors.
  const code = (err as { code?: string }).code;
  if (code) {
    return RETRYABLE_NETWORK_CODES.has(code);
  }

  return false;
}

const RETRYABLE_NETWORK_CODES = new Set<string>([
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'EAI_AGAIN',
  'ENETUNREACH',
  'ENETDOWN',
  'EHOSTUNREACH',
  'EPIPE',
  'UND_ERR_SOCKET',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
]);
