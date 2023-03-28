import { AsyncSerializer } from "mods/types/serializer.js"
import { State } from "mods/types/state.js"
import { useEffect, useRef } from "react"
import { AsyncStorage } from "../storage.js"

/**
 * Asynchronous local storage
 * 
 * Use for compatibility with SSR
 * Use for storing large objects
 * 
 * Won't display data on first render or hydratation, you can either:
 * - use SyncLocalStorage
 * - use useFallback
 * 
 * @see SyncLocalStorage
 * @see useFallback
 */
export function useAsyncLocalStorage(prefix?: string) {
  const storage = useRef<AsyncLocalStorage>()

  if (storage.current === undefined)
    storage.current = AsyncLocalStorage.create(prefix)

  useEffect(() => () => {
    storage.current?.unmount().catch(console.error)
  }, [])

  return storage.current
}

/**
 * Asynchronous local storage
 * 
 * Use for compatibility with SSR
 * Use for storing large objects
 * 
 * Won't display data on first render or hydratation, you can either:
 * - use SyncLocalStorage
 * - use useFallback
 * 
 * @see SyncLocalStorage
 * @see useFallback
 */
export class AsyncLocalStorage implements AsyncStorage {

  readonly async = true as const

  readonly #onunload: () => void

  #keys = new Map<string, number>()

  constructor(
    readonly prefix = "xswr:"
  ) {
    this.#onunload = () => this.collectSync()
    addEventListener("beforeunload", this.#onunload)
  }

  static create(prefix?: string) {
    if (typeof Storage === "undefined")
      return

    return new this(prefix)
  }

  async unmount() {
    removeEventListener("beforeunload", this.#onunload)

    await this.collect()
  }

  async collect() {
    this.collectSync()
  }

  collectSync() {
    for (const [key, expiration] of this.#keys) {
      if (expiration > Date.now())
        continue
      this.delete(key)
    }
  }

  async get<D>(key: string, serializer: AsyncSerializer<State<D>> = JSON, shallow = false) {
    const item = localStorage.getItem(this.prefix + key)

    if (item === null)
      return

    const state = await serializer.parse(item)

    if (!shallow && state.expiration !== undefined)
      this.#keys.set(key, state.expiration)

    return state
  }

  async set<D>(key: string, state: State<D>, serializer: AsyncSerializer<State<D>> = JSON, shallow = false) {
    if (!shallow && state.expiration !== undefined)
      this.#keys.set(key, state.expiration)

    const item = await serializer.stringify(state)
    localStorage.setItem(this.prefix + key, item)
  }

  async delete(key: string, shallow = false) {
    if (!shallow)
      this.#keys.delete(key)

    localStorage.removeItem(this.prefix + key)
  }
}