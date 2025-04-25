import "./style.css";
import "./components/Board/board.css";
import "./components/Commentator/commentator.css";
import { Board } from "./components/Board/board.js";

const ticTacToe = new Board("#app");

ticTacToe.start();
