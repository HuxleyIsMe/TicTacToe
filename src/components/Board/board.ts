import type { Player } from "../shared.types";
import styles from "./board.module.css";

type CELLS = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";

/**
 * This is our Tic Tac Toe Board class it will generate us a game of tic tac toe thats
 * playable for the whole family
 */
export class Board {
  root: string;
  turn: Player;
  hasWinner: boolean;
  gameGrid: string[];
  cells: CELLS[];
  cellToGridMap: Record<CELLS, number>;
  gameOver: boolean;
  turns: number;
  cellToListeners: Record<CELLS, AbortController>;
  pubsub?: any;

  constructor(root: string) {
    this.root = root;
    this.turn = "X";
    this.turns = 0;
    this.hasWinner = false;
    this.gameOver = false;
    this.gameGrid = new Array(9).fill("");
    this.cells = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    this.cellToGridMap = {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
      g: 6,
      h: 7,
      i: 8,
    };
    this.cellToListeners = {} as Record<CELLS, AbortController>;
    this.pubsub = undefined;
  }

  withPubSub(pubsub) {
    this.pubsub = pubsub;
    return this;
  }

  randomPlayerStart() {
    if (Math.random() > 0.5) {
      this.turn = "X";
    } else {
      this.turn = "O";
    }
  }

  renderBoard() {
    document.querySelector<HTMLDivElement>(this.root)!.innerHTML = `
    <div class="${styles.row} ${styles["border-bottom"]}" data-name="row" >
      <div
        data-name="col"
        id="a"
        class="${styles.col}"
        tabindex="1"
        aria-label="top left square empty"
        data-hover-text="pick me im number 1"
      ></div>
      <div
        data-name="col"
        id="b"
        class="${styles.col} ${styles["col-mid"]}"
        tabindex="2"
        aria-label="top middle square empty"
        data-hover-text="second the best"
      ></div>
      <div
        data-name="col"
        id="c"
        class="${styles.col}"
        tabindex="3"
        aria-label="top right square empty"
        data-hover-text="your foe is quaking"
      ></div>
    </div>
    <div class="${styles.row}" data-name="row">
      <div
        data-name="col"
        id="d"
        class="${styles.col}"
        tabindex="4"
        aria-label="middle left square empty"
        data-hover-text="such art this game"
      ></div>
      <div
        data-name="col"
        id="e"
        class="${styles.col} ${styles["col-mid"]}"
        tabindex="5"
        aria-label="middle middle square empty"
        data-hover-text="you will always win"
      ></div>
      <div
        data-name="col"
        id="f"
        class="${styles.col}"
        tabindex="6"
        aria-label="middle right square empty"
        data-hover-text="neutral good"
      ></div>
    </div>
    <div class="${styles.row} ${styles["border-top"]}" data-name="row">
      <div
        data-name="col"
        id="g"
        class="${styles.col}"
        tabindex="7"
        aria-label="bottom left square empty"
        data-hover-text="pick me"
      ></div>
      <div
        data-name="col"
        id="h"
        class="${styles.col} ${styles["col-mid"]}"
        tabindex="8"
        aria-label="bottom middle square empty"
        data-hover-text="no me"
      ></div>
      <div
        data-name="col"
        id="i"
        class="${styles.col}"
        tabindex="9"
        aria-label="bottom right square empty"
        data-hover-text="pick the other one"
      ></div>
    </div>
    <button class="${styles.restartButton}" id="restartButton">Restart</button>
`;
  }

  teardown() {
    Object.values(this.cellToListeners).forEach((c) => c.abort());
  }

  start(): void {
    this.randomPlayerStart();
    this.renderBoard();
    this.attachListeners();
    if (this.pubsub) {
      this.pubsub.publish("ON_START", this.turn);
    }
  }

  reset() {
    this.teardown();
    this.gameGrid = new Array(9).fill("");
    this.turns = 0;
    this.hasWinner = false;
    this.gameOver = false;
    this.start();
  }

  markWinningTiles(winningTiles: number[]) {
    winningTiles.forEach((tile) => {
      let cellId = this.cells[tile];
      let element = document.getElementById(cellId);
      element?.setAttribute("data-status", "winning");
      element?.classList.add(styles.winningTile);
    });
  }

  checkForWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    lines.some(([a, b, c]) => {
      if (
        this.gameGrid[a] === this.gameGrid[b] &&
        this.gameGrid[b] === this.gameGrid[c] &&
        this.gameGrid[a]
      ) {
        this.markWinningTiles([a, b, c]);
        this.hasWinner = true;
        return true;
      }
    });
  }

  markTile(element: HTMLElement) {
    element.style.background = this.turn === "X" ? "yellow" : "blue";
    element.style.color = this.turn === "X" ? "black" : "white";
    element.innerHTML = `<span>${this.turn}</span>`;
    this.gameGrid[this.cellToGridMap[element.id as CELLS]] = this.turn;
  }

  handleClick(element: HTMLElement): void {
    this.turns++;
    this.markTile(element);
    this.checkForWinner();

    // If there is a winner publish that an mark the game as over
    if (this.hasWinner) {
      this.gameOver = true;
      if (this.pubsub) {
        this.pubsub.publish("ON_WIN", this.turn);
      }
      this.teardown();

      return;
    }

    if (this.turns === 9) {
      this.gameOver = true;

      if (this.pubsub) {
        this.pubsub.publish("ON_DRAW");
      }
      this.teardown();

      return;
    }

    this.turn = this.turn === "X" ? "O" : "X";
    if (this.pubsub) {
      this.pubsub.publish("ON_NEXT_TURN", this.turn);
    }
    this.removeEventListener(element.id as CELLS);
  }

  removeEventListener(id: CELLS) {
    this.cellToListeners[id].abort();
  }

  attachListeners(): void {
    // Attaches event listner to reset the board
    document
      .querySelector(`#restartButton`)!
      .addEventListener("click", () => this.reset());
    //  event listner to make each div clickable
    this.cells.forEach((cell) => {
      const controller = new AbortController();
      this.cellToListeners[cell] = controller;
      document
        .querySelector(`#${cell}`)!
        .addEventListener(
          "click",
          (e) => this.handleClick(e.currentTarget as HTMLElement),
          { signal: controller.signal }
        );
      // Attaches event listner to make each div clickable through accessible tabs
      document.querySelector(`#${cell}`)!.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            this.handleClick(e.currentTarget as HTMLElement);
          }
        },
        { signal: controller.signal }
      );
    });
  }
}
