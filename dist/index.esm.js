import React, { createContext, useContext, useRef, useEffect, useMemo, useState, useCallback } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
}

/**
 * Map of arrays data structure
 */
var MapOfArrays = /** @class */ (function () {
    function MapOfArrays() {
        this.map = new Map();
    }
    MapOfArrays.prototype.get = function (key) {
        return this.map.get(key);
    };
    MapOfArrays.prototype.push = function (key, value) {
        var values = this.map.get(key);
        if (!values)
            this.map.set(key, [value]);
        else
            values.push(value);
    };
    MapOfArrays.prototype.erase = function (key, value) {
        var values = this.map.get(key);
        if (!values)
            return;
        var values2 = values
            .filter(function (it) { return it !== value; });
        if (values2.length)
            this.map.set(key, values2);
        else
            this.map.delete(key);
    };
    return MapOfArrays;
}());
/**
 * Orthogonal state publisher
 */
var Ortho = /** @class */ (function () {
    function Ortho() {
        this.listeners = new MapOfArrays();
    }
    Ortho.prototype.publish = function (key, value) {
        var e_1, _a;
        var listeners = this.listeners.get(key);
        if (!listeners)
            return;
        try {
            for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                var listener = listeners_1_1.value;
                listener(value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Ortho.prototype.subscribe = function (key, listener) {
        this.listeners.push(key, listener);
    };
    Ortho.prototype.unsubscribe = function (key, listener) {
        this.listeners.erase(key, listener);
    };
    return Ortho;
}());

function lastOf(array) {
    if (array.length)
        return array[array.length - 1];
}

function getTimeFromDelay(delay) {
    if (delay === -1)
        return;
    return Date.now() + delay;
}

var AbortError = /** @class */ (function (_super) {
    __extends(AbortError, _super);
    function AbortError(signal) {
        return _super.call(this, "Aborted", { cause: signal }) || this;
    }
    return AbortError;
}(Error));
function isAbortError(e) {
    if (e instanceof AbortError)
        return true;
    if (e instanceof DOMException && e.name === "AbortError")
        return true;
    return false;
}

function refEquals(a, b) {
    return a === b;
}
function jsonEquals(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    return JSON.stringify(a) === JSON.stringify(b);
}
function shallowEquals(a, b) {
    var e_1, _a;
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    var ka = Object.keys(a);
    var kb = Object.keys(b);
    if (ka.length !== kb.length)
        return false;
    try {
        for (var ka_1 = __values(ka), ka_1_1 = ka_1.next(); !ka_1_1.done; ka_1_1 = ka_1.next()) {
            var key = ka_1_1.value;
            if (a[key] !== b[key])
                return false;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ka_1_1 && !ka_1_1.done && (_a = ka_1.return)) _a.call(ka_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}

var DEFAULT_EQUALS = jsonEquals;
var DEFAULT_SERIALIZER = JSON;
var DEFAULT_COOLDOWN = 1 * 1000;
var DEFAULT_EXPIRATION = -1;
var DEFAULT_TIMEOUT = 5 * 1000;

var ScrollHelper = /** @class */ (function () {
    function ScrollHelper(core) {
        this.core = core;
    }
    /**
     * Fetch first page
     * @param skey Storage key
     * @param scroller Key scroller
     * @param fetcher Resource fetcher
     * @param aborter AbortController
     * @param tparams Time parameters
     * @param force Should ignore cooldown
     * @returns The new state
     */
    ScrollHelper.prototype.first = function (skey, scroller, fetcher, aborter, params, force) {
        var _a;
        if (aborter === void 0) { aborter = new AbortController(); }
        if (params === void 0) { params = {}; }
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _b, equals, _c, dcooldown, _d, dexpiration, _e, dtimeout, current, first, timeout, signal, _f, data, error, _g, time, _h, cooldown, _j, expiration, state, error_1;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (skey === undefined)
                            return [2 /*return*/];
                        _b = params.equals, equals = _b === void 0 ? DEFAULT_EQUALS : _b, _c = params.cooldown, dcooldown = _c === void 0 ? DEFAULT_COOLDOWN : _c, _d = params.expiration, dexpiration = _d === void 0 ? DEFAULT_EXPIRATION : _d, _e = params.timeout, dtimeout = _e === void 0 ? DEFAULT_TIMEOUT : _e;
                        return [4 /*yield*/, this.core.get(skey, params)];
                    case 1:
                        current = _k.sent();
                        if ((current === null || current === void 0 ? void 0 : current.aborter) && !force)
                            return [2 /*return*/, current];
                        if ((current === null || current === void 0 ? void 0 : current.aborter) && (current === null || current === void 0 ? void 0 : current.optimistic))
                            return [2 /*return*/, current];
                        if (current === null || current === void 0 ? void 0 : current.aborter)
                            current.aborter.abort("Replaced");
                        if (this.core.shouldCooldown(current, force))
                            return [2 /*return*/, current];
                        first = scroller(undefined);
                        if (!first)
                            return [2 /*return*/, current];
                        timeout = setTimeout(function () {
                            aborter.abort("Timed out");
                        }, dtimeout);
                        _k.label = 2;
                    case 2:
                        _k.trys.push([2, 7, 9, 10]);
                        signal = aborter.signal;
                        return [4 /*yield*/, this.core.apply(skey, current, { time: current === null || current === void 0 ? void 0 : current.time, aborter: aborter }, params)];
                    case 3:
                        current = _k.sent();
                        return [4 /*yield*/, fetcher(first, { signal: signal })];
                    case 4:
                        _f = _k.sent(), data = _f.data, error = _f.error, _g = _f.time, time = _g === void 0 ? Date.now() : _g, _h = _f.cooldown, cooldown = _h === void 0 ? getTimeFromDelay(dcooldown) : _h, _j = _f.expiration, expiration = _j === void 0 ? getTimeFromDelay(dexpiration) : _j;
                        if (signal.aborted)
                            throw new AbortError(signal);
                        return [4 /*yield*/, this.core.get(skey, params)];
                    case 5:
                        current = _k.sent();
                        state = {};
                        if (data !== undefined && !equals(data, (_a = current === null || current === void 0 ? void 0 : current.data) === null || _a === void 0 ? void 0 : _a[0]))
                            state.data = [data];
                        state.error = error;
                        return [4 /*yield*/, this.core.apply(skey, current, __assign({ time: time, cooldown: cooldown, expiration: expiration }, state), params, aborter)];
                    case 6: return [2 /*return*/, _k.sent()];
                    case 7:
                        error_1 = _k.sent();
                        return [4 /*yield*/, this.core.mutate(skey, { error: error_1 }, params, aborter)];
                    case 8: return [2 /*return*/, _k.sent()];
                    case 9:
                        clearTimeout(timeout);
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Scroll to the next page
     * @param skey Storage key
     * @param scroller Key scroller
     * @param fetcher Resource fetcher
     * @param aborter AbortController
     * @param tparams Time parameters
     * @param force Should ignore cooldown
     * @returns The new state
     */
    ScrollHelper.prototype.scroll = function (skey, scroller, fetcher, aborter, params, force) {
        var _a, _b;
        if (aborter === void 0) { aborter = new AbortController(); }
        if (params === void 0) { params = {}; }
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _c, dcooldown, _d, dexpiration, _e, dtimeout, current, pages, last, timeout, signal, _f, data, error, _g, time, _h, cooldown, _j, expiration, state, error_2;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (skey === undefined)
                            return [2 /*return*/];
                        _c = params.cooldown, dcooldown = _c === void 0 ? DEFAULT_COOLDOWN : _c, _d = params.expiration, dexpiration = _d === void 0 ? DEFAULT_EXPIRATION : _d, _e = params.timeout, dtimeout = _e === void 0 ? DEFAULT_TIMEOUT : _e;
                        return [4 /*yield*/, this.core.get(skey, params)];
                    case 1:
                        current = _k.sent();
                        if ((current === null || current === void 0 ? void 0 : current.aborter) && !force)
                            return [2 /*return*/, current];
                        if ((current === null || current === void 0 ? void 0 : current.aborter) && (current === null || current === void 0 ? void 0 : current.optimistic))
                            return [2 /*return*/, current];
                        if (current === null || current === void 0 ? void 0 : current.aborter)
                            current.aborter.abort("Replaced");
                        if (this.core.shouldCooldown(current, force))
                            return [2 /*return*/, current];
                        pages = (_a = current === null || current === void 0 ? void 0 : current.data) !== null && _a !== void 0 ? _a : [];
                        last = scroller(lastOf(pages));
                        if (!last)
                            return [2 /*return*/, current];
                        timeout = setTimeout(function () {
                            aborter.abort("Timed out");
                        }, dtimeout);
                        _k.label = 2;
                    case 2:
                        _k.trys.push([2, 7, 9, 10]);
                        signal = aborter.signal;
                        return [4 /*yield*/, this.core.apply(skey, current, { time: current === null || current === void 0 ? void 0 : current.time, aborter: aborter }, params)];
                    case 3:
                        current = _k.sent();
                        return [4 /*yield*/, fetcher(last, { signal: signal })];
                    case 4:
                        _f = _k.sent(), data = _f.data, error = _f.error, _g = _f.time, time = _g === void 0 ? Date.now() : _g, _h = _f.cooldown, cooldown = _h === void 0 ? getTimeFromDelay(dcooldown) : _h, _j = _f.expiration, expiration = _j === void 0 ? getTimeFromDelay(dexpiration) : _j;
                        if (signal.aborted)
                            throw new AbortError(signal);
                        if (expiration !== undefined && (current === null || current === void 0 ? void 0 : current.expiration) !== undefined)
                            expiration = Math.min(expiration, current === null || current === void 0 ? void 0 : current.expiration);
                        return [4 /*yield*/, this.core.get(skey, params)];
                    case 5:
                        current = _k.sent();
                        state = {};
                        if (data !== undefined)
                            state.data = __spreadArray(__spreadArray([], __read(((_b = current === null || current === void 0 ? void 0 : current.data) !== null && _b !== void 0 ? _b : [])), false), [data], false);
                        state.error = error;
                        return [4 /*yield*/, this.core.apply(skey, current, __assign({ time: time, cooldown: cooldown, expiration: expiration }, state), params, aborter)];
                    case 6: return [2 /*return*/, _k.sent()];
                    case 7:
                        error_2 = _k.sent();
                        return [4 /*yield*/, this.core.mutate(skey, { error: error_2 }, params, aborter)];
                    case 8: return [2 /*return*/, _k.sent()];
                    case 9:
                        clearTimeout(timeout);
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return ScrollHelper;
}());

function getScrollStorageKey(key, params) {
    if (key === undefined)
        return undefined;
    if (typeof key === "string")
        return key;
    var _a = params.serializer, serializer = _a === void 0 ? DEFAULT_SERIALIZER : _a;
    return "scroll:".concat(serializer.stringify(key));
}
/**
 * Non-React version of ScrollHandle
 */
var ScrollObject = /** @class */ (function () {
    function ScrollObject(core, scroller, fetcher, params, pparams, initialize) {
        if (params === void 0) { params = {}; }
        if (pparams === void 0) { pparams = {}; }
        if (initialize === void 0) { initialize = true; }
        var _this = this;
        this.core = core;
        this.scroller = scroller;
        this.fetcher = fetcher;
        this.params = params;
        this.pparams = pparams;
        this.initialize = initialize;
        this.mparams = __assign(__assign({}, pparams), params);
        this.key = scroller();
        this.skey = (function () {
            var _a = _this, key = _a.key, mparams = _a.mparams;
            return getScrollStorageKey(key, mparams);
        })();
        if (initialize) {
            this.loadSync();
            this.loadAsync();
            this.subscribe();
        }
    }
    Object.defineProperty(ScrollObject.prototype, "state", {
        get: function () { return this._state; },
        enumerable: false,
        configurable: true
    });
    ScrollObject.prototype.loadSync = function () {
        var _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
        this._state = core.getSync(skey, mparams);
    };
    ScrollObject.prototype.loadAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, skey, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._state !== null)
                            return [2 /*return*/];
                        _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.get(skey, mparams)];
                    case 1:
                        _b._state = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScrollObject.prototype.subscribe = function () {
        var _this = this;
        var _a = this, core = _a.core, skey = _a.skey;
        var setter = function (state) {
            return _this._state = state;
        };
        core.subscribe(skey, setter);
        new FinalizationRegistry(function () {
            core.unsubscribe(skey, setter);
        }).register(this, undefined);
    };
    ScrollObject.prototype.mutate = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, skey, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.mutate(skey, state, mparams)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    ScrollObject.prototype.fetch = function (aborter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, scroller, skey, fetcher, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, scroller = _a.scroller, skey = _a.skey, fetcher = _a.fetcher, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.scroll.first(skey, scroller, fetcher, aborter, mparams)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    ScrollObject.prototype.refetch = function (aborter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, scroller, skey, fetcher, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, scroller = _a.scroller, skey = _a.skey, fetcher = _a.fetcher, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.scroll.first(skey, scroller, fetcher, aborter, mparams, true)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    ScrollObject.prototype.scroll = function (aborter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, scroller, skey, fetcher, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, scroller = _a.scroller, skey = _a.skey, fetcher = _a.fetcher, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.scroll.scroll(skey, scroller, fetcher, aborter, mparams)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    ScrollObject.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, skey, mparams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
                        return [4 /*yield*/, core.delete(skey, mparams)];
                    case 1:
                        _b.sent();
                        delete this._state;
                        return [2 /*return*/];
                }
            });
        });
    };
    return ScrollObject;
}());

function scroll(scroller, fetcher, params) {
    if (params === void 0) { params = {}; }
    return new ScrollSchema(scroller, fetcher, params);
}
var ScrollSchema = /** @class */ (function () {
    function ScrollSchema(scroller, fetcher, params) {
        if (params === void 0) { params = {}; }
        this.scroller = scroller;
        this.fetcher = fetcher;
        this.params = params;
    }
    ScrollSchema.prototype.make = function (core, pparams, initialize) {
        if (pparams === void 0) { pparams = {}; }
        var _a = this, scroller = _a.scroller, fetcher = _a.fetcher, params = _a.params;
        return new ScrollObject(core, scroller, fetcher, params, pparams, initialize);
    };
    return ScrollSchema;
}());

var SingleHelper = /** @class */ (function () {
    function SingleHelper(core) {
        this.core = core;
    }
    /**
     * Fetch
     * @param key Key (passed to fetcher)
     * @param skey Storage key
     * @param fetcher Resource fetcher
     * @param aborter AbortController
     * @param tparams Time parameters
     * @param force Should ignore cooldown
     * @returns The new state
     */
    SingleHelper.prototype.fetch = function (key, skey, fetcher, aborter, params, force) {
        if (aborter === void 0) { aborter = new AbortController(); }
        if (params === void 0) { params = {}; }
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, dcooldown, _b, dexpiration, _c, dtimeout, current, timeout, state, signal, _d, data, error, _e, time, _f, cooldown, _g, expiration, error_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (key === undefined)
                            return [2 /*return*/];
                        if (skey === undefined)
                            return [2 /*return*/];
                        _a = params.cooldown, dcooldown = _a === void 0 ? DEFAULT_COOLDOWN : _a, _b = params.expiration, dexpiration = _b === void 0 ? DEFAULT_EXPIRATION : _b, _c = params.timeout, dtimeout = _c === void 0 ? DEFAULT_TIMEOUT : _c;
                        return [4 /*yield*/, this.core.get(skey, params)];
                    case 1:
                        current = _h.sent();
                        if ((current === null || current === void 0 ? void 0 : current.aborter) && !force)
                            return [2 /*return*/, current];
                        if ((current === null || current === void 0 ? void 0 : current.aborter) && (current === null || current === void 0 ? void 0 : current.optimistic))
                            return [2 /*return*/, current];
                        if (current === null || current === void 0 ? void 0 : current.aborter)
                            current.aborter.abort("Replaced");
                        if (this.core.shouldCooldown(current, force))
                            return [2 /*return*/, current];
                        timeout = setTimeout(function () {
                            aborter.abort("Timed out");
                        }, dtimeout);
                        state = {};
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 7, 9, 10]);
                        signal = aborter.signal;
                        return [4 /*yield*/, this.core.apply(skey, current, { time: current === null || current === void 0 ? void 0 : current.time, aborter: aborter }, params)];
                    case 3:
                        current = _h.sent();
                        return [4 /*yield*/, fetcher(key, { signal: signal })];
                    case 4:
                        _d = _h.sent(), data = _d.data, error = _d.error, _e = _d.time, time = _e === void 0 ? Date.now() : _e, _f = _d.cooldown, cooldown = _f === void 0 ? getTimeFromDelay(dcooldown) : _f, _g = _d.expiration, expiration = _g === void 0 ? getTimeFromDelay(dexpiration) : _g;
                        if (signal.aborted)
                            throw new AbortError(signal);
                        return [4 /*yield*/, this.core.get(skey, params)];
                    case 5:
                        current = _h.sent();
                        if (data !== undefined)
                            state.data = data;
                        state.error = error;
                        return [4 /*yield*/, this.core.apply(skey, current, __assign({ time: time, cooldown: cooldown, expiration: expiration }, state), params, aborter)];
                    case 6: return [2 /*return*/, _h.sent()];
                    case 7:
                        error_1 = _h.sent();
                        return [4 /*yield*/, this.core.mutate(skey, { error: error_1 }, params, aborter)];
                    case 8: return [2 /*return*/, _h.sent()];
                    case 9:
                        clearTimeout(timeout);
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Optimistic update
     * @param key Key (:K) (passed to poster)
     * @param skey Storage key
     * @param poster Resource poster
     * @param updater Mutation function
     * @param aborter AbortController
     * @param tparams Time parameters
     * @returns The new state
     * @throws Error
     */
    SingleHelper.prototype.update = function (key, skey, poster, updater, aborter, params) {
        if (aborter === void 0) { aborter = new AbortController(); }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, dcooldown, _b, dexpiration, _c, dtimeout, current, updated, timeout, signal, data_1, time_1, optimistic, _d, data, error, _e, time, _f, cooldown, _g, expiration, time_2, data_2, state, error_2, time, data;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (key === undefined)
                            return [2 /*return*/];
                        if (skey === undefined)
                            return [2 /*return*/];
                        _a = params.cooldown, dcooldown = _a === void 0 ? DEFAULT_COOLDOWN : _a, _b = params.expiration, dexpiration = _b === void 0 ? DEFAULT_EXPIRATION : _b, _c = params.timeout, dtimeout = _c === void 0 ? DEFAULT_TIMEOUT : _c;
                        return [4 /*yield*/, this.core.get(skey, params)];
                    case 1:
                        current = _h.sent();
                        if ((current === null || current === void 0 ? void 0 : current.aborter) && (current === null || current === void 0 ? void 0 : current.optimistic))
                            return [2 /*return*/, current];
                        if (current === null || current === void 0 ? void 0 : current.aborter)
                            current.aborter.abort("Replaced");
                        updated = updater(current === null || current === void 0 ? void 0 : current.data);
                        timeout = setTimeout(function () {
                            aborter.abort("Timed out");
                        }, dtimeout);
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 8, 10, 11]);
                        signal = aborter.signal;
                        data_1 = updated;
                        time_1 = current === null || current === void 0 ? void 0 : current.time;
                        optimistic = true;
                        return [4 /*yield*/, this.core.apply(skey, current, { time: time_1, data: data_1, aborter: aborter, optimistic: optimistic }, params)];
                    case 3:
                        _h.sent();
                        return [4 /*yield*/, poster(key, { data: updated, signal: signal })];
                    case 4:
                        _d = _h.sent(), data = _d.data, error = _d.error, _e = _d.time, time = _e === void 0 ? Date.now() : _e, _f = _d.cooldown, cooldown = _f === void 0 ? getTimeFromDelay(dcooldown) : _f, _g = _d.expiration, expiration = _g === void 0 ? getTimeFromDelay(dexpiration) : _g;
                        if (signal.aborted)
                            throw new AbortError(signal);
                        if (!(error !== undefined)) return [3 /*break*/, 6];
                        time_2 = current === null || current === void 0 ? void 0 : current.time;
                        data_2 = current === null || current === void 0 ? void 0 : current.data;
                        return [4 /*yield*/, this.core.mutate(skey, { time: time_2, cooldown: cooldown, expiration: expiration, data: data_2, error: error }, params, aborter)];
                    case 5: return [2 /*return*/, _h.sent()];
                    case 6:
                        state = {};
                        if (data !== undefined)
                            state.data = data;
                        state.error = error;
                        return [4 /*yield*/, this.core.mutate(skey, __assign({ time: time, cooldown: cooldown, expiration: expiration }, state), params, aborter)];
                    case 7: return [2 /*return*/, _h.sent()];
                    case 8:
                        error_2 = _h.sent();
                        time = current === null || current === void 0 ? void 0 : current.time;
                        data = current === null || current === void 0 ? void 0 : current.data;
                        return [4 /*yield*/, this.core.mutate(skey, { time: time, data: data, error: error_2 }, params, aborter)];
                    case 9: return [2 /*return*/, _h.sent()];
                    case 10:
                        clearTimeout(timeout);
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return SingleHelper;
}());

