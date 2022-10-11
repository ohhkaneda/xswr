import { Handle } from '../../types/handle.js';

/**
 * Do a request on mount and url change only if there is no data yet
 * @warning Will still try to fetch is there is an error
 * @param handle
 * @example You want to get some data once and share it in multiple components
 */
declare function useOnce(handle: Handle): void;

export { useOnce };
