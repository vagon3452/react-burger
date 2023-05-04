import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
} from "../constants/index";
import { TIngredient } from "../types/data";
import { TIngredientsActions } from "../actions/cart";

interface IInitialState {
  items: [];
  isLoading: boolean;
  hasError: boolean;
};

interface IState {
  items: ReadonlyArray<TIngredient>;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IInitialState = {
  items: [],
  isLoading: false,
  hasError: false,
};
export const cartReducer = (
  state: IInitialState = initialState,
  action: TIngredientsActions
): IState => {
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
