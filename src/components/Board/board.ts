type CELLS = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";

export class Board {
  root: string;
  turn: string;
  hasWinner: boolean;
  gameGrid: string[];
  cells: CELLS[];
  cellToGridMap: Record<CELLS, number>;
  gameOver: boolean;
  turns: number;
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
  }

  start(): void {
    document.querySelector<HTMLDivElement>(this.root)!.innerHTML = `
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
`;
    this.attachListeners();
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

  handleClick(element: HTMLElement): void {
    if (element.innerHTML) {
      // contents already
      return;
    }
    element.innerHTML = `<span>${this.turn}</span>`;

    this.gameGrid[this.cellToGridMap[element.id as CELLS]] = this.turn;
    this.checkForWinner();
    this.turns++;
    if (this.turns === 8) {
      this.gameOver = true;
    }
    this.turn = this.turn === "X" ? "O" : "X";
  }

  attachListeners(): void {
    this.cells.forEach((cell) => {
      document
        .querySelector(`#${cell}`)!
        .addEventListener("click", (e) =>
          this.handleClick(e.currentTarget as HTMLElement)
        );
    });
  }
}
