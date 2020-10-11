var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
//# sourceMappingURL=animationProxy.js.map