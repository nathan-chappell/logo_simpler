declare const C: (s: string) => HTMLElement;
declare type Radius = number;
declare type BorderWidth = number;
declare type Degrees = number;
declare type Level = number;
declare const deg2rad: (d: number) => number;
interface RingProps {
    arc: Degrees;
    phase: Degrees;
    r: Radius;
    l: Level;
}
declare const defaultRingProps: RingProps;
declare const RingA: (rr: number, x1: number, y1: number, x2: number, y2: number) => string;
declare const Ring: (props: Partial<RingProps>) => string;
declare const Logo: () => HTMLDivElement;
