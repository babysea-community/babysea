import type { ApiErrorBody, Generation, RateLimitInfo } from './types';

/**
 * Error thrown when the BabySea API returns a non-2xx response.
 */
export class BabySeaError extends Error {
  /** HTTP status code. */
  readonly status: number;

  /** Structured error body from the API. */
  readonly body: ApiErrorBody;

  /** BSE error code (e.g. `BSE1004`). */
  readonly code: string;

  /** Error type (e.g. `insufficient_credits`). */
  readonly type: string;

  /** Whether this request can be retried. */
  readonly retryable: boolean;

  /** Rate limit info when available (always present on 429). */
  readonly rateLimit?: RateLimitInfo;

  /** Unique request ID for support/debugging. */
  readonly requestId?: string;

  constructor(status: number, body: ApiErrorBody, rateLimit?: RateLimitInfo) {
    const safeBody = normalizeApiErrorBody(status, body);

    super(safeBody.error.message);
    this.name = 'BabySeaError';
    this.status = status;
    this.body = safeBody;
    this.code = safeBody.error.code;
    this.type = safeBody.error.type;
    this.retryable = safeBody.error.retryable;
    this.rateLimit = rateLimit;
    this.requestId = safeBody.request_id ?? undefined;
  }
}

function normalizeApiErrorBody(
  status: number,
  body: ApiErrorBody,
): ApiErrorBody {
  const record: Record<string, unknown> = isRecord(body) ? body : {};
  const error: Record<string, unknown> = isRecord(record.error)
    ? record.error
    : {};
  const retryable =
    typeof error.retryable === 'boolean'
      ? error.retryable
      : status === 429 || status >= 500;

  return {
    status: 'error',
    ...(typeof record.request_id === 'string'
      ? { request_id: record.request_id }
      : {}),
    error: {
      code:
        typeof error.code === 'string' && error.code
          ? error.code
          : `HTTP_${status}`,
      type:
        typeof error.type === 'string' && error.type ? error.type : 'api_error',
      message:
        typeof error.message === 'string' && error.message
          ? error.message
          : `HTTP ${status}`,
      retryable,
      ...(isRecord(error.details) ? { details: error.details } : {}),
      ...(Array.isArray(error.provider_errors)
        ? { provider_errors: error.provider_errors }
        : {}),
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Error thrown when a request times out.
 */
export class BabySeaTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Request timed out after ${timeoutMs}ms`);
    this.name = 'BabySeaTimeoutError';
  }
}

/**
 * Error thrown when all retries are exhausted.
 */
export class BabySeaRetryError extends Error {
  /** The last error that triggered this retry failure. */
  readonly lastError: BabySeaError;

  /** Number of attempts made. */
  readonly attempts: number;

  constructor(lastError: BabySeaError, attempts: number) {
    super(`All ${attempts} attempts failed. Last error: ${lastError.message}`);
    this.name = 'BabySeaRetryError';
    this.lastError = lastError;
    this.attempts = attempts;
  }
}

/**
 * Error thrown when the request fails before reaching the BabySea API
 * (DNS resolution failure, TCP reset, socket hang-up, undici socket error,
 * TLS handshake failure, generic `fetch` `TypeError`, etc.).
 *
 * Wraps the underlying transport error in `cause` so the original stack
 * is still available for debugging while presenting a single typed
 * error family to consumers.
 */
export class BabySeaNetworkError extends Error {
  /** Underlying transport error from `fetch`/runtime. */
  readonly cause: unknown;

  /**
   * Whether the failure mode is generally retryable (transient socket
   * errors, DNS hiccups, etc.). Always `true` for instances thrown by
   * the SDK, since non-retryable errors bubble up untouched.
   */
  readonly retryable: boolean;

  /** Number of attempts the SDK made before giving up. */
  readonly attempts: number;

  constructor(cause: unknown, attempts: number, retryable = true) {
    const message =
      cause instanceof Error ? cause.message : 'Network request failed';
    super(`Network error after ${attempts} attempt(s): ${message}`);
    this.name = 'BabySeaNetworkError';
    this.cause = cause;
    this.attempts = attempts;
    this.retryable = retryable;
  }
}

/**
 * Error thrown by `waitForGeneration()`/`generateAndWait()` when the
 * underlying generation reaches a terminal failure state (`failed` or
 * `canceled`). The full {@link Generation} record is attached so callers
 * can inspect `generation_error_code`, timing, and partial output.
 */
export class BabySeaGenerationFailedError extends Error {
  readonly generation: Generation;
  readonly generation_id: string;
  readonly generation_status: 'failed' | 'canceled';
  readonly generation_error_code?: string;

  constructor(generation: Generation) {
    const message =
      generation.generation_error ??
      `Generation ${generation.generation_id} ${generation.generation_status}`;
    super(message);
    this.name = 'BabySeaGenerationFailedError';
    this.generation = generation;
    this.generation_id = generation.generation_id;
    this.generation_status = generation.generation_status as
      | 'failed'
      | 'canceled';
    this.generation_error_code = generation.generation_error_code;
  }
}

/**
 * Error thrown by `waitForGeneration()` when the polling deadline is
 * reached before the generation enters a terminal state.
 */
export class BabySeaGenerationTimeoutError extends Error {
  readonly generation_id: string;
  readonly timeoutMs: number;
  readonly lastStatus: Generation['generation_status'];

  constructor(
    generationId: string,
    timeoutMs: number,
    lastStatus: Generation['generation_status'],
  ) {
    super(
      `Timed out after ${timeoutMs}ms waiting for generation ${generationId} (last status: ${lastStatus})`,
    );
    this.name = 'BabySeaGenerationTimeoutError';
    this.generation_id = generationId;
    this.timeoutMs = timeoutMs;
    this.lastStatus = lastStatus;
  }
}
