"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scroll = void 0;
const arrays_1 = require("../libs/arrays");
class Scroll {
    core;
    constructor(core) {
        this.core = core;
    }
    /**
     *
     * @param key Key
     * @param scroller We don't care if it's not memoized
     * @param fetcher We don't care if it's not memoized
     * @param cooldown
     * @returns
     */
    async first(key, scroller, fetcher, cooldown) {
        if (!key)
            return;
        const current = this.core.get(key);
        if (current?.loading)
            return current;
        if (this.core.cooldown(current, cooldown))
            return current;
        const pages = current?.data ?? [];
        const first = scroller(undefined);
        if (!first)
            return current;
        try {
            this.core.mutate(key, { loading: true });
            const page = await fetcher(first);
            if (this.core.equals(page, pages[0]))
                return this.core.mutate(key, { data: pages });
            else
                return this.core.mutate(key, { data: [page] });
        }
        catch (error) {
            return this.core.mutate(key, { error });
        }
    }
    /**
     *
     * @param key
     * @param scroller We don't care if it's not memoized
     * @param fetcher We don't care if it's not memoized
     * @param cooldown
     * @returns
     */
    async scroll(key, scroller, fetcher, cooldown) {
        if (!key)
            return;
        const current = this.core.get(key);
        if (current?.loading)
            return current;
        if (this.core.cooldown(current, cooldown))
            return current;
        const pages = current?.data ?? [];
        const last = scroller((0, arrays_1.lastOf)(pages));
        if (!last)
            return current;
        try {
            this.core.mutate(key, { loading: true });
            const data = [...pages, await fetcher(last)];
            return this.core.mutate(key, { data });
        }
        catch (error) {
            return this.core.mutate(key, { error });
        }
    }
}
exports.Scroll = Scroll;
