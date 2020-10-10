abstract class AnimationFrameBase {
  calcMode: "linear" | "spline";
  dur: string;
  //repeatCount: number | "indefinite";
  repeatCount: string;

  setAttributes(el: SVGAnimationElement) {
    el.setAttribute("dur", frame.dur);
    el.setAttribute("repeatCount", frame.repeatCount);
  }

  static normalize(el: SVGAnimationElement) {
  }
}

interface LinearAnimationFrame extends AnimationFrameBase {
  to: string;
}

const setLinearAttributes = (
  el: SVGAnimationElement,
  frame: LinearAnimationFrame
) => {
  setBaseAttributes(el, frame);
  const from = el.getAttribute("to");
  if (from === null) {
    throw Error('from null! (unreachable)');
  }
  el.setAttribute("from", from);
  el.setAttribute("to", frame.to);
};

interface SplineAnimationFrame extends AnimationFrameBase {
  // calcMode === 'spline'
  keyTimes: string;
  keySplines: string;
  values: string;
}

const setSplineAttributes = (
  el: SVGAnimationElement,
  frame: SplineAnimationFrame
) => {
  setBaseAttributes(el, frame);
  el.setAttribute("keyTimes", frame.keyTimes);
  el.setAttribute("keySplines", frame.keySplines);
  el.setAttribute("values", frame.values);
};

const playNow = (el: SVGAnimationElement) => {
  el.setAttribute("begin", el.getCurrentTime().toString());
};

type AnimationFrame = LinearAnimationFrame | SplineAnimationFrame;

function isLinearFrame(frame: AnimationFrame): frame is LinearAnimationFrame {
  return frame.calcMode === "linear";
}

function isSplineFrame(frame: AnimationFrame): frame is SplineAnimationFrame {
  return frame.calcMode === "spline";
}

/*
 * AnimationProxy gives access to an animated attribute.
 * The interface provides methods to add a frame to a sequence of animations:
 *
 * push: adds frame to end of queue.
 *       This means that the frame will be played whenever all currently
 *       scheduled animations complete
 *
 * next: add frame to front of queue
 *       This means that the frame will be played whenever the current
 *       animation completes (the endEvent event fires)
 *
 * skip: immediately start nth animation
 */

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
  F extends AnimationFrame = LinearAnimationFrame,
  Q extends Queue<F> = SequentialQueue<F>
> {
  constructor(
    protected _animationElement: SVGAnimationElement,
    protected _Q: Q
  ) {}

  protected playNext() {
    if (this._Q.isEmpty()) {
      return;
    }
    const front = this._Q.front();
    this._Q.advance();
    if (isLinearFrame(front)) {
      setLinearAttributes(this._animationElement, front);
    } else if (isSplineFrame(front)) {
      setSplineAttributes(this._animationElement, front);
    } else {
      throw Error('bad frame: ' + JSON.stringify(front,null,2));
    }
    playNow(this._animationElement);
  }
}
