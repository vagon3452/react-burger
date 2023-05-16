import {
  FEED_PROFILE_WS_ERROR,
  FEED_PROFILE_WS_MESSAGE,
  FEED_PROFILE_WS_OPEN,
  TProfileFeedActions,
  IWebSocketData
} from "../actions/profile-feed";

interface IProfileState {
  privateFeed: IWebSocketData | null,
  connectionError: string
}
const initialState: IProfileState = {
  privateFeed: null,
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
        privateFeed: action.payload,
      };
    default:
      return state;
  }
};
