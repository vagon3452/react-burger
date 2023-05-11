export const FEED_TABLE_CONNECT: "FEED_TABLE_CONNECT" = "FEED_TABLE_CONNECT";
export const FEED_TABLE_DISCONNECT: "FEED_TABLE_DISCONNECT" =
  "FEED_TABLE_DISCONNECT";
export const FEED_TABLE_WS_CONNECTING: "FEED_TABLE_WS_CONNECTING" =
  "FEED_TABLE_WS_CONNECTING";
export const FEED_TABLE_WS_OPEN: "FEED_TABLE_WS_OPEN" = "FEED_TABLE_WS_OPEN";
export const FEED_TABLE_WS_CLOSE: "FEED_TABLE_WS_CLOSE" = "FEED_TABLE_WS_CLOSE";
export const FEED_TABLE_WS_ERROR: "FEED_TABLE_WS_ERROR" = "FEED_TABLE_WS_ERROR";
export const FEED_TABLE_WS_MESSAGE: "FEED_TABLE_WS_MESSAGE" =
  "FEED_TABLE_WS_MESSAGE";

interface IConnectAction {
  type: typeof FEED_TABLE_CONNECT;
  payload: string;
}

interface IConnectingAction {
  type: typeof FEED_TABLE_WS_CONNECTING;
}

interface IErrorAction {
  type: typeof FEED_TABLE_WS_ERROR;
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

interface IMessageAction {
  type: typeof FEED_TABLE_WS_MESSAGE;
  payload: IWebSocketData;
}

interface IDisconnectAction {
  type: typeof FEED_TABLE_DISCONNECT;
}

interface IOpenAction {
  type: typeof FEED_TABLE_WS_OPEN;
}
interface ICloseAction {
  type: typeof FEED_TABLE_WS_CLOSE;
}
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


export type TLiveTableActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
