import { lastOf } from "libs/arrays";
import { getTimeFromDelay } from "libs/time";
import { Core } from "mods/core";
import { AbortError } from "mods/errors";
import { Fetcher } from "mods/types/fetcher";
import { Params } from "mods/types/params";
import { Scroller } from "mods/types/scroller";
import { State } from "mods/types/state";
import { DEFAULT_COOLDOWN, DEFAULT_EQUALS, DEFAULT_EXPIRATION, DEFAULT_TIMEOUT } from "mods/utils/defaults";

export class ScrollHelper {
  constructor(readonly core: Core) { }

  /**
   * Fetch first page
   * @param skey Storage key
   * @param scroller Key scroller
   * @param fetcher Resource fetcher
   * @param aborter AbortController
   * @param tparams Time parameters
   * @param force Should ignore cooldown
   * @returns The new state
   */
  async first<D = any, E = any, K = any>(
    skey: string | undefined,
    scroller: Scroller<D, K>,
    fetcher: Fetcher<D, E, K>,
    aborter = new AbortController(),
    params: Params<D[], E> = {},
    force = false
  ): Promise<State<D[], E> | undefined> {
    if (skey === undefined) return

    const {
      equals = DEFAULT_EQUALS,
      cooldown: dcooldown = DEFAULT_COOLDOWN,
      expiration: dexpiration = DEFAULT_EXPIRATION,
      timeout: dtimeout = DEFAULT_TIMEOUT,
    } = params

    let current = await this.core.get<D[], E>(skey, params)

    if (current?.aborter && !force)
      return current
    if (current?.aborter && current?.optimistic)
      return current
    if (current?.aborter)
      current.aborter.abort("Replaced")
    if (this.core.shouldCooldown(current, force))
      return current

    const first = scroller(undefined)
    if (!first) return current

    const timeout = setTimeout(() => {
      aborter.abort("Timed out")
    }, dtimeout)

    try {
      const { signal } = aborter

      current = await this.core.apply(skey, current, { time: current?.time, aborter }, params)

      const {
        data,
        error,
        time = Date.now(),
        cooldown = getTimeFromDelay(dcooldown),
        expiration = getTimeFromDelay(dexpiration)
      } = await fetcher(first, { signal })

      if (signal.aborted)
        throw new AbortError(signal)

      current = await this.core.get(skey, params)

      const state: State<D[], E> = {}

      if (data !== undefined && !equals(data, current?.data?.[0]))
        state.data = [data]
      state.error = error

      return await this.core.apply<D[], E>(skey, current, { time, cooldown, expiration, ...state }, params, aborter)
    } catch (error: any) {
      return await this.core.mutate<D[], E>(skey, { error }, params, aborter)
    } finally {
      clearTimeout(timeout)
    }
  }

  /**
   * Scroll to the next page
   * @param skey Storage key
   * @param scroller Key scroller
   * @param fetcher Resource fetcher
   * @param aborter AbortController
   * @param tparams Time parameters
   * @param force Should ignore cooldown
   * @returns The new state
   */
  async scroll<D = any, E = any, K = any>(
    skey: string | undefined,
    scroller: Scroller<D, K>,
    fetcher: Fetcher<D, E, K>,
    aborter = new AbortController(),
    params: Params<D[], E> = {},
    force = false
  ): Promise<State<D[], E> | undefined> {
    if (skey === undefined) return

    const {
      cooldown: dcooldown = DEFAULT_COOLDOWN,
      expiration: dexpiration = DEFAULT_EXPIRATION,
      timeout: dtimeout = DEFAULT_TIMEOUT,
    } = params

    let current = await this.core.get<D[], E>(skey, params)

    if (current?.aborter && !force)
      return current
    if (current?.aborter && current?.optimistic)
      return current
    if (current?.aborter)
      current.aborter.abort("Replaced")
    if (this.core.shouldCooldown(current, force))
      return current

    const pages = current?.data ?? []
    const last = scroller(lastOf(pages))
    if (!last) return current

    const timeout = setTimeout(() => {
      aborter.abort("Timed out")
    }, dtimeout)

    try {
      const { signal } = aborter

      current = await this.core.apply(skey, current, { time: current?.time, aborter }, params)

      let {
        data,
        error,
        time = Date.now(),
        cooldown = getTimeFromDelay(dcooldown),
        expiration = getTimeFromDelay(dexpiration)
      } = await fetcher(last, { signal })

      if (signal.aborted)
        throw new AbortError(signal)

      if (expiration !== undefined && current?.expiration !== undefined)
        expiration = Math.min(expiration, current?.expiration)

      current = await this.core.get(skey, params)

      const state: State<D[], E> = {}

      if (data !== undefined)
        state.data = [...(current?.data ?? []), data]
      state.error = error

      return await this.core.apply<D[], E>(skey, current, { time, cooldown, expiration, ...state }, params, aborter)
    } catch (error: any) {
      return await this.core.mutate<D[], E>(skey, { error }, params, aborter)
    } finally {
      clearTimeout(timeout)
    }
  }
}