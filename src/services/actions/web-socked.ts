export const LIVE_TABLE_CONNECT: "LIVE_TABLE_CONNECT" = "LIVE_TABLE_CONNECT";
export const LIVE_TABLE_DISCONNECT: "LIVE_TABLE_DISCONNECT" =
  "LIVE_TABLE_DISCONNECT";
export const LIVE_TABLE_WS_CONNECTING: "LIVE_TABLE_WS_CONNECTING" =
  "LIVE_TABLE_WS_CONNECTING";
export const LIVE_TABLE_WS_OPEN: "LIVE_TABLE_WS_OPEN" = "LIVE_TABLE_WS_OPEN";
export const LIVE_TABLE_WS_CLOSE: "LIVE_TABLE_WS_CLOSE" = "LIVE_TABLE_WS_CLOSE";
export const LIVE_TABLE_WS_ERROR: "LIVE_TABLE_WS_ERROR" = "LIVE_TABLE_WS_ERROR";
export const LIVE_TABLE_WS_MESSAGE: "LIVE_TABLE_WS_MESSAGE" =
  "LIVE_TABLE_WS_MESSAGE";

interface IConnectAction {
  type: typeof LIVE_TABLE_CONNECT;
  payload: string;
}

interface IConnectingAction {
  type: typeof LIVE_TABLE_WS_CONNECTING;
}

interface IErrorAction {
  type: typeof LIVE_TABLE_WS_ERROR;
  payload: string;
}
interface ISocketOrders {
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
  type: typeof LIVE_TABLE_WS_MESSAGE;
  payload: IWebSocketData;
}

interface IDisconnectAction {
  type: typeof LIVE_TABLE_DISCONNECT;
}

interface IOpenAction {
  type: typeof LIVE_TABLE_WS_OPEN;
}
interface ICloseAction {
  type: typeof LIVE_TABLE_WS_CLOSE;
}
export const connect = (url: string): IConnectAction => ({
  type: LIVE_TABLE_CONNECT,
  payload: url,
});

export const disconnect = (): IDisconnectAction => ({
  type: LIVE_TABLE_DISCONNECT,
});

export const wsConnecting = (): IConnectingAction => ({
  type: LIVE_TABLE_WS_CONNECTING,
});

export const wsOpen = (): IOpenAction => ({
  type: LIVE_TABLE_WS_OPEN,
});

export const wsClose = (): ICloseAction => ({
  type: LIVE_TABLE_WS_CLOSE,
});

export const wsMessage = (data: IWebSocketData): IMessageAction => ({
  type: LIVE_TABLE_WS_MESSAGE,
  payload: data,
});

export const wsError = (error: string): IErrorAction => ({
  type: LIVE_TABLE_WS_ERROR,
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
