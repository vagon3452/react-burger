import type { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { rootReducer } from "../services/reducers/index";
import thunk, { ThunkMiddleware } from "redux-thunk";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { TApplicationActions } from "./types";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  FEED_TABLE_CONNECT,
  FEED_TABLE_DISCONNECT,
  FEED_TABLE_WS_CLOSE,
  FEED_TABLE_WS_CONNECTING,
  FEED_TABLE_WS_ERROR,
  FEED_TABLE_WS_MESSAGE,
  FEED_TABLE_WS_OPEN,
} from "./actions/feed";
import {
  FEED_PROFILE_CONNECT,
  FEED_PROFILE_DISCONNECT,
  FEED_PROFILE_WS_CLOSE,
  FEED_PROFILE_WS_CONNECTING,
  FEED_PROFILE_WS_ERROR,
  FEED_PROFILE_WS_MESSAGE,
  FEED_PROFILE_WS_OPEN,
} from "./actions/profile-feed";
import { TRootState } from "./reducers";

export const profileFeed = socketMiddleware({
  wsConnect: FEED_PROFILE_CONNECT,
  wsDisconnect: FEED_PROFILE_DISCONNECT,
  wsConnecting: FEED_PROFILE_WS_CONNECTING,
  onOpen: FEED_PROFILE_WS_OPEN,
  onClose: FEED_PROFILE_WS_CLOSE,
  onError: FEED_PROFILE_WS_ERROR,
  onMessage: FEED_PROFILE_WS_MESSAGE,
});
export const feed = socketMiddleware({
  wsConnect: FEED_TABLE_CONNECT,
  wsDisconnect: FEED_TABLE_DISCONNECT,
  wsConnecting: FEED_TABLE_WS_CONNECTING,
  onOpen: FEED_TABLE_WS_OPEN,
  onClose: FEED_TABLE_WS_CLOSE,
  onError: FEED_TABLE_WS_ERROR,
  onMessage: FEED_TABLE_WS_MESSAGE,
});

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export type AppDispatch = ThunkDispatch<
  TRootState,
  unknown,
  TApplicationActions
>;

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  TApplicationActions
>;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunk as ThunkMiddleware<TRootState, TApplicationActions>,
  feed,
  profileFeed,
];
const enhancer = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancer);
