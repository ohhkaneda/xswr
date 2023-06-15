import { Equalser } from "mods/equals/equals.js"
import { SyncBicoder, SyncEncoder } from "mods/serializers/serializer.js"
import { Storage } from "mods/storages/storage.js"
import { Normalizer } from "mods/types/normalizer.js"

export interface GlobalSettings {
  readonly timeout?: number,
  readonly cooldown?: number,
  readonly expiration?: number

  readonly equals?: Equalser
}

export interface QuerySettings<K, D, F> {
  readonly timeout?: number,
  readonly cooldown?: number,
  readonly expiration?: number

  readonly storage?: Storage

  readonly keySerializer?: SyncEncoder<K, string>,
  readonly dataSerializer?: SyncBicoder<D, unknown>
  readonly errorSerializer?: SyncBicoder<F, unknown>

  readonly normalizer?: Normalizer<D>
  readonly equals?: Equalser,
}
