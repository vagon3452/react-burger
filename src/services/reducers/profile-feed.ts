import {
  FEED_PROFILE_WS_ERROR,
  FEED_PROFILE_WS_MESSAGE,
  FEED_PROFILE_WS_OPEN,
  TProfileFeedActions,
  IWebSocketData,
  FEED_PROFILE_WS_CONNECTING,
} from "../actions/profile-feed";

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

interface IProfileState {
  status: WebsocketStatus;
  privateFeed: IWebSocketData | null;
  connectionError: string;
}
const initialState: IProfileState = {
  status: WebsocketStatus.OFFLINE,
  privateFeed: null,
  connectionError: "",
};

export const profileFeedReducer = (
  state = initialState,
  action: TProfileFeedActions
) => {
  switch (action.type) {
    case FEED_PROFILE_WS_CONNECTING:
      return {
        ...state,
      };
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
