import {
  FEED_TABLE_CONNECT,
  FEED_TABLE_DISCONNECT,
  FEED_TABLE_WS_CLOSE,
  FEED_TABLE_WS_CONNECTING,
  FEED_TABLE_WS_ERROR,
  FEED_TABLE_WS_MESSAGE,
  FEED_TABLE_WS_OPEN,
} from "./constants";

type TCurrentStatus = "created" | "pending" | "done";

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
export interface TFeedStore {
  status: WebsocketStatus;
  connectionError: string;
  publicFeed: IWebSocketData | null;
}

export interface IConnectAction {
  type: typeof FEED_TABLE_CONNECT;
  payload: string;
}

export interface IConnectingAction {
  type: typeof FEED_TABLE_WS_CONNECTING;
}

export interface IErrorAction {
  type: typeof FEED_TABLE_WS_ERROR;
  payload: string;
}

export interface IMessageAction {
  type: typeof FEED_TABLE_WS_MESSAGE;
  payload: IWebSocketData;
}

export interface IDisconnectAction {
  type: typeof FEED_TABLE_DISCONNECT;
}

export interface IOpenAction {
  type: typeof FEED_TABLE_WS_OPEN;
}
export interface ICloseAction {
  type: typeof FEED_TABLE_WS_CLOSE;
}

export interface ISocketOrders {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: TCurrentStatus;
  updatedAt: string;
  _id: string;
}

export interface IWebSocketData {
  success: boolean;
  orders: Array<ISocketOrders>;
  total: number;
  totalToday: number;
}
