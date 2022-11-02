import { __spreadArray, __read } from 'tslib';
import { ScrollSchema } from '../../../scroll/schema.js';
import { SingleSchema } from '../../../single/schema.js';
import { useMemo } from 'react';
import { useScrollQuery } from './scroll.js';
import { useSingleQuery } from './single.js';

function useQuery(factory, deps) {
    var schema = useMemo(function () {
        return factory.apply(void 0, __spreadArray([], __read(deps), false));
    }, deps);
    if (schema instanceof SingleSchema) {
        var key = schema.key, fetcher = schema.fetcher, params = schema.params;
        return useSingleQuery(key, fetcher, params);
    }
    if (schema instanceof ScrollSchema) {
        var scroller = schema.scroller, fetcher = schema.fetcher, params = schema.params;
        return useScrollQuery(scroller, fetcher, params);
    }
    throw new Error("Invalid resource schema");
}

export { useQuery };
//# sourceMappingURL=router.js.map