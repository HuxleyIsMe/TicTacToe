import styles from "./board.module.css";
import type { CELLS } from "../shared.types";

export const BoardUIHandler = () => {
  const cellToListeners = {} as Record<CELLS, AbortController>;

  const removeEventListener = (id: CELLS) => {
    cellToListeners[id].abort();
  };

  const removeAllEventListeners = () => {
    Object.values(cellToListeners).forEach((c) => c.abort());
  };
  const attachListener = (
    cell: CELLS,
    callback: (element: HTMLElement) => void
  ) => {
    const controller = new AbortController();
    cellToListeners[cell] = controller;

    document
      .querySelector(`#${cell}`)!
      .addEventListener(
        "click",
        (e) => callback(e.currentTarget as HTMLElement),
        { signal: controller.signal }
      );

    document.querySelector(`#${cell}`)!.addEventListener(
      "keydown",
      (e) => {
        // @ts-expect-error its having issues with the event type KeyBoardEvent is not accepted
        if (e.key === "Enter" || e.keyCode === 13) {
          callback(e.currentTarget as HTMLElement);
        }
      },
      { signal: controller.signal }
    );
  };
  const attachResetListener = (cb: VoidFunction) => {
    document.querySelector(`#restartButton`)!.addEventListener("click", cb);
  };

  const markTile = (tile: HTMLElement, turn: string) => {
    tile.style.background = turn === "X" ? "yellow" : "blue";
    tile.style.color = turn === "X" ? "black" : "white";
    tile.innerHTML = `<span>${turn}</span>`;
  };
  const renderBoard = (root: string) => {
    document.querySelector<HTMLDivElement>(root)!.innerHTML = `
          <div class="${styles.row} ${styles["border-bottom"]}" data-name="row" >
            <div
              data-name="col"
              id="a"
              class="${styles.col}"
              tabindex="1"
              aria-label="top left square empty"
              data-hover-text="pick me im number 1"
            ></div>
            <div
              data-name="col"
              id="b"
              class="${styles.col} ${styles["col-mid"]}"
              tabindex="2"
              aria-label="top middle square empty"
              data-hover-text="second the best"
            ></div>
            <div
              data-name="col"
              id="c"
              class="${styles.col}"
              tabindex="3"
              aria-label="top right square empty"
              data-hover-text="your foe is quaking"
            ></div>
          </div>
          <div class="${styles.row}" data-name="row">
            <div
              data-name="col"
              id="d"
              class="${styles.col}"
              tabindex="4"
              aria-label="middle left square empty"
              data-hover-text="such art this game"
            ></div>
            <div
              data-name="col"
              id="e"
              class="${styles.col} ${styles["col-mid"]}"
              tabindex="5"
              aria-label="middle middle square empty"
              data-hover-text="you will always win"
            ></div>
            <div
              data-name="col"
              id="f"
              class="${styles.col}"
              tabindex="6"
              aria-label="middle right square empty"
              data-hover-text="neutral good"
            ></div>
          </div>
          <div class="${styles.row} ${styles["border-top"]}" data-name="row">
            <div
              data-name="col"
              id="g"
              class="${styles.col}"
              tabindex="7"
              aria-label="bottom left square empty"
              data-hover-text="pick me"
            ></div>
            <div
              data-name="col"
              id="h"
              class="${styles.col} ${styles["col-mid"]}"
              tabindex="8"
              aria-label="bottom middle square empty"
              data-hover-text="no me"
            ></div>
            <div
              data-name="col"
              id="i"
              class="${styles.col}"
              tabindex="9"
              aria-label="bottom right square empty"
              data-hover-text="pick the other one"
            ></div>
          </div>
          <button class="${styles.restartButton}" id="restartButton">Restart</button>
      `;
  };

  const markWinningTile = (cellId: string) => {
    let element = document.getElementById(cellId);
    element?.setAttribute("data-status", "winning");
    element?.classList.add(styles.winningTile);
  };

  return {
    renderBoard,
    attachListener,
    markWinningTile,
    markTile,
    attachResetListener,
    removeAllEventListeners,
    removeEventListener,
  };
};

type BoardUIHandler = typeof BoardUIHandler;
