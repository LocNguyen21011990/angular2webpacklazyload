webpackJsonp([2],{

/***/ 367:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var core_1 = __webpack_require__(0);
var App = function App() {
    _classCallCheck(this, App);
};
App = __decorate([core_1.Component({
    selector: 'my-app',
    template: 'tess'
}), __metadata('design:paramtypes', [])], App);
exports.App = App;

/***/ },

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var platform_browser_dynamic_1 = __webpack_require__(155);
var app_component_ts_1 = __webpack_require__(367);
function main() {
    platform_browser_dynamic_1.bootstrap(app_component_ts_1.App, []).catch(function (error) {
        console.error(error);
    });
}
exports.main = main;
document.addEventListener('DOMContentLoaded', function () {
    return main();
});

/***/ }

},[481]);
//# sourceMappingURL=app.bundle.js.map