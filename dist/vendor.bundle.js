webpackJsonp([1],{

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_wrapped_exception_1 = __webpack_require__(309);
var exception_handler_1 = __webpack_require__(310);
var exception_handler_2 = __webpack_require__(310);
exports.ExceptionHandler = exception_handler_2.ExceptionHandler;
/**
 * @stable
 */
var BaseException = (function (_super) {
    __extends(BaseException, _super);
    function BaseException(message) {
        if (message === void 0) { message = '--'; }
        _super.call(this, message);
        this.message = message;
        this.stack = (new Error(message)).stack;
    }
    BaseException.prototype.toString = function () { return this.message; };
    return BaseException;
}(Error));
exports.BaseException = BaseException;
/**
 * Wraps an exception and provides additional context or information.
 * @stable
 */
var WrappedException = (function (_super) {
    __extends(WrappedException, _super);
    function WrappedException(_wrapperMessage, _originalException /** TODO #9100 */, _originalStack /** TODO #9100 */, _context /** TODO #9100 */) {
        _super.call(this, _wrapperMessage);
        this._wrapperMessage = _wrapperMessage;
        this._originalException = _originalException;
        this._originalStack = _originalStack;
        this._context = _context;
        this._wrapperStack = (new Error(_wrapperMessage)).stack;
    }
    Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
        get: function () { return this._wrapperMessage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "wrapperStack", {
        get: function () { return this._wrapperStack; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalException", {
        get: function () { return this._originalException; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalStack", {
        get: function () { return this._originalStack; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "context", {
        get: function () { return this._context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "message", {
        get: function () { return exception_handler_1.ExceptionHandler.exceptionToString(this); },
        enumerable: true,
        configurable: true
    });
    WrappedException.prototype.toString = function () { return this.message; };
    return WrappedException;
}(base_wrapped_exception_1.BaseWrappedException));
exports.WrappedException = WrappedException;
function makeTypeError(message) {
    return new TypeError(message);
}
exports.makeTypeError = makeTypeError;
function unimplemented() {
    throw new BaseException('unimplemented');
}
exports.unimplemented = unimplemented;
//# sourceMappingURL=exceptions.js.map

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var exceptions_1 = __webpack_require__(102);
var lang_1 = __webpack_require__(25);
var collection_1 = __webpack_require__(203);
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example ([live demo](http://plnkr.co/edit/MTdwT6?p=preview))
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 */
var Headers = (function () {
    function Headers(headers) {
        var _this = this;
        if (headers instanceof Headers) {
            this._headersMap = headers._headersMap;
            return;
        }
        this._headersMap = new collection_1.Map();
        if (lang_1.isBlank(headers)) {
            return;
        }
        // headers instanceof StringMap
        collection_1.StringMapWrapper.forEach(headers, function (v, k) {
            _this._headersMap.set(k, collection_1.isListLikeIterable(v) ? v : [v]);
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    Headers.fromResponseHeaderString = function (headersString) {
        return headersString.trim()
            .split('\n')
            .map(function (val) { return val.split(':'); })
            .map(function (_a) {
            var key = _a[0], parts = _a.slice(1);
            return ([key.trim(), parts.join(':').trim()]);
        })
            .reduce(function (headers, _a) {
            var key = _a[0], value = _a[1];
            return !headers.set(key, value) && headers;
        }, new Headers());
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    Headers.prototype.append = function (name, value) {
        var mapName = this._headersMap.get(name);
        var list = collection_1.isListLikeIterable(mapName) ? mapName : [];
        list.push(value);
        this._headersMap.set(name, list);
    };
    /**
     * Deletes all header values for the given name.
     */
    Headers.prototype.delete = function (name) { this._headersMap.delete(name); };
    Headers.prototype.forEach = function (fn) {
        this._headersMap.forEach(fn);
    };
    /**
     * Returns first header that matches given name.
     */
    Headers.prototype.get = function (header) { return collection_1.ListWrapper.first(this._headersMap.get(header)); };
    /**
     * Check for existence of header by given name.
     */
    Headers.prototype.has = function (header) { return this._headersMap.has(header); };
    /**
     * Provides names of set headers
     */
    Headers.prototype.keys = function () { return collection_1.MapWrapper.keys(this._headersMap); };
    /**
     * Sets or overrides header value for given name.
     */
    Headers.prototype.set = function (header, value) {
        var list = [];
        if (collection_1.isListLikeIterable(value)) {
            var pushValue = value.join(',');
            list.push(pushValue);
        }
        else {
            list.push(value);
        }
        this._headersMap.set(header, list);
    };
    /**
     * Returns values of all headers.
     */
    Headers.prototype.values = function () { return collection_1.MapWrapper.values(this._headersMap); };
    /**
     * Returns string of all headers.
     */
    Headers.prototype.toJSON = function () {
        var serializableHeaders = {};
        this._headersMap.forEach(function (values, name) {
            var list = [];
            collection_1.iterateListLike(values, function (val /** TODO #9100 */) { return list = collection_1.ListWrapper.concat(list, val.split(',')); });
            serializableHeaders[name] = list;
        });
        return serializableHeaders;
    };
    /**
     * Returns list of header values for a given name.
     */
    Headers.prototype.getAll = function (header) {
        var headers = this._headersMap.get(header);
        return collection_1.isListLikeIterable(headers) ? headers : [];
    };
    /**
     * This method is not implemented.
     */
    Headers.prototype.entries = function () { throw new exceptions_1.BaseException('"entries" method is not implemented on Headers class'); };
    return Headers;
}());
exports.Headers = Headers;
//# sourceMappingURL=headers.js.map

/***/ },

/***/ 104:
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 */
var ConnectionBackend = (function () {
    function ConnectionBackend() {
    }
    return ConnectionBackend;
}());
exports.ConnectionBackend = ConnectionBackend;
/**
 * Abstract class from which real connections are derived.
 */
var Connection = (function () {
    function Connection() {
    }
    return Connection;
}());
exports.Connection = Connection;
/** An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request. */
var XSRFStrategy = (function () {
    function XSRFStrategy() {
    }
    return XSRFStrategy;
}());
exports.XSRFStrategy = XSRFStrategy;
//# sourceMappingURL=interfaces.js.map

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = __webpack_require__(0);
var lang_1 = __webpack_require__(25);
var enums_1 = __webpack_require__(58);
var headers_1 = __webpack_require__(103);
/**
 * Creates a response options object to be optionally provided when instantiating a
 * {@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {@link Response Responses} for
 * mock responses (see {@link MockBackend}).
 *
 * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
 *
 * ```typescript
 * import {ResponseOptions, Response} from '@angular/http';
 *
 * var options = new ResponseOptions({
 *   body: '{"name":"Jeff"}'
 * });
 * var res = new Response(options);
 *
 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
 * ```
 */
var ResponseOptions = (function () {
    function ResponseOptions(_a) {
        var _b = _a === void 0 ? {} : _a, body = _b.body, status = _b.status, headers = _b.headers, statusText = _b.statusText, type = _b.type, url = _b.url;
        this.body = lang_1.isPresent(body) ? body : null;
        this.status = lang_1.isPresent(status) ? status : null;
        this.headers = lang_1.isPresent(headers) ? headers : null;
        this.statusText = lang_1.isPresent(statusText) ? statusText : null;
        this.type = lang_1.isPresent(type) ? type : null;
        this.url = lang_1.isPresent(url) ? url : null;
    }
    /**
     * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
     * override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * This may be useful when sharing a base `ResponseOptions` object inside tests,
     * where certain properties may change from test to test.
     *
     * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
     *
     * ```typescript
     * import {ResponseOptions, Response} from '@angular/http';
     *
     * var options = new ResponseOptions({
     *   body: {name: 'Jeff'}
     * });
     * var res = new Response(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('options.url:', options.url); // null
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * console.log('res.url:', res.url); // https://google.com
     * ```
     */
    ResponseOptions.prototype.merge = function (options) {
        return new ResponseOptions({
            body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
            status: lang_1.isPresent(options) && lang_1.isPresent(options.status) ? options.status : this.status,
            headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
            statusText: lang_1.isPresent(options) && lang_1.isPresent(options.statusText) ? options.statusText :
                this.statusText,
            type: lang_1.isPresent(options) && lang_1.isPresent(options.type) ? options.type : this.type,
            url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
        });
    };
    return ResponseOptions;
}());
exports.ResponseOptions = ResponseOptions;
var BaseResponseOptions = (function (_super) {
    __extends(BaseResponseOptions, _super);
    function BaseResponseOptions() {
        _super.call(this, { status: 200, statusText: 'Ok', type: enums_1.ResponseType.Default, headers: new headers_1.Headers() });
    }
    /** @nocollapse */
    BaseResponseOptions.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    BaseResponseOptions.ctorParameters = [];
    return BaseResponseOptions;
}(ResponseOptions));
exports.BaseResponseOptions = BaseResponseOptions;
//# sourceMappingURL=base_response_options.js.map

/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var exceptions_1 = __webpack_require__(102);
var lang_1 = __webpack_require__(25);
var enums_1 = __webpack_require__(58);
function normalizeMethodName(method) {
    if (lang_1.isString(method)) {
        var originalMethod = method;
        method = method
            .replace(/(\w)(\w*)/g, function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
        method = enums_1.RequestMethod[method];
        if (typeof method !== 'number')
            throw exceptions_1.makeTypeError("Invalid request method. The method \"" + originalMethod + "\" is not supported.");
    }
    return method;
}
exports.normalizeMethodName = normalizeMethodName;
exports.isSuccess = function (status) { return (status >= 200 && status < 300); };
function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return;
}
exports.getResponseURL = getResponseURL;
var lang_2 = __webpack_require__(25);
exports.isJsObject = lang_2.isJsObject;
//# sourceMappingURL=http_utils.js.map

/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
__webpack_require__(356);
__webpack_require__(643);
__webpack_require__(642);
__webpack_require__(641);
__webpack_require__(640);
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(10);
var Subject_1 = __webpack_require__(32);
var of_1 = __webpack_require__(237);
var apply_redirects_1 = __webpack_require__(471);
var config_1 = __webpack_require__(473);
var create_router_state_1 = __webpack_require__(474);
var create_url_tree_1 = __webpack_require__(475);
var recognize_1 = __webpack_require__(478);
var resolve_1 = __webpack_require__(479);
var router_outlet_map_1 = __webpack_require__(143);
var router_state_1 = __webpack_require__(89);
var shared_1 = __webpack_require__(60);
var url_tree_1 = __webpack_require__(61);
var collection_1 = __webpack_require__(90);
/**
 * An event triggered when a navigation starts
 */
var NavigationStart = (function () {
    function NavigationStart(id, url) {
        this.id = id;
        this.url = url;
    }
    NavigationStart.prototype.toString = function () { return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationStart;
}());
exports.NavigationStart = NavigationStart;
/**
 * An event triggered when a navigation ends successfully
 */
var NavigationEnd = (function () {
    function NavigationEnd(id, url, urlAfterRedirects) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
    }
    NavigationEnd.prototype.toString = function () {
        return "NavigationEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "')";
    };
    return NavigationEnd;
}());
exports.NavigationEnd = NavigationEnd;
/**
 * An event triggered when a navigation is canceled
 */
var NavigationCancel = (function () {
    function NavigationCancel(id, url) {
        this.id = id;
        this.url = url;
    }
    NavigationCancel.prototype.toString = function () { return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationCancel;
}());
exports.NavigationCancel = NavigationCancel;
/**
 * An event triggered when a navigation fails due to unexpected error
 */
var NavigationError = (function () {
    function NavigationError(id, url, error) {
        this.id = id;
        this.url = url;
        this.error = error;
    }
    NavigationError.prototype.toString = function () {
        return "NavigationError(id: " + this.id + ", url: '" + this.url + "', error: " + this.error + ")";
    };
    return NavigationError;
}());
exports.NavigationError = NavigationError;
/**
 * An event triggered when routes are recognized
 */
var RoutesRecognized = (function () {
    function RoutesRecognized(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    RoutesRecognized.prototype.toString = function () {
        return "RoutesRecognized(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return RoutesRecognized;
}());
exports.RoutesRecognized = RoutesRecognized;
/**
 * The `Router` is responsible for mapping URLs to components.
 */
var Router = (function () {
    /**
     * @internal
     */
    function Router(rootComponentType, resolver, urlSerializer, outletMap, location, injector, config) {
        this.rootComponentType = rootComponentType;
        this.resolver = resolver;
        this.urlSerializer = urlSerializer;
        this.outletMap = outletMap;
        this.location = location;
        this.injector = injector;
        this.navigationId = 0;
        this.resetConfig(config);
        this.routerEvents = new Subject_1.Subject();
        this.currentUrlTree = url_tree_1.createEmptyUrlTree();
        this.currentRouterState = router_state_1.createEmptyState(this.currentUrlTree, this.rootComponentType);
    }
    /**
     * @internal
     */
    Router.prototype.initialNavigation = function () {
        this.setUpLocationChangeListener();
        this.navigateByUrl(this.location.path());
    };
    Object.defineProperty(Router.prototype, "routerState", {
        /**
         * Returns the current route state.
         */
        get: function () { return this.currentRouterState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "url", {
        /**
         * Returns the current url.
         */
        get: function () { return this.serializeUrl(this.currentUrlTree); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "events", {
        /**
         * Returns an observable of route events
         */
        get: function () { return this.routerEvents; },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the configuration used for navigation and generating links.
     *
     * ### Usage
     *
     * ```
     * router.resetConfig([
     *  { path: 'team/:id', component: TeamCmp, children: [
     *    { path: 'simple', component: SimpleCmp },
     *    { path: 'user/:name', component: UserCmp }
     *  ] }
     * ]);
     * ```
     */
    Router.prototype.resetConfig = function (config) {
        config_1.validateConfig(config);
        this.config = config;
    };
    /**
     * @internal
     */
    Router.prototype.dispose = function () { this.locationSubscription.unsubscribe(); };
    /**
     * Applies an array of commands to the current url tree and creates
     * a new url tree.
     *
     * When given an activate route, applies the given commands starting from the route.
     * When not given a route, applies the given command starting from the root.
     *
     * ### Usage
     *
     * ```
     * // create /team/33/user/11
     * router.createUrlTree(['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static fragments like this
     * router.createUrlTree(['/team/33/user', userId]);
     *
     * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
     *
     * // navigate to /team/33/user/11/details
     * router.createUrlTree(['details'], {relativeTo: route});
     *
     * // navigate to /team/33/user/22
     * router.createUrlTree(['../22'], {relativeTo: route});
     *
     * // navigate to /team/44/user/22
     * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
     * ```
     */
    Router.prototype.createUrlTree = function (commands, _a) {
        var _b = _a === void 0 ? {} : _a, relativeTo = _b.relativeTo, queryParams = _b.queryParams, fragment = _b.fragment;
        var a = relativeTo ? relativeTo : this.routerState.root;
        return create_url_tree_1.createUrlTree(a, this.currentUrlTree, commands, queryParams, fragment);
    };
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * Returns a promise that:
     * - is resolved with 'true' when navigation succeeds
     * - is resolved with 'false' when navigation fails
     * - is rejected when an error happens
     *
     * ### Usage
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     * ```
     */
    Router.prototype.navigateByUrl = function (url) {
        if (url instanceof url_tree_1.UrlTree) {
            return this.scheduleNavigation(url, false);
        }
        else {
            var urlTree = this.urlSerializer.parse(url);
            return this.scheduleNavigation(urlTree, false);
        }
    };
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no starting route is provided, the navigation is absolute.
     *
     * Returns a promise that:
     * - is resolved with 'true' when navigation succeeds
     * - is resolved with 'false' when navigation fails
     * - is rejected when an error happens
     *
     * ### Usage
     *
     * ```
     * router.navigate(['team', 33, 'team', '11], {relativeTo: route});
     * ```
     */
    Router.prototype.navigate = function (commands, extras) {
        if (extras === void 0) { extras = {}; }
        return this.scheduleNavigation(this.createUrlTree(commands, extras), false);
    };
    /**
     * Serializes a {@link UrlTree} into a string.
     */
    Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
    /**
     * Parse a string into a {@link UrlTree}.
     */
    Router.prototype.parseUrl = function (url) { return this.urlSerializer.parse(url); };
    Router.prototype.scheduleNavigation = function (url, preventPushState) {
        var _this = this;
        var id = ++this.navigationId;
        this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
        return Promise.resolve().then(function (_) { return _this.runNavigate(url, preventPushState, id); });
    };
    Router.prototype.setUpLocationChangeListener = function () {
        var _this = this;
        this.locationSubscription = this.location.subscribe(function (change) {
            return _this.scheduleNavigation(_this.urlSerializer.parse(change['url']), change['pop']);
        });
    };
    Router.prototype.runNavigate = function (url, preventPushState, id) {
        var _this = this;
        if (id !== this.navigationId) {
            this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
            this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url)));
            return Promise.resolve(false);
        }
        return new Promise(function (resolvePromise, rejectPromise) {
            var updatedUrl;
            var state;
            apply_redirects_1.applyRedirects(url, _this.config)
                .mergeMap(function (u) {
                updatedUrl = u;
                return recognize_1.recognize(_this.rootComponentType, _this.config, updatedUrl, _this.serializeUrl(updatedUrl));
            })
                .mergeMap(function (newRouterStateSnapshot) {
                _this.routerEvents.next(new RoutesRecognized(id, _this.serializeUrl(url), _this.serializeUrl(updatedUrl), newRouterStateSnapshot));
                return resolve_1.resolve(_this.resolver, newRouterStateSnapshot);
            })
                .map(function (routerStateSnapshot) {
                return create_router_state_1.createRouterState(routerStateSnapshot, _this.currentRouterState);
            })
                .map(function (newState) {
                state = newState;
            })
                .mergeMap(function (_) {
                return new GuardChecks(state.snapshot, _this.currentRouterState.snapshot, _this.injector)
                    .check(_this.outletMap);
            })
                .forEach(function (shouldActivate) {
                if (!shouldActivate || id !== _this.navigationId) {
                    _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url)));
                    return Promise.resolve(false);
                }
                new ActivateRoutes(state, _this.currentRouterState).activate(_this.outletMap);
                _this.currentUrlTree = updatedUrl;
                _this.currentRouterState = state;
                if (!preventPushState) {
                    var path = _this.urlSerializer.serialize(updatedUrl);
                    if (_this.location.isCurrentPathEqualTo(path)) {
                        _this.location.replaceState(path);
                    }
                    else {
                        _this.location.go(path);
                    }
                }
                return Promise.resolve(true);
            })
                .then(function () {
                _this.routerEvents.next(new NavigationEnd(id, _this.serializeUrl(url), _this.serializeUrl(updatedUrl)));
                resolvePromise(true);
            }, function (e) {
                _this.routerEvents.next(new NavigationError(id, _this.serializeUrl(url), e));
                rejectPromise(e);
            });
        });
    };
    return Router;
}());
exports.Router = Router;
var CanActivate = (function () {
    function CanActivate(route) {
        this.route = route;
    }
    return CanActivate;
}());
var CanDeactivate = (function () {
    function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
    }
    return CanDeactivate;
}());
var GuardChecks = (function () {
    function GuardChecks(future, curr, injector) {
        this.future = future;
        this.curr = curr;
        this.injector = injector;
        this.checks = [];
    }
    GuardChecks.prototype.check = function (parentOutletMap) {
        var _this = this;
        var futureRoot = this.future._root;
        var currRoot = this.curr ? this.curr._root : null;
        this.traverseChildRoutes(futureRoot, currRoot, parentOutletMap);
        if (this.checks.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(this.checks)
            .map(function (s) {
            if (s instanceof CanActivate) {
                return _this.runCanActivate(s.route);
            }
            else if (s instanceof CanDeactivate) {
                return _this.runCanDeactivate(s.component, s.route);
            }
            else {
                throw new Error('Cannot be reached');
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    GuardChecks.prototype.traverseChildRoutes = function (futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.traverseRoutes(c, prevChildren[c.value.outlet], outletMap);
            delete prevChildren[c.value.outlet];
        });
        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(v, outletMap._outlets[k]); });
    };
    GuardChecks.prototype.traverseRoutes = function (futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        var outlet = parentOutletMap ? parentOutletMap._outlets[futureNode.value.outlet] : null;
        // reusing the node
        if (curr && future._routeConfig === curr._routeConfig) {
            if (!collection_1.shallowEqual(future.params, curr.params)) {
                this.checks.push(new CanDeactivate(outlet.component, curr), new CanActivate(future));
            }
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                this.traverseChildRoutes(futureNode, currNode, outlet ? outlet.outletMap : null);
            }
            else {
                this.traverseChildRoutes(futureNode, currNode, parentOutletMap);
            }
        }
        else {
            if (curr) {
                // if we had a normal route, we need to deactivate only that outlet.
                if (curr.component) {
                    this.deactivateOutletAndItChildren(curr, outlet);
                }
                else {
                    this.deactivateOutletMap(parentOutletMap);
                }
            }
            this.checks.push(new CanActivate(future));
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                this.traverseChildRoutes(futureNode, null, outlet ? outlet.outletMap : null);
            }
            else {
                this.traverseChildRoutes(futureNode, null, parentOutletMap);
            }
        }
    };
    GuardChecks.prototype.deactivateOutletAndItChildren = function (route, outlet) {
        if (outlet && outlet.isActivated) {
            this.deactivateOutletMap(outlet.outletMap);
            this.checks.push(new CanDeactivate(outlet.component, route));
        }
    };
    GuardChecks.prototype.deactivateOutletMap = function (outletMap) {
        var _this = this;
        collection_1.forEach(outletMap._outlets, function (v) {
            if (v.isActivated) {
                _this.deactivateOutletAndItChildren(v.activatedRoute.snapshot, v);
            }
        });
    };
    GuardChecks.prototype.runCanActivate = function (future) {
        var _this = this;
        var canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
        if (!canActivate || canActivate.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(canActivate)
            .map(function (c) {
            var guard = _this.injector.get(c);
            if (guard.canActivate) {
                return wrapIntoObservable(guard.canActivate(future, _this.future));
            }
            else {
                return wrapIntoObservable(guard(future, _this.future));
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    GuardChecks.prototype.runCanDeactivate = function (component, curr) {
        var _this = this;
        var canDeactivate = curr && curr._routeConfig ? curr._routeConfig.canDeactivate : null;
        if (!canDeactivate || canDeactivate.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(canDeactivate)
            .map(function (c) {
            var guard = _this.injector.get(c);
            if (guard.canDeactivate) {
                return wrapIntoObservable(guard.canDeactivate(component, curr, _this.curr));
            }
            else {
                return wrapIntoObservable(guard(component, curr, _this.curr));
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    return GuardChecks;
}());
function wrapIntoObservable(value) {
    if (value instanceof Observable_1.Observable) {
        return value;
    }
    else {
        return of_1.of(value);
    }
}
var ActivateRoutes = (function () {
    function ActivateRoutes(futureState, currState) {
        this.futureState = futureState;
        this.currState = currState;
    }
    ActivateRoutes.prototype.activate = function (parentOutletMap) {
        var futureRoot = this.futureState._root;
        var currRoot = this.currState ? this.currState._root : null;
        pushQueryParamsAndFragment(this.futureState);
        this.activateChildRoutes(futureRoot, currRoot, parentOutletMap);
    };
    ActivateRoutes.prototype.activateChildRoutes = function (futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.activateRoutes(c, prevChildren[c.value.outlet], outletMap);
            delete prevChildren[c.value.outlet];
        });
        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(outletMap._outlets[k]); });
    };
    ActivateRoutes.prototype.activateRoutes = function (futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        // reusing the node
        if (future === curr) {
            // advance the route to push the parameters
            router_state_1.advanceActivatedRoute(future);
            // If we have a normal route, we need to go through an outlet.
            if (future.component) {
                var outlet = getOutlet(parentOutletMap, futureNode.value);
                this.activateChildRoutes(futureNode, currNode, outlet.outletMap);
            }
            else {
                this.activateChildRoutes(futureNode, currNode, parentOutletMap);
            }
        }
        else {
            if (curr) {
                // if we had a normal route, we need to deactivate only that outlet.
                if (curr.component) {
                    var outlet = getOutlet(parentOutletMap, futureNode.value);
                    this.deactivateOutletAndItChildren(outlet);
                }
                else {
                    this.deactivateOutletMap(parentOutletMap);
                }
            }
            // if we have a normal route, we need to advance the route
            // and place the component into the outlet. After that recurse.
            if (future.component) {
                router_state_1.advanceActivatedRoute(future);
                var outlet = getOutlet(parentOutletMap, futureNode.value);
                var outletMap = new router_outlet_map_1.RouterOutletMap();
                this.placeComponentIntoOutlet(outletMap, future, outlet);
                this.activateChildRoutes(futureNode, null, outletMap);
            }
            else {
                router_state_1.advanceActivatedRoute(future);
                this.activateChildRoutes(futureNode, null, parentOutletMap);
            }
        }
    };
    ActivateRoutes.prototype.placeComponentIntoOutlet = function (outletMap, future, outlet) {
        var resolved = core_1.ReflectiveInjector.resolve([
            { provide: router_state_1.ActivatedRoute, useValue: future },
            { provide: router_outlet_map_1.RouterOutletMap, useValue: outletMap }
        ]);
        outlet.activate(future._futureSnapshot._resolvedComponentFactory, future, resolved, outletMap);
    };
    ActivateRoutes.prototype.deactivateOutletAndItChildren = function (outlet) {
        if (outlet && outlet.isActivated) {
            this.deactivateOutletMap(outlet.outletMap);
            outlet.deactivate();
        }
    };
    ActivateRoutes.prototype.deactivateOutletMap = function (outletMap) {
        var _this = this;
        collection_1.forEach(outletMap._outlets, function (v) { return _this.deactivateOutletAndItChildren(v); });
    };
    return ActivateRoutes;
}());
function pushQueryParamsAndFragment(state) {
    if (!collection_1.shallowEqual(state.snapshot.queryParams, state.queryParams.value)) {
        state.queryParams.next(state.snapshot.queryParams);
    }
    if (state.snapshot.fragment !== state.fragment.value) {
        state.fragment.next(state.snapshot.fragment);
    }
}
function nodeChildrenAsMap(node) {
    return node ? node.children.reduce(function (m, c) {
        m[c.value.outlet] = c;
        return m;
    }, {}) : {};
}
function getOutlet(outletMap, route) {
    var outlet = outletMap._outlets[route.outlet];
    if (!outlet) {
        var componentName = route.component.name;
        if (route.outlet === shared_1.PRIMARY_OUTLET) {
            throw new Error("Cannot find primary outlet to load '" + componentName + "'");
        }
        else {
            throw new Error("Cannot find the outlet " + route.outlet + " to load '" + componentName + "'");
        }
    }
    return outlet;
}
//# sourceMappingURL=router.js.map

/***/ },

/***/ 143:
/***/ function(module, exports) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var RouterOutletMap = (function () {
    function RouterOutletMap() {
        /** @internal */
        this._outlets = {};
    }
    RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
    return RouterOutletMap;
}());
exports.RouterOutletMap = RouterOutletMap;
//# sourceMappingURL=router_outlet_map.js.map

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var BrowserXhr = (function () {
    function BrowserXhr() {
    }
    BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
    /** @nocollapse */
    BrowserXhr.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    BrowserXhr.ctorParameters = [];
    return BrowserXhr;
}());
exports.BrowserXhr = BrowserXhr;
//# sourceMappingURL=browser_xhr.js.map

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = __webpack_require__(0);
var lang_1 = __webpack_require__(25);
var enums_1 = __webpack_require__(58);
var headers_1 = __webpack_require__(103);
var http_utils_1 = __webpack_require__(136);
var url_search_params_1 = __webpack_require__(205);
/**
 * Creates a request options object to be optionally provided when instantiating a
 * {@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '@angular/http';
 *
 * var options = new RequestOptions({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * });
 * var req = new Request(options);
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // https://google.com
 * ```
 */
var RequestOptions = (function () {
    function RequestOptions(_a) {
        var _b = _a === void 0 ? {} : _a, method = _b.method, headers = _b.headers, body = _b.body, url = _b.url, search = _b.search, withCredentials = _b.withCredentials;
        this.method = lang_1.isPresent(method) ? http_utils_1.normalizeMethodName(method) : null;
        this.headers = lang_1.isPresent(headers) ? headers : null;
        this.body = lang_1.isPresent(body) ? body : null;
        this.url = lang_1.isPresent(url) ? url : null;
        this.search = lang_1.isPresent(search) ?
            (lang_1.isString(search) ? new url_search_params_1.URLSearchParams((search)) : (search)) :
            null;
        this.withCredentials = lang_1.isPresent(withCredentials) ? withCredentials : null;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * Note that `headers` and `search` will override existing values completely if present in
     * the `options` object. If these values should be merged, it should be done prior to calling
     * `merge` on the `RequestOptions` instance.
     *
     * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from '@angular/http';
     *
     * var options = new RequestOptions({
     *   method: RequestMethod.Post
     * });
     * var req = new Request(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     */
    RequestOptions.prototype.merge = function (options) {
        return new RequestOptions({
            method: lang_1.isPresent(options) && lang_1.isPresent(options.method) ? options.method : this.method,
            headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
            body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
            url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
            search: lang_1.isPresent(options) && lang_1.isPresent(options.search) ?
                (lang_1.isString(options.search) ? new url_search_params_1.URLSearchParams((options.search)) :
                    (options.search).clone()) :
                this.search,
            withCredentials: lang_1.isPresent(options) && lang_1.isPresent(options.withCredentials) ?
                options.withCredentials :
                this.withCredentials
        });
    };
    return RequestOptions;
}());
exports.RequestOptions = RequestOptions;
var BaseRequestOptions = (function (_super) {
    __extends(BaseRequestOptions, _super);
    function BaseRequestOptions() {
        _super.call(this, { method: enums_1.RequestMethod.Get, headers: new headers_1.Headers() });
    }
    /** @nocollapse */
    BaseRequestOptions.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    BaseRequestOptions.ctorParameters = [];
    return BaseRequestOptions;
}(RequestOptions));
exports.BaseRequestOptions = BaseRequestOptions;
//# sourceMappingURL=base_request_options.js.map

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var lang_1 = __webpack_require__(25);
exports.Map = lang_1.global.Map;
exports.Set = lang_1.global.Set;
// Safari and Internet Explorer do not support the iterable parameter to the
// Map constructor.  We work around that by manually adding the items.
var createMapFromPairs = (function () {
    try {
        if (new exports.Map([[1, 2]]).size === 1) {
            return function createMapFromPairs(pairs) { return new exports.Map(pairs); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromPairs(pairs) {
        var map = new exports.Map();
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
        }
        return map;
    };
})();
var createMapFromMap = (function () {
    try {
        if (new exports.Map(new exports.Map())) {
            return function createMapFromMap(m) { return new exports.Map(m); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var map = new exports.Map();
        m.forEach(function (v, k) { map.set(k, v); });
        return map;
    };
})();
var _clearValues = (function () {
    if ((new exports.Map()).keys().next) {
        return function _clearValues(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach(function (v, k) { m.set(k, null); });
        };
    }
})();
// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
var _arrayFromMap = (function () {
    try {
        if ((new exports.Map()).values().next) {
            return function createArrayFromMap(m, getValues) {
                return getValues ? Array.from(m.values()) : Array.from(m.keys());
            };
        }
    }
    catch (e) {
    }
    return function createArrayFromMapWithForeach(m, getValues) {
        var res = ListWrapper.createFixedSize(m.size), i = 0;
        m.forEach(function (v, k) {
            res[i] = getValues ? v : k;
            i++;
        });
        return res;
    };
})();
var MapWrapper = (function () {
    function MapWrapper() {
    }
    MapWrapper.clone = function (m) { return createMapFromMap(m); };
    MapWrapper.createFromStringMap = function (stringMap) {
        var result = new exports.Map();
        for (var prop in stringMap) {
            result.set(prop, stringMap[prop]);
        }
        return result;
    };
    MapWrapper.toStringMap = function (m) {
        var r = {};
        m.forEach(function (v, k) { return r[k] = v; });
        return r;
    };
    MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
    MapWrapper.clearValues = function (m) { _clearValues(m); };
    MapWrapper.iterable = function (m) { return m; };
    MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
    MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
    return MapWrapper;
}());
exports.MapWrapper = MapWrapper;
/**
 * Wraps Javascript Objects
 */
var StringMapWrapper = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).reduce(function (r, a) {
            r.push(map[a]);
            return r;
        }, []);
    };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var prop in map) {
            if (map.hasOwnProperty(prop)) {
                callback(map[prop], prop);
            }
        }
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var attr in m1) {
            if (m1.hasOwnProperty(attr)) {
                m[attr] = m1[attr];
            }
        }
        for (var attr in m2) {
            if (m2.hasOwnProperty(attr)) {
                m[attr] = m2[attr];
            }
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        var key;
        for (var i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
exports.StringMapWrapper = StringMapWrapper;
var ListWrapper = (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (lang_1.isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (lang_1.isBlank(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.flatten = function (list) {
        var target = [];
        _flattenArray(list, target);
        return target;
    };
    ListWrapper.addAll = function (list, source) {
        for (var i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    };
    return ListWrapper;
}());
exports.ListWrapper = ListWrapper;
function _flattenArray(source, target) {
    if (lang_1.isPresent(source)) {
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            if (lang_1.isArray(item)) {
                _flattenArray(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
function isListLikeIterable(obj) {
    if (!lang_1.isJsObject(obj))
        return false;
    return lang_1.isArray(obj) ||
        (!(obj instanceof exports.Map) &&
            lang_1.getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
}
exports.isListLikeIterable = isListLikeIterable;
function areIterablesEqual(a, b, comparator) {
    var iterator1 = a[lang_1.getSymbolIterator()]();
    var iterator2 = b[lang_1.getSymbolIterator()]();
    while (true) {
        var item1 = iterator1.next();
        var item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
exports.areIterablesEqual = areIterablesEqual;
function iterateListLike(obj, fn) {
    if (lang_1.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var iterator = obj[lang_1.getSymbolIterator()]();
        var item;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
exports.iterateListLike = iterateListLike;
// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var createSetFromList = (function () {
    var test = new exports.Set([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromList(lst) { return new exports.Set(lst); };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var res = new exports.Set(lst);
            if (res.size !== lst.length) {
                for (var i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();
var SetWrapper = (function () {
    function SetWrapper() {
    }
    SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
    SetWrapper.has = function (s, key) { return s.has(key); };
    SetWrapper.delete = function (m, k) { m.delete(k); };
    return SetWrapper;
}());
exports.SetWrapper = SetWrapper;
//# sourceMappingURL=collection.js.map

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var exceptions_1 = __webpack_require__(102);
var lang_1 = __webpack_require__(25);
var http_utils_1 = __webpack_require__(136);
/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 */
var Response = (function () {
    function Response(responseOptions) {
        this._body = responseOptions.body;
        this.status = responseOptions.status;
        this.ok = (this.status >= 200 && this.status <= 299);
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this.type = responseOptions.type;
        this.url = responseOptions.url;
    }
    /**
     * Not yet implemented
     */
    // TODO: Blob return type
    Response.prototype.blob = function () { throw new exceptions_1.BaseException('"blob()" method not implemented on Response superclass'); };
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    Response.prototype.json = function () {
        var jsonResponse;
        if (http_utils_1.isJsObject(this._body)) {
            jsonResponse = this._body;
        }
        else if (lang_1.isString(this._body)) {
            jsonResponse = lang_1.Json.parse(this._body);
        }
        return jsonResponse;
    };
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    Response.prototype.text = function () { return this._body.toString(); };
    /**
     * Not yet implemented
     */
    // TODO: ArrayBuffer return type
    Response.prototype.arrayBuffer = function () {
        throw new exceptions_1.BaseException('"arrayBuffer()" method not implemented on Response superclass');
    };
    Response.prototype.toString = function () {
        return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
    };
    return Response;
}());
exports.Response = Response;
//# sourceMappingURL=static_response.js.map

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var collection_1 = __webpack_require__(203);
var lang_1 = __webpack_require__(25);
function paramParser(rawParams) {
    if (rawParams === void 0) { rawParams = ''; }
    var map = new collection_1.Map();
    if (rawParams.length > 0) {
        var params = rawParams.split('&');
        params.forEach(function (param) {
            var split = param.split('=');
            var key = split[0];
            var val = split[1];
            var list = lang_1.isPresent(map.get(key)) ? map.get(key) : [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 */
var URLSearchParams = (function () {
    function URLSearchParams(rawParams) {
        if (rawParams === void 0) { rawParams = ''; }
        this.rawParams = rawParams;
        this.paramsMap = paramParser(rawParams);
    }
    URLSearchParams.prototype.clone = function () {
        var clone = new URLSearchParams();
        clone.appendAll(this);
        return clone;
    };
    URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
    URLSearchParams.prototype.get = function (param) {
        var storedParam = this.paramsMap.get(param);
        if (collection_1.isListLikeIterable(storedParam)) {
            return collection_1.ListWrapper.first(storedParam);
        }
        else {
            return null;
        }
    };
    URLSearchParams.prototype.getAll = function (param) {
        var mapParam = this.paramsMap.get(param);
        return lang_1.isPresent(mapParam) ? mapParam : [];
    };
    URLSearchParams.prototype.set = function (param, val) {
        var mapParam = this.paramsMap.get(param);
        var list = lang_1.isPresent(mapParam) ? mapParam : [];
        collection_1.ListWrapper.clear(list);
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.setAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var mapParam = _this.paramsMap.get(param);
            var list = lang_1.isPresent(mapParam) ? mapParam : [];
            collection_1.ListWrapper.clear(list);
            list.push(value[0]);
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.append = function (param, val) {
        var mapParam = this.paramsMap.get(param);
        var list = lang_1.isPresent(mapParam) ? mapParam : [];
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.appendAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var mapParam = _this.paramsMap.get(param);
            var list = lang_1.isPresent(mapParam) ? mapParam : [];
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.replaceAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var mapParam = _this.paramsMap.get(param);
            var list = lang_1.isPresent(mapParam) ? mapParam : [];
            collection_1.ListWrapper.clear(list);
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.toString = function () {
        var paramsList = [];
        this.paramsMap.forEach(function (values, k) { values.forEach(function (v) { return paramsList.push(k + '=' + encodeURIComponent(v)); }); });
        return paramsList.join('&');
    };
    URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
    return URLSearchParams;
}());
exports.URLSearchParams = URLSearchParams;
//# sourceMappingURL=url_search_params.js.map

/***/ },

/***/ 212:
/***/ function(module, exports) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var Tree = (function () {
    function Tree(root) {
        this._root = root;
    }
    Object.defineProperty(Tree.prototype, "root", {
        get: function () { return this._root.value; },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.parent = function (t) {
        var p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
    };
    Tree.prototype.children = function (t) {
        var n = findNode(t, this._root);
        return n ? n.children.map(function (t) { return t.value; }) : [];
    };
    Tree.prototype.firstChild = function (t) {
        var n = findNode(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
    };
    Tree.prototype.siblings = function (t) {
        var p = findPath(t, this._root, []);
        if (p.length < 2)
            return [];
        var c = p[p.length - 2].children.map(function (c) { return c.value; });
        return c.filter(function (cc) { return cc !== t; });
    };
    Tree.prototype.pathFromRoot = function (t) { return findPath(t, this._root, []).map(function (s) { return s.value; }); };
    Tree.prototype.contains = function (tree) { return contains(this._root, tree._root); };
    return Tree;
}());
exports.Tree = Tree;
function findNode(expected, c) {
    if (expected === c.value)
        return c;
    for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var r = findNode(expected, cc);
        if (r)
            return r;
    }
    return null;
}
function findPath(expected, c, collected) {
    collected.push(c);
    if (expected === c.value)
        return collected;
    for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var cloned = collected.slice(0);
        var r = findPath(expected, cc, cloned);
        if (r)
            return r;
    }
    return [];
}
function contains(tree, subtree) {
    if (tree.value !== subtree.value)
        return false;
    var _loop_1 = function(subtreeNode) {
        var s = tree.children.filter(function (child) { return child.value === subtreeNode.value; });
        if (s.length === 0)
            return { value: false };
        if (!contains(s[0], subtreeNode))
            return { value: false };
    };
    for (var _i = 0, _a = subtree.children; _i < _a.length; _i++) {
        var subtreeNode = _a[_i];
        var state_1 = _loop_1(subtreeNode);
        if (typeof state_1 === "object") return state_1.value;
    }
    return true;
}
var TreeNode = (function () {
    function TreeNode(value, children) {
        this.value = value;
        this.children = children;
    }
    TreeNode.prototype.toString = function () { return "TreeNode(" + this.value + ")"; };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=tree.js.map

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(77);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(10);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ArrayObservable_1 = __webpack_require__(357);
exports.of = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(66);
var Symbol = root_1.root.Symbol;
if (typeof Symbol === 'function') {
    if (Symbol.iterator) {
        exports.$$iterator = Symbol.iterator;
    }
    else if (typeof Symbol.for === 'function') {
        exports.$$iterator = Symbol.for('iterator');
    }
}
else {
    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
        // Bug for mozilla version
        exports.$$iterator = '@@iterator';
    }
    else if (root_1.root.Map) {
        // es6-shim specific logic
        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
                exports.$$iterator = key;
                break;
            }
        }
    }
    else {
        exports.$$iterator = '@@iterator';
    }
}
//# sourceMappingURL=iterator.js.map

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(66);
var isArray_1 = __webpack_require__(153);
var isPromise_1 = __webpack_require__(361);
var Observable_1 = __webpack_require__(10);
var iterator_1 = __webpack_require__(238);
var observable_1 = __webpack_require__(239);
var InnerSubscriber_1 = __webpack_require__(636);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.isUnsubscribed) {
        return;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return;
        }
        else {
            return result.subscribe(destination);
        }
    }
    if (isArray_1.isArray(result)) {
        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
            destination.next(result[i]);
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.isUnsubscribed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (typeof result[iterator_1.$$iterator] === 'function') {
        for (var _i = 0, _a = result; _i < _a.length; _i++) {
            var item = _a[_i];
            destination.next(item);
            if (destination.isUnsubscribed) {
                break;
            }
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    }
    else if (typeof result[observable_1.$$observable] === 'function') {
        var obs = result[observable_1.$$observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error('invalid observable');
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        destination.error(new TypeError('unknown type returned'));
    }
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = self;
    }
    else {
        globalScope = global;
    }
}
else {
    globalScope = window;
}
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
exports.scheduleMicroTask = scheduleMicroTask;
exports.IS_DART = false;
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global = globalScope;
exports.global = _global;
exports.Type = Function;
function getTypeNameForDebugging(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}
exports.getTypeNameForDebugging = getTypeNameForDebugging;
exports.Math = _global.Math;
exports.Date = _global.Date;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isBlank(obj) {
    return obj === undefined || obj === null;
}
exports.isBlank = isBlank;
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
exports.isBoolean = isBoolean;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isType(obj) {
    return isFunction(obj);
}
exports.isType = isType;
function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isStringMap = isStringMap;
var STRING_MAP_PROTO = Object.getPrototypeOf({});
function isStrictStringMap(obj) {
    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
}
exports.isStrictStringMap = isStrictStringMap;
function isPromise(obj) {
    return obj instanceof _global.Promise;
}
exports.isPromise = isPromise;
function isArray(obj) {
    return Array.isArray(obj);
}
exports.isArray = isArray;
function isDate(obj) {
    return obj instanceof exports.Date && !isNaN(obj.valueOf());
}
exports.isDate = isDate;
function noop() { }
exports.noop = noop;
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.name) {
        return token.name;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
exports.stringify = stringify;
// serialize / deserialize enum exist only for consistency with dart API
// enums in typescript don't need to be serialized
function serializeEnum(val) {
    return val;
}
exports.serializeEnum = serializeEnum;
function deserializeEnum(val, values) {
    return val;
}
exports.deserializeEnum = deserializeEnum;
function resolveEnumToken(enumValue, val) {
    return enumValue[val];
}
exports.resolveEnumToken = resolveEnumToken;
var StringWrapper = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i - 0] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return StringWrapper;
}());
exports.StringWrapper = StringWrapper;
var StringJoiner = (function () {
    function StringJoiner(parts) {
        if (parts === void 0) { parts = []; }
        this.parts = parts;
    }
    StringJoiner.prototype.add = function (part) { this.parts.push(part); };
    StringJoiner.prototype.toString = function () { return this.parts.join(''); };
    return StringJoiner;
}());
exports.StringJoiner = StringJoiner;
var NumberParseError = (function (_super) {
    __extends(NumberParseError, _super);
    function NumberParseError(message) {
        _super.call(this);
        this.message = message;
    }
    NumberParseError.prototype.toString = function () { return this.message; };
    return NumberParseError;
}(Error));
exports.NumberParseError = NumberParseError;
var NumberWrapper = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
    NumberWrapper.equal = function (a, b) { return a === b; };
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new NumberParseError('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    NumberWrapper.parseInt = function (text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new NumberParseError('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    };
    // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
    NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
    Object.defineProperty(NumberWrapper, "NaN", {
        get: function () { return NaN; },
        enumerable: true,
        configurable: true
    });
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    NumberWrapper.isNaN = function (value) { return isNaN(value); };
    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
    return NumberWrapper;
}());
exports.NumberWrapper = NumberWrapper;
exports.RegExp = _global.RegExp;
var RegExpWrapper = (function () {
    function RegExpWrapper() {
    }
    RegExpWrapper.create = function (regExpStr, flags) {
        if (flags === void 0) { flags = ''; }
        flags = flags.replace(/g/g, '');
        return new _global.RegExp(regExpStr, flags + 'g');
    };
    RegExpWrapper.firstMatch = function (regExp, input) {
        // Reset multimatch regex state
        regExp.lastIndex = 0;
        return regExp.exec(input);
    };
    RegExpWrapper.test = function (regExp, input) {
        regExp.lastIndex = 0;
        return regExp.test(input);
    };
    RegExpWrapper.matcher = function (regExp, input) {
        // Reset regex state for the case
        // someone did not loop over all matches
        // last time.
        regExp.lastIndex = 0;
        return { re: regExp, input: input };
    };
    RegExpWrapper.replaceAll = function (regExp, input, replace) {
        var c = regExp.exec(input);
        var res = '';
        regExp.lastIndex = 0;
        var prev = 0;
        while (c) {
            res += input.substring(prev, c.index);
            res += replace(c);
            prev = c.index + c[0].length;
            regExp.lastIndex = prev;
            c = regExp.exec(input);
        }
        res += input.substring(prev);
        return res;
    };
    return RegExpWrapper;
}());
exports.RegExpWrapper = RegExpWrapper;
var RegExpMatcherWrapper = (function () {
    function RegExpMatcherWrapper() {
    }
    RegExpMatcherWrapper.next = function (matcher) {
        return matcher.re.exec(matcher.input);
    };
    return RegExpMatcherWrapper;
}());
exports.RegExpMatcherWrapper = RegExpMatcherWrapper;
var FunctionWrapper = (function () {
    function FunctionWrapper() {
    }
    FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
    FunctionWrapper.bind = function (fn, scope) { return fn.bind(scope); };
    return FunctionWrapper;
}());
exports.FunctionWrapper = FunctionWrapper;
// JS has NaN !== NaN
function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
exports.looseIdentical = looseIdentical;
// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
function getMapKey(value) {
    return value;
}
exports.getMapKey = getMapKey;
function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
exports.normalizeBlank = normalizeBlank;
function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
exports.normalizeBool = normalizeBool;
function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
exports.isJsObject = isJsObject;
function print(obj) {
    console.log(obj);
}
exports.print = print;
function warn(obj) {
    console.warn(obj);
}
exports.warn = warn;
// Can't be all uppercase as our transpiler would think it is a special directive...
var Json = (function () {
    function Json() {
    }
    Json.parse = function (s) { return _global.JSON.parse(s); };
    Json.stringify = function (data) {
        // Dart doesn't take 3 arguments
        return _global.JSON.stringify(data, null, 2);
    };
    return Json;
}());
exports.Json = Json;
var DateWrapper = (function () {
    function DateWrapper() {
    }
    DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        return new exports.Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    DateWrapper.fromISOString = function (str) { return new exports.Date(str); };
    DateWrapper.fromMillis = function (ms) { return new exports.Date(ms); };
    DateWrapper.toMillis = function (date) { return date.getTime(); };
    DateWrapper.now = function () { return new exports.Date(); };
    DateWrapper.toJson = function (date) { return date.toJSON(); };
    return DateWrapper;
}());
exports.DateWrapper = DateWrapper;
function setValueOnPath(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
        var name = parts.shift();
        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
exports.setValueOnPath = setValueOnPath;
var _symbolIterator = null;
function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
exports.getSymbolIterator = getSymbolIterator;
function evalExpression(sourceUrl, expr, declarations, vars) {
    var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
    var fnArgNames = [];
    var fnArgValues = [];
    for (var argName in vars) {
        fnArgNames.push(argName);
        fnArgValues.push(vars[argName]);
    }
    return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
}
exports.evalExpression = evalExpression;
function isPrimitive(obj) {
    return !isJsObject(obj);
}
exports.isPrimitive = isPrimitive;
function hasConstructor(value, type) {
    return value.constructor === type;
}
exports.hasConstructor = hasConstructor;
function escape(s) {
    return _global.encodeURI(s);
}
exports.escape = escape;
function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
exports.escapeRegExp = escapeRegExp;
//# sourceMappingURL=lang.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var lang_1 = __webpack_require__(25);
var _nextRequestId = 0;
exports.JSONP_HOME = '__ng_jsonp__';
var _jsonpConnections = null;
function _getJsonpConnections() {
    if (_jsonpConnections === null) {
        _jsonpConnections = lang_1.global[exports.JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
var BrowserJsonp = (function () {
    function BrowserJsonp() {
    }
    // Construct a <script> element with the specified URL
    BrowserJsonp.prototype.build = function (url) {
        var node = document.createElement('script');
        node.src = url;
        return node;
    };
    BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
    BrowserJsonp.prototype.requestCallback = function (id) { return exports.JSONP_HOME + "." + id + ".finished"; };
    BrowserJsonp.prototype.exposeConnection = function (id, connection) {
        var connections = _getJsonpConnections();
        connections[id] = connection;
    };
    BrowserJsonp.prototype.removeConnection = function (id) {
        var connections = _getJsonpConnections();
        connections[id] = null;
    };
    // Attach the <script> element to the DOM
    BrowserJsonp.prototype.send = function (node) { document.body.appendChild((node)); };
    // Remove <script> element from the DOM
    BrowserJsonp.prototype.cleanup = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild((node));
        }
    };
    /** @nocollapse */
    BrowserJsonp.decorators = [
        { type: core_1.Injectable },
    ];
    return BrowserJsonp;
}());
exports.BrowserJsonp = BrowserJsonp;
//# sourceMappingURL=browser_jsonp.js.map

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(10);
var base_response_options_1 = __webpack_require__(135);
var enums_1 = __webpack_require__(58);
var exceptions_1 = __webpack_require__(102);
var lang_1 = __webpack_require__(25);
var interfaces_1 = __webpack_require__(104);
var static_response_1 = __webpack_require__(204);
var browser_jsonp_1 = __webpack_require__(306);
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Abstract base class for an in-flight JSONP request.
 */
var JSONPConnection = (function () {
    function JSONPConnection() {
    }
    return JSONPConnection;
}());
exports.JSONPConnection = JSONPConnection;
var JSONPConnection_ = (function (_super) {
    __extends(JSONPConnection_, _super);
    function JSONPConnection_(req, _dom, baseResponseOptions) {
        var _this = this;
        _super.call(this);
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== enums_1.RequestMethod.Get) {
            throw exceptions_1.makeTypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new Observable_1.Observable(function (responseObserver) {
            _this.readyState = enums_1.ReadyState.Loading;
            var id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var callback = _dom.requestCallback(_this._id);
            var url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var script = _this._script = _dom.build(url);
            var onLoad = function (event) {
                if (_this.readyState === enums_1.ReadyState.Cancelled)
                    return;
                _this.readyState = enums_1.ReadyState.Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    var responseOptions_1 = new base_response_options_1.ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: enums_1.ResponseType.Error, url: url });
                    if (lang_1.isPresent(baseResponseOptions)) {
                        responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                    }
                    responseObserver.error(new static_response_1.Response(responseOptions_1));
                    return;
                }
                var responseOptions = new base_response_options_1.ResponseOptions({ body: _this._responseData, url: url });
                if (lang_1.isPresent(_this.baseResponseOptions)) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new static_response_1.Response(responseOptions));
                responseObserver.complete();
            };
            var onError = function (error) {
                if (_this.readyState === enums_1.ReadyState.Cancelled)
                    return;
                _this.readyState = enums_1.ReadyState.Done;
                _dom.cleanup(script);
                var responseOptions = new base_response_options_1.ResponseOptions({ body: error.message, type: enums_1.ResponseType.Error });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new static_response_1.Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return function () {
                _this.readyState = enums_1.ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                if (lang_1.isPresent(script)) {
                    _this._dom.cleanup(script);
                }
            };
        });
    }
    JSONPConnection_.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === enums_1.ReadyState.Cancelled)
            return;
        this._responseData = data;
    };
    return JSONPConnection_;
}(JSONPConnection));
exports.JSONPConnection_ = JSONPConnection_;
/**
 * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
 */
var JSONPBackend = (function (_super) {
    __extends(JSONPBackend, _super);
    function JSONPBackend() {
        _super.apply(this, arguments);
    }
    return JSONPBackend;
}(interfaces_1.ConnectionBackend));
exports.JSONPBackend = JSONPBackend;
var JSONPBackend_ = (function (_super) {
    __extends(JSONPBackend_, _super);
    function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
        _super.call(this);
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    JSONPBackend_.prototype.createConnection = function (request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    };
    /** @nocollapse */
    JSONPBackend_.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    JSONPBackend_.ctorParameters = [
        { type: browser_jsonp_1.BrowserJsonp, },
        { type: base_response_options_1.ResponseOptions, },
    ];
    return JSONPBackend_;
}(JSONPBackend));
exports.JSONPBackend_ = JSONPBackend_;
//# sourceMappingURL=jsonp_backend.js.map

/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(113);
var Observable_1 = __webpack_require__(10);
var base_response_options_1 = __webpack_require__(135);
var enums_1 = __webpack_require__(58);
var lang_1 = __webpack_require__(25);
var headers_1 = __webpack_require__(103);
var http_utils_1 = __webpack_require__(136);
var interfaces_1 = __webpack_require__(104);
var static_response_1 = __webpack_require__(204);
var browser_xhr_1 = __webpack_require__(201);
var XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 */
var XHRConnection = (function () {
    function XHRConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        this.request = req;
        this.response = new Observable_1.Observable(function (responseObserver) {
            var _xhr = browserXHR.build();
            _xhr.open(enums_1.RequestMethod[req.method].toUpperCase(), req.url);
            if (lang_1.isPresent(req.withCredentials)) {
                _xhr.withCredentials = req.withCredentials;
            }
            // load event handler
            var onLoad = function () {
                // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                // response/responseType properties were introduced in XHR Level2 spec (supported by
                // IE10)
                var body = lang_1.isPresent(_xhr.response) ? _xhr.response : _xhr.responseText;
                // Implicitly strip a potential XSSI prefix.
                if (lang_1.isString(body))
                    body = body.replace(XSSI_PREFIX, '');
                var headers = headers_1.Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                var url = http_utils_1.getResponseURL(_xhr);
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status = _xhr.status === 1223 ? 204 : _xhr.status;
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var statusText = _xhr.statusText || 'OK';
                var responseOptions = new base_response_options_1.ResponseOptions({ body: body, status: status, headers: headers, statusText: statusText, url: url });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                var response = new static_response_1.Response(responseOptions);
                response.ok = http_utils_1.isSuccess(status);
                if (response.ok) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            var onError = function (err) {
                var responseOptions = new base_response_options_1.ResponseOptions({
                    body: err,
                    type: enums_1.ResponseType.Error,
                    status: _xhr.status,
                    statusText: _xhr.statusText,
                });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new static_response_1.Response(responseOptions));
            };
            _this.setDetectedContentType(req, _xhr);
            if (lang_1.isPresent(req.headers)) {
                req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(_this.request.getBody());
            return function () {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    XHRConnection.prototype.setDetectedContentType = function (req /** TODO #9100 */, _xhr /** TODO #9100 */) {
        // Skip if a custom Content-Type header is provided
        if (lang_1.isPresent(req.headers) && lang_1.isPresent(req.headers.get('Content-Type'))) {
            return;
        }
        // Set the detected content type
        switch (req.contentType) {
            case enums_1.ContentType.NONE:
                break;
            case enums_1.ContentType.JSON:
                _xhr.setRequestHeader('Content-Type', 'application/json');
                break;
            case enums_1.ContentType.FORM:
                _xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
                break;
            case enums_1.ContentType.TEXT:
                _xhr.setRequestHeader('Content-Type', 'text/plain');
                break;
            case enums_1.ContentType.BLOB:
                var blob = req.blob();
                if (blob.type) {
                    _xhr.setRequestHeader('Content-Type', blob.type);
                }
                break;
        }
    };
    return XHRConnection;
}());
exports.XHRConnection = XHRConnection;
/**
 * `XSRFConfiguration` sets up Cross Site Request Forgery (XSRF) protection for the application
 * using a cookie. See https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF) for more
 * information on XSRF.
 *
 * Applications can configure custom cookie and header names by binding an instance of this class
 * with different `cookieName` and `headerName` values. See the main HTTP documentation for more
 * details.
 */
var CookieXSRFStrategy = (function () {
    function CookieXSRFStrategy(_cookieName, _headerName) {
        if (_cookieName === void 0) { _cookieName = 'XSRF-TOKEN'; }
        if (_headerName === void 0) { _headerName = 'X-XSRF-TOKEN'; }
        this._cookieName = _cookieName;
        this._headerName = _headerName;
    }
    CookieXSRFStrategy.prototype.configureRequest = function (req) {
        var xsrfToken = platform_browser_1.__platform_browser_private__.getDOM().getCookie(this._cookieName);
        if (xsrfToken && !req.headers.has(this._headerName)) {
            req.headers.set(this._headerName, xsrfToken);
        }
    };
    return CookieXSRFStrategy;
}());
exports.CookieXSRFStrategy = CookieXSRFStrategy;
var XHRBackend = (function () {
    function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
        this._xsrfStrategy = _xsrfStrategy;
    }
    XHRBackend.prototype.createConnection = function (request) {
        this._xsrfStrategy.configureRequest(request);
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    /** @nocollapse */
    XHRBackend.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    XHRBackend.ctorParameters = [
        { type: browser_xhr_1.BrowserXhr, },
        { type: base_response_options_1.ResponseOptions, },
        { type: interfaces_1.XSRFStrategy, },
    ];
    return XHRBackend;
}());
exports.XHRBackend = XHRBackend;
//# sourceMappingURL=xhr_backend.js.map

/***/ },

/***/ 309:
/***/ function(module, exports) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A base class for the WrappedException that can be used to identify
 * a WrappedException from ExceptionHandler without adding circular
 * dependency.
 */
var BaseWrappedException = (function (_super) {
    __extends(BaseWrappedException, _super);
    function BaseWrappedException(message) {
        _super.call(this, message);
    }
    Object.defineProperty(BaseWrappedException.prototype, "wrapperMessage", {
        get: function () { return ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "wrapperStack", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "originalException", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "originalStack", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "context", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "message", {
        get: function () { return ''; },
        enumerable: true,
        configurable: true
    });
    return BaseWrappedException;
}(Error));
exports.BaseWrappedException = BaseWrappedException;
//# sourceMappingURL=base_wrapped_exception.js.map

/***/ },

/***/ 310:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var base_wrapped_exception_1 = __webpack_require__(309);
var collection_1 = __webpack_require__(203);
var lang_1 = __webpack_require__(25);
var _ArrayLogger = (function () {
    function _ArrayLogger() {
        this.res = [];
    }
    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroupEnd = function () { };
    ;
    return _ArrayLogger;
}());
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
 * intercept error handling,
 * write a custom exception handler that replaces this default as appropriate for your app.
 *
 * ### Example
 *
 * ```javascript
 *
 * class MyExceptionHandler implements ExceptionHandler {
 *   call(error, stackTrace = null, reason = null) {
 *     // do something with the exception
 *   }
 * }
 *
 * bootstrap(MyApp, {provide: ExceptionHandler, useClass: MyExceptionHandler}])
 *
 * ```
 * @stable
 */
var ExceptionHandler = (function () {
    function ExceptionHandler(_logger, _rethrowException) {
        if (_rethrowException === void 0) { _rethrowException = true; }
        this._logger = _logger;
        this._rethrowException = _rethrowException;
    }
    ExceptionHandler.exceptionToString = function (exception, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        var l = new _ArrayLogger();
        var e = new ExceptionHandler(l, false);
        e.call(exception, stackTrace, reason);
        return l.res.join('\n');
    };
    ExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        var originalException = this._findOriginalException(exception);
        var originalStack = this._findOriginalStack(exception);
        var context = this._findContext(exception);
        this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
        if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
            this._logger.logError('STACKTRACE:');
            this._logger.logError(this._longStackTrace(stackTrace));
        }
        if (lang_1.isPresent(reason)) {
            this._logger.logError("REASON: " + reason);
        }
        if (lang_1.isPresent(originalException)) {
            this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
        }
        if (lang_1.isPresent(originalStack)) {
            this._logger.logError('ORIGINAL STACKTRACE:');
            this._logger.logError(this._longStackTrace(originalStack));
        }
        if (lang_1.isPresent(context)) {
            this._logger.logError('ERROR CONTEXT:');
            this._logger.logError(context);
        }
        this._logger.logGroupEnd();
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an exception happens. If we do not rethrow, bootstrap will always succeed.
        if (this._rethrowException)
            throw exception;
    };
    /** @internal */
    ExceptionHandler.prototype._extractMessage = function (exception) {
        return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage :
            exception.toString();
    };
    /** @internal */
    ExceptionHandler.prototype._longStackTrace = function (stackTrace) {
        return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join('\n\n-----async gap-----\n') :
            stackTrace.toString();
    };
    /** @internal */
    ExceptionHandler.prototype._findContext = function (exception) {
        try {
            if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                return null;
            return lang_1.isPresent(exception.context) ? exception.context :
                this._findContext(exception.originalException);
        }
        catch (e) {
            // exception.context can throw an exception. if it happens, we ignore the context.
            return null;
        }
    };
    /** @internal */
    ExceptionHandler.prototype._findOriginalException = function (exception) {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
            return null;
        var e = exception.originalException;
        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
            e = e.originalException;
        }
        return e;
    };
    /** @internal */
    ExceptionHandler.prototype._findOriginalStack = function (exception) {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
            return null;
        var e = exception;
        var stack = exception.originalStack;
        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
            e = e.originalException;
            if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                stack = e.originalStack;
            }
        }
        return stack;
    };
    return ExceptionHandler;
}());
exports.ExceptionHandler = ExceptionHandler;
//# sourceMappingURL=exception_handler.js.map

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = __webpack_require__(0);
var exceptions_1 = __webpack_require__(102);
var lang_1 = __webpack_require__(25);
var base_request_options_1 = __webpack_require__(202);
var enums_1 = __webpack_require__(58);
var interfaces_1 = __webpack_require__(104);
var static_request_1 = __webpack_require__(312);
function httpRequest(backend, request) {
    return backend.createConnection(request).response;
}
function mergeOptions(defaultOpts, providedOpts, method, url) {
    var newOptions = defaultOpts;
    if (lang_1.isPresent(providedOpts)) {
        // Hack so Dart can used named parameters
        return newOptions.merge(new base_request_options_1.RequestOptions({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            headers: providedOpts.headers,
            body: providedOpts.body,
            withCredentials: providedOpts.withCredentials
        }));
    }
    if (lang_1.isPresent(method)) {
        return newOptions.merge(new base_request_options_1.RequestOptions({ method: method, url: url }));
    }
    else {
        return newOptions.merge(new base_request_options_1.RequestOptions({ url: url }));
    }
}
var Http = (function () {
    function Http(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    Http.prototype.request = function (url, options) {
        var responseObservable;
        if (lang_1.isString(url)) {
            responseObservable = httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url)));
        }
        else if (url instanceof static_request_1.Request) {
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    /**
     * Performs a request with `get` http method.
     */
    Http.prototype.get = function (url, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url)));
    };
    /**
     * Performs a request with `post` http method.
     */
    Http.prototype.post = function (url, body, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Post, url)));
    };
    /**
     * Performs a request with `put` http method.
     */
    Http.prototype.put = function (url, body, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Put, url)));
    };
    /**
     * Performs a request with `delete` http method.
     */
    Http.prototype.delete = function (url, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Delete, url)));
    };
    /**
     * Performs a request with `patch` http method.
     */
    Http.prototype.patch = function (url, body, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Patch, url)));
    };
    /**
     * Performs a request with `head` http method.
     */
    Http.prototype.head = function (url, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Head, url)));
    };
    /** @nocollapse */
    Http.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Http.ctorParameters = [
        { type: interfaces_1.ConnectionBackend, },
        { type: base_request_options_1.RequestOptions, },
    ];
    return Http;
}());
exports.Http = Http;
var Jsonp = (function (_super) {
    __extends(Jsonp, _super);
    function Jsonp(backend, defaultOptions) {
        _super.call(this, backend, defaultOptions);
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    Jsonp.prototype.request = function (url, options) {
        var responseObservable;
        if (lang_1.isString(url)) {
            url =
                new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url));
        }
        if (url instanceof static_request_1.Request) {
            if (url.method !== enums_1.RequestMethod.Get) {
                exceptions_1.makeTypeError('JSONP requests must use GET request method.');
            }
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    /** @nocollapse */
    Jsonp.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Jsonp.ctorParameters = [
        { type: interfaces_1.ConnectionBackend, },
        { type: base_request_options_1.RequestOptions, },
    ];
    return Jsonp;
}(Http));
exports.Jsonp = Jsonp;
//# sourceMappingURL=http.js.map

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var lang_1 = __webpack_require__(25);
var enums_1 = __webpack_require__(58);
var headers_1 = __webpack_require__(103);
var http_utils_1 = __webpack_require__(136);
var url_search_params_1 = __webpack_require__(205);
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {@link Http} and
 * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
 *
 * @Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 */
var Request = (function () {
    function Request(requestOptions) {
        // TODO: assert that url is present
        var url = requestOptions.url;
        this.url = requestOptions.url;
        if (lang_1.isPresent(requestOptions.search)) {
            var search = requestOptions.search.toString();
            if (search.length > 0) {
                var prefix = '?';
                if (lang_1.StringWrapper.contains(this.url, '?')) {
                    prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                this.url = url + prefix + search;
            }
        }
        this._body = requestOptions.body;
        this.contentType = this.detectContentType();
        this.method = http_utils_1.normalizeMethodName(requestOptions.method);
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        // TODO(jeffbcross): implement behavior
        this.headers = new headers_1.Headers(requestOptions.headers);
        this.withCredentials = requestOptions.withCredentials;
    }
    /**
     * Returns the request's body as string, assuming that body exists. If body is undefined, return
     * empty
     * string.
     */
    Request.prototype.text = function () { return lang_1.isPresent(this._body) ? this._body.toString() : ''; };
    /**
     * Returns the request's body as JSON string, assuming that body exists. If body is undefined,
     * return
     * empty
     * string.
     */
    Request.prototype.json = function () { return lang_1.isPresent(this._body) ? JSON.stringify(this._body) : ''; };
    /**
     * Returns the request's body as array buffer, assuming that body exists. If body is undefined,
     * return
     * null.
     */
    Request.prototype.arrayBuffer = function () {
        if (this._body instanceof ArrayBuffer)
            return this._body;
        throw 'The request body isn\'t an array buffer';
    };
    /**
     * Returns the request's body as blob, assuming that body exists. If body is undefined, return
     * null.
     */
    Request.prototype.blob = function () {
        if (this._body instanceof Blob)
            return this._body;
        if (this._body instanceof ArrayBuffer)
            return new Blob([this._body]);
        throw 'The request body isn\'t either a blob or an array buffer';
    };
    /**
     * Returns the content type of request's body based on its type.
     */
    Request.prototype.detectContentType = function () {
        if (this._body == null) {
            return enums_1.ContentType.NONE;
        }
        else if (this._body instanceof url_search_params_1.URLSearchParams) {
            return enums_1.ContentType.FORM;
        }
        else if (this._body instanceof FormData) {
            return enums_1.ContentType.FORM_DATA;
        }
        else if (this._body instanceof Blob) {
            return enums_1.ContentType.BLOB;
        }
        else if (this._body instanceof ArrayBuffer) {
            return enums_1.ContentType.ARRAY_BUFFER;
        }
        else if (this._body && typeof this._body == 'object') {
            return enums_1.ContentType.JSON;
        }
        else {
            return enums_1.ContentType.TEXT;
        }
    };
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     */
    Request.prototype.getBody = function () {
        switch (this.contentType) {
            case enums_1.ContentType.JSON:
                return this.json();
            case enums_1.ContentType.FORM:
                return this.text();
            case enums_1.ContentType.FORM_DATA:
                return this._body;
            case enums_1.ContentType.TEXT:
                return this.text();
            case enums_1.ContentType.BLOB:
                return this.blob();
            case enums_1.ContentType.ARRAY_BUFFER:
                return this.arrayBuffer();
            default:
                return null;
        }
    };
    return Request;
}());
exports.Request = Request;
var noop = function () { };
var w = typeof window == 'object' ? window : noop;
var FormData = w['FormData'] || noop;
var Blob = w['Blob'] || noop;
var ArrayBuffer = w['ArrayBuffer'] || noop;
//# sourceMappingURL=static_request.js.map

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = __webpack_require__(35);
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(142);
var router_state_1 = __webpack_require__(89);
var RouterLink = (function () {
    /**
     * @internal
     */
    function RouterLink(router, route, locationStrategy) {
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
    }
    Object.defineProperty(RouterLink.prototype, "routerLink", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.commands = data;
            }
            else {
                this.commands = [data];
            }
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.prototype.ngOnChanges = function (changes) { this.updateTargetUrlAndHref(); };
    RouterLink.prototype.onClick = function (button, ctrlKey, metaKey) {
        if (button !== 0 || ctrlKey || metaKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
            return true;
        }
        this.router.navigateByUrl(this.urlTree);
        return false;
    };
    RouterLink.prototype.updateTargetUrlAndHref = function () {
        this.urlTree = this.router.createUrlTree(this.commands, { relativeTo: this.route, queryParams: this.queryParams, fragment: this.fragment });
        if (this.urlTree) {
            this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
        }
    };
    /** @nocollapse */
    RouterLink.decorators = [
        { type: core_1.Directive, args: [{ selector: '[routerLink]' },] },
    ];
    /** @nocollapse */
    RouterLink.ctorParameters = [
        { type: router_1.Router, },
        { type: router_state_1.ActivatedRoute, },
        { type: common_1.LocationStrategy, },
    ];
    /** @nocollapse */
    RouterLink.propDecorators = {
        'target': [{ type: core_1.Input },],
        'queryParams': [{ type: core_1.Input },],
        'fragment': [{ type: core_1.Input },],
        'href': [{ type: core_1.HostBinding },],
        'routerLink': [{ type: core_1.Input },],
        'onClick': [{ type: core_1.HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey'],] },],
    };
    return RouterLink;
}());
exports.RouterLink = RouterLink;
//# sourceMappingURL=router_link.js.map

/***/ },

/***/ 355:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(32);
var throwError_1 = __webpack_require__(363);
var ObjectUnsubscribedError_1 = __webpack_require__(359);
/**
 * @class BehaviorSubject<T>
 */
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
    }
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasErrored) {
            throwError_1.throwError(this.errorValue);
        }
        else if (this.isUnsubscribed) {
            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
        }
        else {
            return this._value;
        }
    };
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.isUnsubscribed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype._next = function (value) {
        _super.prototype._next.call(this, this._value = value);
    };
    BehaviorSubject.prototype._error = function (err) {
        this.hasErrored = true;
        _super.prototype._error.call(this, this.errorValue = err);
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=BehaviorSubject.js.map

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
var map_1 = __webpack_require__(653);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(10);
var ScalarObservable_1 = __webpack_require__(358);
var EmptyObservable_1 = __webpack_require__(236);
var isScheduler_1 = __webpack_require__(362);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` Scheduler, which means the `next`
     * notifications are sent synchronously, although with a different Scheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(10);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.isUnsubscribed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ },

/***/ 361:
/***/ function(module, exports) {

"use strict";
"use strict";
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ },

/***/ 362:
/***/ function(module, exports) {

"use strict";
"use strict";
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ },

/***/ 365:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(439));
//# sourceMappingURL=index.js.map

/***/ },

/***/ 366:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var router_link_1 = __webpack_require__(325);
var router_link_active_1 = __webpack_require__(476);
var router_outlet_1 = __webpack_require__(477);
var router_1 = __webpack_require__(142);
exports.NavigationCancel = router_1.NavigationCancel;
exports.NavigationEnd = router_1.NavigationEnd;
exports.NavigationError = router_1.NavigationError;
exports.NavigationStart = router_1.NavigationStart;
exports.Router = router_1.Router;
exports.RoutesRecognized = router_1.RoutesRecognized;
var router_outlet_map_1 = __webpack_require__(143);
exports.RouterOutletMap = router_outlet_map_1.RouterOutletMap;
var router_providers_1 = __webpack_require__(480);
exports.provideRouter = router_providers_1.provideRouter;
var router_state_1 = __webpack_require__(89);
exports.ActivatedRoute = router_state_1.ActivatedRoute;
exports.ActivatedRouteSnapshot = router_state_1.ActivatedRouteSnapshot;
exports.RouterState = router_state_1.RouterState;
exports.RouterStateSnapshot = router_state_1.RouterStateSnapshot;
var shared_1 = __webpack_require__(60);
exports.PRIMARY_OUTLET = shared_1.PRIMARY_OUTLET;
var url_tree_1 = __webpack_require__(61);
exports.DefaultUrlSerializer = url_tree_1.DefaultUrlSerializer;
exports.UrlPathWithParams = url_tree_1.UrlPathWithParams;
exports.UrlSerializer = url_tree_1.UrlSerializer;
exports.UrlTree = url_tree_1.UrlTree;
exports.ROUTER_DIRECTIVES = [router_outlet_1.RouterOutlet, router_link_1.RouterLink, router_link_active_1.RouterLinkActive];
//# sourceMappingURL=index.js.map

/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var browser_jsonp_1 = __webpack_require__(306);
var browser_xhr_1 = __webpack_require__(201);
var jsonp_backend_1 = __webpack_require__(307);
var xhr_backend_1 = __webpack_require__(308);
var base_request_options_1 = __webpack_require__(202);
var base_response_options_1 = __webpack_require__(135);
var http_1 = __webpack_require__(311);
var interfaces_1 = __webpack_require__(104);
var browser_xhr_2 = __webpack_require__(201);
exports.BrowserXhr = browser_xhr_2.BrowserXhr;
var jsonp_backend_2 = __webpack_require__(307);
exports.JSONPBackend = jsonp_backend_2.JSONPBackend;
exports.JSONPConnection = jsonp_backend_2.JSONPConnection;
var xhr_backend_2 = __webpack_require__(308);
exports.CookieXSRFStrategy = xhr_backend_2.CookieXSRFStrategy;
exports.XHRBackend = xhr_backend_2.XHRBackend;
exports.XHRConnection = xhr_backend_2.XHRConnection;
var base_request_options_2 = __webpack_require__(202);
exports.BaseRequestOptions = base_request_options_2.BaseRequestOptions;
exports.RequestOptions = base_request_options_2.RequestOptions;
var base_response_options_2 = __webpack_require__(135);
exports.BaseResponseOptions = base_response_options_2.BaseResponseOptions;
exports.ResponseOptions = base_response_options_2.ResponseOptions;
var enums_1 = __webpack_require__(58);
exports.ReadyState = enums_1.ReadyState;
exports.RequestMethod = enums_1.RequestMethod;
exports.ResponseType = enums_1.ResponseType;
var headers_1 = __webpack_require__(103);
exports.Headers = headers_1.Headers;
var http_2 = __webpack_require__(311);
exports.Http = http_2.Http;
exports.Jsonp = http_2.Jsonp;
var interfaces_2 = __webpack_require__(104);
exports.Connection = interfaces_2.Connection;
exports.ConnectionBackend = interfaces_2.ConnectionBackend;
exports.XSRFStrategy = interfaces_2.XSRFStrategy;
var static_request_1 = __webpack_require__(312);
exports.Request = static_request_1.Request;
var static_response_1 = __webpack_require__(204);
exports.Response = static_response_1.Response;
var url_search_params_1 = __webpack_require__(205);
exports.URLSearchParams = url_search_params_1.URLSearchParams;
/**
 * Provides a basic set of injectables to use the {@link Http} service in any application.
 *
 * The `HTTP_PROVIDERS` should be included either in a component's injector,
 * or in the root injector when bootstrapping an application.
 *
 * ### Example ([live demo](http://plnkr.co/edit/snj7Nv?p=preview))
 *
 * ```
 * import {Component} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {NgFor} from '@angular/common';
 * import {HTTP_PROVIDERS, Http} from '@angular/http';
 *
 * @Component({
 *   selector: 'app',
 *   providers: [HTTP_PROVIDERS],
 *   template: `
 *     <div>
 *       <h1>People</h1>
 *       <ul>
 *         <li *ngFor="let person of people">
 *           {{person.name}}
 *         </li>
 *       </ul>
 *     </div>
 *   `,
 *   directives: [NgFor]
 * })
 * export class App {
 *   people: Object[];
 *   constructor(http:Http) {
 *     http.get('people.json').subscribe(res => {
 *       this.people = res.json();
 *     });
 *   }
 *   active:boolean = false;
 *   toggleActiveState() {
 *     this.active = !this.active;
 *   }
 * }
 *
 * bootstrap(App)
 *   .catch(err => console.error(err));
 * ```
 *
 * The primary public API included in `HTTP_PROVIDERS` is the {@link Http} class.
 * However, other providers required by `Http` are included,
 * which may be beneficial to override in certain cases.
 *
 * The providers included in `HTTP_PROVIDERS` include:
 *  * {@link Http}
 *  * {@link XHRBackend}
 *  * {@link XSRFStrategy} - Bound to {@link CookieXSRFStrategy} class (see below)
 *  * `BrowserXHR` - Private factory to create `XMLHttpRequest` instances
 *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
 *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
 *
 * There may be cases where it makes sense to extend the base request options,
 * such as to add a search string to be appended to all URLs.
 * To accomplish this, a new provider for {@link RequestOptions} should
 * be added in the same injector as `HTTP_PROVIDERS`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/aCMEXi?p=preview))
 *
 * ```
 * import {provide} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from '@angular/http';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: RequestOptions, useClass: MyOptions}])
 *   .catch(err => console.error(err));
 * ```
 *
 * Likewise, to use a mock backend for unit tests, the {@link XHRBackend}
 * provider should be bound to {@link MockBackend}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7LWALD?p=preview))
 *
 * ```
 * import {provide} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Http, Response, XHRBackend} from '@angular/http';
 * import {MockBackend} from '@angular/http/testing';
 *
 * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
 *
 * var injector = Injector.resolveAndCreate([
 *   HTTP_PROVIDERS,
 *   MockBackend,
 *   {provide: XHRBackend, useExisting: MockBackend}
 * ]);
 * var http = injector.get(Http);
 * var backend = injector.get(MockBackend);
 *
 * // Listen for any new requests
 * backend.connections.observer({
 *   next: connection => {
 *     var response = new Response({body: people});
 *     setTimeout(() => {
 *       // Send a response to the request
 *       connection.mockRespond(response);
 *     });
 *   }
 * });
 *
 * http.get('people.json').observer({
 *   next: res => {
 *     // Response came from mock backend
 *     console.log('first person', res.json()[0].name);
 *   }
 * });
 * ```
 *
 * `XSRFStrategy` allows customizing how the application protects itself against Cross Site Request
 * Forgery (XSRF) attacks. By default, Angular will look for a cookie called `'XSRF-TOKEN'`, and set
 * an HTTP request header called `'X-XSRF-TOKEN'` with the value of the cookie on each request,
 * allowing the server side to validate that the request comes from its own front end.
 *
 * Applications can override the names used by configuring a different `XSRFStrategy` instance. Most
 * commonly, applications will configure a `CookieXSRFStrategy` with different cookie or header
 * names, but if needed, they can supply a completely custom implementation.
 *
 * See the security documentation for more information.
 *
 * ### Example
 *
 * ```
 * import {provide} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
 *
 * bootstrap(
 *     App,
 *     [HTTP_PROVIDERS, {provide: XSRFStrategy,
 *         useValue: new CookieXSRFStrategy('MY-XSRF-COOKIE-NAME', 'X-MY-XSRF-HEADER-NAME')}])
 *   .catch(err => console.error(err));
 * ```
 */
exports.HTTP_PROVIDERS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    { provide: http_1.Http, useFactory: httpFactory, deps: [xhr_backend_1.XHRBackend, base_request_options_1.RequestOptions] },
    browser_xhr_1.BrowserXhr,
    { provide: base_request_options_1.RequestOptions, useClass: base_request_options_1.BaseRequestOptions },
    { provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
    xhr_backend_1.XHRBackend,
    { provide: interfaces_1.XSRFStrategy, useValue: new xhr_backend_1.CookieXSRFStrategy() },
];
function httpFactory(xhrBackend, requestOptions) {
    return new http_1.Http(xhrBackend, requestOptions);
}
exports.httpFactory = httpFactory;
/**
 * See {@link HTTP_PROVIDERS} instead.
 *
 * @deprecated
 */
exports.HTTP_BINDINGS = exports.HTTP_PROVIDERS;
/**
 * Provides a basic set of providers to use the {@link Jsonp} service in any application.
 *
 * The `JSONP_PROVIDERS` should be included either in a component's injector,
 * or in the root injector when bootstrapping an application.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vmeN4F?p=preview))
 *
 * ```
 * import {Component} from '@angular/core';
 * import {NgFor} from '@angular/common';
 * import {JSONP_PROVIDERS, Jsonp} from '@angular/http';
 *
 * @Component({
 *   selector: 'app',
 *   providers: [JSONP_PROVIDERS],
 *   template: `
 *     <div>
 *       <h1>People</h1>
 *       <ul>
 *         <li *ngFor="let person of people">
 *           {{person.name}}
 *         </li>
 *       </ul>
 *     </div>
 *   `,
 *   directives: [NgFor]
 * })
 * export class App {
 *   people: Array<Object>;
 *   constructor(jsonp:Jsonp) {
 *     jsonp.request('people.json').subscribe(res => {
 *       this.people = res.json();
 *     })
 *   }
 * }
 * ```
 *
 * The primary public API included in `JSONP_PROVIDERS` is the {@link Jsonp} class.
 * However, other providers required by `Jsonp` are included,
 * which may be beneficial to override in certain cases.
 *
 * The providers included in `JSONP_PROVIDERS` include:
 *  * {@link Jsonp}
 *  * {@link JSONPBackend}
 *  * `BrowserJsonp` - Private factory
 *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
 *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
 *
 * There may be cases where it makes sense to extend the base request options,
 * such as to add a search string to be appended to all URLs.
 * To accomplish this, a new provider for {@link RequestOptions} should
 * be added in the same injector as `JSONP_PROVIDERS`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/TFug7x?p=preview))
 *
 * ```
 * import {provide} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {JSONP_PROVIDERS, BaseRequestOptions, RequestOptions} from '@angular/http';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * bootstrap(App, [JSONP_PROVIDERS, {provide: RequestOptions, useClass: MyOptions}])
 *   .catch(err => console.error(err));
 * ```
 *
 * Likewise, to use a mock backend for unit tests, the {@link JSONPBackend}
 * provider should be bound to {@link MockBackend}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/HDqZWL?p=preview))
 *
 * ```
 * import {provide, Injector} from '@angular/core';
 * import {JSONP_PROVIDERS, Jsonp, Response, JSONPBackend} from '@angular/http';
 * import {MockBackend} from '@angular/http/testing';
 *
 * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
 * var injector = Injector.resolveAndCreate([
 *   JSONP_PROVIDERS,
 *   MockBackend,
 *   {provide: JSONPBackend, useExisting: MockBackend}
 * ]);
 * var jsonp = injector.get(Jsonp);
 * var backend = injector.get(MockBackend);
 *
 * // Listen for any new requests
 * backend.connections.observer({
 *   next: connection => {
 *     var response = new Response({body: people});
 *     setTimeout(() => {
 *       // Send a response to the request
 *       connection.mockRespond(response);
 *     });
 *   }
 * });

 * jsonp.get('people.json').observer({
 *   next: res => {
 *     // Response came from mock backend
 *     console.log('first person', res.json()[0].name);
 *   }
 * });
 * ```
 */
exports.JSONP_PROVIDERS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    { provide: http_1.Jsonp, useFactory: jsonpFactory, deps: [jsonp_backend_1.JSONPBackend, base_request_options_1.RequestOptions] },
    browser_jsonp_1.BrowserJsonp,
    { provide: base_request_options_1.RequestOptions, useClass: base_request_options_1.BaseRequestOptions },
    { provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
    { provide: jsonp_backend_1.JSONPBackend, useClass: jsonp_backend_1.JSONPBackend_ },
];
function jsonpFactory(jsonpBackend, requestOptions) {
    return new http_1.Jsonp(jsonpBackend, requestOptions);
}
/**
 * See {@link JSONP_PROVIDERS} instead.
 *
 * @deprecated
 */
exports.JSON_BINDINGS = exports.JSONP_PROVIDERS;
//# sourceMappingURL=http.js.map

/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var Observable_1 = __webpack_require__(10);
var of_1 = __webpack_require__(237);
var shared_1 = __webpack_require__(60);
var url_tree_1 = __webpack_require__(61);
var collection_1 = __webpack_require__(90);
var NoMatch = (function () {
    function NoMatch(segment) {
        if (segment === void 0) { segment = null; }
        this.segment = segment;
    }
    return NoMatch;
}());
var GlobalRedirect = (function () {
    function GlobalRedirect(paths) {
        this.paths = paths;
    }
    return GlobalRedirect;
}());
function applyRedirects(urlTree, config) {
    try {
        return createUrlTree(urlTree, expandSegment(config, urlTree.root, shared_1.PRIMARY_OUTLET));
    }
    catch (e) {
        if (e instanceof GlobalRedirect) {
            return createUrlTree(urlTree, new url_tree_1.UrlSegment([], (_a = {}, _a[shared_1.PRIMARY_OUTLET] = new url_tree_1.UrlSegment(e.paths, {}), _a)));
        }
        else if (e instanceof NoMatch) {
            return new Observable_1.Observable(function (obs) {
                return obs.error(new Error("Cannot match any routes: '" + e.segment + "'"));
            });
        }
        else {
            return new Observable_1.Observable(function (obs) { return obs.error(e); });
        }
    }
    var _a;
}
exports.applyRedirects = applyRedirects;
function createUrlTree(urlTree, rootCandidate) {
    var root = rootCandidate.pathsWithParams.length > 0 ?
        new url_tree_1.UrlSegment([], (_a = {}, _a[shared_1.PRIMARY_OUTLET] = rootCandidate, _a)) :
        rootCandidate;
    return of_1.of(new url_tree_1.UrlTree(root, urlTree.queryParams, urlTree.fragment));
    var _a;
}
function expandSegment(routes, segment, outlet) {
    if (segment.pathsWithParams.length === 0 && segment.hasChildren()) {
        return new url_tree_1.UrlSegment([], expandSegmentChildren(routes, segment));
    }
    else {
        return expandPathsWithParams(segment, routes, segment.pathsWithParams, outlet, true);
    }
}
function expandSegmentChildren(routes, segment) {
    return url_tree_1.mapChildren(segment, function (child, childOutlet) { return expandSegment(routes, child, childOutlet); });
}
function expandPathsWithParams(segment, routes, paths, outlet, allowRedirects) {
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var r = routes_1[_i];
        try {
            return expandPathsWithParamsAgainstRoute(segment, routes, r, paths, outlet, allowRedirects);
        }
        catch (e) {
            if (!(e instanceof NoMatch))
                throw e;
        }
    }
    throw new NoMatch(segment);
}
function expandPathsWithParamsAgainstRoute(segment, routes, route, paths, outlet, allowRedirects) {
    if (getOutlet(route) !== outlet)
        throw new NoMatch();
    if (route.redirectTo !== undefined && !allowRedirects)
        throw new NoMatch();
    if (route.redirectTo !== undefined) {
        return expandPathsWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet);
    }
    else {
        return matchPathsWithParamsAgainstRoute(segment, route, paths);
    }
}
function expandPathsWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet) {
    if (route.path === '**') {
        return expandWildCardWithParamsAgainstRouteUsingRedirect(route);
    }
    else {
        return expandRegularPathWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet);
    }
}
function expandWildCardWithParamsAgainstRouteUsingRedirect(route) {
    var newPaths = applyRedirectCommands([], route.redirectTo, {});
    if (route.redirectTo.startsWith('/')) {
        throw new GlobalRedirect(newPaths);
    }
    else {
        return new url_tree_1.UrlSegment(newPaths, {});
    }
}
function expandRegularPathWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet) {
    var _a = match(segment, route, paths), consumedPaths = _a.consumedPaths, lastChild = _a.lastChild, positionalParamSegments = _a.positionalParamSegments;
    var newPaths = applyRedirectCommands(consumedPaths, route.redirectTo, positionalParamSegments);
    if (route.redirectTo.startsWith('/')) {
        throw new GlobalRedirect(newPaths);
    }
    else {
        return expandPathsWithParams(segment, routes, newPaths.concat(paths.slice(lastChild)), outlet, false);
    }
}
function matchPathsWithParamsAgainstRoute(rawSegment, route, paths) {
    if (route.path === '**') {
        return new url_tree_1.UrlSegment(paths, {});
    }
    else {
        var _a = match(rawSegment, route, paths), consumedPaths = _a.consumedPaths, lastChild = _a.lastChild;
        var childConfig = route.children ? route.children : [];
        var rawSlicedPath = paths.slice(lastChild);
        var _b = split(rawSegment, consumedPaths, rawSlicedPath, childConfig), segment = _b.segment, slicedPath = _b.slicedPath;
        if (slicedPath.length === 0 && segment.hasChildren()) {
            var children = expandSegmentChildren(childConfig, segment);
            return new url_tree_1.UrlSegment(consumedPaths, children);
        }
        else if (childConfig.length === 0 && slicedPath.length === 0) {
            return new url_tree_1.UrlSegment(consumedPaths, {});
        }
        else {
            var cs = expandPathsWithParams(segment, childConfig, slicedPath, shared_1.PRIMARY_OUTLET, true);
            return new url_tree_1.UrlSegment(consumedPaths.concat(cs.pathsWithParams), cs.children);
        }
    }
}
function match(segment, route, paths) {
    if (route.path === '') {
        if (route.terminal && (segment.hasChildren() || paths.length > 0)) {
            throw new NoMatch();
        }
        else {
            return { consumedPaths: [], lastChild: 0, positionalParamSegments: {} };
        }
    }
    var path = route.path;
    var parts = path.split('/');
    var positionalParamSegments = {};
    var consumedPaths = [];
    var currentIndex = 0;
    for (var i = 0; i < parts.length; ++i) {
        if (currentIndex >= paths.length)
            throw new NoMatch();
        var current = paths[currentIndex];
        var p = parts[i];
        var isPosParam = p.startsWith(':');
        if (!isPosParam && p !== current.path)
            throw new NoMatch();
        if (isPosParam) {
            positionalParamSegments[p.substring(1)] = current;
        }
        consumedPaths.push(current);
        currentIndex++;
    }
    if (route.terminal && (segment.hasChildren() || currentIndex < paths.length)) {
        throw new NoMatch();
    }
    return { consumedPaths: consumedPaths, lastChild: currentIndex, positionalParamSegments: positionalParamSegments };
}
function applyRedirectCommands(paths, redirectTo, posParams) {
    var r = redirectTo.startsWith('/') ? redirectTo.substring(1) : redirectTo;
    if (r === '') {
        return [];
    }
    else {
        return createPaths(redirectTo, r.split('/'), paths, posParams);
    }
}
function createPaths(redirectTo, parts, segments, posParams) {
    return parts.map(function (p) { return p.startsWith(':') ? findPosParam(p, posParams, redirectTo) :
        findOrCreatePath(p, segments); });
}
function findPosParam(part, posParams, redirectTo) {
    var paramName = part.substring(1);
    var pos = posParams[paramName];
    if (!pos)
        throw new Error("Cannot redirect to '" + redirectTo + "'. Cannot find '" + part + "'.");
    return pos;
}
function findOrCreatePath(part, paths) {
    var matchingIndex = paths.findIndex(function (s) { return s.path === part; });
    if (matchingIndex > -1) {
        var r = paths[matchingIndex];
        paths.splice(matchingIndex);
        return r;
    }
    else {
        return new url_tree_1.UrlPathWithParams(part, {});
    }
}
function split(segment, consumedPaths, slicedPath, config) {
    if (slicedPath.length > 0 &&
        containsEmptyPathRedirectsWithNamedOutlets(segment, slicedPath, config)) {
        var s = new url_tree_1.UrlSegment(consumedPaths, createChildrenForEmptyPaths(config, new url_tree_1.UrlSegment(slicedPath, segment.children)));
        return { segment: s, slicedPath: [] };
    }
    else if (slicedPath.length === 0 && containsEmptyPathRedirects(segment, slicedPath, config)) {
        var s = new url_tree_1.UrlSegment(segment.pathsWithParams, addEmptyPathsToChildrenIfNeeded(segment, slicedPath, config, segment.children));
        return { segment: s, slicedPath: slicedPath };
    }
    else {
        return { segment: segment, slicedPath: slicedPath };
    }
}
function addEmptyPathsToChildrenIfNeeded(segment, slicedPath, routes, children) {
    var res = {};
    for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
        var r = routes_2[_i];
        if (emptyPathRedirect(segment, slicedPath, r) && !children[getOutlet(r)]) {
            res[getOutlet(r)] = new url_tree_1.UrlSegment([], {});
        }
    }
    return collection_1.merge(children, res);
}
function createChildrenForEmptyPaths(routes, primarySegment) {
    var res = {};
    res[shared_1.PRIMARY_OUTLET] = primarySegment;
    for (var _i = 0, routes_3 = routes; _i < routes_3.length; _i++) {
        var r = routes_3[_i];
        if (r.path === '') {
            res[getOutlet(r)] = new url_tree_1.UrlSegment([], {});
        }
    }
    return res;
}
function containsEmptyPathRedirectsWithNamedOutlets(segment, slicedPath, routes) {
    return routes
        .filter(function (r) { return emptyPathRedirect(segment, slicedPath, r) && getOutlet(r) !== shared_1.PRIMARY_OUTLET; })
        .length > 0;
}
function containsEmptyPathRedirects(segment, slicedPath, routes) {
    return routes.filter(function (r) { return emptyPathRedirect(segment, slicedPath, r); }).length > 0;
}
function emptyPathRedirect(segment, slicedPath, r) {
    if ((segment.hasChildren() || slicedPath.length > 0) && r.terminal)
        return false;
    return r.path === '' && r.redirectTo !== undefined;
}
function getOutlet(route) {
    return route.outlet ? route.outlet : shared_1.PRIMARY_OUTLET;
}
//# sourceMappingURL=apply_redirects.js.map

/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = __webpack_require__(35);
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(142);
var router_outlet_map_1 = __webpack_require__(143);
var router_state_1 = __webpack_require__(89);
var url_tree_1 = __webpack_require__(61);
exports.ROUTER_CONFIG = new core_1.OpaqueToken('ROUTER_CONFIG');
exports.ROUTER_OPTIONS = new core_1.OpaqueToken('ROUTER_OPTIONS');
function setupRouter(ref, resolver, urlSerializer, outletMap, location, injector, config, opts) {
    if (ref.componentTypes.length == 0) {
        throw new Error('Bootstrap at least one component before injecting Router.');
    }
    var componentType = ref.componentTypes[0];
    var r = new router_1.Router(componentType, resolver, urlSerializer, outletMap, location, injector, config);
    ref.registerDisposeListener(function () { return r.dispose(); });
    if (opts.enableTracing) {
        r.events.subscribe(function (e) {
            console.group("Router Event: " + e.constructor.name);
            console.log(e.toString());
            console.log(e);
            console.groupEnd();
        });
    }
    return r;
}
exports.setupRouter = setupRouter;
function setupRouterInitializer(injector) {
    // https://github.com/angular/angular/issues/9101
    // Delay the router instantiation to avoid circular dependency (ApplicationRef ->
    // APP_INITIALIZER -> Router)
    setTimeout(function () {
        var appRef = injector.get(core_1.ApplicationRef);
        if (appRef.componentTypes.length == 0) {
            appRef.registerBootstrapListener(function () { injector.get(router_1.Router).initialNavigation(); });
        }
        else {
            injector.get(router_1.Router).initialNavigation();
        }
    }, 0);
    return function () { return null; };
}
exports.setupRouterInitializer = setupRouterInitializer;
/**
 * A list of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example
 *
 * ```
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * class AppCmp {
 *   // ...
 * }
 *
 * const router = [
 *   {path: '/home', component: Home}
 * ];
 *
 * bootstrap(AppCmp, [provideRouter(router)]);
 * ```
 */
function provideRouter(_config, _opts) {
    return [
        { provide: exports.ROUTER_CONFIG, useValue: _config }, { provide: exports.ROUTER_OPTIONS, useValue: _opts },
        common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
        { provide: url_tree_1.UrlSerializer, useClass: url_tree_1.DefaultUrlSerializer },
        {
            provide: router_1.Router,
            useFactory: setupRouter,
            deps: [
                core_1.ApplicationRef, core_1.ComponentResolver, url_tree_1.UrlSerializer, router_outlet_map_1.RouterOutletMap, common_1.Location, core_1.Injector,
                exports.ROUTER_CONFIG, exports.ROUTER_OPTIONS
            ]
        },
        router_outlet_map_1.RouterOutletMap,
        { provide: router_state_1.ActivatedRoute, useFactory: function (r) { return r.routerState.root; }, deps: [router_1.Router] },
        // Trigger initial navigation
        { provide: core_1.APP_INITIALIZER, multi: true, useFactory: setupRouterInitializer, deps: [core_1.Injector] }
    ];
}
exports.provideRouter = provideRouter;
//# sourceMappingURL=common_router_providers.js.map

/***/ },

/***/ 473:
/***/ function(module, exports) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function validateConfig(config) {
    config.forEach(validateNode);
}
exports.validateConfig = validateConfig;
function validateNode(route) {
    if (!!route.redirectTo && !!route.children) {
        throw new Error("Invalid configuration of route '" + route.path + "': redirectTo and children cannot be used together");
    }
    if (!!route.redirectTo && !!route.component) {
        throw new Error("Invalid configuration of route '" + route.path + "': redirectTo and component cannot be used together");
    }
    if (route.redirectTo === undefined && !route.component && !route.children) {
        throw new Error("Invalid configuration of route '" + route.path + "': component, redirectTo, children must be provided");
    }
    if (route.path === undefined) {
        throw new Error("Invalid route configuration: routes must have path specified");
    }
    if (route.path.startsWith('/')) {
        throw new Error("Invalid route configuration of route '" + route.path + "': path cannot start with a slash");
    }
}
//# sourceMappingURL=config.js.map

/***/ },

/***/ 474:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var BehaviorSubject_1 = __webpack_require__(355);
var router_state_1 = __webpack_require__(89);
var tree_1 = __webpack_require__(212);
function createRouterState(curr, prevState) {
    var root = createNode(curr._root, prevState ? prevState._root : undefined);
    var queryParams = prevState ? prevState.queryParams : new BehaviorSubject_1.BehaviorSubject(curr.queryParams);
    var fragment = prevState ? prevState.fragment : new BehaviorSubject_1.BehaviorSubject(curr.fragment);
    return new router_state_1.RouterState(root, queryParams, fragment, curr);
}
exports.createRouterState = createRouterState;
function createNode(curr, prevState) {
    if (prevState && equalRouteSnapshots(prevState.value.snapshot, curr.value)) {
        var value = prevState.value;
        value._futureSnapshot = curr.value;
        var children = createOrReuseChildren(curr, prevState);
        return new tree_1.TreeNode(value, children);
    }
    else {
        var value = createActivatedRoute(curr.value);
        var children = curr.children.map(function (c) { return createNode(c); });
        return new tree_1.TreeNode(value, children);
    }
}
function createOrReuseChildren(curr, prevState) {
    return curr.children.map(function (child) {
        var index = prevState.children.findIndex(function (p) { return equalRouteSnapshots(p.value.snapshot, child.value); });
        if (index >= 0) {
            return createNode(child, prevState.children[index]);
        }
        else {
            return createNode(child);
        }
    });
}
function createActivatedRoute(c) {
    return new router_state_1.ActivatedRoute(new BehaviorSubject_1.BehaviorSubject(c.url), new BehaviorSubject_1.BehaviorSubject(c.params), c.outlet, c.component, c);
}
function equalRouteSnapshots(a, b) {
    return a._routeConfig === b._routeConfig;
}
//# sourceMappingURL=create_router_state.js.map

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var shared_1 = __webpack_require__(60);
var url_tree_1 = __webpack_require__(61);
var collection_1 = __webpack_require__(90);
function createUrlTree(route, urlTree, commands, queryParams, fragment) {
    if (commands.length === 0) {
        return tree(urlTree.root, urlTree.root, urlTree, queryParams, fragment);
    }
    var normalizedCommands = normalizeCommands(commands);
    if (navigateToRoot(normalizedCommands)) {
        return tree(urlTree.root, new url_tree_1.UrlSegment([], {}), urlTree, queryParams, fragment);
    }
    var startingPosition = findStartingPosition(normalizedCommands, urlTree, route);
    var segment = startingPosition.processChildren ?
        updateSegmentChildren(startingPosition.segment, startingPosition.index, normalizedCommands.commands) :
        updateSegment(startingPosition.segment, startingPosition.index, normalizedCommands.commands);
    return tree(startingPosition.segment, segment, urlTree, queryParams, fragment);
}
exports.createUrlTree = createUrlTree;
function tree(oldSegment, newSegment, urlTree, queryParams, fragment) {
    var q = queryParams ? stringify(queryParams) : urlTree.queryParams;
    var f = fragment ? fragment : urlTree.fragment;
    if (urlTree.root === oldSegment) {
        return new url_tree_1.UrlTree(newSegment, q, f);
    }
    else {
        return new url_tree_1.UrlTree(replaceSegment(urlTree.root, oldSegment, newSegment), q, f);
    }
}
function replaceSegment(current, oldSegment, newSegment) {
    var children = {};
    collection_1.forEach(current.children, function (c, outletName) {
        if (c === oldSegment) {
            children[outletName] = newSegment;
        }
        else {
            children[outletName] = replaceSegment(c, oldSegment, newSegment);
        }
    });
    return new url_tree_1.UrlSegment(current.pathsWithParams, children);
}
function navigateToRoot(normalizedChange) {
    return normalizedChange.isAbsolute && normalizedChange.commands.length === 1 &&
        normalizedChange.commands[0] == '/';
}
var NormalizedNavigationCommands = (function () {
    function NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, commands) {
        this.isAbsolute = isAbsolute;
        this.numberOfDoubleDots = numberOfDoubleDots;
        this.commands = commands;
    }
    return NormalizedNavigationCommands;
}());
function normalizeCommands(commands) {
    if ((typeof commands[0] === 'string') && commands.length === 1 && commands[0] == '/') {
        return new NormalizedNavigationCommands(true, 0, commands);
    }
    var numberOfDoubleDots = 0;
    var isAbsolute = false;
    var res = [];
    for (var i = 0; i < commands.length; ++i) {
        var c = commands[i];
        if (!(typeof c === 'string')) {
            res.push(c);
            continue;
        }
        var parts = c.split('/');
        for (var j = 0; j < parts.length; ++j) {
            var cc = parts[j];
            // first exp is treated in a special way
            if (i == 0) {
                if (j == 0 && cc == '.') {
                }
                else if (j == 0 && cc == '') {
                    isAbsolute = true;
                }
                else if (cc == '..') {
                    numberOfDoubleDots++;
                }
                else if (cc != '') {
                    res.push(cc);
                }
            }
            else {
                if (cc != '') {
                    res.push(cc);
                }
            }
        }
    }
    return new NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, res);
}
var Position = (function () {
    function Position(segment, processChildren, index) {
        this.segment = segment;
        this.processChildren = processChildren;
        this.index = index;
    }
    return Position;
}());
function findStartingPosition(normalizedChange, urlTree, route) {
    if (normalizedChange.isAbsolute) {
        return new Position(urlTree.root, true, 0);
    }
    else if (route.snapshot._lastPathIndex === -1) {
        return new Position(route.snapshot._urlSegment, true, 0);
    }
    else if (route.snapshot._lastPathIndex + 1 - normalizedChange.numberOfDoubleDots >= 0) {
        return new Position(route.snapshot._urlSegment, false, route.snapshot._lastPathIndex + 1 - normalizedChange.numberOfDoubleDots);
    }
    else {
        throw new Error('Invalid number of \'../\'');
    }
}
function getPath(command) {
    if (!(typeof command === 'string'))
        return command.toString();
    var parts = command.toString().split(':');
    return parts.length > 1 ? parts[1] : command;
}
function getOutlet(commands) {
    if (!(typeof commands[0] === 'string'))
        return shared_1.PRIMARY_OUTLET;
    var parts = commands[0].toString().split(':');
    return parts.length > 1 ? parts[0] : shared_1.PRIMARY_OUTLET;
}
function updateSegment(segment, startIndex, commands) {
    if (!segment) {
        segment = new url_tree_1.UrlSegment([], {});
    }
    if (segment.pathsWithParams.length === 0 && segment.hasChildren()) {
        return updateSegmentChildren(segment, startIndex, commands);
    }
    var m = prefixedWith(segment, startIndex, commands);
    var slicedCommands = commands.slice(m.lastIndex);
    if (m.match && slicedCommands.length === 0) {
        return new url_tree_1.UrlSegment(segment.pathsWithParams, {});
    }
    else if (m.match && !segment.hasChildren()) {
        return createNewSegment(segment, startIndex, commands);
    }
    else if (m.match) {
        return updateSegmentChildren(segment, 0, slicedCommands);
    }
    else {
        return createNewSegment(segment, startIndex, commands);
    }
}
function updateSegmentChildren(segment, startIndex, commands) {
    if (commands.length === 0) {
        return new url_tree_1.UrlSegment(segment.pathsWithParams, {});
    }
    else {
        var outlet_1 = getOutlet(commands);
        var children_1 = {};
        children_1[outlet_1] = updateSegment(segment.children[outlet_1], startIndex, commands);
        collection_1.forEach(segment.children, function (child, childOutlet) {
            if (childOutlet !== outlet_1) {
                children_1[childOutlet] = child;
            }
        });
        return new url_tree_1.UrlSegment(segment.pathsWithParams, children_1);
    }
}
function prefixedWith(segment, startIndex, commands) {
    var currentCommandIndex = 0;
    var currentPathIndex = startIndex;
    var noMatch = { match: false, lastIndex: 0 };
    while (currentPathIndex < segment.pathsWithParams.length) {
        if (currentCommandIndex >= commands.length)
            return noMatch;
        var path = segment.pathsWithParams[currentPathIndex];
        var curr = getPath(commands[currentCommandIndex]);
        var next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
        if (curr && next && (typeof next === 'object')) {
            if (!compare(curr, next, path))
                return noMatch;
            currentCommandIndex += 2;
        }
        else {
            if (!compare(curr, {}, path))
                return noMatch;
            currentCommandIndex++;
        }
        currentPathIndex++;
    }
    return { match: true, lastIndex: currentCommandIndex };
}
function createNewSegment(segment, startIndex, commands) {
    var paths = segment.pathsWithParams.slice(0, startIndex);
    var i = 0;
    while (i < commands.length) {
        // if we start with an object literal, we need to reuse the path part from the segment
        if (i === 0 && (typeof commands[0] === 'object')) {
            var p = segment.pathsWithParams[startIndex];
            paths.push(new url_tree_1.UrlPathWithParams(p.path, commands[0]));
            i++;
            continue;
        }
        var curr = getPath(commands[i]);
        var next = (i < commands.length - 1) ? commands[i + 1] : null;
        if (curr && next && (typeof next === 'object')) {
            paths.push(new url_tree_1.UrlPathWithParams(curr, stringify(next)));
            i += 2;
        }
        else {
            paths.push(new url_tree_1.UrlPathWithParams(curr, {}));
            i++;
        }
    }
    return new url_tree_1.UrlSegment(paths, {});
}
function stringify(params) {
    var res = {};
    collection_1.forEach(params, function (v, k) { return res[k] = "" + v; });
    return res;
}
function compare(path, params, pathWithParams) {
    return path == pathWithParams.path && collection_1.shallowEqual(params, pathWithParams.parameters);
}
//# sourceMappingURL=create_url_tree.js.map

/***/ },

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(142);
var url_tree_1 = __webpack_require__(61);
var router_link_1 = __webpack_require__(325);
var RouterLinkActive = (function () {
    /**
     * @internal
     */
    function RouterLinkActive(router, element, renderer) {
        var _this = this;
        this.router = router;
        this.element = element;
        this.renderer = renderer;
        this.classes = [];
        this.routerLinkActiveOptions = { exact: false };
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof router_1.NavigationEnd) {
                _this.update();
            }
        });
    }
    RouterLinkActive.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.links.changes.subscribe(function (s) { return _this.update(); });
        this.update();
    };
    Object.defineProperty(RouterLinkActive.prototype, "routerLinkActive", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.classes = data;
            }
            else {
                this.classes = data.split(' ');
            }
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkActive.prototype.ngOnChanges = function (changes) { this.update(); };
    RouterLinkActive.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    RouterLinkActive.prototype.update = function () {
        var _this = this;
        if (!this.links || this.links.length === 0)
            return;
        var currentUrlTree = this.router.parseUrl(this.router.url);
        var isActive = this.links.reduce(function (res, link) {
            return res || url_tree_1.containsTree(currentUrlTree, link.urlTree, _this.routerLinkActiveOptions.exact);
        }, false);
        this.classes.forEach(function (c) { return _this.renderer.setElementClass(_this.element.nativeElement, c, isActive); });
    };
    /** @nocollapse */
    RouterLinkActive.decorators = [
        { type: core_1.Directive, args: [{ selector: '[routerLinkActive]' },] },
    ];
    /** @nocollapse */
    RouterLinkActive.ctorParameters = [
        { type: router_1.Router, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
    /** @nocollapse */
    RouterLinkActive.propDecorators = {
        'links': [{ type: core_1.ContentChildren, args: [router_link_1.RouterLink,] },],
        'routerLinkActiveOptions': [{ type: core_1.Input },],
        'routerLinkActive': [{ type: core_1.Input },],
    };
    return RouterLinkActive;
}());
exports.RouterLinkActive = RouterLinkActive;
//# sourceMappingURL=router_link_active.js.map

/***/ },

/***/ 477:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = __webpack_require__(0);
var router_outlet_map_1 = __webpack_require__(143);
var shared_1 = __webpack_require__(60);
var RouterOutlet = (function () {
    /**
     * @internal
     */
    function RouterOutlet(parentOutletMap, location, name) {
        this.location = location;
        parentOutletMap.registerOutlet(name ? name : shared_1.PRIMARY_OUTLET, this);
    }
    Object.defineProperty(RouterOutlet.prototype, "isActivated", {
        get: function () { return !!this.activated; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "component", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this.activated.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this._activatedRoute;
        },
        enumerable: true,
        configurable: true
    });
    RouterOutlet.prototype.deactivate = function () {
        if (this.activated) {
            this.activated.destroy();
            this.activated = null;
        }
    };
    RouterOutlet.prototype.activate = function (factory, activatedRoute, providers, outletMap) {
        this.outletMap = outletMap;
        this._activatedRoute = activatedRoute;
        var inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, this.location.parentInjector);
        this.activated = this.location.createComponent(factory, this.location.length, inj, []);
    };
    /** @nocollapse */
    RouterOutlet.decorators = [
        { type: core_1.Directive, args: [{ selector: 'router-outlet' },] },
    ];
    /** @nocollapse */
    RouterOutlet.ctorParameters = [
        { type: router_outlet_map_1.RouterOutletMap, },
        { type: core_1.ViewContainerRef, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['name',] },] },
    ];
    return RouterOutlet;
}());
exports.RouterOutlet = RouterOutlet;
//# sourceMappingURL=router_outlet.js.map

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var Observable_1 = __webpack_require__(10);
var of_1 = __webpack_require__(237);
var router_state_1 = __webpack_require__(89);
var shared_1 = __webpack_require__(60);
var url_tree_1 = __webpack_require__(61);
var collection_1 = __webpack_require__(90);
var tree_1 = __webpack_require__(212);
var NoMatch = (function () {
    function NoMatch(segment) {
        if (segment === void 0) { segment = null; }
        this.segment = segment;
    }
    return NoMatch;
}());
function recognize(rootComponentType, config, urlTree, url) {
    try {
        var children = processSegment(config, urlTree.root, {}, shared_1.PRIMARY_OUTLET);
        var root = new router_state_1.ActivatedRouteSnapshot([], {}, shared_1.PRIMARY_OUTLET, rootComponentType, null, urlTree.root, -1);
        var rootNode = new tree_1.TreeNode(root, children);
        return of_1.of(new router_state_1.RouterStateSnapshot(url, rootNode, urlTree.queryParams, urlTree.fragment));
    }
    catch (e) {
        if (e instanceof NoMatch) {
            return new Observable_1.Observable(function (obs) {
                return obs.error(new Error("Cannot match any routes: '" + e.segment + "'"));
            });
        }
        else {
            return new Observable_1.Observable(function (obs) { return obs.error(e); });
        }
    }
}
exports.recognize = recognize;
function processSegment(config, segment, extraParams, outlet) {
    if (segment.pathsWithParams.length === 0 && segment.hasChildren()) {
        return processSegmentChildren(config, segment, extraParams);
    }
    else {
        return processPathsWithParams(config, segment, 0, segment.pathsWithParams, extraParams, outlet);
    }
}
function processSegmentChildren(config, segment, extraParams) {
    var children = url_tree_1.mapChildrenIntoArray(segment, function (child, childOutlet) { return processSegment(config, child, extraParams, childOutlet); });
    checkOutletNameUniqueness(children);
    sortActivatedRouteSnapshots(children);
    return children;
}
function sortActivatedRouteSnapshots(nodes) {
    nodes.sort(function (a, b) {
        if (a.value.outlet === shared_1.PRIMARY_OUTLET)
            return -1;
        if (b.value.outlet === shared_1.PRIMARY_OUTLET)
            return 1;
        return a.value.outlet.localeCompare(b.value.outlet);
    });
}
function processPathsWithParams(config, segment, pathIndex, paths, extraParams, outlet) {
    for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
        var r = config_1[_i];
        try {
            return processPathsWithParamsAgainstRoute(r, segment, pathIndex, paths, extraParams, outlet);
        }
        catch (e) {
            if (!(e instanceof NoMatch))
                throw e;
        }
    }
    throw new NoMatch(segment);
}
function processPathsWithParamsAgainstRoute(route, rawSegment, pathIndex, paths, parentExtraParams, outlet) {
    if (route.redirectTo)
        throw new NoMatch();
    if ((route.outlet ? route.outlet : shared_1.PRIMARY_OUTLET) !== outlet)
        throw new NoMatch();
    if (route.path === '**') {
        var params = paths.length > 0 ? collection_1.last(paths).parameters : {};
        var snapshot_1 = new router_state_1.ActivatedRouteSnapshot(paths, collection_1.merge(parentExtraParams, params), outlet, route.component, route, getSourceSegment(rawSegment), getPathIndexShift(rawSegment) - 1);
        return [new tree_1.TreeNode(snapshot_1, [])];
    }
    var _a = match(rawSegment, route, paths, parentExtraParams), consumedPaths = _a.consumedPaths, parameters = _a.parameters, extraParams = _a.extraParams, lastChild = _a.lastChild;
    var rawSlicedPath = paths.slice(lastChild);
    var childConfig = route.children ? route.children : [];
    var _b = split(rawSegment, consumedPaths, rawSlicedPath, childConfig), segment = _b.segment, slicedPath = _b.slicedPath;
    var snapshot = new router_state_1.ActivatedRouteSnapshot(consumedPaths, parameters, outlet, route.component, route, getSourceSegment(rawSegment), getPathIndexShift(rawSegment) + pathIndex + lastChild - 1);
    if (slicedPath.length === 0 && segment.hasChildren()) {
        var children = processSegmentChildren(childConfig, segment, extraParams);
        return [new tree_1.TreeNode(snapshot, children)];
    }
    else if (childConfig.length === 0 && slicedPath.length === 0) {
        return [new tree_1.TreeNode(snapshot, [])];
    }
    else {
        var children = processPathsWithParams(childConfig, segment, pathIndex + lastChild, slicedPath, extraParams, shared_1.PRIMARY_OUTLET);
        return [new tree_1.TreeNode(snapshot, children)];
    }
}
function match(segment, route, paths, parentExtraParams) {
    if (route.path === '') {
        if (route.terminal && (segment.hasChildren() || paths.length > 0)) {
            throw new NoMatch();
        }
        else {
            return { consumedPaths: [], lastChild: 0, parameters: {}, extraParams: {} };
        }
    }
    var path = route.path;
    var parts = path.split('/');
    var posParameters = {};
    var consumedPaths = [];
    var currentIndex = 0;
    for (var i = 0; i < parts.length; ++i) {
        if (currentIndex >= paths.length)
            throw new NoMatch();
        var current = paths[currentIndex];
        var p = parts[i];
        var isPosParam = p.startsWith(':');
        if (!isPosParam && p !== current.path)
            throw new NoMatch();
        if (isPosParam) {
            posParameters[p.substring(1)] = current.path;
        }
        consumedPaths.push(current);
        currentIndex++;
    }
    if (route.terminal && (segment.hasChildren() || currentIndex < paths.length)) {
        throw new NoMatch();
    }
    var parameters = collection_1.merge(parentExtraParams, collection_1.merge(posParameters, consumedPaths[consumedPaths.length - 1].parameters));
    var extraParams = route.component ? {} : parameters;
    return { consumedPaths: consumedPaths, lastChild: currentIndex, parameters: parameters, extraParams: extraParams };
}
function checkOutletNameUniqueness(nodes) {
    var names = {};
    nodes.forEach(function (n) {
        var routeWithSameOutletName = names[n.value.outlet];
        if (routeWithSameOutletName) {
            var p = routeWithSameOutletName.url.map(function (s) { return s.toString(); }).join('/');
            var c = n.value.url.map(function (s) { return s.toString(); }).join('/');
            throw new Error("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
        }
        names[n.value.outlet] = n.value;
    });
}
function getSourceSegment(segment) {
    var s = segment;
    while (s._sourceSegment) {
        s = s._sourceSegment;
    }
    return s;
}
function getPathIndexShift(segment) {
    var s = segment;
    var res = 0;
    while (s._sourceSegment) {
        s = s._sourceSegment;
        res += segment._pathIndexShift;
    }
    return res;
}
function split(segment, consumedPaths, slicedPath, config) {
    if (slicedPath.length > 0 &&
        containsEmptyPathMatchesWithNamedOutlets(segment, slicedPath, config)) {
        var s = new url_tree_1.UrlSegment(consumedPaths, createChildrenForEmptyPaths(segment, consumedPaths, config, new url_tree_1.UrlSegment(slicedPath, segment.children)));
        s._sourceSegment = segment;
        s._pathIndexShift = 0;
        return { segment: s, slicedPath: [] };
    }
    else if (slicedPath.length === 0 && containsEmptyPathMatches(segment, slicedPath, config)) {
        var s = new url_tree_1.UrlSegment(segment.pathsWithParams, addEmptyPathsToChildrenIfNeeded(segment, slicedPath, config, segment.children));
        s._sourceSegment = segment;
        s._pathIndexShift = 0;
        return { segment: s, slicedPath: slicedPath };
    }
    else {
        return { segment: segment, slicedPath: slicedPath };
    }
}
function addEmptyPathsToChildrenIfNeeded(segment, slicedPath, routes, children) {
    var res = {};
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var r = routes_1[_i];
        if (emptyPathMatch(segment, slicedPath, r) && !children[getOutlet(r)]) {
            var s = new url_tree_1.UrlSegment([], {});
            s._sourceSegment = segment;
            s._pathIndexShift = segment.pathsWithParams.length;
            res[getOutlet(r)] = s;
        }
    }
    return collection_1.merge(children, res);
}
function createChildrenForEmptyPaths(segment, consumedPaths, routes, primarySegment) {
    var res = {};
    res[shared_1.PRIMARY_OUTLET] = primarySegment;
    primarySegment._sourceSegment = segment;
    primarySegment._pathIndexShift = consumedPaths.length;
    for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
        var r = routes_2[_i];
        if (r.path === '') {
            var s = new url_tree_1.UrlSegment([], {});
            s._sourceSegment = segment;
            s._pathIndexShift = consumedPaths.length;
            res[getOutlet(r)] = s;
        }
    }
    return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segment, slicedPath, routes) {
    return routes
        .filter(function (r) { return emptyPathMatch(segment, slicedPath, r) && getOutlet(r) !== shared_1.PRIMARY_OUTLET; })
        .length > 0;
}
function containsEmptyPathMatches(segment, slicedPath, routes) {
    return routes.filter(function (r) { return emptyPathMatch(segment, slicedPath, r); }).length > 0;
}
function emptyPathMatch(segment, slicedPath, r) {
    if ((segment.hasChildren() || slicedPath.length > 0) && r.terminal)
        return false;
    return r.path === '' && r.redirectTo === undefined;
}
function getOutlet(route) {
    return route.outlet ? route.outlet : shared_1.PRIMARY_OUTLET;
}
//# sourceMappingURL=recognize.js.map

/***/ },

/***/ 479:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
__webpack_require__(356);
__webpack_require__(644);
var forkJoin_1 = __webpack_require__(649);
var fromPromise_1 = __webpack_require__(651);
function resolve(resolver, state) {
    return resolveNode(resolver, state._root).map(function (_) { return state; });
}
exports.resolve = resolve;
function resolveNode(resolver, node) {
    if (node.children.length === 0) {
        return fromPromise_1.fromPromise(resolveComponent(resolver, node.value).then(function (factory) {
            node.value._resolvedComponentFactory = factory;
            return node.value;
        }));
    }
    else {
        var c = node.children.map(function (c) { return resolveNode(resolver, c).toPromise(); });
        return forkJoin_1.forkJoin(c).map(function (_) { return resolveComponent(resolver, node.value).then(function (factory) {
            node.value._resolvedComponentFactory = factory;
            return node.value;
        }); });
    }
}
function resolveComponent(resolver, snapshot) {
    if (snapshot.component && snapshot._routeConfig) {
        return resolver.resolveComponent(snapshot.component);
    }
    else {
        return Promise.resolve(null);
    }
}
//# sourceMappingURL=resolve.js.map

/***/ },

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = __webpack_require__(35);
var platform_browser_1 = __webpack_require__(113);
var common_router_providers_1 = __webpack_require__(472);
/**
 * A list of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example
 *
 * ```
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * class AppCmp {
 *   // ...
 * }
 *
 * const router = [
 *   {path: '/home', component: Home}
 * ];
 *
 * bootstrap(AppCmp, [provideRouter(router)]);
 * ```
 */
function provideRouter(config, opts) {
    if (opts === void 0) { opts = {}; }
    return [
        { provide: common_1.PlatformLocation, useClass: platform_browser_1.BrowserPlatformLocation }
    ].concat(common_router_providers_1.provideRouter(config, opts));
}
exports.provideRouter = provideRouter;
//# sourceMappingURL=router_providers.js.map

/***/ },

/***/ 483:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

__webpack_require__(113);
__webpack_require__(155);
__webpack_require__(0);
__webpack_require__(35);
__webpack_require__(365);
__webpack_require__(366);

/***/ },

/***/ 58:
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Supported http methods.
 */
(function (RequestMethod) {
    RequestMethod[RequestMethod["Get"] = 0] = "Get";
    RequestMethod[RequestMethod["Post"] = 1] = "Post";
    RequestMethod[RequestMethod["Put"] = 2] = "Put";
    RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
    RequestMethod[RequestMethod["Options"] = 4] = "Options";
    RequestMethod[RequestMethod["Head"] = 5] = "Head";
    RequestMethod[RequestMethod["Patch"] = 6] = "Patch";
})(exports.RequestMethod || (exports.RequestMethod = {}));
var RequestMethod = exports.RequestMethod;
/**
 * All possible states in which a connection can be, based on
 * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
 * additional "CANCELLED" state.
 */
(function (ReadyState) {
    ReadyState[ReadyState["Unsent"] = 0] = "Unsent";
    ReadyState[ReadyState["Open"] = 1] = "Open";
    ReadyState[ReadyState["HeadersReceived"] = 2] = "HeadersReceived";
    ReadyState[ReadyState["Loading"] = 3] = "Loading";
    ReadyState[ReadyState["Done"] = 4] = "Done";
    ReadyState[ReadyState["Cancelled"] = 5] = "Cancelled";
})(exports.ReadyState || (exports.ReadyState = {}));
var ReadyState = exports.ReadyState;
/**
 * Acceptable response types to be associated with a {@link Response}, based on
 * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
 */
(function (ResponseType) {
    ResponseType[ResponseType["Basic"] = 0] = "Basic";
    ResponseType[ResponseType["Cors"] = 1] = "Cors";
    ResponseType[ResponseType["Default"] = 2] = "Default";
    ResponseType[ResponseType["Error"] = 3] = "Error";
    ResponseType[ResponseType["Opaque"] = 4] = "Opaque";
})(exports.ResponseType || (exports.ResponseType = {}));
var ResponseType = exports.ResponseType;
/**
 * Supported content type to be automatically associated with a {@link Request}.
 */
(function (ContentType) {
    ContentType[ContentType["NONE"] = 0] = "NONE";
    ContentType[ContentType["JSON"] = 1] = "JSON";
    ContentType[ContentType["FORM"] = 2] = "FORM";
    ContentType[ContentType["FORM_DATA"] = 3] = "FORM_DATA";
    ContentType[ContentType["TEXT"] = 4] = "TEXT";
    ContentType[ContentType["BLOB"] = 5] = "BLOB";
    ContentType[ContentType["ARRAY_BUFFER"] = 6] = "ARRAY_BUFFER";
})(exports.ContentType || (exports.ContentType = {}));
var ContentType = exports.ContentType;
//# sourceMappingURL=enums.js.map

/***/ },

/***/ 60:
/***/ function(module, exports) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * Name of the primary outlet.
 * @type {string}
 */
exports.PRIMARY_OUTLET = 'PRIMARY_OUTLET';
//# sourceMappingURL=shared.js.map

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var shared_1 = __webpack_require__(60);
var collection_1 = __webpack_require__(90);
function createEmptyUrlTree() {
    return new UrlTree(new UrlSegment([], {}), {}, null);
}
exports.createEmptyUrlTree = createEmptyUrlTree;
function containsTree(container, containee, exact) {
    if (exact) {
        return equalSegments(container.root, containee.root);
    }
    else {
        return containsSegment(container.root, containee.root);
    }
}
exports.containsTree = containsTree;
function equalSegments(container, containee) {
    if (!equalPath(container.pathsWithParams, containee.pathsWithParams))
        return false;
    if (Object.keys(container.children).length !== Object.keys(containee.children).length)
        return false;
    for (var c in containee.children) {
        if (!container.children[c])
            return false;
        if (!equalSegments(container.children[c], containee.children[c]))
            return false;
    }
    return true;
}
function containsSegment(container, containee) {
    return containsSegmentHelper(container, containee, containee.pathsWithParams);
}
function containsSegmentHelper(container, containee, containeePaths) {
    if (container.pathsWithParams.length > containeePaths.length) {
        var current = container.pathsWithParams.slice(0, containeePaths.length);
        if (!equalPath(current, containeePaths))
            return false;
        if (Object.keys(containee.children).length > 0)
            return false;
        return true;
    }
    else if (container.pathsWithParams.length === containeePaths.length) {
        if (!equalPath(container.pathsWithParams, containeePaths))
            return false;
        for (var c in containee.children) {
            if (!container.children[c])
                return false;
            if (!containsSegment(container.children[c], containee.children[c]))
                return false;
        }
        return true;
    }
    else {
        var current = containeePaths.slice(0, container.pathsWithParams.length);
        var next = containeePaths.slice(container.pathsWithParams.length);
        if (!equalPath(container.pathsWithParams, current))
            return false;
        return containsSegmentHelper(container.children[shared_1.PRIMARY_OUTLET], containee, next);
    }
}
/**
 * A URL in the tree form.
 */
var UrlTree = (function () {
    /**
     * @internal
     */
    function UrlTree(root, queryParams, fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    UrlTree.prototype.toString = function () { return new DefaultUrlSerializer().serialize(this); };
    return UrlTree;
}());
exports.UrlTree = UrlTree;
var UrlSegment = (function () {
    function UrlSegment(pathsWithParams, children) {
        var _this = this;
        this.pathsWithParams = pathsWithParams;
        this.children = children;
        this.parent = null;
        collection_1.forEach(children, function (v, k) { return v.parent = _this; });
    }
    UrlSegment.prototype.hasChildren = function () { return Object.keys(this.children).length > 0; };
    UrlSegment.prototype.toString = function () { return serializePaths(this); };
    return UrlSegment;
}());
exports.UrlSegment = UrlSegment;
var UrlPathWithParams = (function () {
    function UrlPathWithParams(path, parameters) {
        this.path = path;
        this.parameters = parameters;
    }
    UrlPathWithParams.prototype.toString = function () { return serializePath(this); };
    return UrlPathWithParams;
}());
exports.UrlPathWithParams = UrlPathWithParams;
function equalPathsWithParams(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
            return false;
        if (!collection_1.shallowEqual(a[i].parameters, b[i].parameters))
            return false;
    }
    return true;
}
exports.equalPathsWithParams = equalPathsWithParams;
function equalPath(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
            return false;
    }
    return true;
}
exports.equalPath = equalPath;
function mapChildren(segment, fn) {
    var newChildren = {};
    collection_1.forEach(segment.children, function (child, childOutlet) {
        if (childOutlet === shared_1.PRIMARY_OUTLET) {
            newChildren[childOutlet] = fn(child, childOutlet);
        }
    });
    collection_1.forEach(segment.children, function (child, childOutlet) {
        if (childOutlet !== shared_1.PRIMARY_OUTLET) {
            newChildren[childOutlet] = fn(child, childOutlet);
        }
    });
    return newChildren;
}
exports.mapChildren = mapChildren;
function mapChildrenIntoArray(segment, fn) {
    var res = [];
    collection_1.forEach(segment.children, function (child, childOutlet) {
        if (childOutlet === shared_1.PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    collection_1.forEach(segment.children, function (child, childOutlet) {
        if (childOutlet !== shared_1.PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    return res;
}
exports.mapChildrenIntoArray = mapChildrenIntoArray;
/**
 * Defines a way to serialize/deserialize a url tree.
 */
var UrlSerializer = (function () {
    function UrlSerializer() {
    }
    return UrlSerializer;
}());
exports.UrlSerializer = UrlSerializer;
/**
 * A default implementation of the serialization.
 */
var DefaultUrlSerializer = (function () {
    function DefaultUrlSerializer() {
    }
    DefaultUrlSerializer.prototype.parse = function (url) {
        var p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
    };
    DefaultUrlSerializer.prototype.serialize = function (tree) {
        var segment = "/" + serializeSegment(tree.root, true);
        var query = serializeQueryParams(tree.queryParams);
        var fragment = tree.fragment !== null ? "#" + tree.fragment : '';
        return "" + segment + query + fragment;
    };
    return DefaultUrlSerializer;
}());
exports.DefaultUrlSerializer = DefaultUrlSerializer;
function serializePaths(segment) {
    return segment.pathsWithParams.map(function (p) { return serializePath(p); }).join('/');
}
exports.serializePaths = serializePaths;
function serializeSegment(segment, root) {
    if (segment.children[shared_1.PRIMARY_OUTLET] && root) {
        var primary = serializeSegment(segment.children[shared_1.PRIMARY_OUTLET], false);
        var children_1 = [];
        collection_1.forEach(segment.children, function (v, k) {
            if (k !== shared_1.PRIMARY_OUTLET) {
                children_1.push(k + ":" + serializeSegment(v, false));
            }
        });
        if (children_1.length > 0) {
            return primary + "(" + children_1.join('//') + ")";
        }
        else {
            return "" + primary;
        }
    }
    else if (segment.hasChildren() && !root) {
        var children = mapChildrenIntoArray(segment, function (v, k) {
            if (k === shared_1.PRIMARY_OUTLET) {
                return [serializeSegment(segment.children[shared_1.PRIMARY_OUTLET], false)];
            }
            else {
                return [(k + ":" + serializeSegment(v, false))];
            }
        });
        return serializePaths(segment) + "/(" + children.join('//') + ")";
    }
    else {
        return serializePaths(segment);
    }
}
function serializePath(path) {
    return "" + path.path + serializeParams(path.parameters);
}
exports.serializePath = serializePath;
function serializeParams(params) {
    return pairs(params).map(function (p) { return (";" + p.first + "=" + p.second); }).join('');
}
function serializeQueryParams(params) {
    var strs = pairs(params).map(function (p) { return (p.first + "=" + p.second); });
    return strs.length > 0 ? "?" + strs.join("&") : '';
}
var Pair = (function () {
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    return Pair;
}());
function pairs(obj) {
    var res = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            res.push(new Pair(prop, obj[prop]));
        }
    }
    return res;
}
var SEGMENT_RE = /^[^\/\(\)\?;=&#]+/;
function matchPathWithParams(str) {
    SEGMENT_RE.lastIndex = 0;
    var match = SEGMENT_RE.exec(str);
    return match ? match[0] : '';
}
var QUERY_PARAM_RE = /^[^=\?&#]+/;
function matchQueryParams(str) {
    QUERY_PARAM_RE.lastIndex = 0;
    var match = SEGMENT_RE.exec(str);
    return match ? match[0] : '';
}
var QUERY_PARAM_VALUE_RE = /^[^\?&#]+/;
function matchUrlQueryParamValue(str) {
    QUERY_PARAM_VALUE_RE.lastIndex = 0;
    var match = QUERY_PARAM_VALUE_RE.exec(str);
    return match ? match[0] : '';
}
var UrlParser = (function () {
    function UrlParser(remaining) {
        this.remaining = remaining;
    }
    UrlParser.prototype.peekStartsWith = function (str) { return this.remaining.startsWith(str); };
    UrlParser.prototype.capture = function (str) {
        if (!this.remaining.startsWith(str)) {
            throw new Error("Expected \"" + str + "\".");
        }
        this.remaining = this.remaining.substring(str.length);
    };
    UrlParser.prototype.parseRootSegment = function () {
        if (this.remaining === '' || this.remaining === '/') {
            return new UrlSegment([], {});
        }
        else {
            return new UrlSegment([], this.parseSegmentChildren());
        }
    };
    UrlParser.prototype.parseSegmentChildren = function () {
        if (this.remaining.length == 0) {
            return {};
        }
        if (this.peekStartsWith('/')) {
            this.capture('/');
        }
        var paths = [this.parsePathWithParams()];
        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
            this.capture('/');
            paths.push(this.parsePathWithParams());
        }
        var children = {};
        if (this.peekStartsWith('/(')) {
            this.capture('/');
            children = this.parseParens(true);
        }
        var res = {};
        if (this.peekStartsWith('(')) {
            res = this.parseParens(false);
        }
        res[shared_1.PRIMARY_OUTLET] = new UrlSegment(paths, children);
        return res;
    };
    UrlParser.prototype.parsePathWithParams = function () {
        var path = matchPathWithParams(this.remaining);
        if (path === '' && this.peekStartsWith(';')) {
            throw new Error("Empty path url segment cannot have parameters: '" + this.remaining + "'.");
        }
        this.capture(path);
        var matrixParams = {};
        if (this.peekStartsWith(';')) {
            matrixParams = this.parseMatrixParams();
        }
        return new UrlPathWithParams(path, matrixParams);
    };
    UrlParser.prototype.parseQueryParams = function () {
        var params = {};
        if (this.peekStartsWith('?')) {
            this.capture('?');
            this.parseQueryParam(params);
            while (this.remaining.length > 0 && this.peekStartsWith('&')) {
                this.capture('&');
                this.parseQueryParam(params);
            }
        }
        return params;
    };
    UrlParser.prototype.parseFragment = function () {
        if (this.peekStartsWith('#')) {
            return this.remaining.substring(1);
        }
        else {
            return null;
        }
    };
    UrlParser.prototype.parseMatrixParams = function () {
        var params = {};
        while (this.remaining.length > 0 && this.peekStartsWith(';')) {
            this.capture(';');
            this.parseParam(params);
        }
        return params;
    };
    UrlParser.prototype.parseParam = function (params) {
        var key = matchPathWithParams(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = 'true';
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchPathWithParams(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[key] = value;
    };
    UrlParser.prototype.parseQueryParam = function (params) {
        var key = matchQueryParams(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = 'true';
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchUrlQueryParamValue(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[key] = value;
    };
    UrlParser.prototype.parseParens = function (allowPrimary) {
        var segments = {};
        this.capture('(');
        while (!this.peekStartsWith(')') && this.remaining.length > 0) {
            var path = matchPathWithParams(this.remaining);
            var outletName = void 0;
            if (path.indexOf(':') > -1) {
                outletName = path.substr(0, path.indexOf(':'));
                this.capture(outletName);
                this.capture(':');
            }
            else if (allowPrimary) {
                outletName = shared_1.PRIMARY_OUTLET;
            }
            var children = this.parseSegmentChildren();
            segments[outletName] = Object.keys(children).length === 1 ? children[shared_1.PRIMARY_OUTLET] :
                new UrlSegment([], children);
            if (this.peekStartsWith('//')) {
                this.capture('//');
            }
        }
        this.capture(')');
        return segments;
    };
    return UrlParser;
}());
//# sourceMappingURL=url_tree.js.map

/***/ },

/***/ 636:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(77);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ },

/***/ 637:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, exception) {
        this.kind = kind;
        this.value = value;
        this.exception = exception;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.exception);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.exception);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.exception);
            case 'C':
                return Observable_1.Observable.empty();
        }
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return this.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` exception.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return this.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map

/***/ },

/***/ 640:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
var from_1 = __webpack_require__(650);
Observable_1.Observable.from = from_1.from;
//# sourceMappingURL=from.js.map

/***/ },

/***/ 641:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
var every_1 = __webpack_require__(652);
Observable_1.Observable.prototype.every = every_1.every;
//# sourceMappingURL=every.js.map

/***/ },

/***/ 642:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
var mergeAll_1 = __webpack_require__(654);
Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
//# sourceMappingURL=mergeAll.js.map

/***/ },

/***/ 643:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
var mergeMap_1 = __webpack_require__(655);
Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
//# sourceMappingURL=mergeMap.js.map

/***/ },

/***/ 644:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
var toPromise_1 = __webpack_require__(97);
Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ },

/***/ 645:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(10);
var ScalarObservable_1 = __webpack_require__(358);
var EmptyObservable_1 = __webpack_require__(236);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!mapFn && !scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
        if (mapFn) {
            this.mapFn = mapFn.bind(thisArg);
        }
    }
    ArrayLikeObservable.create = function (arrayLike, mapFn, thisArg, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1 && !mapFn) {
            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, mapFn = state.mapFn, subscriber = state.subscriber;
        if (subscriber.isUnsubscribed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        var result = mapFn ? mapFn(arrayLike[index], index) : arrayLike[index];
        subscriber.next(result);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, mapFn = _a.mapFn, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, mapFn: mapFn, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.isUnsubscribed; i++) {
                var result = mapFn ? mapFn(arrayLike[i], i) : arrayLike[i];
                subscriber.next(result);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1.Observable));
exports.ArrayLikeObservable = ArrayLikeObservable;
//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ },

/***/ 646:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(10);
var EmptyObservable_1 = __webpack_require__(236);
var isArray_1 = __webpack_require__(153);
var subscribeToResult_1 = __webpack_require__(242);
var OuterSubscriber_1 = __webpack_require__(234);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ForkJoinObservable = (function (_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    /**
     * @param sources
     * @return {any}
     * @static true
     * @name forkJoin
     * @owner Observable
     */
    ForkJoinObservable.create = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = sources.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
            sources = sources[0];
        }
        if (sources.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function (subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    };
    return ForkJoinObservable;
}(Observable_1.Observable));
exports.ForkJoinObservable = ForkJoinObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ForkJoinSubscriber = (function (_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources, resultSelector) {
        _super.call(this, destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        var len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                this.add(innerSubscription);
            }
        }
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            var value = resultSelector ? resultSelector.apply(this, values) : values;
            destination.next(value);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=ForkJoinObservable.js.map

/***/ },

/***/ 647:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__(153);
var isFunction_1 = __webpack_require__(154);
var isPromise_1 = __webpack_require__(361);
var isScheduler_1 = __webpack_require__(362);
var PromiseObservable_1 = __webpack_require__(78);
var IteratorObservable_1 = __webpack_require__(648);
var ArrayObservable_1 = __webpack_require__(357);
var ArrayLikeObservable_1 = __webpack_require__(645);
var observable_1 = __webpack_require__(239);
var iterator_1 = __webpack_require__(238);
var Observable_1 = __webpack_require__(10);
var observeOn_1 = __webpack_require__(656);
var isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    FromObservable.create = function (ish, mapFnOrScheduler, thisArg, lastScheduler) {
        var scheduler = null;
        var mapFn = null;
        if (isFunction_1.isFunction(mapFnOrScheduler)) {
            scheduler = lastScheduler || null;
            mapFn = mapFnOrScheduler;
        }
        else if (isScheduler_1.isScheduler(scheduler)) {
            scheduler = mapFnOrScheduler;
        }
        if (ish != null) {
            if (typeof ish[observable_1.$$observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
            }
            else if (isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, mapFn, thisArg, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.$$observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
//# sourceMappingURL=FromObservable.js.map

/***/ },

/***/ 648:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(66);
var isObject_1 = __webpack_require__(360);
var tryCatch_1 = __webpack_require__(364);
var Observable_1 = __webpack_require__(10);
var isFunction_1 = __webpack_require__(154);
var iterator_1 = __webpack_require__(238);
var errorObject_1 = __webpack_require__(241);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = (function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, project, thisArg, scheduler) {
        _super.call(this);
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        if (isObject_1.isObject(project)) {
            this.thisArg = project;
            this.scheduler = thisArg;
        }
        else if (isFunction_1.isFunction(project)) {
            this.project = project;
            this.thisArg = thisArg;
            this.scheduler = scheduler;
        }
        else if (project != null) {
            throw new Error('When provided, `project` must be a function.');
        }
        this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, project, thisArg, scheduler) {
        return new IteratorObservable(iterator, project, thisArg, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, thisArg = state.thisArg, project = state.project, iterator = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        if (project) {
            result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index);
            if (result === errorObject_1.errorObject) {
                state.error = errorObject_1.errorObject.e;
                state.hasError = true;
            }
            else {
                subscriber.next(result);
                state.index = index + 1;
            }
        }
        else {
            subscriber.next(result.value);
            state.index = index + 1;
        }
        if (subscriber.isUnsubscribed) {
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator = _a.iterator, project = _a.project, thisArg = _a.thisArg, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, thisArg: thisArg, project: project, iterator: iterator, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else if (project) {
                    result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
                    if (result === errorObject_1.errorObject) {
                        subscriber.error(errorObject_1.errorObject.e);
                        break;
                    }
                    subscriber.next(result);
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.isUnsubscribed) {
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(Observable_1.Observable));
exports.IteratorObservable = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = str.length; }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[iterator_1.$$iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = toLength(arr); }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[iterator_1.$$iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[iterator_1.$$iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('Object is not iterable');
    }
    return obj[iterator_1.$$iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
//# sourceMappingURL=IteratorObservable.js.map

/***/ },

/***/ 649:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ForkJoinObservable_1 = __webpack_require__(646);
exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
//# sourceMappingURL=forkJoin.js.map

/***/ },

/***/ 650:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromObservable_1 = __webpack_require__(647);
exports.from = FromObservable_1.FromObservable.create;
//# sourceMappingURL=from.js.map

/***/ },

/***/ 651:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var PromiseObservable_1 = __webpack_require__(78);
exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
//# sourceMappingURL=fromPromise.js.map

/***/ },

/***/ 652:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(77);
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 * @param {function} predicate a function for determining if an item meets a specified condition.
 * @param {any} [thisArg] optional object to use for `this` in the callback
 * @return {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    var source = this;
    return source.lift(new EveryOperator(predicate, thisArg, source));
}
exports.every = every;
var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source._subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var EverySubscriber = (function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=every.js.map

/***/ },

/***/ 653:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(77);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ },

/***/ 654:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(234);
var subscribeToResult_1 = __webpack_require__(242);
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new MergeAllOperator(concurrent));
}
exports.mergeAll = mergeAll;
var MergeAllOperator = (function () {
    function MergeAllOperator(concurrent) {
        this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function (observer, source) {
        return source._subscribe(new MergeAllSubscriber(observer, this.concurrent));
    };
    return MergeAllOperator;
}());
exports.MergeAllOperator = MergeAllOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeAllSubscriber = (function (_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
        _super.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function (observable) {
        if (this.active < this.concurrent) {
            this.active++;
            this.add(subscribeToResult_1.subscribeToResult(this, observable));
        }
        else {
            this.buffer.push(observable);
        }
    };
    MergeAllSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeAllSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeAllSubscriber = MergeAllSubscriber;
//# sourceMappingURL=mergeAll.js.map

/***/ },

/***/ 655:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1 = __webpack_require__(242);
var OuterSubscriber_1 = __webpack_require__(234);
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
}
exports.mergeMap = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source._subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
exports.MergeMapOperator = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapSubscriber = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

/***/ },

/***/ 656:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(77);
var Notification_1 = __webpack_require__(637);
/**
 * @see {@link Notification}
 *
 * @param scheduler
 * @param delay
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return this.lift(new ObserveOnOperator(scheduler, delay));
}
exports.observeOn = observeOn;
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
exports.ObserveOnOperator = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = (function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_1.Subscriber));
exports.ObserveOnSubscriber = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
exports.ObserveOnMessage = ObserveOnMessage;
//# sourceMappingURL=observeOn.js.map

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BehaviorSubject_1 = __webpack_require__(355);
var shared_1 = __webpack_require__(60);
var url_tree_1 = __webpack_require__(61);
var collection_1 = __webpack_require__(90);
var tree_1 = __webpack_require__(212);
/**
 * The state of the router.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state = router.routerState;
 *     const id: Observable<string> = state.firstChild(state.root).params.map(p => p.id);
 *     const isDebug: Observable<string> = state.queryParams.map(q => q.debug);
 *   }
 * }
 * ```
 */
var RouterState = (function (_super) {
    __extends(RouterState, _super);
    /**
     * @internal
     */
    function RouterState(root, queryParams, fragment, snapshot) {
        _super.call(this, root);
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.snapshot = snapshot;
    }
    RouterState.prototype.toString = function () { return this.snapshot.toString(); };
    return RouterState;
}(tree_1.Tree));
exports.RouterState = RouterState;
function createEmptyState(urlTree, rootComponent) {
    var snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
    var emptyUrl = new BehaviorSubject_1.BehaviorSubject([new url_tree_1.UrlPathWithParams('', {})]);
    var emptyParams = new BehaviorSubject_1.BehaviorSubject({});
    var emptyQueryParams = new BehaviorSubject_1.BehaviorSubject({});
    var fragment = new BehaviorSubject_1.BehaviorSubject('');
    var activated = new ActivatedRoute(emptyUrl, emptyParams, shared_1.PRIMARY_OUTLET, rootComponent, snapshot.root);
    activated.snapshot = snapshot.root;
    return new RouterState(new tree_1.TreeNode(activated, []), emptyQueryParams, fragment, snapshot);
}
exports.createEmptyState = createEmptyState;
function createEmptyStateSnapshot(urlTree, rootComponent) {
    var emptyParams = {};
    var emptyQueryParams = {};
    var fragment = '';
    var activated = new ActivatedRouteSnapshot([], emptyParams, shared_1.PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1);
    return new RouterStateSnapshot('', new tree_1.TreeNode(activated, []), emptyQueryParams, fragment);
}
/**
 * Contains the information about a component loaded in an outlet. The information is provided
 * through
 * the params and urlSegments observables.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: Observable<string> = route.params.map(p => p.id);
 *   }
 * }
 * ```
 */
var ActivatedRoute = (function () {
    /**
     * @internal
     */
    function ActivatedRoute(url, params, outlet, component, futureSnapshot) {
        this.url = url;
        this.params = params;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
    }
    ActivatedRoute.prototype.toString = function () {
        return this.snapshot ? this.snapshot.toString() : "Future(" + this._futureSnapshot + ")";
    };
    return ActivatedRoute;
}());
exports.ActivatedRoute = ActivatedRoute;
/**
 * Contains the information about a component loaded in an outlet at a particular moment in time.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: string = route.snapshot.params.id;
 *   }
 * }
 * ```
 */
var ActivatedRouteSnapshot = (function () {
    /**
     * @internal
     */
    function ActivatedRouteSnapshot(url, params, outlet, component, routeConfig, urlSegment, lastPathIndex) {
        this.url = url;
        this.params = params;
        this.outlet = outlet;
        this.component = component;
        this._routeConfig = routeConfig;
        this._urlSegment = urlSegment;
        this._lastPathIndex = lastPathIndex;
    }
    ActivatedRouteSnapshot.prototype.toString = function () {
        var url = this.url.map(function (s) { return s.toString(); }).join('/');
        var matched = this._routeConfig ? this._routeConfig.path : '';
        return "Route(url:'" + url + "', path:'" + matched + "')";
    };
    return ActivatedRouteSnapshot;
}());
exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
/**
 * The state of the router at a particular moment in time.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(router: Router) {
 *     const snapshot = router.routerState.snapshot;
 *   }
 * }
 * ```
 */
var RouterStateSnapshot = (function (_super) {
    __extends(RouterStateSnapshot, _super);
    /**
     * @internal
     */
    function RouterStateSnapshot(url, root, queryParams, fragment) {
        _super.call(this, root);
        this.url = url;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    RouterStateSnapshot.prototype.toString = function () { return serializeNode(this._root); };
    return RouterStateSnapshot;
}(tree_1.Tree));
exports.RouterStateSnapshot = RouterStateSnapshot;
function serializeNode(node) {
    var c = node.children.length > 0 ? " { " + node.children.map(serializeNode).join(", ") + " } " : '';
    return "" + node.value + c;
}
/**
 * The expectation is that the activate route is created with the right set of parameters.
 * So we push new values into the observables only when they are not the initial values.
 * And we detect that by checking if the snapshot field is set.
 */
function advanceActivatedRoute(route) {
    if (route.snapshot) {
        if (!collection_1.shallowEqual(route.snapshot.params, route._futureSnapshot.params)) {
            route.params.next(route._futureSnapshot.params);
        }
        if (!collection_1.shallowEqualArrays(route.snapshot.url, route._futureSnapshot.url)) {
            route.url.next(route._futureSnapshot.url);
        }
        route.snapshot = route._futureSnapshot;
    }
    else {
        route.snapshot = route._futureSnapshot;
    }
}
exports.advanceActivatedRoute = advanceActivatedRoute;
//# sourceMappingURL=router_state.js.map

/***/ },

/***/ 90:
/***/ function(module, exports) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function shallowEqualArrays(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (!shallowEqual(a[i], b[i]))
            return false;
    }
    return true;
}
exports.shallowEqualArrays = shallowEqualArrays;
function shallowEqual(a, b) {
    var k1 = Object.keys(a);
    var k2 = Object.keys(b);
    if (k1.length != k2.length) {
        return false;
    }
    var key;
    for (var i = 0; i < k1.length; i++) {
        key = k1[i];
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.shallowEqual = shallowEqual;
function flatten(a) {
    var target = [];
    for (var i = 0; i < a.length; ++i) {
        for (var j = 0; j < a[i].length; ++j) {
            target.push(a[i][j]);
        }
    }
    return target;
}
exports.flatten = flatten;
function first(a) {
    return a.length > 0 ? a[0] : null;
}
exports.first = first;
function last(a) {
    return a.length > 0 ? a[a.length - 1] : null;
}
exports.last = last;
function and(bools) {
    return bools.reduce(function (a, b) { return a && b; }, true);
}
exports.and = and;
function merge(m1, m2) {
    var m = {};
    for (var attr in m1) {
        if (m1.hasOwnProperty(attr)) {
            m[attr] = m1[attr];
        }
    }
    for (var attr in m2) {
        if (m2.hasOwnProperty(attr)) {
            m[attr] = m2[attr];
        }
    }
    return m;
}
exports.merge = merge;
function forEach(map, callback) {
    for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
            callback(map[prop], prop);
        }
    }
}
exports.forEach = forEach;
//# sourceMappingURL=collection.js.map

/***/ }

},[483]);
//# sourceMappingURL=vendor.bundle.js.map