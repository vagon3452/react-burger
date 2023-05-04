import { postItemsRequest } from "../burger-api";
import { IBodyOrder, IOrder } from "../types/order";
import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  POST_ITEMS_FAILED,
  CLEAR_ORDER,
} from "../constants";

interface IPostItemsAction {
  readonly type: typeof POST_ITEMS_REQUEST;
}

interface IPostItemsFailedAction {
  readonly type: typeof POST_ITEMS_FAILED;
}
interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

interface IPostItemsSuccessAction {
  readonly type: typeof POST_ITEMS_SUCCESS;
  readonly payload: Readonly<IOrder>;
}

export type TRequestOrderActions =
  | IPostItemsAction
  | IPostItemsFailedAction
  | IPostItemsSuccessAction
  | IClearOrderAction;
export function postItems(ingridientsID: IBodyOrder): void {
  //@ts-ignore
  return function (dispatch) {
    dispatch({
      type: POST_ITEMS_REQUEST,
    });

    postItemsRequest(ingridientsID)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_ITEMS_SUCCESS,

            payload: res.order,
          });
        } else {
          dispatch({
            type: POST_ITEMS_FAILED,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: POST_ITEMS_FAILED,
          message: e.message,
        });
      });
  };
}
