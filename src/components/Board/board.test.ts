import { Board } from "./board";

describe("Board", () => {
  beforeEach(() => {
    // Set up the DOM with a container element
    document.body.innerHTML = `<div id="root"></div>`;
    jest.clearAllMocks();
  });

  it("takes a string of a root html element to attach the board to", () => {
    const myBoard = new Board("#root");
    expect(myBoard.root).toBe("#root");
  });

  it("can attach a board to the element", () => {
    const myBoard = new Board("#root");
    myBoard.start();

    const root = document.querySelector("#root");
    if (!root) {
      throw new Error("couldnt find root node for test");
    }
    expect(root.querySelectorAll(".row").length).toBe(3); // 3 rows
    expect(root.querySelectorAll(".col").length).toBe(9); // 3 cols per row * 3 rows

    // You can check specific classes too
    expect(root.querySelectorAll(".border-bottom").length).toBe(1);
    expect(root.querySelectorAll(".border-top").length).toBe(1);
    expect(root.querySelectorAll(".col-mid").length).toBe(3);
  });

  it("can attach event listners to each cell on the grid, on click they should render text", () => {
    const root = document.querySelector("#root");
    const myBoard = new Board("#root");
    const spy = jest.spyOn(myBoard, "attachListeners");

    expect(spy).not.toHaveBeenCalled();
    myBoard.start();
    expect(spy).toHaveBeenCalled();

    if (!root) {
      throw new Error("couldnt find root node for test");
    }

    expect(myBoard.attachListeners).toHaveBeenCalled();
    const secondCell = root.querySelector("#b");

    // @ts-ignore
    secondCell.click();

    expect(secondCell?.innerHTML).toBe("<span>X</span>");
  });

  describe("handleClick", () => {
    it("will place either a X or O in the cell dependent on turn", () => {
      const root = document.querySelector("#root");
      const myBoard = new Board("#root");

      myBoard.start();

      if (!root) {
        throw new Error("couldnt find root node for test");
      }

      const firstCell = root.querySelector("#b");

      // @ts-ignore
      firstCell.click();

      expect(firstCell?.innerHTML).toBe("<span>X</span>");

      const secondCell = root.querySelector("#c");
      // @ts-ignore
      secondCell.click();

      expect(secondCell?.innerHTML).toBe("<span>O</span>");
    });

    it("will not change the contents of a cell after first click", () => {
      const root = document.querySelector("#root");
      const myBoard = new Board("#root");

      myBoard.start();

      if (!root) {
        throw new Error("couldnt find root node for test");
      }

      const firstCell = root.querySelector("#b");

      // @ts-ignore
      firstCell.click();

      expect(firstCell?.innerHTML).toBe("<span>X</span>");

      // @ts-ignore
      firstCell.click();

      expect(firstCell?.innerHTML).toBe("<span>X</span>");
    });

    it("will update the games grid with the users token on clcik", () => {
      const root = document.querySelector("#root");
      const myBoard = new Board("#root");

      myBoard.start();

      if (!root) {
        throw new Error("couldnt find root node for test");
      }

      const firstCell = root.querySelector("#b");

      // @ts-ignore
      firstCell.click();

      expect(firstCell?.innerHTML).toBe("<span>X</span>");
      expect(myBoard.gameGrid).toMatchInlineSnapshot(`
[
  "",
  "X",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]
`);

      const secondCell = root.querySelector("#f");
      // @ts-ignore
      secondCell.click();

      expect(secondCell?.innerHTML).toBe("<span>O</span>");

      expect(myBoard.gameGrid).toMatchInlineSnapshot(`
[
  "",
  "X",
  "",
  "",
  "",
  "O",
  "",
  "",
  "",
]
`);
    });
  });

  describe("checkForWinner", () => {
    it.only("is able to detect when a player has won", () => {
      const root = document.querySelector("#root");
      const myBoard = new Board("#root");

      myBoard.start();

      if (!root) {
        throw new Error("couldnt find root node for test");
      }

      //@ts-ignore
      root.querySelector("#a").click();
      //@ts-ignore
      root.querySelector("#b").click();
      //@ts-ignore
      root.querySelector("#d").click();
      //@ts-ignore
      root.querySelector("#c").click();
      //@ts-ignore
      root.querySelector("#g").click();

      expect(myBoard.hasWinner).toBe(true);
      expect(myBoard.gameOver).toBe(true);

      let winningTiles = root.getElementsByClassName("winningTile");

      expect(winningTiles.length).toBe(3);
    });

    it("is able to detect when no player has won", () => {
      const root = document.querySelector("#root");
      const myBoard = new Board("#root");

      myBoard.start();

      if (!root) {
        throw new Error("couldnt find root node for test");
      }

      //@ts-ignore
      root.querySelector("#a").click();
      //@ts-ignore
      root.querySelector("#b").click();
      //@ts-ignore
      root.querySelector("#c").click();
      //@ts-ignore
      root.querySelector("#d").click();
      //@ts-ignore
      root.querySelector("#f").click();
      //@ts-ignore
      root.querySelector("#g").click();
      //@ts-ignore
      root.querySelector("#h").click();
      //@ts-ignore
      root.querySelector("#i").click();
      //@ts-ignore
      root.querySelector("#e").click();

      console.log(myBoard.gameGrid);
      expect(myBoard.hasWinner).toBe(false);
      expect(myBoard.gameOver).toBe(true);
    });
  });
});
