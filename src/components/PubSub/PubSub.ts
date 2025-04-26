import type { GAME_EVENTS } from "../shared.types";
type CallbackType = (data?: any) => void;

export class PubSub {
  events: Record<GAME_EVENTS, CallbackType[]>;

  constructor() {
    this.events = {} as Record<GAME_EVENTS, CallbackType[]>;
  }

  subscribe(event: GAME_EVENTS, callback: CallbackType) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  publish(event: GAME_EVENTS, data?: any) {
    if (!this.events[event]) return;
    for (const callback of this.events[event]) {
      callback(data);
    }
  }

  clear() {
    this.events = {} as Record<GAME_EVENTS, CallbackType[]>;
  }
}
