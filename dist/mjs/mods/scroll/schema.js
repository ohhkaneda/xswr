import { __awaiter, __generator } from 'tslib';
import { ScrollInstance } from './instance.js';

function getScrollSchema(scroller, fetcher, params) {
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
    ScrollSchema.prototype.make = function (core) {
        var _a = this, scroller = _a.scroller, fetcher = _a.fetcher, params = _a.params;
        return new ScrollInstance(core, scroller, fetcher, params);
    };
    ScrollSchema.prototype.normalize = function (data, more) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, time, cooldown, expiration, optimistic, state;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (more.shallow)
                            return [2 /*return*/];
                        _a = more.root, time = _a.time, cooldown = _a.cooldown, expiration = _a.expiration, optimistic = _a.optimistic;
                        state = { data: data, time: time, cooldown: cooldown, expiration: expiration, optimistic: optimistic };
                        return [4 /*yield*/, this.make(more.core).mutate(function () { return state; })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ScrollSchema;
}());

export { ScrollSchema, getScrollSchema };
//# sourceMappingURL=schema.js.map