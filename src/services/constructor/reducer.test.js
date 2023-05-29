import { ADD_BUN, ADD_INGREDIENTS, DELETE_ITEM, REPLACE } from "../constants";
import { burgerReducer } from "./reducer";

const testBun = { uuid: 0, name: "Bun" };

const test1 = { uuid: 1, name: "Cheese" };
const test2 = { uuid: 2, name: "Cheese" };
const test3 = { uuid: 3, name: "Cheese" };

const initialState = {
  bun: null,
  ingredients: [],
};

describe("burgerReducer", () => {
  it("shoulde initialize to correct default state", () => {
    expect(burgerReducer(undefined, {})).toStrictEqual(initialState);
  });
  it("should add a bun to the state", () => {
    const action = { type: ADD_BUN, payload: testBun };

    const expectedState = { ...initialState, bun: testBun };

    expect(burgerReducer(initialState, action)).toStrictEqual(expectedState);
  });
  it("should add tingredient to the state", () => {
    const action = { type: ADD_INGREDIENTS, payload: test1 };

    const expectedState = { ...initialState, ingredients: [test1] };

    expect(burgerReducer(initialState, action)).toStrictEqual(expectedState);
  });
  it("should delete ingredient from the state", () => {
    const state = { bun: null, ingredients: [test1, test2, test3] };

    const action = { type: DELETE_ITEM, payload: 2 };

    const expectedState = { ...state, ingredients: [test1, test3] };

    expect(burgerReducer(state, action)).toStrictEqual(expectedState);
  });
  it("should replace ingredients in the state", () => {
    const state = { bun: null, ingredients: [test1, test2, test3] };

    const action = { type: REPLACE, payload: [test1, test3, test2] };

    const expectedState = { bun: null, ingredients: [test1, test3, test2] };

    expect(burgerReducer(state, action)).toStrictEqual(expectedState);
  });
});
