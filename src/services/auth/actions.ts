import {
  TToken,
  TUser,
  TBodyLogin,
  TRegister,
  TRawUser,
  ISetAuthChecked,
  ISetUserAction,
} from "./types";
import { AppThunkAction } from "../store";
import {
  SET_USER,
  SET_AUTH_CHECKED,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "./constants";

import {
  loginRequest,
  registerRequest,
  getUserRequest,
  logoutRequest,
  updateUserRequest,
} from "../burger-api";

export const setAuthChecked = (): ISetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: true,
});
const handleAuthData = (data: TRegister): TRawUser => {
  if (data.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  }
  return data.user;
};

export const setUserAction = (user: TRawUser | null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const registerUserAction = (form: TUser): AppThunkAction => {
  return async (dispatch) => {
    try {
      const data = await registerRequest(form);
      if (data.success) {
        const user = handleAuthData(data);
        dispatch(setUserAction(user));
        dispatch(setAuthChecked());
      }
    } catch (error) {
      console.log(`register user error ${error}`);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      dispatch(setUserAction(null));
    } finally {
      dispatch(setAuthChecked());
    }
  };
};
export const signInAction = (form: TBodyLogin): AppThunkAction => {
  return async (dispatch) => {
    try {
      const data = await loginRequest(form);
      if (data.success) {
        const user = handleAuthData(data);
        dispatch(setUserAction(user));
        dispatch(setAuthChecked());
      }
    } catch (error) {
      console.log(`sign in action error ${error}`);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      dispatch(setUserAction(null));
    } finally {
      dispatch(setAuthChecked());
    }
  };
};
export const getUserAction = (): AppThunkAction => async (dispatch) => {
  try {
    const data = await getUserRequest();
    if (data.success) {
      dispatch(setUserAction(data.user));
      dispatch(setAuthChecked());
    }
  } catch (error) {
    console.log(`get user action error`, error);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    dispatch(setUserAction(null));
  } finally {
    dispatch(setAuthChecked());
  }
};

export const updateUserAction = (form: TUser): AppThunkAction => {
  return async (dispatch) => {
    try {
      const data = await updateUserRequest(form);
      if (data.success) {
        dispatch(setUserAction(data.user));
        dispatch(setAuthChecked());
      }
    } catch (error) {
      console.log(`update error ${error}`);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      dispatch(setUserAction(null));
    } finally {
      dispatch(setAuthChecked());
    }
  };
};

export const signOutAction = (form: TToken): AppThunkAction => {
  return async (dispatch) => {
    await logoutRequest(form);
    dispatch(setUserAction(null));
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };
};

export const checkUserAuth = (): AppThunkAction => {
  return (dispatch) => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      dispatch(getUserAction());
    } else {
      dispatch(setAuthChecked());
    }
  };
};
