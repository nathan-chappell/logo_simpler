declare type Value = string;
declare const frameTemplates: {
    linear: {
        to: string;
        dur: string;
        repeatCount: string;
        calcMode: string;
        additive: string;
        accumulate: string;
    };
    spline: {
        keyTimes: string;
        values: string;
        keySplines: string;
        dur: string;
        repeatCount: string;
        calcMode: string;
        additive: string;
        accumulate: string;
    };
};
declare type FrameTemplates = typeof frameTemplates;
declare type AnimationFrame = FrameTemplates[keyof typeof frameTemplates];
declare const normalizeAttrs: (nFrame: {
    to: string;
    dur: string;
    repeatCount: string;
    calcMode: string;
    additive: string;
    accumulate: string;
} | {
    keyTimes: string;
    values: string;
    keySplines: string;
    dur: string;
    repeatCount: string;
    calcMode: string;
    additive: string;
    accumulate: string;
}, frame: Partial<{
    to: string;
    dur: string;
    repeatCount: string;
    calcMode: string;
    additive: string;
    accumulate: string;
}> | Partial<{
    keyTimes: string;
    values: string;
    keySplines: string;
    dur: string;
    repeatCount: string;
    calcMode: string;
    additive: string;
    accumulate: string;
}>, el: SVGAnimationElement) => {
    to: string;
    dur: string;
    repeatCount: string;
    calcMode: string;
    additive: string;
    accumulate: string;
} | {
    keyTimes: string;
    values: string;
    keySplines: string;
    dur: string;
    repeatCount: string;
    calcMode: string;
    additive: string;
    accumulate: string;
};
declare function normalizeFrame(type: "linear", frame: Partial<FrameTemplates["linear"]>, el: SVGAnimationElement): FrameTemplates["linear"];
declare function normalizeFrame(type: "spline", frame: Partial<FrameTemplates["spline"]>, el: SVGAnimationElement): FrameTemplates["spline"];
declare const begin: (el: SVGAnimationElement, onEnd: () => void) => void;
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
declare class AnimationProxyBase<T extends "linear" | "spline", Frame extends AnimationFrame = FrameTemplates[T]> {
    protected animationElement: SVGAnimationElement;
    protected type: T;
    protected Q: Queue<Partial<Frame>>;
    constructor(animationElement: SVGAnimationElement, type: T, qtype?: "sequential" | "circular");
    protected playNext(): void;
}
