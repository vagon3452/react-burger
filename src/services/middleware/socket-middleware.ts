import { Middleware } from "redux";
import { TRootState } from "../reducers";

type TwsActionTypes = {
  wsConnect: string;
  wsDisconnect: string;
  wsSendMessage?: string;
  wsConnecting: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const socketMiddleware = (
  wsActions: TwsActionTypes
): Middleware<{}, TRootState> => {
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

      if (action.type === wsConnect && !socket) {
        console.log("connect");
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (err) => {
          console.log(`error${err}`);
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log("error");
            dispatch({ type: onError, payload: event.code.toString() });
          }
          console.log("close");
          dispatch({ type: onClose });

          if (isConnected) {
            dispatch({ type: wsConnecting });
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsConnect, payload: url });
            }, 3000);
          }
          socket = null
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
          dispatch({ type: onClose });
        }
      }

     return next(action);
    };
  };
};
