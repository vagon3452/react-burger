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
  connect as LiveTableWsConnect,
  disconnect as LiveTableWsDisconnect,
  wsConnecting as LiveTableWsConnecting,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsNessage,
  wsError as LiveTableWsError,
} from "./actions/web-socked";
import { TRootState } from "./reducers";

const wsActions = {
  wsConnect: LiveTableWsConnect,
  wsDisconnect: LiveTableWsDisconnect,
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsNessage,
};

export const profileFeed = socketMiddleware(wsActions);

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
  profileFeed,
];
const enhancer = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancer);
