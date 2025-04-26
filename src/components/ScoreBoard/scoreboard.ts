import type { Player } from "../shared.types";
import style from "./scoreboard.module.css";

export class Scoreboard {
  root: string;
  constructor(root: string) {
    this.root = root;
  }

  getScoresFromCookie(): Record<Player, number> {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("ticTacToe="));

    if (!cookie) return { X: 0, O: 0 };

    const value = cookie.split("=")[1];
    const match = value.match(/^p1(\d+)p2(\d+)$/);

    if (!match) return { X: 0, O: 0 };

    return {
      X: parseInt(match[1], 10),
      O: parseInt(match[2], 10),
    };
  }

  resetScores() {
    document.cookie =
      "ticTacToe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.getElementById(this.root)!.innerHTML = `
      <div class="${style.scoreboard}">
        <span aria-live="polite">Player X:  0</span>
        <span aria-live="polite">Player O: 0</span>
        <button id='resetScores'>Reset scores</button>
     `;
  }

  onStart() {
    const scores = this.getScoresFromCookie();

    document.getElementById(this.root)!.innerHTML = `
    <div class="${style.scoreboard}">
      <span aria-live="polite">Player X:  ${scores.X}</span>
      <span aria-live="polite">Player O: ${scores.O}</span>
      <button id='resetScores'>Reset scores</button>
    </div>`;

    document.getElementById("resetScores")?.addEventListener("click", () => {
      this.resetScores();
    });
  }

  onWin(turn: Player) {
    function setScoresToCookie(scores: Record<Player, number>) {
      const cookieValue = `p1${scores.X}p2${scores.O}`;
      document.cookie = `ticTacToe=${cookieValue}; path=/; max-age=31536000`; // 1 year
    }
    const scores = this.getScoresFromCookie();
    scores[turn]++;
    setScoresToCookie(scores);
    this.onStart();
  }
}
