type COMMENTATOR_EVENTS = "ON_START" | "ON_WIN" | "ON_NEXT_TURN" | "ON_DRAW";
type CallbackType = (data?: any) => {};

export class Commentator {
  events: Record<COMMENTATOR_EVENTS, CallbackType[]>;
  root: string;
  constructor(root: string) {
    this.root = root;
    this.events = {} as Record<COMMENTATOR_EVENTS, CallbackType[]>;
  }

  subscribe(event: COMMENTATOR_EVENTS, callback: CallbackType) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  publish(event: COMMENTATOR_EVENTS, data: any) {
    if (!this.events[event]) return;
    for (const callback of this.events[event]) {
      callback(data);
    }
  }

  clear() {
    this.events = {} as Record<COMMENTATOR_EVENTS, CallbackType[]>;
  }

  onStart(turn) {
    console.log("hello");
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span>${turn} starts!</span>`;
  }

  onWin(turn) {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span>${turn} Wins!</span>`;
  }

  onNextTurn(turn) {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span>${turn} turn!</span>`;
  }

  onDraw() {
    console.log("hello made it here");
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(this.root)!.innerHTML = `<span>Its a draw!</span>`;
    console.log("declared a draw");
  }
}
