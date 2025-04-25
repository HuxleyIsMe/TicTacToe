type CELLS = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";
type Player = "X" | "O";

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
  commentator?: any;
  cellToListeners: Record<CELLS, AbortController>;

  constructor(root: string) {
    this.root = root;
    this.turn = "X";
    this.commentator = undefined;
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
  }

  withCommentator(commentator) {
    this.commentator = commentator;
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
    <div class="row border-bottom">
      <div
        id="a"
        class="col"
        tabindex="1"
        aria-label="top left square empty"
        data-hover-text="pick me im number 1"
      ></div>
      <div
        id="b"
        class="col col-mid"
        tabindex="2"
        aria-label="top middle square empty"
        data-hover-text="second the best"
      ></div>
      <div
        id="c"
        class="col"
        tabindex="3"
        aria-label="top right square empty"
        data-hover-text="your foe is quaking"
      ></div>
    </div>
    <div class="row">
      <div
        id="d"
        class="col"
        tabindex="4"
        aria-label="middle left square empty"
        data-hover-text="such art this game"
      ></div>
      <div
        id="e"
        class="col col-mid"
        tabindex="5"
        aria-label="middle middle square empty"
        data-hover-text="you will always win"
      ></div>
      <div
        id="f"
        class="col"
        tabindex="6"
        aria-label="middle right square empty"
        data-hover-text="neutral good"
      ></div>
    </div>
    <div class="row border-top">
      <div
        id="g"
        class="col"
        tabindex="7"
        aria-label="bottom left square empty"
        data-hover-text="pick me"
      ></div>
      <div
        id="h"
        class="col col-mid"
        tabindex="8"
        aria-label="bottom middle square empty"
        data-hover-text="no me"
      ></div>
      <div
        id="i"
        class="col"
        tabindex="9"
        aria-label="bottom right square empty"
        data-hover-text="pick the other one"
      ></div>
    </div>
    <button id="restartButton">Restart</button>
`;
  }

  start(): void {
    this.randomPlayerStart();
    this.renderBoard();
    this.attachListeners();
    if (this.commentator) {
      this.commentator.publish("ON_START", this.turn);
    }
  }

  reset() {
    Object.values(this.cellToListeners).forEach((c) => c.abort());
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

      element?.classList.add("winningTile");
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
        this.gameOver = true;
        Object.values(this.cellToListeners).forEach((c) => c.abort());
        if (this.commentator) {
          this.commentator.publish("ON_WIN", this.turn);
        }
        return true;
      }
    });
  }

  handleTurn(element: HTMLElement): void {
    element.style.background = this.turn === "X" ? "yellow" : "blue";
    element.style.color = this.turn === "X" ? "black" : "white";
    element.innerHTML = `<span>${this.turn}</span>`;
    this.gameGrid[this.cellToGridMap[element.id as CELLS]] = this.turn;
    this.turns++;
    console.log(this.turns);
    if (this.turns === 9 || this.hasWinner) {
      this.gameOver = true;

      if (this.commentator) {
        this.commentator.publish("ON_DRAW");
      }

      return;
    }
    this.turn = this.turn === "X" ? "O" : "X";
    if (this.commentator) {
      this.commentator.publish("ON_NEXT_TURN", this.turn);
    }
  }

  handleClick(element: HTMLElement): void {
    if (element.innerHTML) {
      // contents already
      return;
    }
    this.handleTurn(element);
    this.checkForWinner();
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
