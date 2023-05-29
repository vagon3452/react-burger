import { TContructorIngredient } from "../ingredients/types";
import { ADD_INGREDIENTS, ADD_BUN, DELETE_ITEM, REPLACE } from "./constants";

import { TConstructorActions } from "./types";

interface IInitialState {
  bun: null;
  ingredients: Array<TContructorIngredient>;
}
interface IState {
  bun: TContructorIngredient | null;
  ingredients: Array<TContructorIngredient>;
}
const initialState: IInitialState = {
  bun: null,
  ingredients: [],
};

export const burgerReducer = (
  state: IState = initialState,
  action: TConstructorActions
): IState => {
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
          (item) => item.uuid !== action.payload
        ),
      };
    }

    default: {
      return state;
    }
  }
};
