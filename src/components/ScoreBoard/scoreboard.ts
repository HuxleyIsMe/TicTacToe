/***
 *
 *
 * Take in a number of players
 *
 *
 * how do you want the interaction to look ?
 *
 * Player 1: x
 * Player 2: O
 *
 * on Wine
 */

type Player = "X" | "O";
type COMMENTATOR_EVENTS = "ON_WIN" | "ON_START";
type CallbackType = (data?: any) => {};

export class Scoreboard {
  events: Record<COMMENTATOR_EVENTS, CallbackType[]>;
  root: string;
  constructor(root: string) {
    this.root = root;
    this.events = {} as Record<COMMENTATOR_EVENTS, CallbackType[]>;
  }

  subscribe(event: COMMENTATOR_EVENTS, callback: CallbackType) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  publish(event: COMMENTATOR_EVENTS, data: any) {
    if (!this.events[event]) return;
    for (const callback of this.events[event]) {
      callback(data);
    }
  }

  clear() {
    this.events = {} as Record<COMMENTATOR_EVENTS, CallbackType[]>;
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
      <span aria-live="polite">Player X:  0</span>
      <span aria-live="polite">Player O: 0</span>
      <button id='resetScores'>Reset scores</button>`;
  }

  onStart(turn: Player) {
    const scores = this.getScoresFromCookie();

    console.log(this.root);

    document.getElementById(this.root)!.innerHTML = `
    <span aria-live="polite">Player X:  ${scores.X}</span>
    <span aria-live="polite">Player O: ${scores.O}</span>
    <button id='resetScores'>Reset scores</button>`;

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
    this.onStart(turn); // update display
  }
}
