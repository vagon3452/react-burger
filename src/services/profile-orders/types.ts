import {
  FEED_PROFILE_CONNECT,
  FEED_PROFILE_DISCONNECT,
  FEED_PROFILE_WS_CLOSE,
  FEED_PROFILE_WS_CONNECTING,
  FEED_PROFILE_WS_OPEN,
  FEED_PROFILE_WS_MESSAGE,
  FEED_PROFILE_WS_ERROR,
} from "./constants";

export interface IConnectAction {
  type: typeof FEED_PROFILE_CONNECT;
  payload: string;
}
export interface IDisconnectAction {
  type: typeof FEED_PROFILE_DISCONNECT;
}
export interface ICloseAction {
  type: typeof FEED_PROFILE_WS_CLOSE;
}
export interface IConnectingAction {
  type: typeof FEED_PROFILE_WS_CONNECTING;
}
export interface IOpenAction {
  type: typeof FEED_PROFILE_WS_OPEN;
}
export interface IMessageAction {
  readonly type: typeof FEED_PROFILE_WS_MESSAGE;
  payload: IWebSocketData;
}
export interface IErrorAction {
  readonly type: typeof FEED_PROFILE_WS_ERROR;
  payload: string;
}
type TCurrentStatus = "created" | "pending" | "done";
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
