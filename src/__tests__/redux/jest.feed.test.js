import { feedReducer, initialState } from "../../services/feed/reducer";
import * as actions from "../../services/feed/actions";
import { WebsocketStatus } from "../../services/feed/types";

jest.mock("../../services/burger-api");

const message = {
  success: true,
  order: [
    { id: 1, name: "test" },
    { id: 2, name: "test" },
    { id: 3, name: "test" },
    { id: 4, name: "test" },
  ],
};

describe("Redux store and feed request", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, {})).toStrictEqual(initialState);
  });
  it("should connect status", () => {
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    };

    expect(feedReducer(initialState, actions.wsConnecting())).toStrictEqual(
      expectedState
    );
  });
  it("should connect open status", () => {
    const state = {
      ...initialState,
      status: WebsocketStatus.CONNECTING,
      connectionError: "",
    };
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectionError: "",
    };
    expect(feedReducer(state, actions.wsOpen())).toStrictEqual(expectedState);
  });
  it("should connect close status", () => {
    const state = { ...initialState, status: WebsocketStatus.ONLINE };

    const expectedState = { ...initialState, status: WebsocketStatus.OFFLINE };

    expect(feedReducer(state, actions.wsClose())).toStrictEqual(expectedState);
  });
  it("should connect error", () => {
    const expectedState = { ...initialState, connectionError: "errors" };

    expect(feedReducer(initialState, actions.wsError("errors"))).toStrictEqual(
      expectedState
    );
  });
  it("should web Socket message", () => {
    const state = { ...initialState, status: WebsocketStatus.ONLINE };

    const expectedState = { ...state, publicFeed: message };

    expect(feedReducer(state, actions.wsMessage(message))).toStrictEqual(
      expectedState
    );
  });
});
