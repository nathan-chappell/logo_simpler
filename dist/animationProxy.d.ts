declare abstract class AnimationFrameBase {
    calcMode: "linear" | "spline";
    dur: string;
    repeatCount: string;
    setAttributes(el: SVGAnimationElement): void;
    static normalize(el: SVGAnimationElement): void;
}
interface LinearAnimationFrame extends AnimationFrameBase {
    to: string;
}
declare const setLinearAttributes: (el: SVGAnimationElement, frame: LinearAnimationFrame) => void;
interface SplineAnimationFrame extends AnimationFrameBase {
    keyTimes: string;
    keySplines: string;
    values: string;
}
declare const setSplineAttributes: (el: SVGAnimationElement, frame: SplineAnimationFrame) => void;
declare const playNow: (el: SVGAnimationElement) => void;
declare type AnimationFrame = LinearAnimationFrame | SplineAnimationFrame;
declare function isLinearFrame(frame: AnimationFrame): frame is LinearAnimationFrame;
declare function isSplineFrame(frame: AnimationFrame): frame is SplineAnimationFrame;
interface IAnimationProxy<F> {
    pushFront(frame: Partial<F>): IAnimationProxy<F>;
    pushBack(frame: Partial<F>): IAnimationProxy<F>;
    skip(n: number): IAnimationProxy<F>;
}
interface Queue<T> {
    pushFront(t: T): Queue<T>;
    pushBack(t: T): Queue<T>;
    advance(n?: number): Queue<T>;
    isEmpty(): boolean;
    front(): T;
}
declare class SequentialQueue<T> implements Queue<T> {
    protected _Q: T[];
    constructor();
    isEmpty(): boolean;
    front(): T;
    pushFront(t: T): this;
    pushBack(t: T): this;
    _advanceOne(): void;
    advance(n?: number): this;
}
declare class CircularQueue<T> extends SequentialQueue<T> {
    constructor();
    _advanceOne(): void;
}
declare class AnimationProxyBase<F extends AnimationFrame = LinearAnimationFrame, Q extends Queue<F> = SequentialQueue<F>> {
    protected _animationElement: SVGAnimationElement;
    protected _Q: Q;
    constructor(_animationElement: SVGAnimationElement, _Q: Q);
    protected playNext(): void;
}
