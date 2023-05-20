import { postItemsRequest } from "../burger-api";
import { IBodyOrder, IOrder } from "../types/order";
import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  POST_ITEMS_FAILED,
  CLEAR_ORDER,
} from "../constants";
import { AppThunkAction } from "../store";

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
const postItemsRequestAction = (): IPostItemsAction => ({
  type: POST_ITEMS_REQUEST,
});

const postItemsSuccessAction = (
  order: Readonly<IOrder>
): IPostItemsSuccessAction => ({
  type: POST_ITEMS_SUCCESS,
  payload: order,
});

const postItemsFailedAction = (): IPostItemsFailedAction => ({
  type: POST_ITEMS_FAILED,
});
export type TRequestOrderActions =
  | IPostItemsAction
  | IPostItemsFailedAction
  | IPostItemsSuccessAction
  | IClearOrderAction;

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
