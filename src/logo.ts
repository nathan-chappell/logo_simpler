import { v4 } from "uuid";

import { C, CSVG, parseSVG, makeRingId } from "./util";
import { attachRingProxies } from "./logoAnimationProxy";

type Radius = number;
type BorderWidth = number;
type Degrees = number;
type Level = number;

const deg2rad = (d: Degrees) => (Math.PI * d) / 180;

/*
<animateTransform 
  attributeName="transform"
  type="rotate"
  by="360"
  dur="3s"
  repeatCount="indefinite"
  fill="freeze"
  additive="sum"
  />
*/

interface RingProps {
  arc: Degrees;
  phase: Degrees;
  //r: Radius;
  l: Level;
}

const defaultRingProps: RingProps = {
  arc: 90,
  phase: 0,
  //r: 0.25,
  l: 1,
};

const r = 0.25;

const RingA = (rr: number, x1: number, y1: number, x2: number, y2: number) =>
  `M ${x1} ${y1} A ${rr} ${rr} 0 0 0 ${x2} ${y2} `;

const Ring = (id: string, props: Partial<RingProps>) => {
  console.log("making ring:", id);
  const { arc, phase, /*r,*/ l } = { ...defaultRingProps, ...props };
  const _arc = arc > 360 ? arc % 360 : arc;
  const rr = r * l;
  const x1 = rr;
  const y1 = 0;
  const x2 = rr * Math.cos(deg2rad(_arc / 2));
  const y2 = rr * Math.sin(-deg2rad(_arc / 2));
  const x3 = rr * Math.cos(deg2rad(_arc));
  const y3 = rr * Math.sin(-deg2rad(_arc));
  const A1 = RingA(rr, x1, y1, x2, y2);
  const A2 = RingA(rr, x2, y2, x3, y3);
  const path = parseSVG(`
    <path
      id="${id}"
      d="${A1} ${A2}"
      transform="rotate(${-phase})"
      stroke="hsl(120,50%,50%,.75)"
      stroke-width="${r / 2}"
      fill="none"
      stroke-linecap="round"
    />`);
  return path;
};

interface LogoSpec {
  rings: Partial<RingProps>[];
  id?: string;
}

const defaultLogoSpec: LogoSpec = {
  rings: [
    { l: 1, arc: 90, phase: 0 },
    { l: 2, arc: 180, phase: 0 },
    { l: 3, arc: 270, phase: 0 },
    { l: 4, arc: 360 },
  ],
  id: "",
};

export const Logo = ({ id, rings }: LogoSpec = defaultLogoSpec) => {
  let _id: string;
  if (id === undefined || id === "") {
    _id = v4();
  } else {
    _id = id;
  }
  const viewBox = "-1.125 -1.125 2.25 2.25";
  let svg = CSVG();
  svg.setAttribute("viewBox", viewBox);
  const ringElements = rings.map((ringProps, i) =>
    Ring(makeRingId(_id, i), ringProps)
  );
  ringElements.forEach((ring) => svg.appendChild(ring));
  const e = document.createElement("div");
  e.id = _id;
  e.className = "logo-proto";
  e.appendChild(svg);
  // fucked up stupid hack...
  e.innerHTML = e.innerHTML;
  svg = e.children[0] as SVGSVGElement;
  //const proxies = attachRingProxies(e, "linear", "circular");
  const proxies = attachRingProxies(e, "linear","sequential");
  (document as any).proxies = proxies;
  return e;
};
