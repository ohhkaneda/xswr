import { Optional } from "@hazae41/option"
import { Err, Ok, Result } from "@hazae41/result"
import { Bicoder, Encoder, SyncIdentity } from "mods/serializers/serializer.js"
import { RawState } from "mods/types/state.js"
import { useEffect, useRef } from "react"
import { StorageCreationError } from "../errors.js"
import { Storage } from "../storage.js"

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
export function useAsyncLocalStorage(params?: AsyncLocalStorageParams) {
  const storage = useRef<Result<AsyncLocalStorage, StorageCreationError>>()

  if (storage.current == null)
    storage.current = AsyncLocalStorage.tryCreate(params).ignore()

  useEffect(() => () => {
    if (!storage.current?.isOk())
      return
    storage.current?.inner.unmount().catch(console.error)
  }, [])

  return storage.current
}

export interface AsyncLocalStorageParams {
  prefix?: string,
  keySerializer?: Encoder<string, string>,
  valueSerializer?: Bicoder<RawState, string>
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
export class AsyncLocalStorage implements Storage {
  readonly async = true as const

  readonly #onunload: () => void

  #storageKeys = new Map<string, number>()

  private constructor(
    readonly prefix = "xswr:",
    readonly keySerializer = SyncIdentity as Encoder<string, string>,
    readonly valueSerializer = JSON as Bicoder<RawState, string>
  ) {
    this.#onunload = () => this.collectSync()
    addEventListener("beforeunload", this.#onunload)
  }

  static tryCreate(params: AsyncLocalStorageParams = {}): Result<AsyncLocalStorage, StorageCreationError> {
    const { prefix, keySerializer, valueSerializer } = params

    if (typeof localStorage === "undefined")
      return new Err(new StorageCreationError())

    return new Ok(new AsyncLocalStorage(prefix, keySerializer, valueSerializer))
  }

  async unmount() {
    removeEventListener("beforeunload", this.#onunload)

    await this.collect()
  }

  async collect() {
    this.collectSync()
  }

  collectSync() {
    for (const [key, expiration] of this.#storageKeys) {
      if (expiration > Date.now())
        continue
      this.#delete(key)
    }
  }

  async get(cacheKey: string) {
    const key = await this.keySerializer.stringify(cacheKey)
    const item = localStorage.getItem(this.prefix + key)

    if (item === null)
      return

    const state = await this.valueSerializer.parse(item)

    if (state.expiration != null)
      this.#storageKeys.set(key, state.expiration)

    return state
  }

  async set(cacheKey: string, state: Optional<RawState>) {
    if (state == null)
      return await this.delete(cacheKey)

    const storageKey = await this.keySerializer.stringify(cacheKey)
    const storageItem = await this.valueSerializer.stringify(state)

    if (state.expiration != null)
      this.#storageKeys.set(storageKey, state.expiration)

    localStorage.setItem(this.prefix + storageKey, storageItem)
  }

  async #delete(storageKey: string) {
    this.#storageKeys.delete(storageKey)

    localStorage.removeItem(this.prefix + storageKey)
  }

  async delete(cacheKey: string) {
    const key = await this.keySerializer.stringify(cacheKey)

    await this.#delete(key)
  }

}