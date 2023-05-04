import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
} from "../constants/index";
import { TIngredient } from "../types/data";
import { TIngredientsActions } from "../actions/cart";

interface ICartInitialState {
  items: ReadonlyArray<TIngredient>;
  isLoading: boolean;
  hasError: boolean;
};

interface ICartState {
  items: ReadonlyArray<TIngredient>;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: ICartInitialState = {
  items: [],
  isLoading: false,
  hasError: false,
};
export const cartReducer = (
  state = initialState,
  action: TIngredientsActions
): ICartState => {
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
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
