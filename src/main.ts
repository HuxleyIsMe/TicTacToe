import "./style.css";
import { PubSub, Board, Commentator, Scoreboard } from "./components/index";
import { GAME_EVENTS } from "./components/shared.types";

/**
 * Playing a game of tic tac toe using a pubsub
 */

const pubSub = new PubSub();
const regularCommentator = new Commentator("commentator");
const scoreboard = new Scoreboard("scoreboard");


/** On winning a game of tic tac toe----------------------------------------------------------------------------    on win    */

pubSub.subscribe(GAME_EVENTS.ON_WIN, (winner) =>
  regularCommentator.onWin(winner)
);

pubSub.subscribe(GAME_EVENTS.ON_WIN, (winner) => scoreboard.onWin(winner));

/** On starting a game of tic tac toe----------------------------------------------------------------------------    on start    */

pubSub.subscribe(GAME_EVENTS.ON_START, (turn) =>
  regularCommentator.onStart(turn)
);

pubSub.subscribe(GAME_EVENTS.ON_START, () => scoreboard.onStart());

/** On next turn a game of tic tac toe----------------------------------------------------------------------------    on next turn    */

pubSub.subscribe(GAME_EVENTS.ON_NEXT_TURN, (turn) =>
  regularCommentator.onNextTurn(turn)
);

/** On drawing a game of tic tac toe----------------------------------------------------------------------------    on draw        */

pubSub.subscribe(GAME_EVENTS.ON_DRAW, () => regularCommentator.onDraw());


/** Setting up our Game of tic tac toe----------------------------------------------------------------------------   setup    */

const ticTacToe = new Board("#app").withPubSub(pubSub);

ticTacToe.start();
