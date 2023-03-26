import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
} from "../actions/cart";

const initialState = {
  items: [],
  isLoading: false,
  hasError: false,

};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        hasError: false,
        items: action.items,
        isLoading: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, hasError: true, isLoading: false, errorMessage: action.message };
    }
    default: {
      return state;
    }
  }
};
