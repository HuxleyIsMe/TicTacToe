import { Board } from "./board";

describe("Board", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
    jest.spyOn(Math, "random").mockReturnValue(0.6); // stubbing math random so we start on X
    jest.clearAllMocks();
  });

  describe("onStart", () => {
    it("will randomly select a player to start onstart", () => {
      const myBoard = new Board("#root");
      expect(myBoard.root).toBe("#root");

      jest
        .spyOn(Math, "random")
        .mockReturnValueOnce(0.6)
        .mockReturnValueOnce(0.3);
      myBoard.start();
      expect(myBoard.turn).toBe("X");

      myBoard.start();
      expect(myBoard.turn).toBe("O");
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
        throw new Error("couldn't find root node for test");
      }
      expect(root.querySelectorAll(`[data-name*="row"]`).length).toBe(3); // 3 rows
      expect(root.querySelectorAll(`[data-name*="col"]`).length).toBe(9); // 3 cols per row * 3 rows
    });

    it("can attach event listeners to each cell on the grid, on click they should render text", () => {
      const root = document.querySelector("#root");
      const myBoard = new Board("#root");
      const spy = jest.spyOn(myBoard, "attachListeners");

      expect(spy).not.toHaveBeenCalled();
      myBoard.start();
      expect(spy).toHaveBeenCalled();

      if (!root) {
        throw new Error("couldn't find root node for test");
      }

      expect(myBoard.attachListeners).toHaveBeenCalled();
      const secondCell = root.querySelector("#b");

      // @ts-ignore
      secondCell.click();

      expect(secondCell?.innerHTML).toBe("<span>X</span>");
    });
  });

  describe("handleClick", () => {
    it("will place either a X or O in the cell dependent on turn", () => {
      const root = document.querySelector("#root");
      const myBoard = new Board("#root");

      myBoard.start();

      if (!root) {
        throw new Error("couldn't find root node for test");
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
        throw new Error("couldn't find root node for test");
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
        throw new Error("couldn't find root node for test");
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
    it("is able to detect when a player has won", () => {
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

      let winningTiles = root.querySelectorAll('[data-status="winning"]');

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

      expect(myBoard.hasWinner).toBe(false);
    });
  });
});