function getSingleStorageKey(key, params) {
    if (key === undefined)
        return undefined;
    if (typeof key === "string")
        return key;
    var _a = params.serializer, serializer = _a === void 0 ? DEFAULT_SERIALIZER : _a;
    return serializer.stringify(key);
}
/**
 * Non-React version of SingleHandle
 */
var SingleObject = /** @class */ (function () {
    function SingleObject(core, key, poster, params, pparams, initialize) {
        if (params === void 0) { params = {}; }
        if (pparams === void 0) { pparams = {}; }
        if (initialize === void 0) { initialize = true; }
        var _this = this;
        this.core = core;
        this.key = key;
        this.poster = poster;
        this.params = params;
        this.pparams = pparams;
        this.initialize = initialize;
        this.mparams = __assign(__assign({}, pparams), params);
        this.skey = (function () {
            var mparams = _this.mparams;
            return getSingleStorageKey(key, mparams);
        })();
        if (this.initialize) {
            this.loadSync();
            this.loadAsync();
            this.subscribe();
        }
    }
    Object.defineProperty(SingleObject.prototype, "state", {
        get: function () { return this._state; },
        enumerable: false,
        configurable: true
    });
    SingleObject.prototype.loadSync = function () {
        var _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
        this._state = core.getSync(skey, mparams);
    };
    SingleObject.prototype.loadAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, skey, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._state !== null)
                            return [2 /*return*/];
                        _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.get(skey, mparams)];
                    case 1:
                        _b._state = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SingleObject.prototype.subscribe = function () {
        var _this = this;
        var _a = this, core = _a.core, skey = _a.skey;
        var setter = function (state) {
            return _this._state = state;
        };
        core.subscribe(this.skey, setter);
        new FinalizationRegistry(function () {
            core.unsubscribe(skey, setter);
        }).register(this, undefined);
    };
    SingleObject.prototype.mutate = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, skey, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.mutate(skey, state, mparams)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    SingleObject.prototype.fetch = function (aborter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, key, skey, poster, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, key = _a.key, skey = _a.skey, poster = _a.poster, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.single.fetch(key, skey, poster, aborter, mparams)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    SingleObject.prototype.refetch = function (aborter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, key, skey, poster, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, key = _a.key, skey = _a.skey, poster = _a.poster, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.single.fetch(key, skey, poster, aborter, mparams, true)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    SingleObject.prototype.update = function (updater, aborter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, key, skey, poster, mparams, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, core = _a.core, key = _a.key, skey = _a.skey, poster = _a.poster, mparams = _a.mparams;
                        _b = this;
                        return [4 /*yield*/, core.single.update(key, skey, poster, updater, aborter, mparams)];
                    case 1: return [2 /*return*/, _b._state = _c.sent()];
                }
            });
        });
    };
    SingleObject.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, core, skey, mparams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, core = _a.core, skey = _a.skey, mparams = _a.mparams;
                        return [4 /*yield*/, core.delete(skey, mparams)];
                    case 1:
                        _b.sent();
                        delete this._state;
                        return [2 /*return*/];
                }
            });
        });
    };
    return SingleObject;
}());

