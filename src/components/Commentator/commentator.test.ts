import { Commentator } from "./commentator.ts";

describe("Commentator Pub/Sub", () => {
  let c;

  beforeEach(() => {
    c = new Commentator();
  });

  test("calls subscriber when event is published", () => {
    const callback = jest.fn();
    c.subscribe("test", callback);
    c.publish("test", "hello");
    expect(callback).toHaveBeenCalledWith("hello");
  });

  test("unsubscribe removes the callback", () => {
    const callback = jest.fn();
    const unsub = c.subscribe("event", callback);
    c.publish("event", "first");
    unsub();
    c.publish("event", "second");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("does nothing when publishing to an event with no subscribers", () => {
    expect(() => c.publish("ghost", "boo")).not.toThrow();
  });

  test("calls all subscribers for the same event", () => {
    const a = jest.fn();
    const b = jest.fn();
    c.subscribe("multi", a);
    c.subscribe("multi", b);
    c.publish("multi", "data");
    expect(a).toHaveBeenCalledWith("data");
    expect(b).toHaveBeenCalledWith("data");
  });

  test("does not call listeners for other events", () => {
    const ping = jest.fn();
    c.subscribe("ping", ping);
    c.publish("pong", "irrelevant");
    expect(ping).not.toHaveBeenCalled();
  });

  test("clears all events", () => {
    const cb = jest.fn();
    c.subscribe("a", cb);
    c.clear();
    c.publish("a", "after clear");
    expect(cb).not.toHaveBeenCalled();
  });
});
