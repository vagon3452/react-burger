import React from "react";

import { SET_USER, SET_AUTH_CHECKED } from "../actions/user";

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const userReducer = (state = initialState, action) => {
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
