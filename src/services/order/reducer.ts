import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_FAILED,
  POST_ITEMS_SUCCESS,
  CLEAR_ORDER,
} from "./constants";

import { TRequestOrderActions, IOrder } from "./types";

interface IOrderState {
  isLoading: boolean;
  order: Readonly<IOrder> | null;
  hasError: boolean;
}

const initialState: IOrderState = {
  isLoading: false,
  order: null,
  hasError: false,
};

export const checkoutReducer = (
  state = initialState,
  action: TRequestOrderActions
): IOrderState => {
  switch (action.type) {
    case POST_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_ITEMS_SUCCESS: {
      return {
        ...state,
        hasError: false,
        order: action.payload,
        isLoading: false,
      };
    }
    case POST_ITEMS_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }
    case CLEAR_ORDER: {
      return { ...state, order: null };
    }
    default: {
      return state;
    }
  }
};
