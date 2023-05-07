import { Middleware } from "redux";
import { TRootState } from "../reducers";
import {
  connect,
  disconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
} from "../actions/web-socked";
import { AppDispatch } from "../store";


type TwsActionTypes = {
  wsConnect: "LIVE_TABLE_CONNECT";
  wsDisconnect: "LIVE_TABLE_WS_DISCONNECT";
  wsSendMessage?: "LIVE_TABLE_WS_MESSAGE";
  wsConnecting: "LIVE_TABLE_WS_CONNECTING";
  onOpen: "LIVE_TABLE_WS_OPEN";
  onClose: "LIVE_TABLE_WS_CLOSE";
  onError: "LIVE_TABLE_WS_ERROR";
  onMessage: "LIVE_TABLE_WS_MESSAGE";
};

export const socketMiddleware = (
  wsActions: TwsActionTypes
): Middleware<{}, TRootState, AppDispatch> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
      } = wsActions;

      if (action.type === wsConnect) {
        console.log("connect");
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (err) => {
          console.log(`error${err}`);
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log("error");
            dispatch(onError(event.code.toString()));
          }
          console.log("close");
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsSendMessage && action.type === wsSendMessage) {
          console.log("send");
          socket.send(JSON.stringify(action.payload));
        }

        if (action.type === wsDisconnect) {
          console.log("disconnect");
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  };
};
