import "./style.css";
import "./components/Board/board.css";
import "./components/Commentator/commentator.css";
import { Board } from "./components/Board/board.js";
import { Commentator } from "./components/Commentator/commentator";

const regularCommentator = new Commentator("commentator");

regularCommentator.subscribe("ON_WIN", (winner) => {
  regularCommentator.onWin(winner);
});

regularCommentator.subscribe("ON_START", (turn) => {
  regularCommentator.onStart(turn);
});

regularCommentator.subscribe("ON_NEXT_TURN", (turn) => {
  regularCommentator.onNextTurn(turn);
});

regularCommentator.subscribe("ON_DRAW", () => {
  regularCommentator.onDraw();
});

const ticTacToe = new Board("#app").withCommentator(regularCommentator);

ticTacToe.start();
