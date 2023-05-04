import {
  TLiveTableActions,
  IWebSocketData,
  LIVE_TABLE_WS_CONNECTING,
  LIVE_TABLE_WS_MESSAGE,
  LIVE_TABLE_WS_ERROR,
  LIVE_TABLE_WS_OPEN,
  LIVE_TABLE_WS_CLOSE,
} from "../actions/web-socked";
export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

const initialState: TLiveTableStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  table: null,
};
interface TLiveTableStore {
  status: WebsocketStatus;
  connectionError: string;
  table: IWebSocketData | null;
}

export const feedReducer = (
  state = initialState,
  action: TLiveTableActions
) => {
  switch (action.type) {
    case LIVE_TABLE_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case LIVE_TABLE_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectionError: "",
      };
    case LIVE_TABLE_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case LIVE_TABLE_WS_ERROR:
      return {
        ...state,
        connectionError: action.payload,
      };
    case LIVE_TABLE_WS_MESSAGE:
      return {
        ...state,
        table: action.payload,
      };

    default:
      return state;
  }
};
