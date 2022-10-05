export async function nextOf<T, R>(generator: AsyncGenerator<T, R>) {
  const next = await generator.next()
  if (!next.done) return next.value
}

export async function returnOf<T, R>(generator: AsyncGenerator<T, R>) {
  const next = await generator.next()
  if (next.done) return next.value
}