import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_FAILED,
  POST_ITEMS_SUCCESS,
  CLEAR_ORDER,
} from "../constants/index";

import { TRequestOrderActions } from "../actions/checkout";
import { IOrder } from "../types/order";

interface IInitialState {
  isLoading: boolean;
  order: null;
  hasError: boolean;
}

const initialState: IInitialState = {
  isLoading: false,
  order: null,
  hasError: false,
};

interface IState {
  isLoading: boolean;
  order: IOrder | null;
  hasError: boolean;
}

export const checkoutReducer = (
  state: IInitialState = initialState,
  action: TRequestOrderActions
): IState => {
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