function single(key, poster, params) {
    if (params === void 0) { params = {}; }
    return new SingleSchema(key, poster, params);
}
var SingleSchema = /** @class */ (function () {
    function SingleSchema(key, poster, params) {
        if (params === void 0) { params = {}; }
        this.key = key;
        this.poster = poster;
        this.params = params;
    }
    SingleSchema.prototype.make = function (core, pparams, initialize) {
        if (pparams === void 0) { pparams = {}; }
        var _a = this, key = _a.key, poster = _a.poster, params = _a.params;
        return new SingleObject(core, key, poster, params, pparams, initialize);
    };
    return SingleSchema;
}());

var Normal = /** @class */ (function () {
    function Normal(data, schema, result) {
        this.data = data;
        this.schema = schema;
        this.result = result;
    }
    return Normal;
}());

function isAsyncStorage(storage) {
    return Boolean(storage.async);
}

var Core = /** @class */ (function (_super) {
    __extends(Core, _super);
    function Core() {
        var _this = _super.call(this) || this;
        _this.single = new SingleHelper(_this);
        _this.scroll = new ScrollHelper(_this);
        _this.cache = new Map();
        _this._mounted = true;
        _this.counts = new Map();
        _this.timeouts = new Map();
        return _this;
    }
    Object.defineProperty(Core.prototype, "mounted", {
        get: function () { return this._mounted; },
        enumerable: false,
        configurable: true
    });
    Core.prototype.unmount = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.timeouts.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var timeout = _c.value;
                clearTimeout(timeout);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._mounted = false;
    };
    Core.prototype.getSync = function (skey, params) {
        if (params === void 0) { params = {}; }
        if (skey === undefined)
            return;
        if (this.cache.has(skey))
            return this.cache.get(skey);
        var storage = params.storage;
        if (!storage)
            return;
        if (isAsyncStorage(storage))
            return null;
        var state = storage.get(skey);
        this.cache.set(skey, state);
        return state;
    };
    Core.prototype.get = function (skey, params, ignore) {
        if (params === void 0) { params = {}; }
        if (ignore === void 0) { ignore = false; }
        return __awaiter(this, void 0, void 0, function () {
            var storage, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (skey === undefined)
                            return [2 /*return*/];
                        if (this.cache.has(skey))
                            return [2 /*return*/, this.cache.get(skey)];
                        storage = params.storage;
                        if (!storage)
                            return [2 /*return*/];
                        return [4 /*yield*/, storage.get(skey, ignore)];
                    case 1:
                        state = _a.sent();
                        this.cache.set(skey, state);
                        return [2 /*return*/, state];
                }
            });
        });
    };
    /**
     * Force set a key to a state and publish it
     * No check, no merge
     * @param skey Key
     * @param state New state
     * @returns
     */
    Core.prototype.set = function (skey, state, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var storage, data, time, cooldown, expiration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (skey === undefined)
                            return [2 /*return*/];
                        this.cache.set(skey, state);
                        this.publish(skey, state);
                        storage = params.storage;
                        if (!storage)
                            return [2 /*return*/];
                        data = state.data, time = state.time, cooldown = state.cooldown, expiration = state.expiration;
                        return [4 /*yield*/, storage.set(skey, { data: data, time: time, cooldown: cooldown, expiration: expiration })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete key and publish undefined
     * @param skey
     * @returns
     */
    Core.prototype.delete = function (skey, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var storage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!skey)
                            return [2 /*return*/];
                        this.cache.delete(skey);
                        this.publish(skey, undefined);
                        storage = params.storage;
                        if (!storage)
                            return [2 /*return*/];
                        return [4 /*yield*/, storage.delete(skey)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Core.prototype.apply = function (skey, current, state, params, aborter) {
        var _a;
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var next, _b, equals, normalizer, transformed, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (skey === undefined)
                            return [2 /*return*/];
                        if (!!state) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.delete(skey, params)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                    case 2:
                        next = __assign({ time: Date.now(), data: current === null || current === void 0 ? void 0 : current.data, error: current === null || current === void 0 ? void 0 : current.error, cooldown: current === null || current === void 0 ? void 0 : current.cooldown, expiration: current === null || current === void 0 ? void 0 : current.expiration, aborter: current === null || current === void 0 ? void 0 : current.aborter, optimistic: undefined }, state);
                        if (next.time !== undefined && next.time < ((_a = current === null || current === void 0 ? void 0 : current.time) !== null && _a !== void 0 ? _a : 0)) { // Keep the current state if the new state is older
                            next.time = current === null || current === void 0 ? void 0 : current.time;
                            next.data = current === null || current === void 0 ? void 0 : current.data;
                            next.error = current === null || current === void 0 ? void 0 : current.error;
                            next.cooldown = current === null || current === void 0 ? void 0 : current.cooldown;
                            next.expiration = current === null || current === void 0 ? void 0 : current.expiration;
                            next.optimistic = current === null || current === void 0 ? void 0 : current.optimistic;
                            next.aborter = current === null || current === void 0 ? void 0 : current.aborter;
                        }
                        if (aborter) // Force unset or ignore aborter
                            next.aborter = aborter === (current === null || current === void 0 ? void 0 : current.aborter)
                                ? state.aborter
                                : current === null || current === void 0 ? void 0 : current.aborter;
                        _b = params.equals, equals = _b === void 0 ? DEFAULT_EQUALS : _b, normalizer = params.normalizer;
                        if (equals(next.data, current === null || current === void 0 ? void 0 : current.data)) // Prevent some renders if the data is the same
                            next.data = current === null || current === void 0 ? void 0 : current.data;
                        if (shallowEquals(next, current)) // Shallow comparison because aborter is not serializable
                            return [2 /*return*/, current];
                        if (!(normalizer !== undefined && next.data !== undefined && next.data !== (current === null || current === void 0 ? void 0 : current.data))) return [3 /*break*/, 4];
                        transformed = normalizer(next.data);
                        _c = next;
                        return [4 /*yield*/, this.normalize(transformed)];
                    case 3:
                        _c.data = _d.sent();
                        _d.label = 4;
                    case 4: return [4 /*yield*/, this.set(skey, next, params)];
                    case 5:
                        _d.sent();
                        return [2 /*return*/, next];
                }
            });
        });
    };
    Core.prototype.normalize = function (transformed) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key, item, object, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (typeof transformed !== "object")
                            return [2 /*return*/, transformed];
                        if (transformed === null)
                            return [2 /*return*/, transformed];
                        _a = [];
                        for (_b in transformed)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        key = _a[_i];
                        item = transformed[key];
                        if (!(item instanceof Normal)) return [3 /*break*/, 3];
                        object = item.schema.make(this);
                        return [4 /*yield*/, object.mutate({ data: item.data })];
                    case 2:
                        _e.sent();
                        transformed[key] = item.result;
                        return [3 /*break*/, 5];
                    case 3:
                        _c = transformed;
                        _d = key;
                        return [4 /*yield*/, this.normalize(item)];
                    case 4:
                        _c[_d] = _e.sent();
                        _e.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, transformed];
                }
            });
        });
    };
    Core.prototype.mutate = function (key, state, params, aborter) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var current;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!key)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.get(key, params)];
                    case 1:
                        current = _a.sent();
                        return [4 /*yield*/, this.apply(key, current, state, params, aborter)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * True if we should cooldown this resource
     */
    Core.prototype.shouldCooldown = function (current, force) {
        if (force)
            return false;
        if ((current === null || current === void 0 ? void 0 : current.cooldown) === undefined)
            return false;
        if (Date.now() < current.cooldown)
            return true;
        return false;
    };
    Core.prototype.subscribe = function (key, listener, params) {
        var _a;
        if (!key)
            return;
        _super.prototype.subscribe.call(this, key, listener);
        var count = (_a = this.counts.get(key)) !== null && _a !== void 0 ? _a : 0;
        this.counts.set(key, count + 1);
        var timeout = this.timeouts.get(key);
        if (timeout === undefined)
            return;
        clearTimeout(timeout);
        this.timeouts.delete(key);
    };
    Core.prototype.unsubscribe = function (key, listener, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var count, current, erase, delay, timeout;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!key)
                            return [2 /*return*/];
                        _super.prototype.unsubscribe.call(this, key, listener);
                        count = this.counts.get(key);
                        if (count > 1) {
                            this.counts.set(key, count - 1);
                            return [2 /*return*/];
                        }
                        this.counts.delete(key);
                        return [4 /*yield*/, this.get(key, params, true)];
                    case 1:
                        current = _a.sent();
                        if ((current === null || current === void 0 ? void 0 : current.expiration) === undefined)
                            return [2 /*return*/];
                        if ((current === null || current === void 0 ? void 0 : current.expiration) === -1)
                            return [2 /*return*/];
                        erase = function () { return __awaiter(_this, void 0, void 0, function () {
                            var count;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!this._mounted)
                                            return [2 /*return*/];
                                        count = this.counts.get(key);
                                        if (count !== undefined)
                                            return [2 /*return*/];
                                        this.timeouts.delete(key);
                                        return [4 /*yield*/, this.delete(key, params)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        if (!(Date.now() > current.expiration)) return [3 /*break*/, 3];
                        return [4 /*yield*/, erase()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        delay = current.expiration - Date.now();
                        timeout = setTimeout(erase, delay);
                        this.timeouts.set(key, timeout);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Core;
}(Ortho));

var ParamsContext = createContext(undefined);
function useParams() {
    return useContext(ParamsContext);
}
function useParamsProvider(current) {
    var parent = useParams();
    var paramsRef = useRef();
    if (!paramsRef.current)
        paramsRef.current = __assign(__assign({}, parent), current);
    return paramsRef.current;
}
function ParamsProvider(props) {
    var children = props.children, current = __rest(props, ["children"]);
    var params = useParamsProvider(current);
    return React.createElement(ParamsContext.Provider, { value: params }, children);
}

var CoreContext = createContext(undefined);
function useCore() {
    return useContext(CoreContext);
}
function useCoreProvider() {
    var coreRef = useRef();
    if (!coreRef.current)
        coreRef.current = new Core();
    useEffect(function () { return function () {
        coreRef.current.unmount();
    }; }, []);
    return coreRef.current;
}
function CoreProvider(props) {
    var children = props.children, current = __rest(props, ["children"]);
    var core = useCoreProvider();
    var params = useParamsProvider(current);
    return React.createElement(CoreContext.Provider, { value: core },
        React.createElement(ParamsContext.Provider, { value: params }, children));
}

/**
 * Show handle in console when it changes
 * @param handle
 */
function useDebug(handle, label) {
    var data = handle.data, error = handle.error, time = handle.time;
    useEffect(function () {
        console.debug(label, handle);
    }, [data, error, time]);
}

/**
 * Call a function on error
 * @param handle
 * @param callback
 */
function useError(handle, callback) {
    var ready = handle.ready, error = handle.error;
    useEffect(function () {
        if (!ready)
            return;
        if (error !== undefined)
            callback(error);
    }, [ready, error, callback]);
}

/**
 * Fallback to given data/error if there is no data/error
 * @example You got some data/error using SSR/ISR and want to display it on first render
 * @example You still want to display something even if the fetcher returned nothing
 * @param handle
 * @param state
 */
function useFallback(handle, state) {
    var data = handle.data, error = handle.error;
    if (data !== undefined)
        return;
    if (error !== undefined)
        return;
    Object.assign(handle, state);
}

/**
 * Do a request on mount and url change
 * @see useMount for doing a request on mount only
 * @see useOnce for doing a request only if there is no data yet
 * @param handle
 */
function useFetch(handle) {
    var fetch = handle.fetch;
    useEffect(function () {
        fetch();
    }, [fetch]);
}

/**
 * Do a request on interval
 * @see useRetry for error retry
 * @param handle
 * @param options
 */
function useInterval(handle, interval) {
    var fetch = handle.fetch;
    useEffect(function () {
        if (!interval)
            return;
        var i = setInterval(fetch, interval);
        return function () { return clearInterval(i); };
    }, [fetch, interval]);
}

/**
 * Do a request on mount only
 * @see useFetch for doing a request on url change
 * @see useOnce for doing a request only if there is no data yet
 * @param handle
 */
function useMount(handle) {
    var fetch = handle.fetch;
    useEffect(function () {
        fetch();
    }, []);
}

/**
 * Do a request on mount and url change only if there is no data yet
 * @warning Will still try to fetch is there is an error
 * @param handle
 * @example You want to get some data once and share it in multiple components
 */
function useOnce(handle) {
    var ready = handle.ready, data = handle.data, fetch = handle.fetch;
    useEffect(function () {
        if (!ready)
            return;
        if (data === undefined)
            fetch();
    }, [ready, data, fetch]);
}

/**
 * Do a request when the browser is online
 * @param handle
 */
function useOnline(handle) {
    var fetch = handle.fetch;
    useEffect(function () {
        var f = function () { return fetch(); };
        addEventListener("online", f);
        return function () { return removeEventListener("online", f); };
    }, [fetch]);
}

/**
 * Retry request on error using exponential backoff
 * @see useInterval for interval based requests
 * @param handle
 * @param options
 * @param options.init Initial timeout to be multiplied (in milliseconds)
 * @param options.base Exponent base (2 means the next timeout will be 2 times longer)
 * @param options.max Maximum count (3 means do not retry after 3 retries)
 * @see https://en.wikipedia.org/wiki/Exponential_backoff
 * @see https://en.wikipedia.org/wiki/Geometric_progression
 */
function useRetry(handle, options) {
    if (options === void 0) { options = {}; }
    var ready = handle.ready, refetch = handle.refetch, error = handle.error, time = handle.time;
    var _a = options.init, init = _a === void 0 ? 1000 : _a, _b = options.base, base = _b === void 0 ? 2 : _b, _c = options.max, max = _c === void 0 ? 3 : _c;
    var count = useRef(0);
    useEffect(function () {
        count.current = 0;
    }, [refetch]);
    useEffect(function () {
        if (!ready)
            return;
        if (error === undefined) {
            count.current = 0;
            return;
        }
        if (count.current >= max)
            return;
        var ratio = Math.pow(base, count.current);
        var f = function () { count.current++; refetch(); };
        var t = setTimeout(f, init * ratio);
        return function () { return clearTimeout(t); };
    }, [ready, error, time, refetch]);
}

/**
 * Do a request when the tab is visible
 * @param handle
 */
function useVisible(handle) {
    var fetch = handle.fetch;
    useEffect(function () {
        var f = function () { return !document.hidden && fetch(); };
        document.addEventListener("visibilitychange", f);
        return function () { return document.removeEventListener("visibilitychange", f); };
    }, [fetch]);
}

/**
 * Scrolling resource handle factory
 * @param scroller Key scroller (memoized)
 * @param fetcher Resource fetcher (memoized)
 * @param params Parameters (static)
 * @returns Scrolling handle
 */
function useScroll(scroller, fetcher, params) {
    var _this = this;
    if (params === void 0) { params = {}; }
    var core = useCore();
    var pparams = useParams();
    var mparams = __assign(__assign({}, pparams), params);
    var key = useMemo(function () {
        return scroller();
    }, [scroller]);
    var skey = useMemo(function () {
        return getScrollStorageKey(key, mparams);
    }, [key]);
    var _a = __read(useState(function () {
        return core.getSync(skey, mparams);
    }), 2), state = _a[0], setState = _a[1];
    var first = useRef(true);
    useEffect(function () {
        if (state === null || !first.current)
            core.get(skey, mparams).then(setState);
        first.current = false;
    }, [core, skey]);
    useEffect(function () {
        if (!skey)
            return;
        core.subscribe(skey, setState, mparams);
        return function () { return void core.unsubscribe(skey, setState, mparams); };
    }, [core, skey]);
    var mutate = useCallback(function (state) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.mutate(skey, state, mparams)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey]);
    var fetch = useCallback(function (aborter) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.scroll.first(skey, scroller, fetcher, aborter, mparams)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey, scroller, fetcher]);
    var refetch = useCallback(function (aborter) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.scroll.first(skey, scroller, fetcher, aborter, mparams, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey, scroller, fetcher]);
    var scroll = useCallback(function (aborter) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.scroll.scroll(skey, scroller, fetcher, aborter, mparams, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey, scroller, fetcher]);
    var clear = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.delete(skey, mparams)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [core, skey]);
    var _b = state !== null && state !== void 0 ? state : {}, data = _b.data, error = _b.error, time = _b.time, cooldown = _b.cooldown, expiration = _b.expiration, aborter = _b.aborter, optimistic = _b.optimistic;
    var ready = state !== null;
    var loading = Boolean(aborter);
    return { key: key, skey: skey, data: data, error: error, time: time, cooldown: cooldown, expiration: expiration, aborter: aborter, optimistic: optimistic, loading: loading, ready: ready, mutate: mutate, fetch: fetch, refetch: refetch, scroll: scroll, clear: clear };
}

