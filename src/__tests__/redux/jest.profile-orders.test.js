import {
  profileFeedReducer,
  initialState,
} from "../../services/profile-orders/reducer";
import * as actions from "../../services/profile-orders/actions";
import { WebsocketStatus } from "../../services/profile-orders/reducer";

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
    expect(profileFeedReducer(undefined, {})).toStrictEqual(initialState);
  });
  it("should connect status", () => {
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    };

    expect(
      profileFeedReducer(initialState, actions.profileFeedWsConnecting())
    ).toStrictEqual(expectedState);
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
    expect(
      profileFeedReducer(state, actions.profileFeedWsOpen())
    ).toStrictEqual(expectedState);
  });
  it("should connect close status", () => {
    const state = { ...initialState, status: WebsocketStatus.ONLINE };

    const expectedState = { ...state, status: WebsocketStatus.OFFLINE };

    expect(
      profileFeedReducer(initialState, actions.profileFeedWsClose())
    ).toStrictEqual(expectedState);
  });
  it("should connect error", () => {
    const expectedState = { ...initialState, connectionError: "errors" };

    expect(
      profileFeedReducer(initialState, actions.profileFeedWsError("errors"))
    ).toStrictEqual(expectedState);
  });
  it("should web Socket message", () => {
    const state = { ...initialState, status: WebsocketStatus.ONLINE };

    const expectedState = { ...state, privateFeed: message };

    expect(
      profileFeedReducer(state, actions.profileFeedWsMessage(message))
    ).toStrictEqual(expectedState);
  });
});
