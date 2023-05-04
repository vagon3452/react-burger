import { TToken, TUser, TBodyLogin } from "../types/user";
import { IUser } from "../reducers/user";
import {
  SET_USER,
  SET_AUTH_CHECKED,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_COOKIE_NAME,
} from "../constants";

import {
  loginRequest,
  registerRequest,
  getUserRequest,
  logoutRequest,
  updateUserRequest,
} from "../burger-api";

const handleAuthData = (data: any) => {
  if (data.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  }
  return data.user;
};
const setUserAction = (user: IUser | null) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const registerUserAction = (form: TUser) => {
  //@ts-ignore
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
export const signInAction = (form: TBodyLogin) => {
  //@ts-ignore
  return async (dispatch) => {
    try {
      const data = await loginRequest(form);
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
export const getUserAction =
  () =>
  //@ts-ignore
  async (dispatch) => {
    try {
      const data = await getUserRequest(null);
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

export const updateUserAction = (form: TUser) => {
  //@ts-ignore
  return async (dispatch) => {
    try {
      const data = await updateUserRequest(form);
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

export const signOutAction = (form: TToken) => {
  //@ts-ignore
  return async (dispatch) => {
    await logoutRequest(form);
    dispatch(setUserAction(null));
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };
};

export const checkUserAuth = () => {
  //@ts-ignore
  return (dispatch) => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      dispatch(getUserAction());
    } else {
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};
