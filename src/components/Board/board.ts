export class Board {
  root: string;
  turn: string;
  isWinner: boolean;
  constructor(root: string) {
    this.root = root;
    this.turn = "X";
    this.isWinner = false;
    this.gameGrid = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
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

  start() {
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

  checkForWinner() {}

  handleClick(id) {
    let cell = document.querySelector(id);
    if (cell.innerHTML) {
      // contents already
      return;
    }
    cell.innerHTML = `<span>${this.turn}</span>`;

    this.gameGrid[this.cellToGridMap[id.slice(1)]] = this.turn;
    this.turn = this.turn === "X" ? "O" : "X";
  }

  attachListeners() {
    let cells = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

    cells.forEach((cell) => {
      document
        .querySelector(`#${cell}`)!
        .addEventListener("click", () => this.handleClick(`#${cell}`));
    });
  }
}
