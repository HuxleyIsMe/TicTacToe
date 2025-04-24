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
      const spy = jest.spyOn(myBoard, "attachListeners");

      expect(spy).not.toHaveBeenCalled();
      myBoard.start();
      expect(spy).toHaveBeenCalled();

      if (!root) {
        throw new Error("couldnt find root node for test");
      }

      expect(myBoard.attachListeners).toHaveBeenCalled();
      const firstCell = root.querySelector("#b");

      // @ts-ignore
      firstCell.click();

      expect(firstCell?.innerHTML).toBe("<span>X</span>");

      const secondCell = root.querySelector("#c");
      // @ts-ignore
      secondCell.click();

      expect(secondCell?.innerHTML).toBe("<span>O</span>");
    });

    it.todo("will remove the event listener makeing the cell unclickable");
  });
});