/**
 * Single resource handle factory
 * @param key Key (memoized)
 * @param poster Resource poster or fetcher (memoized)
 * @param params Parameters (static)
 * @returns Single handle
 */
function useSingle(key, poster, params) {
    var _this = this;
    if (params === void 0) { params = {}; }
    var core = useCore();
    var pparams = useParams();
    var mparams = __assign(__assign({}, pparams), params);
    var skey = useMemo(function () {
        return getSingleStorageKey(key, mparams);
    }, [key]);
    var _a = __read(useState(function () {
        return core.getSync(skey, mparams);
    }), 2), state = _a[0], setState = _a[1];
    var first = useRef(true);
    useEffect(function () {
        if (state === null || !first.current)
            core.get(skey, mparams).then(setState);
        first.current = false;
    }, [core, skey]);
    useEffect(function () {
        if (!skey)
            return;
        core.subscribe(skey, setState, mparams);
        return function () { return void core.unsubscribe(skey, setState, mparams); };
    }, [core, skey]);
    var mutate = useCallback(function (state) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.mutate(skey, state, mparams)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey]);
    var fetch = useCallback(function (aborter) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.single.fetch(key, skey, poster, aborter, mparams)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey, poster]);
    var refetch = useCallback(function (aborter) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.single.fetch(key, skey, poster, aborter, mparams, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey, poster]);
    var update = useCallback(function (updater, aborter) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.single.update(key, skey, poster, updater, aborter, mparams)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [core, skey, poster]);
    var clear = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.delete(skey, mparams)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [core, skey]);
    var _b = state !== null && state !== void 0 ? state : {}, data = _b.data, error = _b.error, time = _b.time, cooldown = _b.cooldown, expiration = _b.expiration, aborter = _b.aborter, optimistic = _b.optimistic;
    var ready = state !== null;
    var loading = Boolean(aborter);
    return { key: key, skey: skey, data: data, error: error, time: time, cooldown: cooldown, expiration: expiration, aborter: aborter, optimistic: optimistic, loading: loading, ready: ready, mutate: mutate, fetch: fetch, refetch: refetch, update: update, clear: clear };
}

