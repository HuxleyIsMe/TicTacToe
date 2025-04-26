import { Scoreboard } from "./Scoreboard";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;
  let rootElement: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = "<div id='scoreboard-root'></div>";
    document.cookie =
      "ticTacToe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    rootElement = document.getElementById("scoreboard-root")!;
    scoreboard = new Scoreboard("scoreboard-root");
  });

  describe("getScoresFromCookie", () => {
    it("returns {X: 0, O: 0} if no cookie is set", () => {
      expect(scoreboard.getScoresFromCookie()).toEqual({ X: 0, O: 0 });
    });

    it("parses scores correctly from a valid cookie", () => {
      document.cookie = "ticTacToe=p112p208";
      expect(scoreboard.getScoresFromCookie()).toEqual({ X: 12, O: 8 });
    });

    it("returns {X: 0, O: 0} if cookie format is invalid", () => {
      document.cookie = "ticTacToe=invalidcookie";
      expect(scoreboard.getScoresFromCookie()).toEqual({ X: 0, O: 0 });
    });
  });

  describe("resetScores", () => {
    it("resets the cookie and updates the DOM", () => {
      document.cookie = "ticTacToe=p105p207";
      scoreboard.resetScores();

      expect(rootElement.innerHTML).toContain("Player X:  0");
      expect(rootElement.innerHTML).toContain("Player O: 0");
      expect(rootElement.querySelector("#resetScores")).not.toBeNull();
    });
  });

  describe("onStart", () => {
    it("renders scores from the cookie", () => {
      document.cookie = "ticTacToe=p15p20";
      scoreboard.onStart();

      expect(rootElement.innerHTML).toContain("Player X:  5");
      expect(rootElement.innerHTML).toContain("Player O: 0");
      expect(rootElement.querySelector("#resetScores")).not.toBeNull();
    });

    it("attaches click event to resetScores button", () => {
      document.cookie = "ticTacToe=p1p2";
      scoreboard.onStart();

      const resetButton = rootElement.querySelector("#resetScores")!;
      // @ts-expect-error thinks it doesnt exit here
      resetButton.click();

      expect(rootElement.innerHTML).toContain("Player X:  0");
      expect(rootElement.innerHTML).toContain("Player O: 0");
    });
  });

  describe("onWin", () => {
    it("increments the correct player's score and update the DOM", () => {
      document.cookie = "ticTacToe=p13p24";
      scoreboard.onWin("X");

      expect(document.cookie).toMatch(/p14p24/);
      expect(rootElement.innerHTML).toContain("Player X:  4");
      expect(rootElement.innerHTML).toContain("Player O: 4");
    });

    it("increments the correct player's score even if no cookie is present", () => {
      scoreboard.onWin("O");

      expect(document.cookie).toMatch(/p10p21/);
      expect(rootElement.innerHTML).toContain("Player X:  0");
      expect(rootElement.innerHTML).toContain("Player O: 1");
    });
  });
});
