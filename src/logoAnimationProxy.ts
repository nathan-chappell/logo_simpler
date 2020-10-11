import { v4 } from "uuid";

import { AnimationProxyBase, normalizeFrame } from "./animationProxy";
import { NS, getRings } from "./util";

const normalizeEl = (el: SVGAnimationElement, type: "linear" | "spline") => {
  if (type === "linear") {
    normalizeFrame("linear", {}, el);
  } else if (type === "spline") {
    normalizeFrame("spline", {}, el);
  } else {
    throw Error("bad type in normalizeEl");
  }
}

class RingAnimationProxy<F extends "linear" | "spline"> {
  _c: AnimationProxyBase<F>;
  _p: AnimationProxyBase<F>;
  _t: AnimationProxyBase<F>;

  constructor(
    public el: SVGPathElement,
    type: F,
    qType: "sequential" | "circular"
  ) {
    // color
    const cEl = document.createElementNS(NS, "animate") as SVGAnimationElement;
    cEl.setAttribute("attributeName", "stroke");
    //let cFrame = normalizeFrame(type, {}, cEl);
    normalizeEl(cEl, type);
    el.appendChild(cEl);
    this._c = new AnimationProxyBase<F>(cEl, type, qType);

    // translation
    const tEl = document.createElementNS(
      NS,
      "animateTransform"
    ) as SVGAnimationElement;
    tEl.setAttribute("attributeName", "transform");
    tEl.setAttribute("type", "translate");
    normalizeEl(tEl, type);
    el.appendChild(tEl);
    this._t = new AnimationProxyBase<F>(tEl, type, qType);

    // phase
    const pEl = document.createElementNS(
      NS,
      "animateTransform"
    ) as SVGAnimationElement;
    pEl.setAttribute("attributeName", "transform");
    pEl.setAttribute("type", "rotate");
    normalizeEl(pEl, type);
    el.appendChild(pEl);
    this._p = new AnimationProxyBase<F>(pEl, type, qType);
  }

  get c(): AnimationProxyBase<F> {
    return this._c;
  }

  get p(): AnimationProxyBase<F> {
    return this._p;
  }

  get t(): AnimationProxyBase<F> {
    return this._t;
  }
}

export function attachRingProxies<F extends "linear" | "spline">(
  logoDiv: HTMLDivElement,
  frameType: F,
  qType: "sequential" | "circular"
): RingAnimationProxy<F>[] {
  const id = logoDiv.id;
  let i = 0;
  let result: RingAnimationProxy<F>[] = [];
  const rings = getRings(logoDiv);
  for (let ring of rings) {
    result.push(new RingAnimationProxy(ring, frameType, qType));
  }
  return result;
}
