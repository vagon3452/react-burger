import {
  ADD_INGREDIENTS,
  ADD_BUN,
  DELETE_ITEM,
  REPLACE,
} from "../constants/index";
import { TContructorIngredient } from "../types/data";
import { TConstructorActions } from "../actions/create-burger";

interface IInitialStateConstructor {
  bun: null;
  ingredients: Array<TContructorIngredient>;
}
interface IReturnConstructorState {
  bun: TContructorIngredient | null;
  ingredients: Array<TContructorIngredient> | [];
}
const initialState: IInitialStateConstructor = {
  bun: null,
  ingredients: [],
};

export const burgerReducer = (
  state: IInitialStateConstructor = initialState,
  action: TConstructorActions
): IReturnConstructorState => {
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
