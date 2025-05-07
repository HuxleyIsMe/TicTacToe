import { PubSub } from "./PubSub";
import type { PubSubType } from "./types";
import { GAME_EVENTS } from "../../types";

describe("subscribe/publish", () => {
  let pubsub = undefined as unknown as PubSubType;
  beforeEach(() => {
    pubsub = new PubSub();
  });
  it("calls subscribed callbacks on publish", () => {
    const mockFn = jest.fn();
    pubsub.subscribe(GAME_EVENTS.ON_WIN, mockFn);
    pubsub.publish(GAME_EVENTS.ON_WIN, "X");

    expect(mockFn).toHaveBeenCalledWith("X");
  });

  it("does not call unsubscribed callbacks", () => {
    const mockFn = jest.fn();
    const unsubscribe = pubsub.subscribe(GAME_EVENTS.ON_WIN, mockFn);
    unsubscribe();
    pubsub.publish(GAME_EVENTS.ON_WIN, "X");

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("handles multiple callbacks for same event", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    pubsub.subscribe(GAME_EVENTS.ON_START, mock1);
    pubsub.subscribe(GAME_EVENTS.ON_START, mock2);
    pubsub.publish(GAME_EVENTS.ON_START, "X");

    expect(mock1).toHaveBeenCalledWith("X");
    expect(mock2).toHaveBeenCalledWith("X");
  });

  it("does nothing if event has no subscribers", () => {
    expect(() => {
      pubsub.publish(GAME_EVENTS.ON_NEXT_TURN, "O");
    }).not.toThrow();
  });

  it("clears all subscriptions with clear", () => {
    const mock = jest.fn();
    pubsub.subscribe(GAME_EVENTS.ON_WIN, mock);
    pubsub.clear();
    pubsub.publish(GAME_EVENTS.ON_WIN, "X");

    expect(mock).not.toHaveBeenCalled();
  });
});
