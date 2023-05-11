import {
  FEED_PROFILE_CONNECT,
  FEED_PROFILE_DISCONNECT,
  FEED_PROFILE_WS_CLOSE,
  FEED_PROFILE_WS_CONNECTING,
  FEED_PROFILE_WS_ERROR,
  FEED_PROFILE_WS_MESSAGE,
  FEED_PROFILE_WS_OPEN,
  TProfileFeedActions,
} from "../actions/profile-feed";
const initialState = {
  something: null,
  connectionError: "",
};

export const profileFeedReducer = (
  state = initialState,
  action: TProfileFeedActions
) => {
  switch (action.type) {
    case FEED_PROFILE_WS_OPEN:
      return {
        ...state,
        connectionError: "",
      };
    case FEED_PROFILE_WS_ERROR:
      return {
        ...state,
        connectionError: action.payload,
      };
    case FEED_PROFILE_WS_MESSAGE:
      return {
        ...state,
        something: action.payload,
      };
    default:
      return state;
  }
};
