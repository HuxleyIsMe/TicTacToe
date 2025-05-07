import { Player, CELLS, GAME_EVENTS } from "../../types";
import type { PubSubType } from "../index";
import {TicTacToeBoardHandler, TicTacToeBoardHandlerReturnType } from "./utils";
import {UIHandler, UIHandlerReturnType} from "../../sharedUtils/UIHelper"

const MAX_GAME_TURNS = 9;

/**
 * This is our Tic Tac Toe Board class it will generate us a game of tic tac toe thats
 * playable for the whole family
 */
export class Board {
  Board: TicTacToeBoardHandlerReturnType;
  BoardUI: UIHandlerReturnType;
  cells: CELLS[];
  hasWinner: boolean;
  gameGrid: string[];
  root: string;
  turn: Player;
  turns: number;


  pubsub?: PubSubType;

  constructor(root: string) {
    this.Board = TicTacToeBoardHandler();
    this.BoardUI = UIHandler();
    this.hasWinner = false;
    this.gameGrid = new Array(9).fill("");
    this.cells = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
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
    this.Board.renderBoard(this.root);
    this.attachListeners();
    if (this.pubsub) {
      this.pubsub.publish(GAME_EVENTS.ON_START, { turn: this.turn });
    }
  }

  reset() {
    this.BoardUI.removeAllEventListeners();
    this.gameGrid = new Array(9).fill("");
    this.turns = 0;
    this.hasWinner = false;
    this.start();
  }

  checkForWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombinations.some(([a, b, c]) => {
      if (
        this.gameGrid[a] === this.gameGrid[b] &&
        this.gameGrid[b] === this.gameGrid[c] &&
        this.gameGrid[a]
      ) {
        [a, b, c].forEach((tile) => {
          this.Board.markWinningTile(this.cells[tile]);
        });
        this.hasWinner = true;
      }
    });
  }

  handleClick(element: HTMLElement): void {
    this.turns++;
    this.Board.markTile(element, this.turn);
    this.gameGrid[this.cells.indexOf(element.id as CELLS)] = this.turn;
    this.checkForWinner();

    if (this.hasWinner) {
      this.pubsub?.publish(GAME_EVENTS.ON_WIN, {turn: this.turn});
      this.BoardUI.removeAllEventListeners();
      return;
    }

    if (this.turns === MAX_GAME_TURNS) {
      this.pubsub?.publish(GAME_EVENTS.ON_DRAW);
      this.BoardUI.removeAllEventListeners();
      return;
    }

    this.turn = this.turn === "X" ? "O" : "X";
    this.pubsub?.publish(GAME_EVENTS.ON_NEXT_TURN, {turn: this.turn});
    this.BoardUI.removeEventListener(element.id as CELLS);
  }

  attachListeners(): void {
    this.BoardUI.attachResetListener(this.reset.bind(this));
    this.cells.forEach((cell) => {
      let boundHandler = this.handleClick.bind(this);
      this.BoardUI.attachListeners(cell, boundHandler);
    });
  }
}
