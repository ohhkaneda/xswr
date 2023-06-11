import { Option } from "@hazae41/option";
import { Err, Ok, Result } from "@hazae41/result";
import { MissingFetcherError, MissingKeyError, Times, TimesInit } from "index.js";
import { useRenderRef } from "libs/react/ref.js";
import { useCore } from "mods/react/contexts/core.js";
import { Query } from "mods/react/types/query.js";
import { Simple } from "mods/single/helper.js";
import { SimpleQuerySchema } from "mods/single/schema.js";
import { Fetcher } from "mods/types/fetcher.js";
import { Mutator } from "mods/types/mutator.js";
import { QueryParams } from "mods/types/params.js";
import { FetchedState, State } from "mods/types/state.js";
import { Updater } from "mods/types/updater.js";
import { DependencyList, useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useSchema<D, K, L extends DependencyList = []>(
  factory: (...deps: L) => SimpleQuerySchema<D, K> | undefined,
  deps: L
) {
  const schema = useMemo(() => {
    return factory(...deps)
  }, deps)

  const { key, fetcher, params } = schema ?? {}
  return useQuery<D, K>(key, fetcher, params)
}

/**
 * Query for a single resource
 */
export interface SingleQuery<D = unknown, K = unknown> extends Query<D, K> {
  /**
   * Optimistic update
   * @param updater Mutation function
   * @param aborter Custom AbortController
   */
  update(updater: Updater<D>, uparams?: Times, aborter?: AbortController): Promise<Result<State<D>, Error>>
}

/**
 * Single resource query factory
 * @param key Key (memoized)
 * @param fetcher Resource fetcher (unmemoized)
 * @param cparams Parameters (unmemoized)
 * @returns Single query
 */
export function useQuery<D = unknown, K = string>(
  key: K | undefined,
  fetcher: Fetcher<D, K> | undefined,
  params: QueryParams<D, K> = {},
): SingleQuery<D, K> {
  const core = useCore()

  const keyRef = useRenderRef(key)
  const fetcherRef = useRenderRef(fetcher)
  const paramsRef = useRenderRef({ ...core.params, ...params })

  const cacheKey = useMemo(() => {
    if (key === undefined)
      return undefined
    return Simple.getCacheKey<D, K>(key, paramsRef.current)
  }, [key])

  const [, setCounter] = useState(0)

  const stateRef = useRef<State<D>>()
  const aborterRef = useRef<AbortController>()

  useMemo(() => {
    if (cacheKey === undefined)
      return
    stateRef.current = core.getSync<D, K>(cacheKey, paramsRef.current).ok().inner
  }, [core, cacheKey])

  const setState = useCallback((state: State) => {
    stateRef.current = state as State<D>
    setCounter(c => c + 1)
  }, [])

  const setAborter = useCallback((aborter?: AbortController) => {
    aborterRef.current = aborter
    setCounter(c => c + 1)
  }, [])

  useEffect(() => {
    if (cacheKey === undefined)
      return
    if (stateRef.current !== undefined)
      return

    core.get<D, K>(cacheKey, paramsRef.current).then(setState)
  }, [core, cacheKey, params])

  useEffect(() => {
    if (cacheKey === undefined)
      return

    core.states.on(cacheKey, setState)
    core.aborters.on(cacheKey, setAborter)
    core.increment(cacheKey, paramsRef.current)

    return () => {
      core.decrement(cacheKey, paramsRef.current)
      core.states.off(cacheKey, setState)
      core.aborters.off(cacheKey, setAborter)
    }
  }, [core, cacheKey])

  const mutate = useCallback(async (mutator: Mutator<D>) => {
    if (cacheKey === undefined)
      return new Err(new MissingKeyError())

    stateRef.current = await core.mutate(cacheKey, mutator, paramsRef.current)

    return new Ok(stateRef.current)
  }, [core, cacheKey])

  const clear = useCallback(async () => {
    if (cacheKey === undefined)
      return new Err(new MissingKeyError())

    stateRef.current = await core.delete(cacheKey, paramsRef.current)

    return new Ok(stateRef.current)
  }, [core, cacheKey])

  const fetch = useCallback(async (aborter = new AbortController()) => {
    if (cacheKey === undefined)
      return new Err(new MissingKeyError())

    const key = keyRef.current
    const fetcher = fetcherRef.current
    const params = paramsRef.current

    if (key === undefined)
      return new Err(new MissingKeyError())
    if (fetcher === undefined)
      return new Err(new MissingFetcherError())

    return await core.fetchOrError(cacheKey, aborter, async () => {
      return await Simple.fetchOrError(core, key, cacheKey, fetcher, aborter, params)
    }).then(r => r.inspectSync(state => stateRef.current = state))
  }, [core, cacheKey])

  const refetch = useCallback(async (aborter = new AbortController()) => {
    if (cacheKey === undefined)
      return new Err(new MissingKeyError())

    const key = keyRef.current
    const fetcher = fetcherRef.current
    const params = paramsRef.current

    if (key === undefined)
      return new Err(new MissingKeyError())
    if (fetcher === undefined)
      return new Err(new MissingFetcherError())

    return await core.abortAndFetch(cacheKey, aborter, async () => {
      return await Simple.fetchOrError(core, key, cacheKey, fetcher, aborter, params)
    }).then(r => r.inspectSync(state => stateRef.current = state))
  }, [core, cacheKey])

  const update = useCallback(async (updater: Updater<D>, uparams: TimesInit = {}, aborter = new AbortController()) => {
    if (cacheKey === undefined)
      return new Err(new MissingKeyError())

    const key = keyRef.current
    const fetcher = fetcherRef.current
    const params = paramsRef.current

    if (key === undefined)
      return new Err(new MissingKeyError())
    if (fetcher === undefined)
      return new Err(new MissingFetcherError())

    const fparams = { ...params, ...uparams }

    return await Simple
      .update(core, key, cacheKey, fetcher, updater, aborter, fparams)
      .then(r => r.inspectSync(state => stateRef.current = state))
  }, [core, cacheKey])

  const suspend = useCallback(async (aborter = new AbortController()) => {
    if (cacheKey === undefined)
      return new Err(new MissingKeyError())

    const key = keyRef.current
    const fetcher = fetcherRef.current
    const params = paramsRef.current

    if (key === undefined)
      return new Err(new MissingKeyError())
    if (fetcher === undefined)
      return new Err(new MissingFetcherError())

    return await core.fetchOrError(cacheKey, aborter, async () => {
      return await Simple.fetchOrWait(core, key, cacheKey, fetcher, aborter, params)
    }).then(r => r.inspectSync(state => stateRef.current = state))
  }, [core, cacheKey])

  const state = stateRef.current
  const aborter = aborterRef.current

  function toDataAndError<D, F>(state?: FetchedState<D, F>) {
    const data = Option
      .from(state?.data)
      .mapSync(x => x.inner)

    const error = Option
      .from(state?.error)
      .mapSync(x => x.inner)

    return { data, error }
  }

  const { time, cooldown, expiration } = state?.current?.current ?? {}

  const ready = state !== undefined
  const optimistic = state?.fake !== undefined
  const fetching = aborter !== undefined

  const { data, error } = toDataAndError(state?.current)

  const real = toDataAndError(state?.real)
  const fake = toDataAndError(state?.fake)

  return {
    key,
    cacheKey,
    data,
    error,
    real,
    fake,
    time,
    cooldown,
    expiration,
    ready,
    optimistic,
    fetching,
    aborter,
    mutate,
    fetch,
    refetch,
    update,
    clear,
    suspend,
  }
}