import React from "react";
import { TRawUser } from "./types";
import { SET_USER, SET_AUTH_CHECKED } from "./constants";
import { ISetUserAction } from "./types";

const initialState = {
  user: null,
  isAuthChecked: false,
};

export interface IUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TRawUser;
}

export interface IAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

export type UserActionTypes = IUserAction | IAuthCheckedAction | ISetUserAction;

export interface IUserState {
  user: TRawUser | null;
  isAuthChecked: boolean;
}

export const userReducer = (
  state: IUserState = initialState,
  action: UserActionTypes
): IUserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    default: {
      return state;
    }
  }
};
