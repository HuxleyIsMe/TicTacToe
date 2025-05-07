import type { CELLS } from "../../types";


export interface UIHandlerReturnType {
    attachListeners: (cells: CELLS,  callback: (element: HTMLElement) => void) => void;
    attachResetListener: (cb: VoidFunction) => void,
    removeAllEventListeners: VoidFunction,
    removeEventListener: (id: CELLS) => void,
  }
  
  /**
   * Generic UI Handler to enable us to work easily with event listeners on the board.
   */
  export const UIHandler = () => {
    const cellToListeners = {} as Record<CELLS, AbortController>;
  
    const removeEventListener = (id: CELLS) => {
      cellToListeners[id].abort();
    };
  
    const removeAllEventListeners = () => {
      Object.values(cellToListeners).forEach((c) => c.abort());
    };
    const attachListeners = (
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
  
  
    return {
      attachListeners,
      attachResetListener,
      removeAllEventListeners,
      removeEventListener,
    };
  
  
  }