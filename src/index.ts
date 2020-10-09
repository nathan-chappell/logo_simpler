// index.ts

const C = (s: string) => document.createElement(s);

type Radius = number;
type BorderWidth = number;
type Degrees = number;
type Level = number;

const deg2rad = (d: Degrees) => (Math.PI * d) / 180;

/*
const viewBox = (r: Radius, bw: BorderWidth) => {
  const vw = r + bw;
  return `${vw} ${vw} ${2 * vw} ${2 * vw}`;
};

const r = 1;
const bw = 0.05;
*/

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
  r: Radius;
  l: Level;
}

const defaultRingProps: RingProps = {
  arc: 90,
  phase: 0,
  r: 0.25,
  l: 1,
};

const RingA = (rr: number, x1: number, y1: number, x2: number, y2: number) =>
  `M ${x1} ${y1} A ${rr} ${rr} 0 0 0 ${x2} ${y2} `;

const Ring = (props: Partial<RingProps>) => {
  const { arc, phase, r, l } = { ...defaultRingProps, ...props };
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
  const open = `
    <path
      d="${A1} ${A2}"
      transform="rotate(${-phase})"
      stroke="hsl(120,50%,50%,.75)"
      stroke-width="${r / 2}"
      fill="none"
      stroke-linecap="round"
    >`;
  const close = `</path>`;
  const animation = ``;
  return open + animation + close;
};

const Logo = () => {
  const e = document.createElement("div");
  e.className = "logo-proto";
  e.innerHTML = `
      <svg viewBox="-1.125 -1.125 2.25 2.25">
      ${Ring({ l: 1, arc: 90, phase: 135 })}
      ${Ring({ l: 2, arc: 180, phase: 90 })}
      ${Ring({ l: 3, arc: 270, phase: 45 })}
      ${Ring({ l: 4, arc: 360 })}
        <path d="M -.05 0 l .1 0" stroke-width=".1" stroke="black" />
      </svg>
      `;
  console.log(e);
  return e;
};

document.getElementById("app-root")?.appendChild(Logo());
console.log("hello");
