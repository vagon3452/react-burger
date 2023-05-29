import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from "../constants";
import { cartReducer } from "./reducer";

const initialState = {
  items: [],
  isLoading: false,
  hasError: false,
};

describe("cartReducer", () => {
  it("should return the initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ITEMS_REQUEST", () => {
    const action = {
      type: GET_ITEMS_REQUEST,
    };

    const expectedState = {
      ...initialState,
      isLoading: true,
    };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ITEMS_SUCCESS", () => {
    const items = [
      { id: 1, name: "Bun" },
      { id: 2, name: "Cheese" },
    ];

    const action = {
      type: GET_ITEMS_SUCCESS,
      items,
    };

    const expectedState = {
      ...initialState,
      items,
      isLoading: false,
    };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ITEMS_FAILED", () => {
    const action = {
      type: GET_ITEMS_FAILED,
    };

    const expectedState = {
      ...initialState,
      hasError: true,
      isLoading: false,
    };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });
});
