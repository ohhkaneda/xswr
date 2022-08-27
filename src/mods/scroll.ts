import { lastOf } from "../libs/arrays.js";
import { Core, Fetcher, Scroller } from "./core.js";
import { DEFAULT_COOLDOWN, DEFAULT_EXPIRATION, DEFAULT_TIMEOUT } from "./defaults.js";
import { getTimeFromDelay, TimeParams } from "./time.js";

export class Scroll {
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
    fetcher: Fetcher<D, K>,
    aborter = new AbortController(),
    tparams: TimeParams = {},
    force = false
  ) {
    if (skey === undefined) return

    const {
      cooldown: dcooldown = DEFAULT_COOLDOWN,
      expiration: dexpiration = DEFAULT_EXPIRATION,
      timeout: dtimeout = DEFAULT_TIMEOUT
    } = tparams

    const current = this.core.get<D[], E>(skey)
    if (current?.aborter)
      return current
    if (this.core.cooldown(current, force))
      return current

    const pages = current?.data ?? []
    const first = scroller(undefined)
    if (!first) return current

    const timeout = setTimeout(() => {
      aborter.abort("Timed out")
    }, dtimeout)

    try {
      const { signal } = aborter

      this.core.mutate(skey, { aborter })

      const {
        data,
        cooldown = getTimeFromDelay(dcooldown),
        expiration = getTimeFromDelay(dexpiration)
      } = await fetcher(first, { signal })

      return this.core.equals(data, pages[0])
        ? this.core.mutate<D[], E>(skey, { cooldown, expiration })
        : this.core.mutate<D[], E>(skey, { data: [data], cooldown, expiration })
    } catch (error: any) {
      const cooldown = getTimeFromDelay(dcooldown)
      const expiration = getTimeFromDelay(dexpiration)

      return this.core.mutate<D[], E>(skey, { error, cooldown, expiration })
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
    fetcher: Fetcher<D, K>,
    aborter = new AbortController(),
    tparams: TimeParams = {},
    force = false
  ) {
    if (skey === undefined) return

    const {
      cooldown: dcooldown = DEFAULT_COOLDOWN,
      expiration: dexpiration = DEFAULT_EXPIRATION,
      timeout: dtimeout = DEFAULT_TIMEOUT,
    } = tparams

    const current = this.core.get<D[], E>(skey)
    if (current?.aborter)
      return current
    if (this.core.cooldown(current, force))
      return current
    const pages = current?.data ?? []
    const last = scroller(lastOf(pages))
    if (!last) return current

    const timeout = setTimeout(() => {
      aborter.abort("Timed out")
    }, dtimeout)

    try {
      const { signal } = aborter

      this.core.mutate(skey, { aborter })

      let {
        data,
        cooldown = getTimeFromDelay(dcooldown),
        expiration = getTimeFromDelay(dexpiration)
      } = await fetcher(last, { signal })

      expiration = Math.min(expiration, current.expiration)

      return this.core.mutate<D[], E>(skey, { data: [...pages, data], cooldown, expiration })
    } catch (error: any) {
      const cooldown = getTimeFromDelay(dcooldown)
      const expiration = getTimeFromDelay(dexpiration)

      return this.core.mutate<D[], E>(skey, { error, cooldown, expiration })
    } finally {
      clearTimeout(timeout)
    }
  }
}