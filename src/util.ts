export const NS = "http://www.w3.org/2000/svg";

export const C = (s: string) => document.createElement(s);
export const CSVG = () =>
  document.createElementNS(NS, 'svg');
export const domParser = new DOMParser();
export const parseSVG = (s: string) =>
  domParser.parseFromString(s, "image/svg+xml").documentElement;

export const makeRingId = (id: string, i: number) => `${id}-ring-${i}`;

export const getRings = (el: HTMLDivElement) => {
  console.log('getRings', el);
  let i = 0;
  let result: SVGPathElement[] = [];
  const svgEl = el.children[0] as SVGSVGElement;
  for (let ci = 0; ci < svgEl.children.length; ci +=1 ) {
    if (svgEl.children[ci].id === makeRingId(el.id,i)) {
      result.push(svgEl.children[ci] as unknown as SVGPathElement);
      i += 1;
    }
  }
  return result;
};
