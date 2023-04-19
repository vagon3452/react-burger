import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
} from "../actions/cart";

interface IItem {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
}
interface IState {
  items: IItem[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}
interface IAction {
  type: string;
  items?: IItem[];
  message?: string;
}
const initialState: IState = {
  items: [],
  isLoading: false,
  hasError: false,
};
export const cartReducer = (state: IState = initialState, action: IAction):IState => {
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
        items: action.items || [],
        isLoading: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
        errorMessage: action.message,
      };
    }
    default: {
      return state;
    }
  }
};
