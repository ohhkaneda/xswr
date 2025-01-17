import { Option, Optional } from "@hazae41/option";
import { Err, Ok, Result } from "@hazae41/result";
import { Arrays } from "libs/arrays/arrays.js";
import { useRenderRef } from "libs/react/ref.js";
import { Time } from "libs/time/time.js";
import { CooldownError, MissingFetcherError, MissingKeyError } from "mods/core/core.js";
import { useCore } from "mods/react/contexts/core.js";
import { FetcherfulQuery, FetcherlessQuery, SkeletonQuery } from "mods/react/types/query.js";
import { Scroll } from "mods/scroll/helper.js";
import { ScrollQuerySchema } from "mods/scroll/schema.js";
import { FetchError } from "mods/types/fetcher.js";
import { Mutator } from "mods/types/mutator.js";
import { ScrollFetcherfulQuerySettings, ScrollFetcherlessQuerySettings } from "mods/types/settings.js";
import { State } from "mods/types/state.js";
import { DependencyList, useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useScrollQuery<T extends ScrollQuerySchema.Infer<T>, L extends DependencyList>(
  factory: (...deps: L) => T,
  deps: L
): ScrollQuerySchema.Queried<T> {
  const schema = useMemo(() => {
    return factory(...deps)
  }, deps)

  if (schema == null)
    return useSkeletonScrollQuery() as ScrollQuerySchema.Queried<T>

  if (schema.settings.fetcher == null)
    return useFetcherlessScrollQuery(schema.settings) as ScrollQuerySchema.Queried<T>

  return useFetcherfulScrollQuery(schema.settings) as ScrollQuerySchema.Queried<T>
}

export interface ScrollSkeletonQuery<K, D, F> extends SkeletonQuery<K, D[], F> {
  /**
   * Fetch the next page
   */
  scroll(): Promise<Result<never, MissingKeyError>>

  /**
   * The next key to be fetched
   */
  peek(): undefined
}

/**
 * Query for a scrolling resource
 */
export interface ScrollFetcherlessQuery<K, D, F> extends FetcherlessQuery<K, D[], F> {
  /**
   * Fetch the next page
   */
  scroll(): Promise<Result<Result<never, MissingFetcherError>, never>>

  /**
   * The next key to be fetched
   */
  peek(): Optional<K>
}

/**
 * Query for a scrolling resource
 */
export interface ScrollFetcherfulQuery<K, D, F> extends FetcherfulQuery<K, D[], F> {
  /**
   * Fetch the next page
   */
  scroll(): Promise<Result<Result<Result<State<D[], F>, FetchError>, never>, never>>

  /**
   * The next key to be fetched
   */
  peek(): Optional<K>
}

export function useSkeletonScrollQuery<K, D, F>(): ScrollSkeletonQuery<K, D, F> {
  const core = useCore().unwrap()

  useRenderRef(undefined)

  const cacheKey = useMemo(() => {
    // NOOP
  }, [undefined])

  useState(0)

  useRef()
  useRef()

  useMemo(() => {
    // NOOP
  }, [core, cacheKey])

  useCallback(() => {
    // NOOP
  }, [core, cacheKey])

  useCallback(() => {
    // NOOP
  }, [core, cacheKey])

  useEffect(() => {
    // NOOP
  }, [core, cacheKey])

  useEffect(() => {
    // NOOP
  }, [core, cacheKey])

  const mutate = useCallback(async (mutator: Mutator<D[], F>) => {
    return new Err(new MissingKeyError())
  }, [core, cacheKey])

  const clear = useCallback(async () => {
    return new Err(new MissingKeyError())
  }, [core, cacheKey])

  const fetch = useCallback(async (aborter = new AbortController()) => {
    return new Err(new MissingKeyError())
  }, [core, cacheKey])

  const refetch = useCallback(async (aborter = new AbortController()) => {
    return new Err(new MissingKeyError())
  }, [core, cacheKey])

  const scroll = useCallback(async (aborter = new AbortController()) => {
    return new Err(new MissingKeyError())
  }, [core, cacheKey])

  const suspend = useCallback(async (aborter = new AbortController()) => {
    return new Err(new MissingKeyError())
  }, [core, cacheKey])

  const peek = useCallback(() => {
    return undefined
  }, [undefined, undefined])

  return { mutate, clear, fetch, refetch, scroll, suspend, peek }
}

/**
 * Scroll query
 * @param scroller 
 * @param fetcher 
 * @param settings 
 * @returns 
 */
export function useFetcherlessScrollQuery<K, D, F>(
  settings: ScrollFetcherlessQuerySettings<K, D, F>,
): ScrollFetcherlessQuery<K, D, F> {
  const core = useCore().unwrap()

  const settingsRef = useRenderRef({ ...core.settings, ...settings })

  const cacheKey = useMemo(() => {
    return Scroll.getCacheKey(settings.key, settingsRef.current)
  }, [settings.key])

  const [, setCounter] = useState(0)

  const stateRef = useRef<Optional<State<D[], F>>>()
  const aborterRef = useRef<Optional<AbortController>>()

  useMemo(() => {
    stateRef.current = core.getStateSync<D[], F>(cacheKey)
    aborterRef.current = core.getAborterSync(cacheKey)
  }, [core, cacheKey])

  const setState = useCallback((state: State<D[], F>) => {
    stateRef.current = state
    setCounter(c => c + 1)
  }, [core, cacheKey])

  const setAborter = useCallback((aborter: Optional<AbortController>) => {
    aborterRef.current = aborter
    setCounter(c => c + 1)
  }, [core, cacheKey])

  useEffect(() => {
    if (stateRef.current != null)
      return

    core.get(cacheKey, settingsRef.current).then(setState)
  }, [core, cacheKey])

  useEffect(() => {
    const offState = core.onState.addListener(cacheKey, e => setState(e.detail))
    const offAborter = core.onAborter.addListener(cacheKey, e => setAborter(e.detail))

    core.increment(cacheKey, settingsRef.current)

    return () => {
      core.decrement(cacheKey, settingsRef.current)

      offState()
      offAborter()
    }
  }, [core, cacheKey])

  const mutate = useCallback(async (mutator: Mutator<D[], F>) => {
    return new Ok(await core.mutate(cacheKey, mutator, settingsRef.current))
  }, [core, cacheKey])

  const clear = useCallback(async () => {
    return new Ok(await core.delete(cacheKey, settingsRef.current))
  }, [core, cacheKey])

  const fetch = useCallback(async (aborter = new AbortController()) => {
    return new Ok(new Err(new MissingFetcherError()))
  }, [core, cacheKey])

  const refetch = useCallback(async (aborter = new AbortController()) => {
    return new Ok(new Err(new MissingFetcherError()))
  }, [core, cacheKey])

  const scroll = useCallback(async (aborter = new AbortController()) => {
    return new Ok(new Err(new MissingFetcherError()))
  }, [core, cacheKey])

  const suspend = useCallback(async (aborter = new AbortController()) => {
    return new Ok(new Err(new MissingFetcherError()))
  }, [core, cacheKey])

  const state = stateRef.current
  const aborter = aborterRef.current

  const ready = state != null
  const fetching = aborter != null
  const optimistic = state?.isFake()

  const current = state?.current
  const data = state?.data
  const error = state?.error

  const real = state?.real
  const fake = state?.fake

  const peek = useCallback(() => {
    return Option.mapSync(state?.real?.data?.inner, pages => settings.scroller(Arrays.last(pages)))
  }, [state?.real?.data, settings.scroller])

  return {
    ...settings,
    cacheKey,
    current,
    data,
    error,
    real,
    fake,
    ready,
    optimistic,
    aborter,
    fetching,
    mutate,
    fetch,
    refetch,
    scroll,
    clear,
    suspend,
    peek,
  }
}

export function useFetcherfulScrollQuery<K, D, F>(
  settings: ScrollFetcherfulQuerySettings<K, D, F>,
): ScrollFetcherfulQuery<K, D, F> {
  const core = useCore().unwrap()

  const settingsRef = useRenderRef({ ...core.settings, ...settings })

  const cacheKey = useMemo(() => {
    return Scroll.getCacheKey(settings.key, settingsRef.current)
  }, [settings.key])

  const [, setCounter] = useState(0)

  const stateRef = useRef<Optional<State<D[], F>>>()
  const aborterRef = useRef<Optional<AbortController>>()

  useMemo(() => {
    stateRef.current = core.getStateSync<D[], F>(cacheKey)
    aborterRef.current = core.getAborterSync(cacheKey)
  }, [core, cacheKey])

  const setState = useCallback((state: State<D[], F>) => {
    stateRef.current = state
    setCounter(c => c + 1)
  }, [core, cacheKey])

  const setAborter = useCallback((aborter: Optional<AbortController>) => {
    aborterRef.current = aborter
    setCounter(c => c + 1)
  }, [core, cacheKey])

  useEffect(() => {
    if (stateRef.current != null)
      return

    core.get(cacheKey, settingsRef.current).then(setState)
  }, [core, cacheKey])

  useEffect(() => {
    const offState = core.onState.addListener(cacheKey, e => setState(e.detail))
    const offAborter = core.onAborter.addListener(cacheKey, e => setAborter(e.detail))

    core.increment(cacheKey, settingsRef.current)

    return () => {
      core.decrement(cacheKey, settingsRef.current)

      offState()
      offAborter()
    }
  }, [core, cacheKey])

  const mutate = useCallback(async (mutator: Mutator<D[], F>) => {
    return new Ok(await core.mutate(cacheKey, mutator, settingsRef.current))
  }, [core, cacheKey])

  const clear = useCallback(async () => {
    return new Ok(await core.delete(cacheKey, settingsRef.current))
  }, [core, cacheKey])

  const fetch = useCallback(async (aborter = new AbortController()) => {
    const settings = settingsRef.current

    if (Time.isAfterNow(stateRef.current?.real?.current.cooldown))
      return new Ok(new Ok(new Err(new CooldownError())))

    const result = await core.fetchOrJoin(cacheKey, aborter, async () =>
      await Scroll.first(core, cacheKey, aborter, settings))

    return new Ok(new Ok(new Ok(result)))
  }, [core, cacheKey])

  const refetch = useCallback(async (aborter = new AbortController()) => {
    const settings = settingsRef.current

    const result = await core.fetchOrReplace(cacheKey, aborter, async () =>
      await Scroll.first(core, cacheKey, aborter, settings))

    return new Ok(new Ok(result))
  }, [core, cacheKey])

  const scroll = useCallback(async (aborter = new AbortController()) => {
    const settings = settingsRef.current

    const result = await core.fetchOrReplace(cacheKey, aborter, async () =>
      await Scroll.scroll(core, cacheKey, aborter, settings))

    return new Ok(new Ok(result))
  }, [core, cacheKey])

  const suspend = useCallback(async (aborter = new AbortController()) => {
    const settings = settingsRef.current

    const result = await core.fetchOrJoin(cacheKey, aborter, async () =>
      await Scroll.first(core, cacheKey, aborter, settings))

    return new Ok(new Ok(result))
  }, [core, cacheKey])

  const state = stateRef.current
  const aborter = aborterRef.current

  const ready = state != null
  const fetching = aborter != null
  const optimistic = state?.isFake()

  const current = state?.current
  const data = state?.data
  const error = state?.error

  const real = state?.real
  const fake = state?.fake

  const peek = useCallback(() => {
    return Option.mapSync(state?.real?.data?.inner, pages => settings.scroller(Arrays.last(pages)))
  }, [state?.real?.data, settings.scroller])

  return {
    ...settings,
    cacheKey,
    current,
    data,
    error,
    real,
    fake,
    ready,
    optimistic,
    aborter,
    fetching,
    mutate,
    fetch,
    refetch,
    scroll,
    clear,
    suspend,
    peek
  }
}