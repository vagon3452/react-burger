import {
  FEED_PROFILE_CONNECT,
  FEED_PROFILE_DISCONNECT,
  FEED_PROFILE_WS_CLOSE,
  FEED_PROFILE_WS_CONNECTING,
  FEED_PROFILE_WS_OPEN,
  FEED_PROFILE_WS_MESSAGE,
  FEED_PROFILE_WS_ERROR,
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
export const profileFeedWsMessage = (
  message: IWebSocketData
): IMessageAction => ({
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
