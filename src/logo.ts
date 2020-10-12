import { v4 } from "uuid";

type Degrees = number;

const deg2rad = (d: Degrees) => (Math.PI * d) / 180;

const defaultViewBox = "-1 -1 2 2";

interface RingProps {
  radius: number;
  arcLength: Degrees;
  strokeWidth: number;
  color: string;
  viewBox: string;
}

const defaultRingProps: RingProps = {
  radius: 0.2,
  arcLength: 270,
  strokeWidth: 0.1,
  color: "hsl(250,80%,50%,.8)",
  viewBox: defaultViewBox,
};

interface RingSVGResult {
  svg: string;
  motionID: string;
  strokeID: string;
  rotateID: string;
  innerID: string;
}

const RingSVG: (props: RingProps) => RingSVGResult = ({
  radius,
  arcLength,
  strokeWidth,
  color,
  viewBox,
}) => {
  const motionID = v4();
  const strokeID = v4();
  const rotateID = v4();
  const innerID = v4();
  const x1 = radius;
  const y1 = 0;
  const x2 = radius * Math.cos(deg2rad(arcLength));
  const y2 = radius * Math.sin(-deg2rad(arcLength));
  const longArc = arcLength > 180 ? 1 : 0;
  const d = `M ${x1} ${y1} 
             A ${radius} ${radius}
               0 ${longArc} 0
               ${x2} ${y2}`;
  const commonAttrs = `dur="1s" calcMode="spline" keySplines="0 .5 .5 0" repeatCount="1"`;
  const svg = `
    <g>
      <animateMotion 
        id="${motionID}"
        path="M 0 0" 
        ${commonAttrs} 
      />
      <svg 
        id="${innerID}"
        viewBox="${viewBox}"
        x="-1"
        y="-1"
      >
        <path
          d="${d}"
          stroke="${color}"
          stroke-width="${strokeWidth}"
          fill="none"
          stroke-linecap="round"
        >
          <animate 
            id="${strokeID}"
            attributeName="stroke" 
            values="${color};${color}" 
            ${commonAttrs} 
          />
          <animateTransform
            id="${rotateID}"
            attributeName="transform"
            type="rotate"
            values="0;0"
            ${commonAttrs}
          />
        </path>
      </svg>
    </g>
  `;
  return { svg, motionID, strokeID, rotateID, innerID };
};

const getElementOrThrow = (id: string) => {
  const el = document.getElementById(id);
  if (el === null) {
    throw Error(`null element. id: ${id}`);
  } else {
    return el;
  }
};

interface AnimationSpec {
  val: string;
  dur?: string;
  keySplines?: string;
  repeatCount?: string;
}

const transition = (spec: AnimationSpec, el: SVGAnimationElement) => {
  // if you put multiple vals, I assume you know what you're doing
  if (spec.val.match(/;/)) {
    el.setAttribute("values", spec.val);
  } else {
    const oldVals = el.getAttribute("values")?.split(/;/);
    const from = oldVals ? oldVals[oldVals.length - 1] : undefined;
    if (from === 'undefined') {
      throw Error(`couldn't get from val: ${spec}, ${el}`);
    } else {
      el.setAttribute("values", `${from};${spec.val}`);
    }
  }
  Object.entries(spec)
    .filter(([k, v]) => k !== "val")
    .forEach(([k, v]) => el.setAttribute(k, v));
  el.setAttribute("begin", el.getCurrentTime().toString());
  /*
  if (spec.dur !== undefined) {
    el.setAttribute('dur',spec.dur);
  }
  if (spec.keySplines !== undefined) {
    el.setAttribute('keySplines',spec.keySplines);
  }
  if (spec.repeatCount !== undefined) {
    el.setAttribute('repeatCount',spec.repeatCount);
  }
  */
};

type BufferMode = "repeat" | "once";

interface RingModes {
  rotations: BufferMode;
  colors: BufferMode;
  motions: BufferMode;
}

const defaultModes: RingModes = {
  rotations: "repeat",
  colors: "once",
  motions: "once",
};

export class Ring {
  ringSVG: RingSVGResult;
  modes: RingModes;
  rotations: AnimationSpec[] = [];
  colors: AnimationSpec[] = [];
  motions: AnimationSpec[] = [];

  constructor(props: Partial<RingProps>) {
    this.ringSVG = RingSVG({ ...defaultRingProps, ...props });
    this.modes = { ...defaultModes };
  }

  /*
   * are these getters possible performance issues?
   */
  get rotateEl(): SVGAnimationElement {
    return (getElementOrThrow(
      this.ringSVG.rotateID
    ) as unknown) as SVGAnimationElement;
  }

  get colorEl(): SVGAnimationElement {
    return (getElementOrThrow(
      this.ringSVG.strokeID
    ) as unknown) as SVGAnimationElement;
  }

  get motionEl(): SVGAnimationElement {
    return (getElementOrThrow(
      this.ringSVG.motionID
    ) as unknown) as SVGAnimationElement;
  }

  start() {
    this.next("rotation");
    this.next("color");
    this.next("motion");
  }

  next(attr: "rotation" | "color" | "motion") {
    let q: AnimationSpec[];
    let el: SVGAnimationElement;
    let mode: BufferMode;
    switch (attr) {
      case "rotation":
        q = this.rotations;
        el = this.rotateEl;
        mode = this.modes.rotations;
        break;
      case "color":
        q = this.colors;
        el = this.colorEl;
        mode = this.modes.colors;
        break;
      case "motion":
        q = this.motions;
        el = this.motionEl;
        mode = this.modes.motions;
        break;
      default:
        throw Error(`bad next: ${attr}`);
    }
    const nextSpec = q.shift();
    if (nextSpec === undefined) {
      return;
    } else {
      transition(nextSpec, el);
      el.addEventListener(
        "endEvent",
        () => {
          this.next(attr);
        },
        { once: true }
      );
      if (mode === "repeat") {
        q.push(nextSpec);
      }
    }
  }
}

export const Logo = () => {
  const div = document.createElement("div");
  div.id = "logo-div";
  div.className = "logo-proto";
  div.innerHTML = `
    <svg viewBox="${defaultViewBox}">
    </svg>
  `;
  const svg = div.children[0];
  const rings = [1,2,3,4].map(x => new Ring({radius: x*.2}))
  svg.innerHTML = rings.map(ring => ring.ringSVG.svg).join("\n");
  return div;
};
