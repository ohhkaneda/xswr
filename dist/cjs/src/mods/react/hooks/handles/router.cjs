'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.cjs');
var schema$1 = require('../../../scroll/schema.cjs');
var schema = require('../../../single/schema.cjs');
var React = require('react');
var scroll = require('./scroll.cjs');
var single = require('./single.cjs');

function use(factory, deps) {
    var schema$2 = React.useMemo(function () {
        return factory.apply(void 0, tslib_es6.__spreadArray([], tslib_es6.__read(deps), false));
    }, deps);
    if (schema$2 instanceof schema.SingleSchema) {
        var key = schema$2.key, fetcher = schema$2.fetcher, params = schema$2.params;
        return single.useSingle(key, fetcher, params);
    }
    if (schema$2 instanceof schema$1.ScrollSchema) {
        var scroller = schema$2.scroller, fetcher = schema$2.fetcher, params = schema$2.params;
        return scroll.useScroll(scroller, fetcher, params);
    }
    throw new Error("Invalid resource schema");
}

exports.use = use;
