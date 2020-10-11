/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animationProxy.ts":
/*!*******************************!*\
  !*** ./src/animationProxy.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationProxyBase = void 0;
var frameTemplates = {
    linear: {
        to: "0",
        dur: "2s",
        repeatCount: "1",
        calcMode: "linear",
        additive: "sum",
        accumulate: "sum",
    },
    spline: {
        keyTimes: "0 1",
        values: "0 0",
        keySplines: ".5 0 .5 1",
        dur: "2s",
        repeatCount: "1",
        calcMode: "spline",
        additive: "sum",
        accumulate: "sum",
    },
};
/*
function isLinearFrame(
  frame: AnimationFrame
): frame is FrameTemplates["linear"] {
  return frame.calcMode === "linear";
}

function isSplineFrame(
  frame: AnimationFrame
): frame is FrameTemplates["spline"] {
  return frame.calcMode === "spline";
}
*/
var normalizeAttrs = function (nFrame, frame, el) {
    Object.keys(nFrame).forEach(function (attr) {
        var _a, _b;
        nFrame[attr] = (_b = (_a = frame[attr]) !== null && _a !== void 0 ? _a : el.getAttribute(attr)) !== null && _b !== void 0 ? _b : nFrame[attr];
    });
    return nFrame;
};
function normalizeFrame(type, frame, el) {
    if (type === "linear") {
        var nFrame = __assign({}, frameTemplates["linear"]);
        normalizeAttrs(nFrame, frame, el);
        return nFrame;
    }
    else if (type === "spline") {
        var nFrame = __assign({}, frameTemplates["linear"]);
        normalizeAttrs(nFrame, frame, el);
        return nFrame;
    }
    else {
        throw Error("bad frame");
    }
}
// should take a callback or something...
var begin = function (el, onEnd) {
    el.setAttribute("begin", el.getCurrentTime().toString());
    el.addEventListener("endEvent", onEnd, { once: true });
};
var SequentialQueue = /** @class */ (function () {
    function SequentialQueue() {
        this._Q = [];
    }
    SequentialQueue.prototype.isEmpty = function () {
        return this._Q.length === 0;
    };
    SequentialQueue.prototype.front = function () {
        if (this.isEmpty()) {
            throw Error("called `front` on empty Queue");
        }
        return this._Q[0];
    };
    SequentialQueue.prototype.pushFront = function (t) {
        this._Q = __spreadArrays([t], this._Q);
        return this;
    };
    SequentialQueue.prototype.pushBack = function (t) {
        this._Q = __spreadArrays([t], this._Q);
        return this;
    };
    SequentialQueue.prototype._advanceOne = function () {
        var _a;
        var _;
        _a = __spreadArrays(this._Q), _ = _a[0], this._Q = _a.slice(1);
    };
    SequentialQueue.prototype.advance = function (n) {
        if (n === void 0) { n = 1; }
        while (n > 0) {
            this._advanceOne();
            n -= 1;
        }
        return this;
    };
    return SequentialQueue;
}());
var CircularQueue = /** @class */ (function (_super) {
    __extends(CircularQueue, _super);
    function CircularQueue() {
        return _super.call(this) || this;
    }
    CircularQueue.prototype._advanceOne = function () {
        var _a = __spreadArrays(this._Q), head = _a[0], tail = _a.slice(1);
        this._Q = __spreadArrays(tail, [head]);
    };
    return CircularQueue;
}(SequentialQueue));
var AnimationProxyBase = /** @class */ (function () {
    function AnimationProxyBase(animationElement, 
    //protected type: T = "linear",
    type, qtype) {
        if (qtype === void 0) { qtype = "sequential"; }
        this.animationElement = animationElement;
        this.type = type;
        this.running = false;
        switch (qtype) {
            case "sequential":
                this.Q = new SequentialQueue();
                break;
            case "circular":
                this.Q = new CircularQueue();
                break;
            default:
                throw Error("bad qtype: " + qtype);
        }
    }
    AnimationProxyBase.prototype.playNext = function () {
        var _this = this;
        if (this.Q.isEmpty()) {
            this.running = false;
            return;
        }
        /*
         * if paused, don't do anything... or something like that...
         */
        var front = this.Q.front();
        var nFrame;
        if (this.type === "linear") {
            nFrame = normalizeFrame(this.type, front, this.animationElement);
        }
        else if (this.type === "spline") {
            nFrame = normalizeFrame(this.type, front, this.animationElement);
        }
        else {
            throw Error("bad type");
        }
        this.Q.advance();
        Object.keys(nFrame).forEach(function (attr) {
            _this.animationElement.setAttribute(attr, nFrame[attr]);
        });
        /*
         * maybe instead of this.playNext put some other callback,
         * emit some event or something...
         */
        begin(this.animationElement, this.playNext);
    };
    AnimationProxyBase.prototype.pushBack = function (frame) {
        this.Q.pushBack(frame);
        if (!this.running) {
            this.playNext();
        }
    };
    return AnimationProxyBase;
}());
exports.AnimationProxyBase = AnimationProxyBase;
document.AnimationProxy = AnimationProxyBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uUHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYW5pbWF0aW9uUHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sY0FBYyxHQUFHO0lBQ3JCLE1BQU0sRUFBRTtRQUNOLEVBQUUsRUFBRSxHQUFHO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxXQUFXLEVBQUUsR0FBRztRQUNoQixRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxLQUFLO0tBQ2xCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLEtBQUs7UUFDZixNQUFNLEVBQUUsS0FBSztRQUNiLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLEdBQUcsRUFBRSxJQUFJO1FBQ1QsV0FBVyxFQUFFLEdBQUc7UUFDaEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQUUsS0FBSztLQUNsQjtDQUNGLENBQUM7QUFLRjs7Ozs7Ozs7Ozs7O0VBWUU7QUFFRixJQUFNLGNBQWMsR0FBRyxVQUNyQixNQUFzQixFQUN0QixLQUE4QixFQUM5QixFQUF1QjtJQUV0QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBaUMsQ0FBQyxPQUFPLENBQzFELFVBQUMsSUFBMEI7O1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG1DQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RSxDQUFDLENBQ0YsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQWNGLFNBQVMsY0FBYyxDQUNyQixJQUEwQixFQUMxQixLQUE0RSxFQUM1RSxFQUF1QjtJQUV2QixJQUFJLElBQUksS0FBSyxR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

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// index.ts
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
var animationProxy_1 = __webpack_require__(/*! ./animationProxy */ "./src/animationProxy.ts");
console.log(animationProxy_1.AnimationProxyBase);
document.AnimationProxyBase = animationProxy_1.AnimationProxyBase;
var C = function (s) { return document.createElement(s); };
var CSVG = function () { return document.createElementNS("http://www.w3.org/2000/svg", 'svg'); };
var domParser = new DOMParser();
var parseSVG = function (s) {
    return domParser.parseFromString(s, "image/svg+xml").documentElement;
};
var deg2rad = function (d) { return (Math.PI * d) / 180; };
var defaultRingProps = {
    arc: 90,
    phase: 0,
    r: 0.25,
    l: 1,
};
var RingA = function (rr, x1, y1, x2, y2) {
    return "M " + x1 + " " + y1 + " A " + rr + " " + rr + " 0 0 0 " + x2 + " " + y2 + " ";
};
var Ring = function (props) {
    var _a = __assign(__assign({}, defaultRingProps), props), arc = _a.arc, phase = _a.phase, r = _a.r, l = _a.l;
    var _arc = arc > 360 ? arc % 360 : arc;
    var rr = r * l;
    var x1 = rr;
    var y1 = 0;
    var x2 = rr * Math.cos(deg2rad(_arc / 2));
    var y2 = rr * Math.sin(-deg2rad(_arc / 2));
    var x3 = rr * Math.cos(deg2rad(_arc));
    var y3 = rr * Math.sin(-deg2rad(_arc));
    var A1 = RingA(rr, x1, y1, x2, y2);
    var A2 = RingA(rr, x2, y2, x3, y3);
    var path = parseSVG("\n    <path\n      d=\"" + A1 + " " + A2 + "\"\n      transform=\"rotate(" + -phase + ")\"\n      stroke=\"hsl(120,50%,50%,.75)\"\n      stroke-width=\"" + r / 2 + "\"\n      fill=\"none\"\n      stroke-linecap=\"round\"\n    />");
    return path;
};
var getDeg = function (e) { return Math.atan2(e.movementX, e.movementY); };
exports.Logo = function () {
    var viewBox = "-1.125 -1.125 2.25 2.25";
    //const svg = parseSVG(`<svg viewBox="${viewBox}"></svg>`);
    var svg = CSVG();
    svg.setAttribute('viewBox', viewBox);
    var rings = [
        Ring({ l: 1, arc: 90, phase: 135 }),
        Ring({ l: 2, arc: 180, phase: 90 }),
        Ring({ l: 3, arc: 270, phase: 45 }),
        Ring({ l: 4, arc: 360 }),
    ];
    rings.forEach(function (r) { return svg.appendChild(r); });
    console.log(svg);
    var e = C("div");
    e.className = "logo-proto";
    e.appendChild(svg);
    console.log(e);
    // hack!
    e.innerHTML = e.innerHTML;
    return e;
};
(_a = document.getElementById("app-root")) === null || _a === void 0 ? void 0 : _a.appendChild(exports.Logo());
console.log("hello");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFdBQVc7Ozs7Ozs7Ozs7Ozs7OztBQUVYLG1EQUFzRDtBQUV0RCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFrQixDQUFDLENBQUM7QUFDL0IsUUFBZ0IsQ0FBQyxrQkFBa0IsR0FBRyxtQ0FBa0IsQ0FBQztBQUUxRCxJQUFNLENBQUMsR0FBRyxVQUFDLENBQVMsSUFBSyxPQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUM7QUFDbkQsSUFBTSxJQUFJLEdBQUcsY0FBTSxPQUFBLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUMsS0FBSyxDQUFDLEVBQTVELENBQTRELENBQUM7QUFDaEYsSUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUNsQyxJQUFNLFFBQVEsR0FBRyxVQUFDLENBQVM7SUFDekIsT0FBQSxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxlQUFlO0FBQTdELENBQTZELENBQUM7QUFPaEUsSUFBTSxPQUFPLEdBQUcsVUFBQyxDQUFVLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFuQixDQUFtQixDQUFDO0FBK0JwRCxJQUFNLGdCQUFnQixHQUFjO0lBQ2xDLEdBQUcsRUFBRSxFQUFFO0lBQ1AsS0FBSyxFQUFFLENBQUM7SUFDUixDQUFDLEVBQUUsSUFBSTtJQUNQLENBQUMsRUFBRSxDQUFDO0NBQ0wsQ0FBQztBQUVGLElBQU0sS0FBSyxHQUFHLFVBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVU7SUFDdkUsT0FBQSxPQUFLLEVBQUUsU0FBSSxFQUFFLFdBQU0sRUFBRSxTQUFJLEVBQUUsZUFBVSxFQUFFLFNB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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvblByb3h5LnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3ZGLDZCQUE2Qiw4RUFBOEU7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxRQUFRO0FBQ3pELHdDQUF3QyxRQUFRO0FBQ2hELHdEQUF3RCxRQUFRO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsYUFBYTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsMkNBQTJDLG14Szs7Ozs7Ozs7Ozs7O0FDeE05QjtBQUNiO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsaURBQWtCO0FBQ2pEO0FBQ0E7QUFDQSxzQkFBc0Isa0NBQWtDO0FBQ3hELHdCQUF3QixzRUFBc0U7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNEJBQTRCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZDQUE2QztBQUN4RTtBQUNBO0FBQ0EsNENBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUMsY0FBYyw0QkFBNEI7QUFDMUMsY0FBYyw0QkFBNEI7QUFDMUMsY0FBYyxpQkFBaUI7QUFDL0I7QUFDQSxnQ0FBZ0MsMkJBQTJCLEVBQUU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywyL0giLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcbiAgICByZXR1cm4gcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFuaW1hdGlvblByb3h5QmFzZSA9IHZvaWQgMDtcbnZhciBmcmFtZVRlbXBsYXRlcyA9IHtcbiAgICBsaW5lYXI6IHtcbiAgICAgICAgdG86IFwiMFwiLFxuICAgICAgICBkdXI6IFwiMnNcIixcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiMVwiLFxuICAgICAgICBjYWxjTW9kZTogXCJsaW5lYXJcIixcbiAgICAgICAgYWRkaXRpdmU6IFwic3VtXCIsXG4gICAgICAgIGFjY3VtdWxhdGU6IFwic3VtXCIsXG4gICAgfSxcbiAgICBzcGxpbmU6IHtcbiAgICAgICAga2V5VGltZXM6IFwiMCAxXCIsXG4gICAgICAgIHZhbHVlczogXCIwIDBcIixcbiAgICAgICAga2V5U3BsaW5lczogXCIuNSAwIC41IDFcIixcbiAgICAgICAgZHVyOiBcIjJzXCIsXG4gICAgICAgIHJlcGVhdENvdW50OiBcIjFcIixcbiAgICAgICAgY2FsY01vZGU6IFwic3BsaW5lXCIsXG4gICAgICAgIGFkZGl0aXZlOiBcInN1bVwiLFxuICAgICAgICBhY2N1bXVsYXRlOiBcInN1bVwiLFxuICAgIH0sXG59O1xuLypcbmZ1bmN0aW9uIGlzTGluZWFyRnJhbWUoXG4gIGZyYW1lOiBBbmltYXRpb25GcmFtZVxuKTogZnJhbWUgaXMgRnJhbWVUZW1wbGF0ZXNbXCJsaW5lYXJcIl0ge1xuICByZXR1cm4gZnJhbWUuY2FsY01vZGUgPT09IFwibGluZWFyXCI7XG59XG5cbmZ1bmN0aW9uIGlzU3BsaW5lRnJhbWUoXG4gIGZyYW1lOiBBbmltYXRpb25GcmFtZVxuKTogZnJhbWUgaXMgRnJhbWVUZW1wbGF0ZXNbXCJzcGxpbmVcIl0ge1xuICByZXR1cm4gZnJhbWUuY2FsY01vZGUgPT09IFwic3BsaW5lXCI7XG59XG4qL1xudmFyIG5vcm1hbGl6ZUF0dHJzID0gZnVuY3Rpb24gKG5GcmFtZSwgZnJhbWUsIGVsKSB7XG4gICAgT2JqZWN0LmtleXMobkZyYW1lKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIG5GcmFtZVthdHRyXSA9IChfYiA9IChfYSA9IGZyYW1lW2F0dHJdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBlbC5nZXRBdHRyaWJ1dGUoYXR0cikpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG5GcmFtZVthdHRyXTtcbiAgICB9KTtcbiAgICByZXR1cm4gbkZyYW1lO1xufTtcbmZ1bmN0aW9uIG5vcm1hbGl6ZUZyYW1lKHR5cGUsIGZyYW1lLCBlbCkge1xuICAgIGlmICh0eXBlID09PSBcImxpbmVhclwiKSB7XG4gICAgICAgIHZhciBuRnJhbWUgPSBfX2Fzc2lnbih7fSwgZnJhbWVUZW1wbGF0ZXNbXCJsaW5lYXJcIl0pO1xuICAgICAgICBub3JtYWxpemVBdHRycyhuRnJhbWUsIGZyYW1lLCBlbCk7XG4gICAgICAgIHJldHVybiBuRnJhbWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09IFwic3BsaW5lXCIpIHtcbiAgICAgICAgdmFyIG5GcmFtZSA9IF9fYXNzaWduKHt9LCBmcmFtZVRlbXBsYXRlc1tcImxpbmVhclwiXSk7XG4gICAgICAgIG5vcm1hbGl6ZUF0dHJzKG5GcmFtZSwgZnJhbWUsIGVsKTtcbiAgICAgICAgcmV0dXJuIG5GcmFtZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiYmFkIGZyYW1lXCIpO1xuICAgIH1cbn1cbi8vIHNob3VsZCB0YWtlIGEgY2FsbGJhY2sgb3Igc29tZXRoaW5nLi4uXG52YXIgYmVnaW4gPSBmdW5jdGlvbiAoZWwsIG9uRW5kKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFwiYmVnaW5cIiwgZWwuZ2V0Q3VycmVudFRpbWUoKS50b1N0cmluZygpKTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kRXZlbnRcIiwgb25FbmQsIHsgb25jZTogdHJ1ZSB9KTtcbn07XG52YXIgU2VxdWVudGlhbFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlcXVlbnRpYWxRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5fUSA9IFtdO1xuICAgIH1cbiAgICBTZXF1ZW50aWFsUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9RLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIFNlcXVlbnRpYWxRdWV1ZS5wcm90b3R5cGUuZnJvbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJjYWxsZWQgYGZyb250YCBvbiBlbXB0eSBRdWV1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fUVswXTtcbiAgICB9O1xuICAgIFNlcXVlbnRpYWxRdWV1ZS5wcm90b3R5cGUucHVzaEZyb250ID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdGhpcy5fUSA9IF9fc3ByZWFkQXJyYXlzKFt0XSwgdGhpcy5fUSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU2VxdWVudGlhbFF1ZXVlLnByb3RvdHlwZS5wdXNoQmFjayA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHRoaXMuX1EgPSBfX3NwcmVhZEFycmF5cyhbdF0sIHRoaXMuX1EpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNlcXVlbnRpYWxRdWV1ZS5wcm90b3R5cGUuX2FkdmFuY2VPbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIF87XG4gICAgICAgIF9hID0gX19zcHJlYWRBcnJheXModGhpcy5fUSksIF8gPSBfYVswXSwgdGhpcy5fUSA9IF9hLnNsaWNlKDEpO1xuICAgIH07XG4gICAgU2VxdWVudGlhbFF1ZXVlLnByb3RvdHlwZS5hZHZhbmNlID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgaWYgKG4gPT09IHZvaWQgMCkgeyBuID0gMTsgfVxuICAgICAgICB3aGlsZSAobiA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2FkdmFuY2VPbmUoKTtcbiAgICAgICAgICAgIG4gLT0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBTZXF1ZW50aWFsUXVldWU7XG59KCkpO1xudmFyIENpcmN1bGFyUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENpcmN1bGFyUXVldWUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2lyY3VsYXJRdWV1ZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgfVxuICAgIENpcmN1bGFyUXVldWUucHJvdG90eXBlLl9hZHZhbmNlT25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSBfX3NwcmVhZEFycmF5cyh0aGlzLl9RKSwgaGVhZCA9IF9hWzBdLCB0YWlsID0gX2Euc2xpY2UoMSk7XG4gICAgICAgIHRoaXMuX1EgPSBfX3NwcmVhZEFycmF5cyh0YWlsLCBbaGVhZF0pO1xuICAgIH07XG4gICAgcmV0dXJuIENpcmN1bGFyUXVldWU7XG59KFNlcXVlbnRpYWxRdWV1ZSkpO1xudmFyIEFuaW1hdGlvblByb3h5QmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBbmltYXRpb25Qcm94eUJhc2UoYW5pbWF0aW9uRWxlbWVudCwgXG4gICAgLy9wcm90ZWN0ZWQgdHlwZTogVCA9IFwibGluZWFyXCIsXG4gICAgdHlwZSwgcXR5cGUpIHtcbiAgICAgICAgaWYgKHF0eXBlID09PSB2b2lkIDApIHsgcXR5cGUgPSBcInNlcXVlbnRpYWxcIjsgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvbkVsZW1lbnQgPSBhbmltYXRpb25FbGVtZW50O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChxdHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcInNlcXVlbnRpYWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLlEgPSBuZXcgU2VxdWVudGlhbFF1ZXVlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2lyY3VsYXJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLlEgPSBuZXcgQ2lyY3VsYXJRdWV1ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImJhZCBxdHlwZTogXCIgKyBxdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQW5pbWF0aW9uUHJveHlCYXNlLnByb3RvdHlwZS5wbGF5TmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuUS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgICAqIGlmIHBhdXNlZCwgZG9uJ3QgZG8gYW55dGhpbmcuLi4gb3Igc29tZXRoaW5nIGxpa2UgdGhhdC4uLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGZyb250ID0gdGhpcy5RLmZyb250KCk7XG4gICAgICAgIHZhciBuRnJhbWU7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwibGluZWFyXCIpIHtcbiAgICAgICAgICAgIG5GcmFtZSA9IG5vcm1hbGl6ZUZyYW1lKHRoaXMudHlwZSwgZnJvbnQsIHRoaXMuYW5pbWF0aW9uRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSBcInNwbGluZVwiKSB7XG4gICAgICAgICAgICBuRnJhbWUgPSBub3JtYWxpemVGcmFtZSh0aGlzLnR5cGUsIGZyb250LCB0aGlzLmFuaW1hdGlvbkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJiYWQgdHlwZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlEuYWR2YW5jZSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhuRnJhbWUpLmZvckVhY2goZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgICAgIF90aGlzLmFuaW1hdGlvbkVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIG5GcmFtZVthdHRyXSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvKlxuICAgICAgICAgKiBtYXliZSBpbnN0ZWFkIG9mIHRoaXMucGxheU5leHQgcHV0IHNvbWUgb3RoZXIgY2FsbGJhY2ssXG4gICAgICAgICAqIGVtaXQgc29tZSBldmVudCBvciBzb21ldGhpbmcuLi5cbiAgICAgICAgICovXG4gICAgICAgIGJlZ2luKHRoaXMuYW5pbWF0aW9uRWxlbWVudCwgdGhpcy5wbGF5TmV4dCk7XG4gICAgfTtcbiAgICBBbmltYXRpb25Qcm94eUJhc2UucHJvdG90eXBlLnB1c2hCYWNrID0gZnVuY3Rpb24gKGZyYW1lKSB7XG4gICAgICAgIHRoaXMuUS5wdXNoQmFjayhmcmFtZSk7XG4gICAgICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlOZXh0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBbmltYXRpb25Qcm94eUJhc2U7XG59KCkpO1xuZXhwb3J0cy5BbmltYXRpb25Qcm94eUJhc2UgPSBBbmltYXRpb25Qcm94eUJhc2U7XG5kb2N1bWVudC5BbmltYXRpb25Qcm94eSA9IEFuaW1hdGlvblByb3h5QmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVlXNXBiV0YwYVc5dVVISnZlSGt1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdllXNXBiV0YwYVc5dVVISnZlSGt1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenRCUVVWQkxFbEJRVTBzWTBGQll5eEhRVUZITzBsQlEzSkNMRTFCUVUwc1JVRkJSVHRSUVVOT0xFVkJRVVVzUlVGQlJTeEhRVUZITzFGQlExQXNSMEZCUnl4RlFVRkZMRWxCUVVrN1VVRkRWQ3hYUVVGWExFVkJRVVVzUjBGQlJ6dFJRVU5vUWl4UlFVRlJMRVZCUVVVc1VVRkJVVHRSUVVOc1FpeFJRVUZSTEVWQlFVVXNTMEZCU3p0UlFVTm1MRlZCUVZVc1JVRkJSU3hMUVVGTE8wdEJRMnhDTzBsQlEwUXNUVUZCVFN4RlFVRkZPMUZCUTA0c1VVRkJVU3hGUVVGRkxFdEJRVXM3VVVGRFppeE5RVUZOTEVWQlFVVXNTMEZCU3p0UlFVTmlMRlZCUVZVc1JVRkJSU3hYUVVGWE8xRkJRM1pDTEVkQlFVY3NSVUZCUlN4SlFVRkpPMUZCUTFRc1YwRkJWeXhGUVVGRkxFZEJRVWM3VVVGRGFFSXNVVUZCVVN4RlFVRkZMRkZCUVZFN1VVRkRiRUlzVVVGQlVTeEZRVUZGTEV0QlFVczdVVUZEWml4VlFVRlZMRVZCUVVVc1MwRkJTenRMUVVOc1FqdERRVU5HTEVOQlFVTTdRVUZMUmpzN096czdPenM3T3pzN08wVkJXVVU3UVVGRlJpeEpRVUZOTEdOQlFXTXNSMEZCUnl4VlFVTnlRaXhOUVVGelFpeEZRVU4wUWl4TFFVRTRRaXhGUVVNNVFpeEZRVUYxUWp0SlFVVjBRaXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCYVVNc1EwRkJReXhQUVVGUExFTkJRekZFTEZWQlFVTXNTVUZCTUVJN08xRkJRM3BDTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1pVRkJSeXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEcxRFFVRkpMRVZCUVVVc1EwRkJReXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEcxRFFVRkpMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU4wUlN4RFFVRkRMRU5CUTBZc1EwRkJRenRKUVVOR0xFOUJRVThzVFVGQlRTeERRVUZETzBGQlEyaENMRU5CUVVNc1EwRkJRenRCUVdOR0xGTkJRVk1zWTBGQll5eERRVU55UWl4SlFVRXdRaXhGUVVNeFFpeExRVUUwUlN4RlFVTTFSU3hGUVVGMVFqdEpRVVYyUWl4SlFVRkpMRWxCUVVrc1MwRkJTeXhSUVVGUkxFVkJRVVU3VVVGRGNrSXNTVUZCVFN4TlFVRk5MR2RDUVVGclF5eGpRVUZqTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVVc1EwRkJRenRSUVVONlJTeGpRVUZqTEVOQlFVTXNUVUZCVFN4RlFVRkZMRXRCUVVzc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU5zUXl4UFFVRlBMRTFCUVUwc1EwRkJRenRMUVVObU8xTkJRVTBzU1VGQlNTeEpRVUZKTEV0QlFVc3NVVUZCVVN4RlFVRkZPMUZCUXpWQ0xFbEJRVTBzVFVGQlRTeG5Ra0ZCYTBNc1kwRkJZeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZGTEVOQlFVTTdVVUZEZWtVc1kwRkJZeXhEUVVGRExFMUJRVTBzUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRiRU1zVDBGQlR5eE5RVUZOTEVOQlFVTTdTMEZEWmp0VFFVRk5PMUZCUTB3c1RVRkJUU3hMUVVGTExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdTMEZETVVJN1FVRkRTQ3hEUVVGRE8wRkJSVVFzZVVOQlFYbERPMEZCUTNwRExFbEJRVTBzUzBGQlN5eEhRVUZITEZWQlFVTXNSVUZCZFVJc1JVRkJSU3hMUVVGcFFqdEpRVU4yUkN4RlFVRkZMRU5CUVVNc1dVRkJXU3hEUVVGRExFOUJRVThzUlVGQlJTeEZRVUZGTEVOQlFVTXNZMEZCWXl4RlFVRkZMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVU42UkN4RlFVRkZMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNWVUZCVlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUTNwRUxFTkJRVU1zUTBGQlF6dEJRVzlDUmp0SlFVZEZPMUZCUTBVc1NVRkJTU3hEUVVGRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVOQlFVTTdTVUZEWml4RFFVRkRPMGxCUlVRc2FVTkJRVThzUjBGQlVEdFJRVU5GTEU5QlFVOHNTVUZCU1N4RFFVRkRMRVZCUVVVc1EwRkJReXhOUVVGTkxFdEJRVXNzUTBGQlF5eERRVUZETzBsQlF6bENMRU5CUVVNN1NVRkZSQ3dyUWtGQlN5eEhRVUZNTzFGQlEwVXNTVUZCU1N4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFVkJRVVU3V1VGRGJFSXNUVUZCVFN4TFFVRkxMRU5CUVVNc0swSkJRU3RDTEVOQlFVTXNRMEZCUXp0VFFVTTVRenRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOd1FpeERRVUZETzBsQlJVUXNiVU5CUVZNc1IwRkJWQ3hWUVVGVkxFTkJRVWs3VVVGRFdpeEpRVUZKTEVOQlFVTXNSVUZCUlN4dFFrRkJTU3hEUVVGRExFZEJRVXNzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUXpGQ0xFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMR3REUVVGUkxFZEJRVklzVlVGQlV5eERRVUZKTzFGQlExZ3NTVUZCU1N4RFFVRkRMRVZCUVVVc2JVSkJRVWtzUTBGQlF5eEhRVUZMTEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNeFFpeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3h4UTBGQlZ5eEhRVUZZT3p0UlFVTkZMRWxCUVVrc1EwRkJTU3hEUVVGRE8xRkJRMVFzYjBKQlFYTkNMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQk4wSXNRMEZCUXl4UlFVRkJMRVZCUVVzc1NVRkJTU3hEUVVGRExFVkJRVVVzWTBGQlFTeERRVUZwUWp0SlFVTnFReXhEUVVGRE8wbEJSVVFzYVVOQlFVOHNSMEZCVUN4VlFVRlJMRU5CUVdFN1VVRkJZaXhyUWtGQlFTeEZRVUZCTEV0QlFXRTdVVUZEYmtJc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzFsQlExb3NTVUZCU1N4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRE8xbEJRMjVDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1UwRkRVanRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVTklMSE5DUVVGRE8wRkJRVVFzUTBGQlF5eEJRWGhEUkN4SlFYZERRenRCUVVWRU8wbEJRU3RDTEdsRFFVRnJRanRKUVVNdlF6dGxRVU5GTEdsQ1FVRlBPMGxCUTFRc1EwRkJRenRKUVVWRUxHMURRVUZYTEVkQlFWZzdVVUZEVVN4SlFVRkJMRzlDUVVGelFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRVZCUVRkQ0xFbEJRVWtzVVVGQlFTeEZRVUZMTEVsQlFVa3NZMEZCWjBJc1EwRkJRenRSUVVOeVF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4clFrRkJUeXhKUVVGSkxFZEJRVVVzU1VGQlNTeEZRVUZETEVOQlFVTTdTVUZETlVJc1EwRkJRenRKUVVOSUxHOUNRVUZETzBGQlFVUXNRMEZCUXl4QlFWUkVMRU5CUVN0Q0xHVkJRV1VzUjBGVE4wTTdRVUZGUkR0SlFVOUZMRFJDUVVOWkxHZENRVUZ4UXp0SlFVTXZReXdyUWtGQkswSTdTVUZEY2tJc1NVRkJUeXhGUVVOcVFpeExRVUVyUXp0UlFVRXZReXh6UWtGQlFTeEZRVUZCTEc5Q1FVRXJRenRSUVVoeVF5eHhRa0ZCWjBJc1IwRkJhRUlzWjBKQlFXZENMRU5CUVhGQ08xRkJSWEpETEZOQlFVa3NSMEZCU2l4SlFVRkpMRU5CUVVjN1VVRk1XQ3haUVVGUExFZEJRVmtzUzBGQlN5eERRVUZETzFGQlVTOUNMRkZCUVZFc1MwRkJTeXhGUVVGRk8xbEJRMklzUzBGQlN5eFpRVUZaTzJkQ1FVTm1MRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeGxRVUZsTEVWQlFXdENMRU5CUVVNN1owSkJReTlETEUxQlFVMDdXVUZEVWl4TFFVRkxMRlZCUVZVN1owSkJRMklzU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMR0ZCUVdFc1JVRkJhMElzUTBGQlF6dG5Ra0ZETjBNc1RVRkJUVHRaUVVOU08yZENRVU5GTEUxQlFVMHNTMEZCU3l4RFFVRkRMR2RDUVVGakxFdEJRVThzUTBGQlF5eERRVUZETzFOQlEzUkRPMGxCUTBnc1EwRkJRenRKUVVWVExIRkRRVUZSTEVkQlFXeENPMUZCUVVFc2FVSkJjVU5ETzFGQmNFTkRMRWxCUVVrc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZCUlR0WlFVTndRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEV0QlFVc3NRMEZCUXp0WlFVTnlRaXhQUVVGUE8xTkJRMUk3VVVGRFJEczdWMEZGUnp0UlFVTklMRWxCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1VVRkROMElzU1VGQlNTeE5RVUZ6UWl4RFFVRkRPMUZCUXpOQ0xFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NTMEZCU3l4UlFVRlJMRVZCUVVVN1dVRkRNVUlzVFVGQlRTeEhRVUZITEdOQlFXTXNRMEZEY2tJc1NVRkJTU3hEUVVGRExFbEJRV2RDTEVWQlEzSkNMRXRCUVVzc1JVRkRUQ3hKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUTNSQ0xFTkJRVU03VTBGRFNEdGhRVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1MwRkJTeXhSUVVGUkxFVkJRVVU3V1VGRGFrTXNUVUZCVFN4SFFVRkhMR05CUVdNc1EwRkRja0lzU1VGQlNTeERRVUZETEVsQlFXZENMRVZCUTNKQ0xFdEJRVXNzUlVGRFRDeEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRM1JDTEVOQlFVTTdVMEZEU0R0aFFVRk5PMWxCUTB3c1RVRkJUU3hMUVVGTExFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdVMEZEZWtJN1VVRkRSQ3hKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMUZCUTJwQ0xFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExGVkJRVU1zU1VGQlNUdFpRVU12UWl4TFFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNXVUZCV1N4RFFVTm9ReXhKUVVGSkxFVkJRMG9zVFVGQlRTeERRVUZETEVsQlFUSkNMRU5CUVVNc1EwRkRjRU1zUTBGQlF6dFJRVU5LTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnN096dFhRVWRITzFGQlEwZ3NTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRE9VTXNRMEZCUXp0SlFVVk5MSEZEUVVGUkxFZEJRV1lzVlVGQlowSXNTMEZCY1VJN1VVRkRia01zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRGRrSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVU3V1VGRGFrSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRE8xTkJRMnBDTzBsQlEwZ3NRMEZCUXp0SlFWVklMSGxDUVVGRE8wRkJRVVFzUTBGQlF5eEJRUzlGUkN4SlFTdEZRenRCUVM5RldTeG5SRUZCYTBJN1FVRnBSamxDTEZGQlFXZENMRU5CUVVNc1kwRkJZeXhIUVVGSExHdENRVUZyUWl4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBpbmRleC50c1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTG9nbyA9IHZvaWQgMDtcbnZhciBhbmltYXRpb25Qcm94eV8xID0gcmVxdWlyZShcIi4vYW5pbWF0aW9uUHJveHlcIik7XG5jb25zb2xlLmxvZyhhbmltYXRpb25Qcm94eV8xLkFuaW1hdGlvblByb3h5QmFzZSk7XG5kb2N1bWVudC5BbmltYXRpb25Qcm94eUJhc2UgPSBhbmltYXRpb25Qcm94eV8xLkFuaW1hdGlvblByb3h5QmFzZTtcbnZhciBDID0gZnVuY3Rpb24gKHMpIHsgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocyk7IH07XG52YXIgQ1NWRyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsICdzdmcnKTsgfTtcbnZhciBkb21QYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG52YXIgcGFyc2VTVkcgPSBmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBkb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKHMsIFwiaW1hZ2Uvc3ZnK3htbFwiKS5kb2N1bWVudEVsZW1lbnQ7XG59O1xudmFyIGRlZzJyYWQgPSBmdW5jdGlvbiAoZCkgeyByZXR1cm4gKE1hdGguUEkgKiBkKSAvIDE4MDsgfTtcbnZhciBkZWZhdWx0UmluZ1Byb3BzID0ge1xuICAgIGFyYzogOTAsXG4gICAgcGhhc2U6IDAsXG4gICAgcjogMC4yNSxcbiAgICBsOiAxLFxufTtcbnZhciBSaW5nQSA9IGZ1bmN0aW9uIChyciwgeDEsIHkxLCB4MiwgeTIpIHtcbiAgICByZXR1cm4gXCJNIFwiICsgeDEgKyBcIiBcIiArIHkxICsgXCIgQSBcIiArIHJyICsgXCIgXCIgKyByciArIFwiIDAgMCAwIFwiICsgeDIgKyBcIiBcIiArIHkyICsgXCIgXCI7XG59O1xudmFyIFJpbmcgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICB2YXIgX2EgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdFJpbmdQcm9wcyksIHByb3BzKSwgYXJjID0gX2EuYXJjLCBwaGFzZSA9IF9hLnBoYXNlLCByID0gX2EuciwgbCA9IF9hLmw7XG4gICAgdmFyIF9hcmMgPSBhcmMgPiAzNjAgPyBhcmMgJSAzNjAgOiBhcmM7XG4gICAgdmFyIHJyID0gciAqIGw7XG4gICAgdmFyIHgxID0gcnI7XG4gICAgdmFyIHkxID0gMDtcbiAgICB2YXIgeDIgPSByciAqIE1hdGguY29zKGRlZzJyYWQoX2FyYyAvIDIpKTtcbiAgICB2YXIgeTIgPSByciAqIE1hdGguc2luKC1kZWcycmFkKF9hcmMgLyAyKSk7XG4gICAgdmFyIHgzID0gcnIgKiBNYXRoLmNvcyhkZWcycmFkKF9hcmMpKTtcbiAgICB2YXIgeTMgPSByciAqIE1hdGguc2luKC1kZWcycmFkKF9hcmMpKTtcbiAgICB2YXIgQTEgPSBSaW5nQShyciwgeDEsIHkxLCB4MiwgeTIpO1xuICAgIHZhciBBMiA9IFJpbmdBKHJyLCB4MiwgeTIsIHgzLCB5Myk7XG4gICAgdmFyIHBhdGggPSBwYXJzZVNWRyhcIlxcbiAgICA8cGF0aFxcbiAgICAgIGQ9XFxcIlwiICsgQTEgKyBcIiBcIiArIEEyICsgXCJcXFwiXFxuICAgICAgdHJhbnNmb3JtPVxcXCJyb3RhdGUoXCIgKyAtcGhhc2UgKyBcIilcXFwiXFxuICAgICAgc3Ryb2tlPVxcXCJoc2woMTIwLDUwJSw1MCUsLjc1KVxcXCJcXG4gICAgICBzdHJva2Utd2lkdGg9XFxcIlwiICsgciAvIDIgKyBcIlxcXCJcXG4gICAgICBmaWxsPVxcXCJub25lXFxcIlxcbiAgICAgIHN0cm9rZS1saW5lY2FwPVxcXCJyb3VuZFxcXCJcXG4gICAgLz5cIik7XG4gICAgcmV0dXJuIHBhdGg7XG59O1xudmFyIGdldERlZyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBNYXRoLmF0YW4yKGUubW92ZW1lbnRYLCBlLm1vdmVtZW50WSk7IH07XG5leHBvcnRzLkxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZpZXdCb3ggPSBcIi0xLjEyNSAtMS4xMjUgMi4yNSAyLjI1XCI7XG4gICAgLy9jb25zdCBzdmcgPSBwYXJzZVNWRyhgPHN2ZyB2aWV3Qm94PVwiJHt2aWV3Qm94fVwiPjwvc3ZnPmApO1xuICAgIHZhciBzdmcgPSBDU1ZHKCk7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsIHZpZXdCb3gpO1xuICAgIHZhciByaW5ncyA9IFtcbiAgICAgICAgUmluZyh7IGw6IDEsIGFyYzogOTAsIHBoYXNlOiAxMzUgfSksXG4gICAgICAgIFJpbmcoeyBsOiAyLCBhcmM6IDE4MCwgcGhhc2U6IDkwIH0pLFxuICAgICAgICBSaW5nKHsgbDogMywgYXJjOiAyNzAsIHBoYXNlOiA0NSB9KSxcbiAgICAgICAgUmluZyh7IGw6IDQsIGFyYzogMzYwIH0pLFxuICAgIF07XG4gICAgcmluZ3MuZm9yRWFjaChmdW5jdGlvbiAocikgeyByZXR1cm4gc3ZnLmFwcGVuZENoaWxkKHIpOyB9KTtcbiAgICBjb25zb2xlLmxvZyhzdmcpO1xuICAgIHZhciBlID0gQyhcImRpdlwiKTtcbiAgICBlLmNsYXNzTmFtZSA9IFwibG9nby1wcm90b1wiO1xuICAgIGUuYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAvLyBoYWNrIVxuICAgIGUuaW5uZXJIVE1MID0gZS5pbm5lckhUTUw7XG4gICAgcmV0dXJuIGU7XG59O1xuKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHAtcm9vdFwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFwcGVuZENoaWxkKGV4cG9ydHMuTG9nbygpKTtcbmNvbnNvbGUubG9nKFwiaGVsbG9cIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTEZkQlFWYzdPenM3T3pzN096czdPenM3T3p0QlFVVllMRzFFUVVGelJEdEJRVVYwUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHMURRVUZyUWl4RFFVRkRMRU5CUVVNN1FVRkRMMElzVVVGQlowSXNRMEZCUXl4clFrRkJhMElzUjBGQlJ5eHRRMEZCYTBJc1EwRkJRenRCUVVVeFJDeEpRVUZOTEVOQlFVTXNSMEZCUnl4VlFVRkRMRU5CUVZNc1NVRkJTeXhQUVVGQkxGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVhwQ0xFTkJRWGxDTEVOQlFVTTdRVUZEYmtRc1NVRkJUU3hKUVVGSkxFZEJRVWNzWTBGQlRTeFBRVUZCTEZGQlFWRXNRMEZCUXl4bFFVRmxMRU5CUVVNc05FSkJRVFJDTEVWQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVRWRUxFTkJRVFJFTEVOQlFVTTdRVUZEYUVZc1NVRkJUU3hUUVVGVExFZEJRVWNzU1VGQlNTeFRRVUZUTEVWQlFVVXNRMEZCUXp0QlFVTnNReXhKUVVGTkxGRkJRVkVzUjBGQlJ5eFZRVUZETEVOQlFWTTdTVUZEZWtJc1QwRkJRU3hUUVVGVExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNSVUZCUlN4bFFVRmxMRU5CUVVNc1EwRkJReXhsUVVGbE8wRkJRVGRFTEVOQlFUWkVMRU5CUVVNN1FVRlBhRVVzU1VGQlRTeFBRVUZQTEVkQlFVY3NWVUZCUXl4RFFVRlZMRWxCUVVzc1QwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1IwRkJSeXhGUVVGdVFpeERRVUZ0UWl4RFFVRkRPMEZCSzBKd1JDeEpRVUZOTEdkQ1FVRm5RaXhIUVVGak8wbEJRMnhETEVkQlFVY3NSVUZCUlN4RlFVRkZPMGxCUTFBc1MwRkJTeXhGUVVGRkxFTkJRVU03U1VGRFVpeERRVUZETEVWQlFVVXNTVUZCU1R0SlFVTlFMRU5CUVVNc1JVRkJSU3hEUVVGRE8wTkJRMHdzUTBGQlF6dEJRVVZHTEVsQlFVMHNTMEZCU3l4SFFVRkhMRlZCUVVNc1JVRkJWU3hGUVVGRkxFVkJRVlVzUlVGQlJTeEZRVUZWTEVWQlFVVXNSVUZCVlN4RlFVRkZMRVZCUVZVN1NVRkRka1VzVDBGQlFTeFBRVUZMTEVWQlFVVXNVMEZCU1N4RlFVRkZMRmRCUVUwc1JVRkJSU3hUUVVGSkxFVkJRVVVzWlVGQlZTeEZRVUZGTEZOQlFVa3NSVUZCUlN4TlFVRkhPMEZCUVdoRUxFTkJRV2RFTEVOQlFVTTdRVUZGYmtRc1NVRkJUU3hKUVVGSkxFZEJRVWNzVlVGQlF5eExRVUY1UWp0SlFVTXZRaXhKUVVGQkxESkNRVUUwUWl4blFrRkJaMElzUjBGQlN5eExRVUZMTEVOQlFVVXNSVUZCZEVRc1IwRkJSeXhUUVVGQkxFVkJRVVVzUzBGQlN5eFhRVUZCTEVWQlFVVXNRMEZCUXl4UFFVRkJMRVZCUVVVc1EwRkJReXhQUVVGelF5eERRVUZETzBsQlF5OUVMRWxCUVUwc1NVRkJTU3hIUVVGSExFZEJRVWNzUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXp0SlFVTjZReXhKUVVGTkxFVkJRVVVzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTJwQ0xFbEJRVTBzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXp0SlFVTmtMRWxCUVUwc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dEpRVU5pTEVsQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU0xUXl4SlFVRk5MRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTTNReXhKUVVGTkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTjRReXhKUVVGTkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTNwRExFbEJRVTBzUlVGQlJTeEhRVUZITEV0QlFVc3NRMEZCUXl4RlFVRkZMRVZCUVVVc1JVRkJSU3hGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1NVRkRja01zU1VGQlRTeEZRVUZGTEVkQlFVY3NTMEZCU3l4RFFVRkRMRVZCUVVVc1JVRkJSU3hGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVWQlFVVXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRKUVVOeVF5eEpRVUZOTEVsQlFVa3NSMEZCUnl4UlFVRlJMRU5CUVVNc05FSkJSV0lzUlVGQlJTeFRRVUZKTEVWQlFVVXNjVU5CUTA4c1EwRkJReXhMUVVGTExIbEZRVVZXTEVOQlFVTXNSMEZCUnl4RFFVRkRMRzlGUVVkd1FpeERRVUZETEVOQlFVTTdTVUZEVUN4UFFVRlBMRWxCUVVrc1EwRkJRenRCUVVOa0xFTkJRVU1zUTBGQlF6dEJRVWxHTEVsQlFVMHNUVUZCVFN4SFFVRjNRaXhWUVVGRExFTkJRVU1zU1VGQlN5eFBRVUZCTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExGTkJRVk1zUlVGQlJTeERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRMRVZCUVhCRExFTkJRVzlETEVOQlFVTTdRVUZGYmtVc1VVRkJRU3hKUVVGSkxFZEJRVWM3U1VGRGJFSXNTVUZCVFN4UFFVRlBMRWRCUVVjc2VVSkJRWGxDTEVOQlFVTTdTVUZETVVNc01rUkJRVEpFTzBsQlF6TkVMRWxCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzUlVGQlJTeERRVUZETzBsQlEyNUNMRWRCUVVjc1EwRkJReXhaUVVGWkxFTkJRVU1zVTBGQlV5eEZRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMGxCUTNCRExFbEJRVTBzUzBGQlN5eEhRVUZITzFGQlExb3NTVUZCU1N4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeEhRVUZITEVWQlFVVXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU51UXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVVVzUlVGQlJTeERRVUZETzFGQlEyNURMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hMUVVGTExFVkJRVVVzUlVGQlJTeEZRVUZGTEVOQlFVTTdVVUZEYmtNc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU03UzBGRGVrSXNRMEZCUXp0SlFVTkdMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlF5eERRVUZETEVsQlFVc3NUMEZCUVN4SFFVRkhMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZzUWl4RFFVRnJRaXhEUVVGRExFTkJRVU03U1VGRGVrTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dEpRVU5xUWl4SlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdTVUZEYmtJc1EwRkJReXhEUVVGRExGTkJRVk1zUjBGQlJ5eFpRVUZaTEVOQlFVTTdTVUZETTBJc1EwRkJReXhEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0SlFVTnVRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTJZc1VVRkJVVHRKUVVOU0xFTkJRVU1zUTBGQlF5eFRRVUZUTEVkQlFVY3NRMEZCUXl4RFFVRkRMRk5CUVZNc1EwRkJRenRKUVVNeFFpeFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTllMRU5CUVVNc1EwRkJRenRCUVVWR0xFMUJRVUVzVVVGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4VlFVRlZMRU5CUVVNc01FTkJRVVVzVjBGQlZ5eERRVUZETEZsQlFVa3NSVUZCUlN4RlFVRkZPMEZCUTNwRUxFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNaWZRPT0iXSwic291cmNlUm9vdCI6IiJ9