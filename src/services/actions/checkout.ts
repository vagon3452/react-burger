import { postItemsRequest } from "../burger-api";
import { IBodyOrder } from "../types/order";
import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  POST_ITEMS_FAILED,
} from "../constants";

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

            post: res.order,
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
