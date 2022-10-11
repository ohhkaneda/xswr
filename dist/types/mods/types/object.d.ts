import { Mutator } from './mutator.js';
import { State } from './state.js';

interface Object$1<D = any, E = any, K = any> {
    mutate(mutator: Mutator<D, E, K>): Promise<State<D, E, K> | undefined>;
}

export { Object$1 as Object };
