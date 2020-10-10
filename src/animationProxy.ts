type Value = string;

const frameTemplates = {
  linear: {
    to: "0",
    dur: "2s",
    repeatCount: "1",
    calcMode: "linear",
    additive: "sum",
    accumulate: "sum",
  },
  spline: {
    keyTimes: "0 1",
    values: "0 0",
    keySplines: ".5 0 .5 1",
    dur: "2s",
    repeatCount: "1",
    calcMode: "spline",
    additive: "sum",
    accumulate: "sum",
  },
};

type FrameTemplates = typeof frameTemplates;
type AnimationFrame = FrameTemplates[keyof typeof frameTemplates];

/*
function isLinearFrame(
  frame: AnimationFrame
): frame is FrameTemplates["linear"] {
  return frame.calcMode === "linear";
}

function isSplineFrame(
  frame: AnimationFrame
): frame is FrameTemplates["spline"] {
  return frame.calcMode === "spline";
}
*/

const normalizeAttrs = (
  nFrame: AnimationFrame,
  frame: Partial<AnimationFrame>,
  el: SVGAnimationElement
) => {
  (Object.keys(nFrame) as Array<keyof AnimationFrame>).forEach(
    (attr: keyof AnimationFrame) => {
      nFrame[attr] = frame[attr] ?? el.getAttribute(attr) ?? nFrame[attr];
    }
  );
  return nFrame;
};

function normalizeFrame(
  type: "linear",
  frame: Partial<FrameTemplates["linear"]>,
  el: SVGAnimationElement
): FrameTemplates["linear"];

function normalizeFrame(
  type: "spline",
  frame: Partial<FrameTemplates["spline"]>,
  el: SVGAnimationElement
): FrameTemplates["spline"];

function normalizeFrame(
  type: keyof FrameTemplates,
  frame: Partial<FrameTemplates["spline"]> | Partial<FrameTemplates["linear"]>,
  el: SVGAnimationElement
): AnimationFrame {
  if (type === "linear") {
    const nFrame: FrameTemplates["linear"] = { ...frameTemplates["linear"] };
    normalizeAttrs(nFrame, frame, el);
    return nFrame;
  } else if (type === "spline") {
    const nFrame: FrameTemplates["linear"] = { ...frameTemplates["linear"] };
    normalizeAttrs(nFrame, frame, el);
    return nFrame;
  } else {
    throw Error("bad frame");
  }
}

// should take a callback or something...
const begin = (el: SVGAnimationElement, onEnd: () => void) => {
  el.setAttribute("begin", el.getCurrentTime().toString());
  el.addEventListener("endEvent", onEnd, { once: true });
};

interface IAnimationProxy<F> {
  pushFront(frame: Partial<F>): IAnimationProxy<F>;
  pushBack(frame: Partial<F>): IAnimationProxy<F>;
  skip(n: number): IAnimationProxy<F>;
}

/*
 * The data structure for holding the frames takes care of the "backend" actions
 * for the above interface
 */
interface Queue<T> {
  pushFront(t: T): Queue<T>;
  pushBack(t: T): Queue<T>;
  advance(n?: number): Queue<T>;
  isEmpty(): boolean;
  front(): T;
}

class SequentialQueue<T> implements Queue<T> {
  protected _Q: T[];

  constructor() {
    this._Q = [];
  }

  isEmpty(): boolean {
    return this._Q.length === 0;
  }

  front(): T {
    if (this.isEmpty()) {
      throw Error("called `front` on empty Queue");
    }
    return this._Q[0];
  }

  pushFront(t: T) {
    this._Q = [t, ...this._Q];
    return this;
  }

  pushBack(t: T) {
    this._Q = [t, ...this._Q];
    return this;
  }

  _advanceOne() {
    let _: T;
    [_, ...this._Q] = [...this._Q];
  }

  advance(n: number = 1) {
    while (n > 0) {
      this._advanceOne();
      n -= 1;
    }
    return this;
  }
}

class CircularQueue<T> extends SequentialQueue<T> {
  constructor() {
    super();
  }

  _advanceOne() {
    const [head, ...tail] = [...this._Q];
    this._Q = [...tail, head];
  }
}

class AnimationProxyBase<
  T extends "linear" | "spline",
  Frame extends AnimationFrame = FrameTemplates[T]
> {
  protected Q: Queue<Partial<Frame>>;

  constructor(
    protected animationElement: SVGAnimationElement,
    //protected type: T = "linear",
    protected type: T,
    qtype: "sequential" | "circular" = "sequential"
  ) {
    switch (qtype) {
      case "sequential":
        this.Q = new SequentialQueue<Partial<Frame>>();
        break;
      case "circular":
        this.Q = new CircularQueue<Partial<Frame>>();
        break;
      default:
        throw Error(`bad qtype: ${qtype}`);
    }
  }

  protected playNext() {
    if (this.Q.isEmpty()) {
      return;
    }
    /*
     * if paused, don't do anything... or something like that...
     */
    const front = this.Q.front();
    let nFrame: AnimationFrame;
    if (this.type === "linear") {
      nFrame = normalizeFrame(
        this.type as "linear",
        front,
        this.animationElement
      );
    } else if (this.type === "spline") {
      nFrame = normalizeFrame(
        this.type as "spline",
        front,
        this.animationElement
      );
    } else {
      throw Error("bad type");
    }
    this.Q.advance();
    Object.keys(nFrame).forEach((attr) => {
      this.animationElement.setAttribute(
        attr,
        nFrame[attr as keyof typeof nFrame]
      );
    });
    begin(this.animationElement, this.playNext);
  }
  /*
   * pushFront
   * pushBack
   * skip
   *
   * later:
   *  pause
   *  resume
   */
}
