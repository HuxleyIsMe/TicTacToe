import { generateBoardFromMatrix } from "./board.ts";

describe("generateBoardFromMatrix", () => {
  beforeEach(() => {
    // Set up the DOM with a container element
    document.body.innerHTML = `<div id="root"></div>`;
  });

  it("renders a 3x3 board into the root element", () => {
    generateBoardFromMatrix("#root");

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
});
