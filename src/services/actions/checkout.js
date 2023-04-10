import { postItemsRequest } from "../burger-api";

export const POST_ITEMS_REQUEST = "POST_ITEMS_REQUEST";
export const POST_ITEMS_SUCCESS = "POST_ITEMS_SUCCESS";
export const POST_ITEMS_FAILED = "POST_ITEMS_FAILED";

export function postItems(ingridientsID) {
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
