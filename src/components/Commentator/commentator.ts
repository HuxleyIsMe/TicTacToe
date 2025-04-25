export class Commentator {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    // Return an unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  publish(event, data) {
    if (!this.events[event]) return;
    for (const callback of this.events[event]) {
      callback(data);
    }
  }

  clear() {
    this.events = {};
  }
}
