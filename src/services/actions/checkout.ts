import { postItemsRequest } from "../burger-api";

export const POST_ITEMS_REQUEST = "POST_ITEMS_REQUEST";
export const POST_ITEMS_SUCCESS = "POST_ITEMS_SUCCESS";
export const POST_ITEMS_FAILED = "POST_ITEMS_FAILED";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function postItems(ingridientsID: { ingredients: string[] }) {
  return function (dispatch: any) {
    dispatch({
      type: POST_ITEMS_REQUEST,
    });
//@ts-ignore
    postItemsRequest(ingridientsID)
      .then((res) => {
        console.log(res)
        //@ts-ignore
        if (res && res.success) {
          dispatch({
            type: POST_ITEMS_SUCCESS,
            //@ts-ignore
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
