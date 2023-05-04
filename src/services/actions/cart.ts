import { getItemsRequest } from "../burger-api";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../constants";
import { TIngredient } from "../types/data";
import { AppDispatch, AppThunkAction } from "../types";

export interface IGetItemsAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: ReadonlyArray<TIngredient>;
}

export type TIngredientsActions =
  | IGetItemsAction
  | IGetItemsFailedAction
  | IGetItemsSuccessAction;


export function getItems(): AppThunkAction {

  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getItemsRequest(null)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_ITEMS_FAILED,
          message: e.message,
        });
      });
  };
}
