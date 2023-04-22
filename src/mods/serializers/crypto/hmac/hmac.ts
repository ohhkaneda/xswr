import { Bytes } from "@hazae41/bytes"
import { AsyncEncoder } from "mods/serializers/serializer.js"

export class HmacEncoder implements AsyncEncoder<string> {

  constructor(
    readonly key: CryptoKey
  ) { }

  static async fromPBKDF2(pbkdf2: CryptoKey, salt: Uint8Array, iterations: number) {
    const key = await crypto.subtle.deriveKey({
      name: "PBKDF2",
      salt: salt,
      iterations: iterations,
      hash: "SHA-256"
    }, pbkdf2, { name: "HMAC", hash: "SHA-256" }, false, ["sign"])

    return new this(key)
  }

  async stringify(value: string) {
    const hash = await crypto.subtle.sign({ name: "HMAC" }, this.key, Bytes.fromUtf8(value))

    return Bytes.toBase64(new Uint8Array(hash))
  }

}