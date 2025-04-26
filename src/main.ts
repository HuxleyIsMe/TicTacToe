import "./style.css";
import { PubSub, Board, Commentator, Scoreboard } from "./components/index";
import { GAME_EVENTS } from "./components/shared.types";

const pubSub = new PubSub();
const regularCommentator = new Commentator("commentator");
const scoreboard = new Scoreboard("scoreboard");

pubSub.subscribe(GAME_EVENTS.ON_WIN, (winner) =>
  regularCommentator.onWin(winner)
);

pubSub.subscribe(GAME_EVENTS.ON_WIN, (winner) => scoreboard.onWin(winner));

pubSub.subscribe(GAME_EVENTS.ON_START, (turn) =>
  regularCommentator.onStart(turn)
);

pubSub.subscribe(GAME_EVENTS.ON_START, () => scoreboard.onStart());

pubSub.subscribe(GAME_EVENTS.ON_NEXT_TURN, (turn) =>
  regularCommentator.onNextTurn(turn)
);

pubSub.subscribe(GAME_EVENTS.ON_DRAW, () => regularCommentator.onDraw());

const ticTacToe = new Board("#app").withPubSub(pubSub);

ticTacToe.start();
