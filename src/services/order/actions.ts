import { postItemsRequest } from "../burger-api";
import {
  IBodyOrder,
  IOrder,
  IPostItemsAction,
  IPostItemsFailedAction,
  IPostItemsSuccessAction,
} from "./types";
import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  POST_ITEMS_FAILED,
} from "./constants";
import { AppThunkAction } from "../store";

export const postItemsRequestAction = (): IPostItemsAction => ({
  type: POST_ITEMS_REQUEST,
});

export const postItemsSuccessAction = (
  order: Readonly<IOrder>
): IPostItemsSuccessAction => ({
  type: POST_ITEMS_SUCCESS,
  payload: order,
});

export const postItemsFailedAction = (): IPostItemsFailedAction => ({
  type: POST_ITEMS_FAILED,
});

export function postItems(ingredientsID: IBodyOrder): AppThunkAction {
  return async function (dispatch) {
    dispatch(postItemsRequestAction());
    try {
      const res = await postItemsRequest(ingredientsID);
      if (res && res.success) {
        dispatch(postItemsSuccessAction(res.order));
      } else {
        dispatch(postItemsFailedAction());
      }
    } catch (e) {
      dispatch(postItemsFailedAction());
    }
  };
}
