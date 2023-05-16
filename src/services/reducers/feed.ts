import {
  TFeedActions,
  IWebSocketData,
  FEED_TABLE_WS_CONNECTING,
  FEED_TABLE_WS_MESSAGE,
  FEED_TABLE_WS_ERROR,
  FEED_TABLE_WS_OPEN,
  FEED_TABLE_WS_CLOSE,
} from "../actions/feed";
export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

const initialState: TLiveTableStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  publicFeed: null,
};
interface TLiveTableStore {
  status: WebsocketStatus;
  connectionError: string;
  publicFeed: IWebSocketData | null;
}

export const feedReducer = (
  state = initialState,
  action: TFeedActions
) => {
  switch (action.type) {
    case FEED_TABLE_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case FEED_TABLE_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectionError: "",
      };
    case FEED_TABLE_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case FEED_TABLE_WS_ERROR:
      return {
        ...state,
        connectionError: action.payload,
      };
    case FEED_TABLE_WS_MESSAGE:
      return {
        ...state,
        publicFeed: action.payload,
      };

    default:
      return state;
  }
};