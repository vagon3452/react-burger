import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_FAILED,
  POST_ITEMS_SUCCESS,
  CLEAR_ORDER,
} from "../actions/checkout";

const initialState = {
  isLoading: false,
  order: null,
  hasError: false,
};

export const checkoutReducer = (state = initialState, action) => {
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
        order: action.post,
        isLoading: false,
      };
    }
    case POST_ITEMS_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
        message: action.message,
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
