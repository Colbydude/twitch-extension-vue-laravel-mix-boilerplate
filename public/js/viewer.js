webpackJsonp([2],[
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventBus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var EventBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a();

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(15)
/* template */
var __vue_template__ = __webpack_require__(16)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(19);

// Load in Axios.
window.axios = __webpack_require__(21);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(7)
/* template */
var __vue_template__ = __webpack_require__(8)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-view')}
var staticRenderFns = []
module.exports = { render: render, staticRenderFns: staticRenderFns }

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_config__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_live_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_live_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_live_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_viewer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_viewer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_viewer__);







__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_0_vue_router__["default"]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_vue_router__["default"]({
    routes: [{
        path: '*/config.html',
        name: 'Config',
        component: __WEBPACK_IMPORTED_MODULE_2__components_config___default.a
    }, {
        path: '*/live_config.html',
        name: 'Live Config',
        component: __WEBPACK_IMPORTED_MODULE_3__components_live_config___default.a
    }, {
        path: '*/viewer.html',
        name: 'Viewer',
        component: __WEBPACK_IMPORTED_MODULE_4__components_viewer___default.a
    }],
    mode: 'history'
}));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(11)
/* template */
var __vue_template__ = __webpack_require__(12)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus__ = __webpack_require__(2);
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_vm._v("This is the config page!")])}
var staticRenderFns = []
module.exports = { render: render, staticRenderFns: staticRenderFns }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(14)
/* template */
var __vue_template__ = __webpack_require__(17)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__viewer__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// NOTE: Extends the viewer component, but changes the template.
/* harmony default export */ __webpack_exports__["default"] = ({
    extends: __WEBPACK_IMPORTED_MODULE_0__viewer___default.a
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            color: '#6441A4',
            disabled: 'disabled'
        };
    },
    mounted: function mounted() {
        __WEBPACK_IMPORTED_MODULE_0__event_bus__["a" /* EventBus */].$on('authentication-verified', this.enable);

        window.Twitch.ext.listen('broadcast', function (target, contentType, color) {
            window.Twitch.ext.rig.log('Received broadcast color');
            this.updateBlock(color);
        });
    },


    methods: {
        cycleColor: function cycleColor() {
            var _this = this;

            window.Twitch.ext.rig.log('Requesting a color cycle');

            this.$http.post('https://localhost:8081/color/cycle').then(function (response) {
                _this.updateBlock(response.data);
            }).catch(function (error) {
                _this.logError(error);
            });
        },
        enable: function enable() {
            window.Twitch.ext.rig.log('Enabling...');
            this.disabled = false;
            this.getColor();
        },
        getColor: function getColor() {
            var _this2 = this;

            this.$http.get('https://localhost:8081/color/query').then(function (response) {
                _this2.updateBlock(response.data);
            }).catch(function (error) {
                console.log(error);
                _this2.logError(error);
            });
        },
        logError: function logError(error) {
            window.Twitch.ext.rig.log('EBS request returned ' + error.status + ' (' + error + ')');
        },
        updateBlock: function updateBlock(hex) {
            window.Twitch.ext.rig.log('Updating block color');
            this.color = hex;
        }
    }
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"viewer"},[_c('h2',[_vm._v("Hello, World!")]),_vm._v(" "),_c('p',[_vm._v("Would you care to cycle a color?")]),_vm._v(" "),_c('div',[_c('input',{attrs:{"type":"button","id":"cycle","value":"Yes, I would","disabled":_vm.disabled},on:{"click":_vm.cycleColor}})]),_vm._v(" "),_c('div',{staticStyle:{"float":"left","position":"relative","left":"50%"}},[_c('div',{style:('border-radius: 50px; transition: background-color 0.5s ease; margin-top: 30px; width: 100px; height: 100px; background-color:' + _vm.color + '; float: left; position: relative; left: -50%'),attrs:{"id":"color"}})]),_vm._v(" "),_c('div',{attrs:{"id":"list"}})])}
var staticRenderFns = []
module.exports = { render: render, staticRenderFns: staticRenderFns }

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"live-config"},[_c('h2',[_vm._v("And We're Live!")]),_vm._v(" "),_c('p',[_vm._v("Would you care to cycle a color?")]),_vm._v(" "),_c('div',[_c('input',{attrs:{"type":"button","id":"cycle","value":"Yes, I would","disabled":_vm.disabled},on:{"click":_vm.cycleColor}})]),_vm._v(" "),_c('div',{staticStyle:{"float":"left","position":"relative","left":"50%"}},[_c('div',{style:('border-radius: 50px; transition: background-color 0.5s ease; margin-top: 30px; width: 100px; height: 100px; background-color:' + _vm.color + '; float: left; position: relative; left: -50%'),attrs:{"id":"color"}})]),_vm._v(" "),_c('div',{attrs:{"id":"list"}})])}
var staticRenderFns = []
module.exports = { render: render, staticRenderFns: staticRenderFns }

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus__ = __webpack_require__(2);


if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function (auth) {
        // Attach the token to every Axios request.
        window.Twitch.ext.rig.log('Setting auth headers');
        window.axios.defaults.headers.common.Authorization = 'Bearer ' + auth.token;

        // Broadcast a "boot" event.
        __WEBPACK_IMPORTED_MODULE_0__event_bus__["a" /* EventBus */].$emit('authentication-verified');
    });

    window.Twitch.ext.onContext(function (context, contextFields) {
        window.Twitch.ext.rig.log(context);
    });

    window.Twitch.ext.onError(function (err) {
        window.Twitch.ext.rig.log(err);
    });
}

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(57);


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bootstrap_router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
// Load in our JavaScript dependencies.
__webpack_require__(5);




// Map global objects to Vue.
__WEBPACK_IMPORTED_MODULE_2_vue___default.a.prototype.$http = axios;

// Create a fresh Vue instance and attach it to the page.
new __WEBPACK_IMPORTED_MODULE_2_vue___default.a({
    el: '#app',
    router: __WEBPACK_IMPORTED_MODULE_1__bootstrap_router__["a" /* default */],
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_0__components_app___default.a);
    }
});

// Setup for Twitch Extension auth stuff.
__webpack_require__(18);

/***/ })
],[56]);