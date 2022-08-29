import React, { createContext, useContext, useRef } from "react"
import { ChildrenProps } from "../libs/react.js"
import { Params } from "../mods/core.js"

export const ParamsContext =
  createContext<Params | undefined>(undefined)

export function useParams() {
  return useContext(ParamsContext)!
}

export function useParamsProvider(current: Params) {
  const parent = useParams()

  const paramsRef = useRef<Params>()

  if (!paramsRef.current)
    paramsRef.current = { ...parent, ...current }

  return paramsRef.current
}

export function ParamsProvider(props: ChildrenProps & Params) {
  const { children, ...current } = props

  const params = useParamsProvider(current)

  return <ParamsContext.Provider value={params}>
    {children}
  </ParamsContext.Provider>
}