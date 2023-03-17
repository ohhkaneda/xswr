import { MutateState, State } from "mods/types/state.js"

export type Mutator<D = unknown> =
  (previous?: State<D>) => MutateState<D>

export type FullMutator<D = unknown> =
  (previous?: State<D>) => State<D>