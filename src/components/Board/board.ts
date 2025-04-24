type CELLS = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";
type Player = "X" | "O";

/**
 * This is our Tic Tac Toe Board class it will generate us a game of tic tac toe thats
 * playable for the whole family
 */
export class Board {
  private root: string;
  private turn: Player;
  private hasWinner: boolean;
  private gameGrid: string[];
  private cells: CELLS[];
  private cellToGridMap: Record<CELLS, number>;
  private gameOver: boolean;
  private turns: number;
  private cellToListeners: Record<CELLS, AbortController>;

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
  }

  renderBoard() {
    document.querySelector<HTMLDivElement>(this.root)!.innerHTML = `
    <div id='commentator'></div>
    <div class='row border-bottom'>
        <div id='a' class='col'  data-hover-text="pick me im number 1"></div>
        <div id='b' class='col col-mid' data-hover-text="second the best"></div>
        <div id='c' class='col' data-hover-text="your foe is quaking"></div>
    </div>
    <div class='row'>
        <div  id='d' class='col ' data-hover-text="such art this game"></div>
        <div  id='e' class='col col-mid' data-hover-text="you will always win"></div>
        <div  id='f' class='col ' data-hover-text="neutral good"></div>
    </div>
    <div class='row border-top'>
        <div id='g' class='col' data-hover-text="pick me"></div>
        <div id='h'  class='col col-mid' data-hover-text="no me"></div>
        <div id='i'  class='col' data-hover-text="pick the other one"></div>
    </div>
    <button id='restartButton'>Restart</button>
`;
  }

  start(): void {
    this.renderBoard();
    this.attachListeners();
  }

  reset() {
    Object.values(this.cellToListeners).forEach((c) => c.abort());
    this.gameGrid = new Array(9).fill("");
    this.turns = 0;
    this.hasWinner = false;
    this.gameOver = false;
    this.start();
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
        this.hasWinner = true;
        this.gameOver = true;
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
    if (this.turns === 9 || this.hasWinner) {
      this.gameOver = true;
      console.log("game over");
    }
    this.turn = this.turn === "X" ? "O" : "X";
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
    document
      .querySelector(`#restartButton`)!
      .addEventListener("click", () => this.reset());
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
    });
  }
}
