import React, { createContext, useContext, useEffect, useRef } from "react"
import { ChildrenProps } from "../libs/react.js"
import { Core, Params } from "../mods/core.js"
import { ParamsContext, useParamsProvider } from "./params.js"

export const CoreContext =
  createContext<Core | undefined>(undefined)

export function useCore() {
  return useContext(CoreContext)!
}

export function useCoreProvider() {
  const coreRef = useRef<Core>()

  if (!coreRef.current)
    coreRef.current = new Core()

  useEffect(() => () => {
    coreRef.current.unmount()
  }, [])

  return coreRef.current
}

export function CoreProvider(props: ChildrenProps & Params) {
  const { children, ...current } = props

  const core = useCoreProvider()
  const params = useParamsProvider(current)

  return <CoreContext.Provider value={core}>
    <ParamsContext.Provider value={params}>
      {children}
    </ParamsContext.Provider>
  </CoreContext.Provider>
}