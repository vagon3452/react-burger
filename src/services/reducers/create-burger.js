import {
  ADD_INGREDIENTS,
  ADD_BUN,
  DELETE_ITEM,
  REPLACE,
} from "../actions/create-burger";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPLACE: {
      return {
        ...state,
        ingredients: action.item,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.item,
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.item],
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
