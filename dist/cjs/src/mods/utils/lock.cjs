'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.cjs');

var Lock = /** @class */ (function () {
    function Lock() {
    }
    Lock.prototype.lock = function (callback) {
        return tslib_es6.__awaiter(this, void 0, void 0, function () {
            var promise;
            return tslib_es6.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.mutex) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mutex];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        promise = callback();
                        this.mutex = promise;
                        return [4 /*yield*/, promise];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Lock;
}());

exports.Lock = Lock;
