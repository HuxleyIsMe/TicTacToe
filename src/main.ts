import "./style.css";
import "./components/Board/board.css";
import "./components/Commentator/commentator.css";
import "./components/ScoreBoard/scoreboard.css";
import { PubSub } from "./components/PubSub/PubSub";
import { Board } from "./components/Board/board.js";
import { Commentator } from "./components/Commentator/commentator";
import { Scoreboard } from "./components/ScoreBoard/scoreboard";

const pubSub = new PubSub();
const regularCommentator = new Commentator("commentator");
const scoreboard = new Scoreboard("scoreboard");

pubSub.subscribe("ON_WIN", (winner) => {
  regularCommentator.onWin(winner);
});

pubSub.subscribe("ON_WIN", (winner) => {
  scoreboard.onWin(winner);
});

pubSub.subscribe("ON_START", (turn) => {
  regularCommentator.onStart(turn);
});

pubSub.subscribe("ON_START", (winner) => {
  scoreboard.onStart(winner);
});

pubSub.subscribe("ON_NEXT_TURN", (turn) => {
  regularCommentator.onNextTurn(turn);
});

pubSub.subscribe("ON_DRAW", () => {
  regularCommentator.onDraw();
});

const ticTacToe = new Board("#app").withPubSub(pubSub);

ticTacToe.start();
