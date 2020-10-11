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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./animationProxy"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    var animationProxy_1 = require("./animationProxy");
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
});
//# sourceMappingURL=index.js.map