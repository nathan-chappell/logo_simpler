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
interface Queue<T> {
    pushFront(t: T): Queue<T>;
    pushBack(t: T): Queue<T>;
    advance(n?: number): Queue<T>;
    isEmpty(): boolean;
    front(): T;
}
export declare class AnimationProxyBase<T extends "linear" | "spline", Frame extends AnimationFrame = FrameTemplates[T]> {
    protected animationElement: SVGAnimationElement;
    protected type: T;
    protected Q: Queue<Partial<Frame>>;
    private running;
    constructor(animationElement: SVGAnimationElement, type: T, qtype?: "sequential" | "circular");
    protected playNext(): void;
    pushBack(frame: Partial<Frame>): void;
}
export {};
