import type { Player } from "../../types"

export class Commentator {
  root: string;
  constructor(root: string) {
    this.root = root;
  }

  checkThereIsARoot() {
    if (!document.getElementById(this.root)) {
      throw new Error("no root element for the commentator");
    }

  }

  onStart(turn: Player) {
    this.checkThereIsARoot();
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} starts!</span>`;
  }

  onWin(turn: Player) {
    this.checkThereIsARoot();
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} Wins!</span>`;
  }

  onNextTurn(turn: Player) {
    this.checkThereIsARoot();
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">${turn} turn!</span>`;
  }

  onDraw() {
    this.checkThereIsARoot();
    document.getElementById(
      this.root
    )!.innerHTML = `<span aria-live="polite">Its a draw!</span>`;
  }
}
