import { Handle } from "mods/react/hooks/handles"
import { useEffect } from "react"

/**
 * Show handle in console when it changes
 * @param handle 
 */
export function useDebug<D extends N = any, E = any, N = D, K = any>(
  handle: Handle<D, E>,
  label: string
) {
  const { data, error, time, } = handle

  useEffect(() => {
    console.debug(label, handle)
  }, [data, error, time])
}