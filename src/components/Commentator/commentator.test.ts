import { Commentator } from "./commentator";

describe("Commentator", () => {
  let commentator: Commentator;

  beforeEach(() => {
    document.body.innerHTML = `<div id="commentary"></div>`;
    commentator = new Commentator("commentary");
  });

  describe("DOM-based event methods", () => {
    it("onStart displays the starting player", () => {
      commentator.onStart("X");
      expect(document.getElementById("commentary")!.innerHTML).toBe(
        '<span aria-live="polite">X starts!</span>'
      );
    });

    it("onWin displays the winning player", () => {
      commentator.onWin("O");
      expect(document.getElementById("commentary")!.innerHTML).toBe(
        '<span aria-live="polite">O Wins!</span>'
      );
    });

    it("onNextTurn displays the player's turn", () => {
      commentator.onNextTurn("X");
      expect(document.getElementById("commentary")!.innerHTML).toBe(
        '<span aria-live="polite">X turn!</span>'
      );
    });

    it("onDraw displays the draw message", () => {
      commentator.onDraw();
      expect(document.getElementById("commentary")!.innerHTML).toBe(
        '<span aria-live="polite">Its a draw!</span>'
      );
    });

    it("throws error if root element not found", () => {
      const badCommentator = new Commentator("missing-root");

      expect(() => badCommentator.onStart("X")).toThrow(
        "no root element for the commentator"
      );
      expect(() => badCommentator.onWin("O")).toThrow();
      expect(() => badCommentator.onNextTurn("X")).toThrow();
      expect(() => badCommentator.onDraw()).toThrow();
    });
  });
});
