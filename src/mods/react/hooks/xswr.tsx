import { useCore } from "mods/react/contexts/core"
import { useParams } from "mods/react/contexts/params"
import { Object } from "mods/types/object"
import { Schema } from "mods/types/schema"
import { useCallback } from "react"

export type Maker = <D = any, E = any, N = D, K = any, O extends Object<D, E, N, K> = Object<D, E, N, K>>(
  schema: Schema<D, E, N, K, O>, init?: boolean
) => O

export function useXSWR() {
  const core = useCore()
  const params = useParams()

  const make = useCallback<Maker>((schema, init) => {
    return schema.make(core, params, init)
  }, [core, params])

  return { core, params, make }
}