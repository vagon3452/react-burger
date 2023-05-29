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

const postItemsRequestAction = (): IPostItemsAction => ({
  type: POST_ITEMS_REQUEST,
});

export const postItemsSuccessAction = (
  order: Readonly<IOrder>
): IPostItemsSuccessAction => ({
  type: POST_ITEMS_SUCCESS,
  payload: order,
});

const postItemsFailedAction = (): IPostItemsFailedAction => ({
  type: POST_ITEMS_FAILED,
});

export function postItems(ingridientsID: IBodyOrder): AppThunkAction {
  return function (dispatch) {
    dispatch(postItemsRequestAction());

    postItemsRequest(ingridientsID)
      .then((res) => {
        if (res && res.success) {
          dispatch(postItemsSuccessAction(res.orders));
        } else {
          dispatch(postItemsFailedAction());
        }
      })
      .catch((e) => {
        dispatch(postItemsFailedAction());
      });
  };
}
