import {
  CLEAR_ORDER,
  POST_ITEMS_FAILED,
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
} from "../constants";
import { checkoutReducer } from "./reducer";

const initialState = {
  isLoading: false,
  order: null,
  hasError: false,
};

describe("test checkoutReducer", () => {
  it("should return the initial state", () => {
    expect(checkoutReducer(undefined, {})).toStrictEqual(initialState);
  });
  it("Updates 'isLoading' when POST_ITEMS_REQUEST", () => {
    const action = { type: POST_ITEMS_REQUEST };

    const expectedState = {
      ...initialState,
      isLoading: true,
    };
    expect(checkoutReducer(initialState, action)).toStrictEqual(expectedState);
  });
  it("Updates 'order' and 'isLoading' when POST_ITEMS_SUCCESS ", () => {
    const order = { number: 42 };
    const action = { type: POST_ITEMS_SUCCESS, payload: order };
    const expectedState = {
      ...initialState,
      isLoading: false,
      order,
    };
    expect(checkoutReducer(initialState, action)).toEqual(expectedState);
  });
  it("Updates 'hasError' when POST_ITEMS_FAILED", () => {
    const action = { type: POST_ITEMS_FAILED };
    const expectedState = { ...initialState, hasError: true };
    expect(checkoutReducer(initialState, action)).toStrictEqual(expectedState);
  });
  it("Clears 'order' when CLEAR_ORDER ", () => {
    const action = { type: CLEAR_ORDER };
    const state = { ...initialState, order: { number: 42 } };
    expect(checkoutReducer(state, action)).toStrictEqual(initialState);
  });
});
