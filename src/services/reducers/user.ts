import React from "react";

import { SET_USER, SET_AUTH_CHECKED } from "../constants/index";


const initialState = {
  user: null,
  isAuthChecked: false,
};

export interface IUser {
  name: string;
  email: string;
}

export interface IUserAction {
  type: typeof SET_USER;
  payload: IUser;
}

export interface IAuthCheckedAction {
  type: typeof SET_AUTH_CHECKED;
  payload: boolean;
}

export type UserActionTypes = IUserAction | IAuthCheckedAction;

export interface IUserState {
  user: IUser | null;
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
