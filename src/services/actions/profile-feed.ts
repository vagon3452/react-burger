export const FEED_PROFILE_CONNECT: "FEED_PROFILE_CONNECT" =
  "FEED_PROFILE_CONNECT";
export const FEED_PROFILE_DISCONNECT: "FEED_PROFILE_DISCONNECT" =
  "FEED_PROFILE_DISCONNECT";
export const FEED_PROFILE_WS_CLOSE: "FEED_PROFILE_WS_CLOSE" =
  "FEED_PROFILE_WS_CLOSE";
export const FEED_PROFILE_WS_CONNECTING: "FEED_PROFILE_WS_CONNECTING" =
  "FEED_PROFILE_WS_CONNECTING";
export const FEED_PROFILE_WS_ERROR: "FEED_PROFILE_WS_ERROR" =
  "FEED_PROFILE_WS_ERROR";
export const FEED_PROFILE_WS_MESSAGE: "FEED_PROFILE_WS_MESSAGE" =
  "FEED_PROFILE_WS_MESSAGE";
export const FEED_PROFILE_WS_OPEN: "FEED_PROFILE_WS_OPEN" =
  "FEED_PROFILE_WS_OPEN";

interface IConnectAction {
  type: typeof FEED_PROFILE_CONNECT;
  payload: string;
}
interface IDisconnectAction {
  type: typeof FEED_PROFILE_DISCONNECT;
}
interface ICloseAction {
  type: typeof FEED_PROFILE_WS_CLOSE;
}
interface IConnectingAction {
  type: typeof FEED_PROFILE_WS_CONNECTING;
}
interface IOpenAction {
  type: typeof FEED_PROFILE_WS_OPEN;
}
interface IMessageAction {
  readonly type: typeof FEED_PROFILE_WS_MESSAGE;
  payload: IWebSocketData;
}
interface IErrorAction {
  readonly type: typeof FEED_PROFILE_WS_ERROR;
  payload: string;
}

export interface ISocketOrders {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IWebSocketData {
  success: boolean;
  orders: Array<ISocketOrders>;
  total: number;
  totalToday: number;
}

export const profileFeedConnect = (url: string): IConnectAction => ({
  type: FEED_PROFILE_CONNECT,
  payload: url,
});

export const profileFeedWsDisconnect = (): IDisconnectAction => ({
  type: FEED_PROFILE_DISCONNECT,
});

export const profileFeedWsClose = (): ICloseAction => ({
  type: FEED_PROFILE_WS_CLOSE,
});
export const profileFeedWsOpen = (): IOpenAction => ({
  type: FEED_PROFILE_WS_OPEN,
});
export const profileFeedWsConnecting = (): IConnectingAction => ({
  type: FEED_PROFILE_WS_CONNECTING,
});
export const profileFeedWsMessage = (message: IWebSocketData): IMessageAction => ({
  type: FEED_PROFILE_WS_MESSAGE,
  payload: message,
});
export const profileFeedWsError = (error: string): IErrorAction => ({
  type: FEED_PROFILE_WS_ERROR,
  payload: error,
});

export type TProfileFeedActions =
  | ReturnType<typeof profileFeedConnect>
  | ReturnType<typeof profileFeedWsDisconnect>
  | ReturnType<typeof profileFeedWsClose>
  | ReturnType<typeof profileFeedWsOpen>
  | ReturnType<typeof profileFeedWsConnecting>
  | ReturnType<typeof profileFeedWsMessage>
  | ReturnType<typeof profileFeedWsError>;
