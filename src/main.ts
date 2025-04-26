import "./style.css";
import { PubSub, Board, Commentator, Scoreboard } from "./components/index";

const pubSub = new PubSub();
const regularCommentator = new Commentator("commentator");
const scoreboard = new Scoreboard("scoreboard");

pubSub.subscribe("ON_WIN", (winner) => regularCommentator.onWin(winner));

pubSub.subscribe("ON_WIN", (winner) => scoreboard.onWin(winner));

pubSub.subscribe("ON_START", (turn) => regularCommentator.onStart(turn));

pubSub.subscribe("ON_START", () => scoreboard.onStart());

pubSub.subscribe("ON_NEXT_TURN", (turn) => regularCommentator.onNextTurn(turn));

pubSub.subscribe("ON_DRAW", () => regularCommentator.onDraw());

const ticTacToe = new Board("#app").withPubSub(pubSub);

ticTacToe.start();
