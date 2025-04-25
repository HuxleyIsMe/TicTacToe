type COMMENTATOR_EVENTS = "ON_START" | "ON_WIN" | "ON_END_TURN" | "ON DRAW";
type CallbackType = (data?: any) => {};

export class Commentator {
  events: Record<COMMENTATOR_EVENTS, CallbackType[]>;
  constructor() {
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
}
