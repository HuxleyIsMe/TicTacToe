import type { Player } from "../shared.types";

export class Commentator {
  root: string;
  constructor(root: string) {
    this.root = root;
  }

  onStart(turn: Player) {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} starts!</span>`;
  }

  onWin(turn: Player) {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} Wins!</span>`;
  }

  onNextTurn(turn: Player) {
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
