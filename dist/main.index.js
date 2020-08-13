(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["useStateMachine"] = factory(require("react"));
	else
		root["useStateMachine"] = factory(root["react"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return (window["webpackJsonpuseStateMachine"] = window["webpackJsonpuseStateMachine"] || []).push([["main"],{

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var useStateMachine_1 = __webpack_require__(/*! ./useStateMachine */ "./src/useStateMachine.ts");
exports.default = useStateMachine_1.useStateMachine;


/***/ }),

/***/ "./src/useStateMachine.ts":
/*!********************************!*\
  !*** ./src/useStateMachine.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateMachine = void 0;
var react_1 = __webpack_require__(/*! react */ "react");
function buildGraph(edges) {
    return edges.reduce(function (acc, _a) {
        var _b, _c;
        var from = _a.from, to = _a.to, via = _a.via;
        return (__assign(__assign({}, acc), (_b = {}, _b[from] = __assign(__assign({}, acc[from]), (_c = {}, _c[via] = to, _c)), _b)));
    }, {});
}
function createReducer(states, graph) {
    return function (state, action) {
        var currentStateTransitions = graph[state.name];
        if (!currentStateTransitions ||
            !currentStateTransitions.hasOwnProperty(action.type)) {
            return state;
        }
        var nextState = currentStateTransitions[action.type];
        return states[nextState];
    };
}
function generateMutations(edges, dispatch) {
    return edges.reduce(function (acc, _a) {
        var _b;
        var via = _a.via;
        return (__assign(__assign({}, acc), (_b = {}, _b[via] = function () { return dispatch({ type: via }); }, _b)));
    }, {});
}
function getInitialState(states) {
    var stateName = Object.keys(states)[0];
    return states[stateName];
}
function useStateMachine(_a) {
    var states = _a.states, edges = _a.edges;
    var graph = buildGraph(edges);
    var reducer = createReducer(states, graph);
    var _b = __read(react_1.useReducer(reducer, getInitialState(states)), 2), state = _b[0], dispatch = _b[1];
    var mutations = generateMutations(edges, dispatch);
    return [state.state, mutations];
}
exports.useStateMachine = useStateMachine;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

},[["./src/index.ts","runtime~main"]]]);
});
//# sourceMappingURL=main.index.js.map