import { Query } from '../../types/query.js';

interface RetryOptions {
    init?: number;
    base?: number;
    max?: number;
}
/**
 * Retry request on error using exponential backoff
 * @see useInterval for interval based requests
 * @param query
 * @param options
 * @param options.init Initial timeout to be multiplied (in milliseconds)
 * @param options.base Exponent base (2 means the next timeout will be 2 times longer)
 * @param options.max Maximum count (3 means do not retry after 3 retries)
 * @see https://en.wikipedia.org/wiki/Exponential_backoff
 * @see https://en.wikipedia.org/wiki/Geometric_progression
 */
declare function useRetry(query: Query, options?: RetryOptions): void;

export { RetryOptions, useRetry };