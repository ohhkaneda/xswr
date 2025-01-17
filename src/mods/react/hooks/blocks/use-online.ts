import { Query } from "mods/react/types/query.js"
import { useEffect } from "react"

/**
 * Do a request when the browser is online
 * @param query 
 */
export function useOnline<K, D, F>(query: Query<K, D, F>) {
  const { ready, fetch } = query

  useEffect(() => {
    if (!ready)
      return

    const f = () => fetch().then(r => r.ignore())

    addEventListener("online", f)
    return () => removeEventListener("online", f)
  }, [ready, fetch])
}