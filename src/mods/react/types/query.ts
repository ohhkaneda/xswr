import { Result } from "@hazae41/result"
import { CooldownError, MissingFetcherError, MissingKeyError } from "mods/core/core.js"
import { Data } from "mods/result/data.js"
import { Fail } from "mods/result/fail.js"
import { Fetched } from "mods/result/fetched.js"
import { FetchError } from "mods/types/fetcher.js"
import { Mutator } from "mods/types/mutator.js"
import { FetcherfulQuerySettings, FetcherlessQuerySettings } from "mods/types/settings.js"
import { FetchedState, State } from "mods/types/state.js"

export type Query<K, D, F> =
  | FetcherfulQuery<K, D, F>
  | FetcherlessQuery<K, D, F>

export interface SkeletonQuery<K, D, F> {
  /**
   * Arbitrary key, must be serializable
   */
  key: undefined

  /**
   * Cache key, the serialized version of key
   */
  cacheKey?: string,

  /**
   * Current data or error (can be fake)
   */
  current?: Fetched<D, F>

  /**
   * Data (or previous data if current error is some) (can be fake or fakely undefined)
   */
  data?: Data<D>

  /**
   * Error (can be fake or fakely undefined)
   */
  error?: Fail<F>

  /**
   * Real state
   */
  real?: FetchedState<D, F>

  /**
   * Fake state (can be fakely undefined)
   */
  fake?: FetchedState<D, F>

  /**
   * True if a fetch is ongoing (except those from update())
   */
  fetching: boolean

  /**
   * Abort controller, can be used to abort and check for abortion, present when a fetch is ongoing (except those from update())
   */
  aborter?: AbortController,

  /**
   * Use this to check if the state has been loaded from async storage and is ready to be used
   */
  ready: boolean

  /**
   * True if it's in a fake state
   */
  optimistic?: boolean,

  /**
   * Mutate the cache
   * @param res 
   */
  mutate(mutator: Mutator<D, F>): Promise<State<D, F>>

  /**
   * Clear the cache
   */
  clear(): Promise<State<D, F>>

  /**
   * Fetch with cooldown
   * @example You want to fetch and don't care if it's cooldowned
   */
  fetch(aborter?: AbortController): Promise<Result<Result<Result<State<D, F>, FetchError>, CooldownError>, MissingKeyError>>

  /**
   * Fetch without cooldown
   * @example User clicked on the refresh button
   * @example You just made a POST request and want to get some fresh data
   */
  refetch(aborter?: AbortController): Promise<Result<Result<State<D, F>, FetchError>, MissingKeyError>>

  /**
   * Suspend until the next state change, also launches an undeduped fetch
   */
  suspend(): Promise<Result<Result<State<D, F>, FetchError>, never>>
}

export interface FetcherfulQuery<K, D, F> extends Omit<FetcherfulQuerySettings<K, D, F>, "time" | "cooldown" | "expiration"> {
  /**
   * Arbitrary key, must be serializable
   */
  key: K

  /**
   * Cache key, the serialized version of key
   */
  cacheKey?: string,

  /**
   * Current data or error (can be fake)
   */
  current?: Fetched<D, F>

  /**
   * Data (or previous data if current error is some) (can be fake or fakely undefined)
   */
  data?: Data<D>

  /**
   * Error (can be fake or fakely undefined)
   */
  error?: Fail<F>

  /**
   * Real state
   */
  real?: FetchedState<D, F>

  /**
   * Fake state (can be fakely undefined)
   */
  fake?: FetchedState<D, F>

  /**
   * True if a fetch is ongoing (except those from update())
   */
  fetching: boolean

  /**
   * Abort controller, can be used to abort and check for abortion, present when a fetch is ongoing (except those from update())
   */
  aborter?: AbortController,

  /**
   * Use this to check if the state has been loaded from async storage and is ready to be used
   */
  ready: boolean

  /**
   * True if it's in a fake state
   */
  optimistic?: boolean,

  /**
   * Mutate the cache
   * @param res 
   */
  mutate(mutator: Mutator<D, F>): Promise<State<D, F>>

  /**
   * Clear the cache
   */
  clear(): Promise<State<D, F>>

  /**
   * Fetch with cooldown
   * @example You want to fetch and don't care if it's cooldowned
   */
  fetch(aborter?: AbortController): Promise<Result<Result<Result<State<D, F>, FetchError>, CooldownError>, never>>

  /**
   * Fetch without cooldown
   * @example User clicked on the refresh button
   * @example You just made a POST request and want to get some fresh data
   */
  refetch(aborter?: AbortController): Promise<Result<Result<State<D, F>, FetchError>, never>>

  /**
   * Suspend until the next state change, also launches an undeduped fetch
   */
  suspend(): Promise<Result<Result<State<D, F>, FetchError>, never>>
}

export interface FetcherlessQuery<K, D, F> extends Omit<FetcherlessQuerySettings<K, D, F>, "time" | "cooldown" | "expiration"> {
  /**
   * Arbitrary key, must be serializable
   */
  key: K

  /**
   * Cache key, the serialized version of key
   */
  cacheKey?: string,

  /**
   * Current data or error (can be fake)
   */
  current?: Fetched<D, F>

  /**
   * Data (or previous data if current error is some) (can be fake or fakely undefined)
   */
  data?: Data<D>

  /**
   * Error (can be fake or fakely undefined)
   */
  error?: Fail<F>

  /**
   * Real state
   */
  real?: FetchedState<D, F>

  /**
   * Fake state (can be fakely undefined)
   */
  fake?: FetchedState<D, F>

  /**
   * True if a fetch is ongoing (except those from update())
   */
  fetching: boolean

  /**
   * Abort controller, can be used to abort and check for abortion, present when a fetch is ongoing (except those from update())
   */
  aborter?: AbortController,

  /**
   * Use this to check if the state has been loaded from async storage and is ready to be used
   */
  ready: boolean

  /**
   * True if it's in a fake state
   */
  optimistic?: boolean,

  /**
   * Mutate the cache
   * @param res 
   */
  mutate(mutator: Mutator<D, F>): Promise<State<D, F>>

  /**
   * Clear the cache
   */
  clear(): Promise<State<D, F>>

  /**
   * Fetch with cooldown
   * @example You want to fetch and don't care if it's cooldowned
   */
  fetch(aborter?: AbortController): Promise<Result<Result<never, MissingFetcherError>, never>>

  /**
   * Fetch without cooldown
   * @example User clicked on the refresh button
   * @example You just made a POST request and want to get some fresh data
   */
  refetch(aborter?: AbortController): Promise<Result<never, MissingFetcherError>>

  /**
   * Suspend until the next state change, also launches an undeduped fetch
   */
  suspend(): Promise<Result<never, MissingFetcherError>>

}