type COMMENTATOR_EVENTS = "ON_START" | "ON_WIN" | "ON_NEXT_TURN" | "ON_DRAW";
type CallbackType = (data?: any) => {};

export class Commentator {
  events: Record<COMMENTATOR_EVENTS, CallbackType[]>;
  root: string;
  constructor(root: string) {
    this.root = root;
    this.events = {} as Record<COMMENTATOR_EVENTS, CallbackType[]>;
  }

  onStart(turn) {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} starts!</span>`;
  }

  onWin(turn) {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} Wins!</span>`;
  }

  onNextTurn(turn) {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} turn!</span>`;
  }

  onDraw() {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">Its a draw!</span>`;
  }
}