function use(factory, deps) {
    var schema = useMemo(function () {
        return factory.apply(void 0, __spreadArray([], __read(deps), false));
    }, deps);
    if (schema instanceof SingleSchema)
        return useSingle(schema.key, schema.poster, schema.params);
    if (schema instanceof ScrollSchema)
        return useScroll(schema.scroller, schema.fetcher, schema.params);
    throw new Error("Invalid resource schema");
}

function useXSWR() {
    var core = useCore();
    var params = useParams();
    var make = useCallback(function (schema, init) {
        return schema.make(core, params, init);
    }, [core, params]);
    return { core: core, params: params, make: make };
}

function useIDBStorage(name) {
    var storage = useRef();
    if (!storage.current)
        storage.current = new IDBStorage(name);
    useEffect(function () { return function () {
        storage.current.unmount();
    }; }, []);
    return storage.current;
}
var IDBStorage = /** @class */ (function () {
    function IDBStorage(name) {
        var _this = this;
        this.name = name;
        this.async = true;
        this.keys = new Set();
        if (typeof indexedDB === "undefined")
            return;
        this.initialization = this.load();
        this.onunload = function () { return _this.unload(); };
        addEventListener("beforeunload", this.onunload);
    }
    Object.defineProperty(IDBStorage.prototype, "database", {
        get: function () { return this._database; },
        enumerable: false,
        configurable: true
    });
    IDBStorage.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, item, keys;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof indexedDB === "undefined")
                            return [2 /*return*/];
                        _a = this;
                        return [4 /*yield*/, new Promise(function (ok, err) {
                                var req = indexedDB.open(_this.name, 1);
                                req.onupgradeneeded = function () {
                                    return req.result.createObjectStore("keyval", {});
                                };
                                req.onblocked = function () { return err("blocked"); };
                                req.onsuccess = function () { return ok(req.result); };
                                req.onerror = function () { return err(req.error); };
                            })];
                    case 1:
                        _a._database = _b.sent();
                        if (typeof Storage === "undefined")
                            return [2 /*return*/];
                        item = localStorage.getItem("idb.".concat(this.name, ".keys"));
                        if (!item)
                            return [2 /*return*/];
                        keys = JSON.parse(item);
                        keys.forEach(function (key) { return _this.keys.add(key); });
                        localStorage.removeItem("idb.".concat(this.name, ".keys"));
                        return [4 /*yield*/, this.collect().catch(console.error)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IDBStorage.prototype.unmount = function () {
        if (typeof indexedDB === "undefined")
            return;
        removeEventListener("beforeunload", this.onunload);
        this.collect().catch(console.error);
    };
    IDBStorage.prototype.unload = function () {
        if (typeof Storage === "undefined")
            return;
        var item = JSON.stringify(__spreadArray([], __read(this.keys), false));
        localStorage.setItem("idb.".concat(this.name, ".keys"), item);
    };
    IDBStorage.prototype.collect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, key, state, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (typeof indexedDB === "undefined")
                            return [2 /*return*/];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(this.keys), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        key = _b.value;
                        return [4 /*yield*/, this.get(key, true)];
                    case 3:
                        state = _d.sent();
                        if ((state === null || state === void 0 ? void 0 : state.expiration) === undefined)
                            return [3 /*break*/, 4];
                        if (state.expiration > Date.now())
                            return [3 /*break*/, 4];
                        this.delete(key, false);
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    IDBStorage.prototype.transact = function (callback, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof indexedDB === "undefined")
                            return [2 /*return*/];
                        if (!!this.database) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialization];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, new Promise(function (ok, err) {
                            var tx = _this.database.transaction("keyval", mode);
                            tx.onerror = function () { return err(tx.error); };
                            tx.oncomplete = function () { return ok(result); };
                            var result;
                            callback(tx.objectStore("keyval"))
                                .then(function (x) { return result = x; })
                                .then(function () { return tx.commit(); })
                                .catch(err);
                        })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IDBStorage.prototype.get = function (key, ignore) {
        if (ignore === void 0) { ignore = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof indexedDB === "undefined")
                            return [2 /*return*/];
                        if (!ignore && !this.keys.has(key))
                            this.keys.add(key);
                        return [4 /*yield*/, this.transact(function (store) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, new Promise(function (ok, err) {
                                                var req = store.get(key);
                                                req.onerror = function () { return err(req.error); };
                                                req.onsuccess = function () { return ok(req.result); };
                                            })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, "readonly")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IDBStorage.prototype.set = function (key, value, ignore) {
        if (ignore === void 0) { ignore = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof indexedDB === "undefined")
                            return [2 /*return*/];
                        if (!ignore && !this.keys.has(key))
                            this.keys.add(key);
                        return [4 /*yield*/, this.transact(function (store) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, new Promise(function (ok, err) {
                                                var req = store.put(value, key);
                                                req.onerror = function () { return err(req.error); };
                                                req.onsuccess = function () { return ok(); };
                                            })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, "readwrite")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IDBStorage.prototype.delete = function (key, ignore) {
        if (ignore === void 0) { ignore = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof indexedDB === "undefined")
                            return [2 /*return*/];
                        if (!ignore && this.keys.has(key))
                            this.keys.delete(key);
                        return [4 /*yield*/, this.transact(function (store) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, new Promise(function (ok, err) {
                                                var req = store.delete(key);
                                                req.onerror = function () { return err(req.error); };
                                                req.onsuccess = function () { return ok(); };
                                            })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, "readwrite")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return IDBStorage;
}());

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
function useAsyncLocalStorage(prefix, serializer) {
    var storage = useRef();
    if (!storage.current)
        storage.current = new AsyncLocalStorage(prefix, serializer);
    useEffect(function () { return function () {
        storage.current.unmount();
    }; }, []);
    return storage.current;
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
var AsyncLocalStorage = /** @class */ (function () {
    function AsyncLocalStorage(prefix, serializer) {
        if (prefix === void 0) { prefix = "xswr:"; }
        if (serializer === void 0) { serializer = JSON; }
        var _this = this;
        this.prefix = prefix;
        this.serializer = serializer;
        this.async = true;
        this.keys = new Set();
        if (typeof Storage === "undefined")
            return;
        this.onunload = function () { return _this.collect(); };
        addEventListener("beforeunload", this.onunload);
    }
    AsyncLocalStorage.prototype.unmount = function () {
        var _this = this;
        if (typeof Storage === "undefined")
            return;
        removeEventListener("beforeunload", this.onunload);
        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.collect()];
        }); }); })().catch(console.error);
    };
    AsyncLocalStorage.prototype.collect = function () {
        var e_1, _a;
        if (typeof Storage === "undefined")
            return;
        try {
            for (var _b = __values(this.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var state = this.getSync(key, true);
                if ((state === null || state === void 0 ? void 0 : state.expiration) === undefined)
                    continue;
                if (state.expiration > Date.now())
                    continue;
                this.delete(key, false);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    AsyncLocalStorage.prototype.getSync = function (key, ignore) {
        if (ignore === void 0) { ignore = false; }
        if (typeof Storage === "undefined")
            return;
        if (!ignore && !this.keys.has(key))
            this.keys.add(key);
        var item = localStorage.getItem(this.prefix + key);
        if (item)
            return this.serializer.parse(item);
    };
    AsyncLocalStorage.prototype.get = function (key, ignore) {
        if (ignore === void 0) { ignore = false; }
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                if (typeof Storage === "undefined")
                    return [2 /*return*/];
                if (!ignore && !this.keys.has(key))
                    this.keys.add(key);
                item = localStorage.getItem(this.prefix + key);
                if (item)
                    return [2 /*return*/, this.serializer.parse(item)];
                return [2 /*return*/];
            });
        });
    };
    AsyncLocalStorage.prototype.set = function (key, value, ignore) {
        if (ignore === void 0) { ignore = false; }
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                if (typeof Storage === "undefined")
                    return [2 /*return*/];
                if (!ignore && !this.keys.has(key))
                    this.keys.add(key);
                item = this.serializer.stringify(value);
                localStorage.setItem(this.prefix + key, item);
                return [2 /*return*/];
            });
        });
    };
    AsyncLocalStorage.prototype.delete = function (key, ignore) {
        if (ignore === void 0) { ignore = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof Storage === "undefined")
                    return [2 /*return*/];
                if (!ignore && this.keys.has(key))
                    this.keys.delete(key);
                localStorage.removeItem(this.prefix + key);
                return [2 /*return*/];
            });
        });
    };
    return AsyncLocalStorage;
}());

