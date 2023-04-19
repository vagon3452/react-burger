import { setCookie, deleteCookie } from "../cookie";

import {
  loginRequest,
  registerRequest,
  getUserRequest,
  logoutRequest,
  reversUserRequest,
} from "../burger-api";

export const SET_USER = "SET_USER";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const TOKEN_COOKIE_NAME = "token";

const handleAuthData = (data) => {
  if (data.accessToken) {
    // const authToken = data.accessToken.split("Bearer ")[1]; пока не использую куки
    // setCookie(TOKEN_COOKIE_NAME, authToken);
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  }
  return data.user;
};
const setUserAction = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const registerUserAction = (form) => {
  return async (dispatch) => {
    try {
      const data = await registerRequest(form);
      if (data.success) {
        const user = handleAuthData(data);
        dispatch(setUserAction(user));
        dispatch({ type: SET_AUTH_CHECKED, payload: true });
      }
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      dispatch(setUserAction(null));
    } finally {
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};
export const signInAction = (form) => {
  return async (dispatch) => {
    try {
      const data = await loginRequest(form);
      console.log(data)
      if (data.success) {
        const user = handleAuthData(data);
        dispatch(setUserAction(user));
        dispatch({ type: SET_AUTH_CHECKED, payload: true });
      }
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      dispatch(setUserAction(null));
    } finally {
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};
export const getUserAction = () => async (dispatch) => {
  try {
    const data = await getUserRequest();
    if (data.success) {
      const user = handleAuthData(data);
      dispatch(setUserAction(user));
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  } catch (error) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    dispatch(setUserAction(null));
  } finally {
    dispatch({ type: SET_AUTH_CHECKED, payload: true });
  }
};

export const reversUserAction = (form) => {
  return async (dispatch) => {
    try {
      const data = await reversUserRequest(form);
      if (data.success) {
        const user = handleAuthData(data);
        dispatch(setUserAction(user));
        dispatch({ type: SET_AUTH_CHECKED, payload: true });
      }
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      dispatch(setUserAction(null));
    } finally {
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};

export const signOutAction = () => {
  return async (dispatch) => {
    const data = await logoutRequest({ token: localStorage.getItem(REFRESH_TOKEN_KEY) });
    dispatch(setUserAction(null));
    // deleteCookie("token");
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      dispatch(getUserAction());
    } else {
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};

