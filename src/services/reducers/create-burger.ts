import {
  ADD_INGREDIENTS,
  ADD_BUN,
  DELETE_ITEM,
  REPLACE,
} from "../constants/index";
import { TContructorIngredient } from "../types/data";

interface BurgerState {
  bun: null | TContructorIngredient;
  ingredients: Array<TContructorIngredient>;
}

const initialState: BurgerState = {
  bun: null,
  ingredients: [],
};

export const burgerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REPLACE: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.uuid !== action.uuid
        ),
      };
    }

    default: {
      return state;
    }
  }
};