/**
 * Synchronous local storage
 *
 * Do NOT use with SSR, it will create hydratation errors
 * Do NOT use for storing large objects, it will harm performances
 *
 * Will display data on first render
 *
 * @see AsyncLocalStorage
 */
function useSyncLocalStorage(prefix, serializer) {
    var storage = useRef();
    if (!storage.current)
        storage.current = new SyncLocalStorage(prefix, serializer);
    useEffect(function () { return function () {
        storage.current.unmount();
    }; }, []);
    return storage.current;
}
/**
 * Synchronous local storage
 *
 * Do NOT use with SSR, it will create hydratation errors
 * Do NOT use for storing large objects, it will harm performances
 *
 * Will display data on first render
 *
 * @see AsyncLocalStorage
 */
var SyncLocalStorage = /** @class */ (function () {
    function SyncLocalStorage(prefix, serializer) {
        if (prefix === void 0) { prefix = "xswr:"; }
        if (serializer === void 0) { serializer = JSON; }
        var _this = this;
        this.prefix = prefix;
        this.serializer = serializer;
        this.async = false;
        this.keys = new Set();
        if (typeof Storage === "undefined")
            return;
        this.onunload = function () { return _this.collect(); };
        addEventListener("beforeunload", this.onunload);
    }
    SyncLocalStorage.prototype.unmount = function () {
        var _this = this;
        if (typeof Storage === "undefined")
            return;
        removeEventListener("beforeunload", this.onunload);
        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.collect()];
        }); }); })().catch(console.error);
    };
    SyncLocalStorage.prototype.collect = function () {
        var e_1, _a;
        if (typeof Storage === "undefined")
            return;
        try {
            for (var _b = __values(this.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var state = this.get(key, true);
                if ((state === null || state === void 0 ? void 0 : state.expiration) === undefined)
                    continue;
                if (state.expiration > Date.now())
                    continue;
                this.delete(key, false);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    SyncLocalStorage.prototype.get = function (key, ignore) {
        if (ignore === void 0) { ignore = false; }
        if (typeof Storage === "undefined")
            return;
        if (!ignore && !this.keys.has(key))
            this.keys.add(key);
        var item = localStorage.getItem(this.prefix + key);
        if (item)
            return this.serializer.parse(item);
    };
    SyncLocalStorage.prototype.set = function (key, value, ignore) {
        if (ignore === void 0) { ignore = false; }
        if (typeof Storage === "undefined")
            return;
        if (!ignore && !this.keys.has(key))
            this.keys.add(key);
        var item = this.serializer.stringify(value);
        localStorage.setItem(this.prefix + key, item);
    };
    SyncLocalStorage.prototype.delete = function (key, ignore) {
        if (ignore === void 0) { ignore = false; }
        if (typeof Storage === "undefined")
            return;
        if (!ignore && this.keys.has(key))
            this.keys.delete(key);
        localStorage.removeItem(this.prefix + key);
    };
    return SyncLocalStorage;
}());

var index = {
    __proto__: null,
    Core: Core,
    AbortError: AbortError,
    isAbortError: isAbortError,
    CoreContext: CoreContext,
    useCore: useCore,
    useCoreProvider: useCoreProvider,
    CoreProvider: CoreProvider,
    ParamsContext: ParamsContext,
    useParams: useParams,
    useParamsProvider: useParamsProvider,
    ParamsProvider: ParamsProvider,
    useDebug: useDebug,
    useError: useError,
    useFallback: useFallback,
    useFetch: useFetch,
    useInterval: useInterval,
    useMount: useMount,
    useOnce: useOnce,
    useOnline: useOnline,
    useRetry: useRetry,
    useVisible: useVisible,
    use: use,
    useScroll: useScroll,
    useSingle: useSingle,
    useXSWR: useXSWR,
    ScrollHelper: ScrollHelper,
    getScrollStorageKey: getScrollStorageKey,
    ScrollObject: ScrollObject,
    scroll: scroll,
    ScrollSchema: ScrollSchema,
    SingleHelper: SingleHelper,
    getSingleStorageKey: getSingleStorageKey,
    SingleObject: SingleObject,
    single: single,
    SingleSchema: SingleSchema,
    useIDBStorage: useIDBStorage,
    IDBStorage: IDBStorage,
    useAsyncLocalStorage: useAsyncLocalStorage,
    AsyncLocalStorage: AsyncLocalStorage,
    useSyncLocalStorage: useSyncLocalStorage,
    SyncLocalStorage: SyncLocalStorage,
    isAsyncStorage: isAsyncStorage,
    DEFAULT_EQUALS: DEFAULT_EQUALS,
    DEFAULT_SERIALIZER: DEFAULT_SERIALIZER,
    DEFAULT_COOLDOWN: DEFAULT_COOLDOWN,
    DEFAULT_EXPIRATION: DEFAULT_EXPIRATION,
    DEFAULT_TIMEOUT: DEFAULT_TIMEOUT,
    refEquals: refEquals,
    jsonEquals: jsonEquals,
    shallowEquals: shallowEquals
};

export { index as XSWR };
