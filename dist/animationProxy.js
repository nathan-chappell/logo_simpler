"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var AnimationFrameBase = /** @class */ (function () {
    function AnimationFrameBase() {
    }
    AnimationFrameBase.prototype.setAttributes = function (el) {
        el.setAttribute("dur", frame.dur);
        el.setAttribute("repeatCount", frame.repeatCount);
    };
    AnimationFrameBase.normalize = function (el) {
    };
    return AnimationFrameBase;
}());
var setLinearAttributes = function (el, frame) {
    setBaseAttributes(el, frame);
    var from = el.getAttribute("to");
    if (from === null) {
        throw Error('from null! (unreachable)');
    }
    el.setAttribute("from", from);
    el.setAttribute("to", frame.to);
};
var setSplineAttributes = function (el, frame) {
    setBaseAttributes(el, frame);
    el.setAttribute("keyTimes", frame.keyTimes);
    el.setAttribute("keySplines", frame.keySplines);
    el.setAttribute("values", frame.values);
};
var playNow = function (el) {
    el.setAttribute("begin", el.getCurrentTime().toString());
};
function isLinearFrame(frame) {
    return frame.calcMode === "linear";
}
function isSplineFrame(frame) {
    return frame.calcMode === "spline";
}
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
    function AnimationProxyBase(_animationElement, _Q) {
        this._animationElement = _animationElement;
        this._Q = _Q;
    }
    AnimationProxyBase.prototype.playNext = function () {
        if (this._Q.isEmpty()) {
            return;
        }
        var front = this._Q.front();
        this._Q.advance();
        if (isLinearFrame(front)) {
            setLinearAttributes(this._animationElement, front);
        }
        else if (isSplineFrame(front)) {
            setSplineAttributes(this._animationElement, front);
        }
        else {
            throw Error('bad frame: ' + JSON.stringify(front, null, 2));
        }
        playNow(this._animationElement);
    };
    return AnimationProxyBase;
}());
//# sourceMappingURL=animationProxy.js.map