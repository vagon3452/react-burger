import {
  FEED_TABLE_CONNECT,
  FEED_TABLE_DISCONNECT,
  FEED_TABLE_WS_CLOSE,
  FEED_TABLE_WS_CONNECTING,
  FEED_TABLE_WS_ERROR,
  FEED_TABLE_WS_MESSAGE,
  FEED_TABLE_WS_OPEN,
} from "./constants";
import {
  ICloseAction,
  IConnectAction,
  IConnectingAction,
  IDisconnectAction,
  IErrorAction,
  IMessageAction,
  IOpenAction,
  IWebSocketData,
} from "./types";

export const connect = (url: string): IConnectAction => ({
  type: FEED_TABLE_CONNECT,
  payload: url,
});

export const disconnect = (): IDisconnectAction => ({
  type: FEED_TABLE_DISCONNECT,
});

export const wsConnecting = (): IConnectingAction => ({
  type: FEED_TABLE_WS_CONNECTING,
});

export const wsOpen = (): IOpenAction => ({
  type: FEED_TABLE_WS_OPEN,
});

export const wsClose = (): ICloseAction => ({
  type: FEED_TABLE_WS_CLOSE,
});

export const wsMessage = (data: IWebSocketData): IMessageAction => ({
  type: FEED_TABLE_WS_MESSAGE,
  payload: data,
});

export const wsError = (error: string): IErrorAction => ({
  type: FEED_TABLE_WS_ERROR,
  payload: error,
});

export type TFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
