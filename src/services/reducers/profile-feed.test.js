import { profileFeedReducer } from "./profile-feed";

const websocketStatus = {
  CONNECTING: "CONNECTING...",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

const initialState = {
  status: websocketStatus.OFFLINE,
  privateFeed: null,
  connectionError: "",
};

describe("profileFeedReducer", () => {
  it("should return the initial state", () => {
    expect(profileFeedReducer(undefined, {})).toStrictEqual(initialState);
  });
});
