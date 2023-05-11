import { TToken, TUser, TBodyLogin, TRegister } from "../types/user";
import { TRawUser } from "../types/user";
import { AppThunkAction } from "../store";
import {
  SET_USER,
  SET_AUTH_CHECKED,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "../constants";

import {
  loginRequest,
  registerRequest,
  getUserRequest,
  logoutRequest,
  updateUserRequest,
} from "../burger-api";

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TRawUser | null;
}
interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: true;
}
const setAuthChecked = (): ISetAuthChecked => ({
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

const setUserAction = (user: TRawUser | null): ISetUserAction => ({
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
    const data = await getUserRequest(null);
    if (data.success) {
      // const user = handleAuthData(data);
      dispatch(setUserAction(data.user));
      dispatch(setAuthChecked());
    }
  } catch (error) {
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
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};
