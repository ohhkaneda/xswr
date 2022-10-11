'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('./core.cjs');
var abort = require('./errors/abort.cjs');
var core$1 = require('./react/contexts/core.cjs');
var useDebug = require('./react/hooks/blocks/use-debug.cjs');
var useError = require('./react/hooks/blocks/use-error.cjs');
var useFallback = require('./react/hooks/blocks/use-fallback.cjs');
var useFetch = require('./react/hooks/blocks/use-fetch.cjs');
var useInterval = require('./react/hooks/blocks/use-interval.cjs');
var useMount = require('./react/hooks/blocks/use-mount.cjs');
var useOnce = require('./react/hooks/blocks/use-once.cjs');
var useOnline = require('./react/hooks/blocks/use-online.cjs');
var useRetry = require('./react/hooks/blocks/use-retry.cjs');
var useVisible = require('./react/hooks/blocks/use-visible.cjs');
var router = require('./react/hooks/handles/router.cjs');
var scroll = require('./react/hooks/handles/scroll.cjs');
var single = require('./react/hooks/handles/single.cjs');
var xswr = require('./react/hooks/xswr.cjs');
var helper = require('./scroll/helper.cjs');
var object = require('./scroll/object.cjs');
var schema = require('./scroll/schema.cjs');
var helper$1 = require('./single/helper.cjs');
var object$1 = require('./single/object.cjs');
var schema$1 = require('./single/schema.cjs');
var async = require('./storages/idb/async.cjs');
var async$1 = require('./storages/localStorage/async.cjs');
var sync = require('./storages/localStorage/sync.cjs');
var storage = require('./types/storage.cjs');
var defaults = require('./utils/defaults.cjs');
var equals = require('./utils/equals.cjs');



exports.Core = core.Core;
exports.AbortError = abort.AbortError;
exports.isAbortError = abort.isAbortError;
exports.CoreContext = core$1.CoreContext;
exports.CoreProvider = core$1.CoreProvider;
exports.useCore = core$1.useCore;
exports.useCoreProvider = core$1.useCoreProvider;
exports.useDebug = useDebug.useDebug;
exports.useError = useError.useError;
exports.useFallback = useFallback.useFallback;
exports.useFetch = useFetch.useFetch;
exports.useInterval = useInterval.useInterval;
exports.useMount = useMount.useMount;
exports.useOnce = useOnce.useOnce;
exports.useOnline = useOnline.useOnline;
exports.useRetry = useRetry.useRetry;
exports.useVisible = useVisible.useVisible;
exports.use = router.use;
exports.useScroll = scroll.useScroll;
exports.useSingle = single.useSingle;
exports.useXSWR = xswr.useXSWR;
exports.ScrollHelper = helper.ScrollHelper;
exports.ScrollObject = object.ScrollObject;
exports.getScrollStorageKey = object.getScrollStorageKey;
exports.ScrollSchema = schema.ScrollSchema;
exports.scroll = schema.scroll;
exports.SingleHelper = helper$1.SingleHelper;
exports.SingleObject = object$1.SingleObject;
exports.getSingleStorageKey = object$1.getSingleStorageKey;
exports.SingleSchema = schema$1.SingleSchema;
exports.single = schema$1.single;
exports.IDBStorage = async.IDBStorage;
exports.useIDBStorage = async.useIDBStorage;
exports.AsyncLocalStorage = async$1.AsyncLocalStorage;
exports.useAsyncLocalStorage = async$1.useAsyncLocalStorage;
exports.SyncLocalStorage = sync.SyncLocalStorage;
exports.useSyncLocalStorage = sync.useSyncLocalStorage;
exports.isAsyncStorage = storage.isAsyncStorage;
exports.DEFAULT_COOLDOWN = defaults.DEFAULT_COOLDOWN;
exports.DEFAULT_EQUALS = defaults.DEFAULT_EQUALS;
exports.DEFAULT_EXPIRATION = defaults.DEFAULT_EXPIRATION;
exports.DEFAULT_SERIALIZER = defaults.DEFAULT_SERIALIZER;
exports.DEFAULT_TIMEOUT = defaults.DEFAULT_TIMEOUT;
exports.jsonEquals = equals.jsonEquals;
exports.refEquals = equals.refEquals;
exports.shallowEquals = equals.shallowEquals;
