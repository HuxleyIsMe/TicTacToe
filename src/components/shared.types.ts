export type Player = "X" | "O";

export type CELLS = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";

export enum GAME_EVENTS {
  "ON_START",
  "ON_WIN",
  "ON_NEXT_TURN",
  "ON_DRAW",
}
