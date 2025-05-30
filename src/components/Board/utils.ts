import styles from "./board.module.css";


export interface TicTacToeBoardHandlerReturnType {
  markTile: (tile: HTMLElement, turn: string) => void,
  markWinningTile: (id: string) => void,
  renderBoard: (root: string) => void,
}

/**
 * A more specific class to enable us to draw a TicTacToe board,
 * to change tiles as decided on click.
 */
export const TicTacToeBoardHandler = () : TicTacToeBoardHandlerReturnType  => {

  const markTile = (tile: HTMLElement, turn: string) => {
    tile.style.background = turn === "X" ? "yellow" : "blue";
    tile.style.color = turn === "X" ? "black" : "white";
    tile.innerHTML = `<span>${turn}</span>`;
  };

  const renderBoard = (root: string) => {
    document.querySelector<HTMLDivElement>(root)!.innerHTML = `
          <div class="${styles.row} ${styles["border-bottom"]}" data-name="row" >
            <button
              data-name="col"
              role="button"
              id="a"
              class="${styles.col}"
              aria-label="top left square empty"
              data-hover-text="pick me im number 1"
            ></button>
            <button
              role="button"
              data-name="col"
              id="b"
              class="${styles.col} ${styles["col-mid"]}"
              aria-label="top middle square empty"
              data-hover-text="second the best"
            ></button>
            <button
              role="button"
              data-name="col"
              id="c"
              class="${styles.col}"
              aria-label="top right square empty"
              data-hover-text="your foe is quaking"
            ></button>
          </div>
          <div class="${styles.row}" data-name="row">
            <button
              role="button"
              data-name="col"
              id="d"
              class="${styles.col}"
              aria-label="middle left square empty"
              data-hover-text="such art this game"
            ></button>
            <button
              role="button"
              data-name="col"
              id="e"
              class="${styles.col} ${styles["col-mid"]}"
              aria-label="middle middle square empty"
              data-hover-text="you will always win"
            ></button>
            <button
              role="button"
              data-name="col"
              id="f"
              class="${styles.col}"
              aria-label="middle right square empty"
              data-hover-text="neutral good"
            ></button>
          </div>
          <div class="${styles.row} ${styles["border-top"]}" data-name="row">
            <button
              role="button"
              data-name="col"
              id="g"
              class="${styles.col}"
              aria-label="bottom left square empty"
              data-hover-text="pick me"
            ></button>
            <button
              role="button"
              data-name="col"
              id="h"
              class="${styles.col} ${styles["col-mid"]}"
              aria-label="bottom middle square empty"
              data-hover-text="no me"
            ></button>
            <button
              role="button"
              data-name="col"
              id="i"
              class="${styles.col}"
              aria-label="bottom right square empty"
              data-hover-text="pick the other one"
            ></button>
          </div>
          <button class="btn btn-outline-light btn-sm mt-3" type="button" id="restartButton">Restart</button>
      `;
  };

  const markWinningTile = (cellId: string) => {
    let element = document.getElementById(cellId);
    element?.setAttribute("data-status", "winning");
    element?.classList.add(styles.winningTile);
  };

  return {
    renderBoard,
    markWinningTile,
    markTile,
  };
};
