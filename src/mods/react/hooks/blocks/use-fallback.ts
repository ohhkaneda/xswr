import { Handle } from "mods/react/hooks/handles"
import { State } from "mods/types/state"

/**
 * Fallback to given data/error if there is no data/error
 * @example You got some data/error using SSR/ISR and want to display it on first render
 * @example You still want to display something even if the fetcher returned nothing
 * @param handle 
 * @param state 
 */
export function useFallback<D extends N = any, E = any, N = D, K = any>(
  handle: Handle<D, E>,
  state?: State<D, E>
) {
  const { data, error } = handle

  if (data !== undefined) return
  if (error !== undefined) return
  Object.assign(handle, state)
}