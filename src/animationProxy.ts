type Value = string;

const frameTemplates = {
  linear: {
    from: "0",
    to: "0",
    dur: "2s",
    repeatCount: "1",
    calcMode: "linear",
    additive: "sum",
    accumulate: "sum",
    fill: "freeze",
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
    fill: "freeze",
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

function normalizeFrom(el: SVGAnimationElement) {
  const attributeName = el.getAttribute("attributeName");
  if (attributeName === "stroke") {
    return "hsl(0,100%,50%,1)";
  } else if (attributeName === "transform") {
    const type = el.getAttribute("type");
    if (type === "rotate") {
      return "0";
    } else if (type === "translate") {
      return "0";
    }
  }
  throw Error(`couldn't normalize from: ${el}`);
}

export function normalizeFrame(
  type: "linear",
  frame: Partial<FrameTemplates["linear"]>,
  el: SVGAnimationElement
): FrameTemplates["linear"];

export function normalizeFrame(
  type: "spline",
  frame: Partial<FrameTemplates["spline"]>,
  el: SVGAnimationElement
): FrameTemplates["spline"];

export function normalizeFrame(
  type: "linear" | "spline",
  frame: Partial<FrameTemplates["spline"]> | Partial<FrameTemplates["linear"]>,
  el: SVGAnimationElement
): AnimationFrame {
  if (type === "linear") {
    const nFrame: FrameTemplates["linear"] = { ...frameTemplates["linear"] };
    const from =
      (frame as Partial<FrameTemplates["linear"]>).from ??
      el.getAttribute("to") ??
      normalizeFrom(el);
    normalizeAttrs(nFrame, frame, el);
    nFrame.from = from;
    Object.keys(nFrame).forEach((attr) => {
      el.setAttribute(
        attr,
        nFrame[attr as keyof typeof nFrame]
      );
    });
    return nFrame;
  } else if (type === "spline") {
    const nFrame: FrameTemplates["linear"] = { ...frameTemplates["linear"] };
    normalizeAttrs(nFrame, frame, el);
    Object.keys(nFrame).forEach((attr) => {
      el.setAttribute(
        attr,
        nFrame[attr as keyof typeof nFrame]
      );
    });
    return nFrame;
  } else {
    throw Error("bad frame");
  }
}

//export function normalizeAndSet(type, frame, el)

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

export class AnimationProxyBase<F extends "linear" | "spline"> {
  protected Q: Queue<Partial<FrameTemplates[F]>>;
  private running: boolean = false;

  constructor(
    protected animationElement: SVGAnimationElement,
    protected type: F,
    qtype: "sequential" | "circular" = "sequential"
  ) {
    switch (qtype) {
      case "sequential":
        this.Q = new SequentialQueue<Partial<FrameTemplates[F]>>();
        break;
      case "circular":
        this.Q = new CircularQueue<Partial<FrameTemplates[F]>>();
        break;
      default:
        throw Error(`bad qtype: ${qtype}`);
    }
  }

  protected playNext() {
    if (this.Q.isEmpty()) {
      this.running = false;
      return;
    }
    this.running = true;
    /*
     * if paused, don't do anything... or something like that...
     */
    const front = this.Q.front();
    let nFrame: AnimationFrame;
    if (this.type === "linear") {
      nFrame = normalizeFrame("linear", front, this.animationElement);
      //console.log("nFrame", nFrame);
    } else if (this.type === "spline") {
      nFrame = normalizeFrame("spline", front, this.animationElement);
    } else {
      throw Error("bad type");
    }
    this.Q.advance();
    /*
    Object.keys(nFrame).forEach((attr) => {
      this.animationElement.setAttribute(
        attr,
        nFrame[attr as keyof typeof nFrame]
      );
    });
    /*
     * maybe instead of this.playNext put some other callback,
     * emit some event or something...
     */
    //begin(this.animationElement, this.playNext.bind(this));
    begin(this.animationElement, () => {
      this.running = false;
      console.log("play next!",this.animationElement);
      this.playNext();
    });
  }

  public pushBack(frame: Partial<FrameTemplates[F]>) {
    this.Q.pushBack(frame);
    if (!this.running) {
      console.warn('not running! starting');
      this.playNext();
    }
    return this;
  }
  /*
   * pushBack
   * pushFront
   * skip
   *
   * later:
   *  pause
   *  resume
   */
}

(document as any).AnimationProxy = AnimationProxyBase;
