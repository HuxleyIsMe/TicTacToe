import { Commentator } from "./commentator";

describe("Commentator", () => {
  let commentator: Commentator;

  beforeEach(() => {
    document.body.innerHTML = `<div id="commentary"></div>`;
    commentator = new Commentator("commentary");
  });

  describe("subscribe/publish", () => {
    it("calls subscribed callbacks on publish", () => {
      const mockFn = jest.fn();
      commentator.subscribe("ON_WIN", mockFn);
      commentator.publish("ON_WIN", "X");

      expect(mockFn).toHaveBeenCalledWith("X");
    });

    it("does not call unsubscribed callbacks", () => {
      const mockFn = jest.fn();
      const unsubscribe = commentator.subscribe("ON_WIN", mockFn);
      unsubscribe(); // remove it
      commentator.publish("ON_WIN", "X");

      expect(mockFn).not.toHaveBeenCalled();
    });

    it("handles multiple callbacks for same event", () => {
      const mock1 = jest.fn();
      const mock2 = jest.fn();
      commentator.subscribe("ON_START", mock1);
      commentator.subscribe("ON_START", mock2);
      commentator.publish("ON_START", "X");

      expect(mock1).toHaveBeenCalledWith("X");
      expect(mock2).toHaveBeenCalledWith("X");
    });

    it("does nothing if event has no subscribers", () => {
      expect(() => {
        commentator.publish("ON_NEXT_TURN", "O");
      }).not.toThrow();
    });

    it("clears all subscriptions with clear", () => {
      const mock = jest.fn();
      commentator.subscribe("ON_WIN", mock);
      commentator.clear();
      commentator.publish("ON_WIN", "X");

      expect(mock).not.toHaveBeenCalled();
    });
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
