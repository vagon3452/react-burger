import { getItemsRequest } from "../burger-api";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../constants";
import { TIngredient } from "../types/data";
import { AppThunkAction } from "../store";

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
export const getItemsAction = (): IGetItemsAction => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsFailedAction = (): IGetItemsFailedAction => ({
  type: GET_ITEMS_FAILED,
});

export const getItemsSuccessAction = (
  items: ReadonlyArray<TIngredient>
): IGetItemsSuccessAction => ({
  type: GET_ITEMS_SUCCESS,
  items,
});
export type TIngredientsActions =
  | IGetItemsAction
  | IGetItemsFailedAction
  | IGetItemsSuccessAction;

export function getItems(): AppThunkAction {
  return function (dispatch) {
    dispatch(getItemsAction());
    getItemsRequest(null)
      .then((res) => {
        if (res && res.success) {
          dispatch(getItemsSuccessAction(res.data));
        } else {
          dispatch(getItemsFailedAction());
        }
      })
      .catch((e) => {
        dispatch(getItemsFailedAction());
      });
  };
}
