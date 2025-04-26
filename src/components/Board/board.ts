import { Player, CELLS, GAME_EVENTS } from "../shared.types";
import type { PubSubType } from "../index";
import { BoardUIHandler } from "./utils";

const MAX_GAME_TURNS = 9;

/**
 * This is our Tic Tac Toe Board class it will generate us a game of tic tac toe thats
 * playable for the whole family
 */
export class Board {
  BoardUIHandler: any;
  cells: CELLS[];
  cellToGridMap: Record<CELLS, number>;
  hasWinner: boolean;
  gameGrid: string[];
  gameOver: boolean;
  root: string;
  turn: Player;
  turns: number;

  pubsub?: PubSubType;

  constructor(root: string) {
    this.BoardUIHandler = BoardUIHandler();
    this.hasWinner = false;
    this.gameOver = false;
    this.gameGrid = new Array(9).fill("");
    this.cells = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    this.cellToGridMap = {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
      g: 6,
      h: 7,
      i: 8,
    };

    this.root = root;
    this.turn = "X";
    this.turns = 0;

    this.pubsub = undefined;
  }

  withPubSub(pubsub: PubSubType) {
    this.pubsub = pubsub;
    return this;
  }

  randomPlayerStart() {
    Math.random() > 0.5 ? (this.turn = "X") : (this.turn = "O");
  }

  start(): void {
    this.randomPlayerStart();
    this.BoardUIHandler.renderBoard(this.root);
    this.attachListeners();
    if (this.pubsub) {
      this.pubsub.publish(GAME_EVENTS.ON_START, this.turn);
    }
  }

  reset() {
    this.BoardUIHandler.removeAllEventListeners();
    this.gameGrid = new Array(9).fill("");
    this.turns = 0;
    this.hasWinner = false;
    this.gameOver = false;
    this.start();
  }

  checkForWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    lines.some(([a, b, c]) => {
      if (
        this.gameGrid[a] === this.gameGrid[b] &&
        this.gameGrid[b] === this.gameGrid[c] &&
        this.gameGrid[a]
      ) {
        [a, b, c].forEach((tile) => {
          this.BoardUIHandler.markWinningTile(this.cells[tile]);
        });
        this.hasWinner = true;
      }
    });
  }

  handleClick(element: HTMLElement): void {
    this.turns++;
    this.BoardUIHandler.markTile(element, this.turn);
    this.gameGrid[this.cellToGridMap[element.id as CELLS]] = this.turn;
    this.checkForWinner();

    // If there is a winner publish that an mark the game as over
    if (this.hasWinner) {
      this.gameOver = true;
      if (this.pubsub) {
        this.pubsub.publish(GAME_EVENTS.ON_WIN, this.turn);
      }
      this.BoardUIHandler.removeAllEventListeners(element);
      return;
    }

    if (this.turns === MAX_GAME_TURNS) {
      this.gameOver = true;

      if (this.pubsub) {
        this.pubsub.publish(GAME_EVENTS.ON_DRAW);
      }
      this.BoardUIHandler.removeAllEventListeners(element);

      return;
    }

    this.turn = this.turn === "X" ? "O" : "X";
    if (this.pubsub) {
      this.pubsub.publish(GAME_EVENTS.ON_NEXT_TURN, this.turn);
    }
    this.BoardUIHandler.removeEventListener(element.id as CELLS);
  }

  attachListeners(): void {
    this.BoardUIHandler.attachResetListener(this.reset.bind(this));
    this.cells.forEach((cell) => {
      let boundHandler = this.handleClick.bind(this);
      this.BoardUIHandler.attachListener(cell, boundHandler);
    });
  }
}
