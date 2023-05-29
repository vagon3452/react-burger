import {
  FEED_TABLE_WS_CLOSE,
  FEED_TABLE_WS_CONNECTING,
  FEED_TABLE_WS_ERROR,
  FEED_TABLE_WS_MESSAGE,
  FEED_TABLE_WS_OPEN,
} from "./actions";
import { feedReducer } from "./reducer";

const websocketStatus = {
  CONNECTING: "CONNECTING...",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

const initialState = {
  status: websocketStatus.OFFLINE,
  connectionError: "",
  publicFeed: null,
};

const message = {
  success: true,
  order: [
    { id: 1, name: "test" },
    { id: 2, name: "test" },
    { id: 3, name: "test" },
    { id: 4, name: "test" },
  ],
};

describe("feed Reducer", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, {})).toStrictEqual(initialState);
  });
  it("should connect status", () => {
    const action = {
      type: FEED_TABLE_WS_CONNECTING,
    };
    const expectedState = {
      ...initialState,
      status: websocketStatus.CONNECTING,
    };

    expect(feedReducer(initialState, action)).toStrictEqual(expectedState);
  });
  it("should connect open status", () => {
    const state = {
      ...initialState,
      status: websocketStatus.CONNECTING,
      connectionError: "",
    };
    const action = { type: FEED_TABLE_WS_OPEN };
    const expectedState = {
      ...initialState,
      status: websocketStatus.ONLINE,
      connectionError: "",
    };
    expect(feedReducer(state, action)).toStrictEqual(expectedState);
  });
  it("should connect close status", () => {
    const state = { ...initialState, status: websocketStatus.ONLINE };

    const action = { type: FEED_TABLE_WS_CLOSE };

    const expectedState = { ...initialState, status: websocketStatus.OFFLINE };

    expect(feedReducer(state, action)).toStrictEqual(expectedState);
  });
  it("should connect error", () => {
    const action = { type: FEED_TABLE_WS_ERROR, payload: "errors" };

    const expectedState = { ...initialState, connectionError: "errors" };

    expect(feedReducer(initialState, action)).toStrictEqual(expectedState);
  });
  it("should web Socket message", () => {
    const state = { ...initialState, status: websocketStatus.ONLINE };

    const action = { type: FEED_TABLE_WS_MESSAGE, payload: message };

    const expectedState = { ...state, publicFeed: message };

    expect(feedReducer(state, action)).toStrictEqual(expectedState);
  });
});
