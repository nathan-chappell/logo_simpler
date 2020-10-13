import { Ring } from "./logo";
import Color from "color";

/*
 * fade-in
 * fade-out
 * from-left/right/top/bottom
 * dip
 * bump
 * spiral
 */

const getVals = (val: string) => val.split(/;/)
const getLastVal = (val: string) => {
  const vals = val.split(/;/)
  return vals[vals.length - 1];
}

export const fadeIn = (ring: Ring, dur: string = "2s") => {
  const color = Color(ring.pathColor);
  ring.colors = [
    { val: `${color.fade(1).toString()};${color.toString()}`, dur },
    ...ring.colors,
  ];
  return ring;
};

export const fadeOut = (ring: Ring, dur: string = "2s") => {
  let lastColor: string;
  if (ring.colors.length > 0) {
    lastColor = getLastVal(ring.colors[ring.colors.length - 1].val);
  } else {
    lastColor = ring.pathColor;
  }
  ring.colors = [
    ...ring.colors,
    { val: Color(lastColor).fade(1).toString(), dur },
  ];
  return ring;
};

const bounceOnce = (ring: Ring, dur: number, height: number) => {
  ring.motions.push({
    val: `M 0,0 0,-${height}`,
    dur: `${dur/2}s`,
    keySplines: '0 .2 .2 1',
  });
  ring.motions.push({
    val: `M 0,-${height} 0,0`,
    dur: `${dur/2}s`,
    keySplines: '1 .1 1 0',
  })
  return ring;
}

export const bounce = (ring: Ring, dur: string = "2s", bounces: number = 5, height: number = .1) => {
  let t = parseFloat(dur);
  while (bounces >= 0) {
    bounceOnce(ring, t/2, height)
    bounces -= 1;
    height /= 2;
    if (bounces > 0) {
      t /= 2;
    }
  }
  return ring;
}

export const dip = (ring: Ring, dur: string = "2s", depth: number = .1) => {
  const t = parseFloat(dur);
  ring.motions.push({
    dur: `${t/4}s`,
    val: `M 0,0 0,-${depth / 4}`,
    keySplines: '.3 .7 .1 1',
  });
  ring.motions.push({
    dur: `${t/2}s`,
    val: `M 0,-${depth/4} 0,${depth}`,
    keySplines: '.3 .7 .1 1',
  });
  ring.motions.push({
    dur: `${t/4}s`,
    val: `M 0,${depth} 0,-${depth / 8} 0,0`,
    keySplines: '.3 1 .1 1',
  });
  return ring;
}
