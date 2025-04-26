import { PubSub } from "./PubSub";
describe("subscribe/publish", () => {
  let pubsub;
  beforeEach(() => {
    pubsub = new PubSub("commentary");
  });
  it("calls subscribed callbacks on publish", () => {
    const mockFn = jest.fn();
    pubsub.subscribe("ON_WIN", mockFn);
    pubsub.publish("ON_WIN", "X");

    expect(mockFn).toHaveBeenCalledWith("X");
  });

  it("does not call unsubscribed callbacks", () => {
    const mockFn = jest.fn();
    const unsubscribe = pubsub.subscribe("ON_WIN", mockFn);
    unsubscribe(); // remove it
    pubsub.publish("ON_WIN", "X");

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("handles multiple callbacks for same event", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    pubsub.subscribe("ON_START", mock1);
    pubsub.subscribe("ON_START", mock2);
    pubsub.publish("ON_START", "X");

    expect(mock1).toHaveBeenCalledWith("X");
    expect(mock2).toHaveBeenCalledWith("X");
  });

  it("does nothing if event has no subscribers", () => {
    expect(() => {
      pubsub.publish("ON_NEXT_TURN", "O");
    }).not.toThrow();
  });

  it("clears all subscriptions with clear", () => {
    const mock = jest.fn();
    pubsub.subscribe("ON_WIN", mock);
    pubsub.clear();
    pubsub.publish("ON_WIN", "X");

    expect(mock).not.toHaveBeenCalled();
  });
});
