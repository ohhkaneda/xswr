'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.cjs');
var react = require('../../../../libs/react.cjs');
var core = require('../../contexts/core.cjs');
var object = require('../../../single/object.cjs');
var React = require('react');

/**
 * Single resource handle factory
 * @param key Key (memoized)
 * @param fetcher Resource fetcher (unmemoized)
 * @param cparams Parameters (unmemoized)
 * @returns Single handle
 */
function useSingle(key, fetcher, params) {
    var _this = this;
    if (params === void 0) { params = {}; }
    var core$1 = core.useCore();
    var mparams = tslib_es6.__assign(tslib_es6.__assign({}, core$1.params), params);
    var keyRef = react.useAutoRef(key);
    var fetcherRef = react.useAutoRef(fetcher);
    var mparamsRef = react.useAutoRef(mparams);
    var skey = React.useMemo(function () {
        return object.getSingleStorageKey(key, mparamsRef.current);
    }, [key]);
    var _a = tslib_es6.__read(React.useState(0), 2), setCounter = _a[1];
    var stateRef = React.useRef();
    React.useMemo(function () {
        stateRef.current = core$1.getSync(skey, mparamsRef.current);
    }, [core$1, skey]);
    var setState = React.useCallback(function (state) {
        stateRef.current = state;
        setCounter(function (c) { return c + 1; });
    }, []);
    var initRef = React.useRef();
    React.useEffect(function () {
        if (stateRef.current !== null)
            return;
        initRef.current = core$1.get(skey, mparamsRef.current).then(setState);
    }, [core$1, skey]);
    React.useEffect(function () {
        if (!skey)
            return;
        core$1.on(skey, setState, mparamsRef.current);
        return function () { return void core$1.off(skey, setState, mparamsRef.current); };
    }, [core$1, skey]);
    var mutate = React.useCallback(function (mutator) { return tslib_es6.__awaiter(_this, void 0, void 0, function () {
        var state, params;
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(stateRef.current === null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, initRef.current];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (stateRef.current === null)
                        throw new Error("Null state after init");
                    state = stateRef.current;
                    params = mparamsRef.current;
                    return [4 /*yield*/, core$1.mutate(skey, state, mutator, params)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core$1, skey]);
    var clear = React.useCallback(function () { return tslib_es6.__awaiter(_this, void 0, void 0, function () {
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(stateRef.current === null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, initRef.current];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (stateRef.current === null)
                        throw new Error("Null state after init");
                    return [4 /*yield*/, core$1.delete(skey, mparamsRef.current)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [core$1, skey]);
    var fetch = React.useCallback(function (aborter) { return tslib_es6.__awaiter(_this, void 0, void 0, function () {
        var key, fetcher, params;
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof window === "undefined")
                        throw new Error("Fetch on SSR");
                    if (!(stateRef.current === null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, initRef.current];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (stateRef.current === null)
                        throw new Error("Null state after init");
                    if (fetcherRef.current === undefined)
                        return [2 /*return*/, stateRef.current];
                    key = keyRef.current;
                    fetcher = fetcherRef.current;
                    params = mparamsRef.current;
                    return [4 /*yield*/, core$1.single.fetch(key, skey, fetcher, aborter, params)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core$1, skey]);
    var refetch = React.useCallback(function (aborter) { return tslib_es6.__awaiter(_this, void 0, void 0, function () {
        var key, fetcher, params;
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof window === "undefined")
                        throw new Error("Refetch on SSR");
                    if (!(stateRef.current === null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, initRef.current];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (stateRef.current === null)
                        throw new Error("Null state after init");
                    if (fetcherRef.current === undefined)
                        return [2 /*return*/, stateRef.current];
                    key = keyRef.current;
                    fetcher = fetcherRef.current;
                    params = mparamsRef.current;
                    return [4 /*yield*/, core$1.single.fetch(key, skey, fetcher, aborter, params, true, true)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core$1, skey]);
    var update = React.useCallback(function (updater, uparams, aborter) {
        if (uparams === void 0) { uparams = {}; }
        return tslib_es6.__awaiter(_this, void 0, void 0, function () {
            var key, fetcher, params, fparams;
            return tslib_es6.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof window === "undefined")
                            throw new Error("Update on SSR");
                        if (!(stateRef.current === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, initRef.current];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (stateRef.current === null)
                            throw new Error("Null state after init");
                        key = keyRef.current;
                        fetcher = fetcherRef.current;
                        params = mparamsRef.current;
                        fparams = tslib_es6.__assign(tslib_es6.__assign({}, params), uparams);
                        return [4 /*yield*/, core$1.single.update(key, skey, fetcher, updater, aborter, fparams)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }, [core$1, skey]);
    var suspend = React.useCallback(function () {
        if (typeof window === "undefined")
            throw new Error("Suspend on SSR");
        return (function () { return tslib_es6.__awaiter(_this, void 0, void 0, function () {
            var key, fetcher, params, background;
            return tslib_es6.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(stateRef.current === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, initRef.current];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (stateRef.current === null)
                            throw new Error("Null state after init");
                        if (fetcherRef.current === undefined)
                            throw new Error("No fetcher");
                        key = keyRef.current;
                        fetcher = fetcherRef.current;
                        params = mparamsRef.current;
                        background = new Promise(function (ok) { return core$1.once(skey, function () { return ok(); }, params); });
                        return [4 /*yield*/, core$1.single.fetch(key, skey, fetcher, undefined, params, false, true)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, background];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [core$1, skey]);
    var state = stateRef.current;
    var _b = state !== null && state !== void 0 ? state : {}, data = _b.data, error = _b.error, time = _b.time, cooldown = _b.cooldown, expiration = _b.expiration, aborter = _b.aborter, optimistic = _b.optimistic, realData = _b.realData;
    var ready = state !== null;
    var loading = Boolean(aborter);
    return { key: key, skey: skey, data: data, error: error, time: time, cooldown: cooldown, expiration: expiration, aborter: aborter, optimistic: optimistic, realData: realData, loading: loading, ready: ready, mutate: mutate, fetch: fetch, refetch: refetch, update: update, clear: clear, suspend: suspend };
}

exports.useSingle = useSingle;
