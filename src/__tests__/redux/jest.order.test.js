import { checkoutReducer, initialState } from "../../services/order/reducer";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as api from "../../services/burger-api";
import * as actions from "../../services/order/actions";
import {
  POST_ITEMS_FAILED,
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  CLEAR_ORDER
} from "../../services/order/constants";

jest.mock("../../services/burger-api");

const mockSuccessApiResponse = {
  success: true,
  orders: {
    ingredients: ["60d3463f7034a000269f45e7"],
    owner: {
      name: "test Name",
      createdAt: "2021-06-23T14:43:22.587Z",
      updateAt: "2021-06-23T14:43:22.603Z",
      email: "v@mail.ru",
    },
    name: "no name",
    _id: "",
    price: 21,
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
};

const mockErrorApiResponse = {
  success: false,
  message: "jest testing error",
};
const TestIds = { ingredients: ["60d3463f7034a000269f45e7"] };

describe("Redux store and order request", () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    store = mockStore(initialState);
    jest.resetModules();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should request order success", async () => {
    api.postItemsRequest.mockImplementationOnce(() =>
      Promise.resolve(mockSuccessApiResponse)
    );

    const expectedActions = [
      actions.postItemsRequestAction(),
      actions.postItemsSuccessAction(mockSuccessApiResponse.orders),
    ];

    await store.dispatch(actions.postItems(TestIds));

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should request orders false", async () => {
    api.postItemsRequest.mockImplementationOnce(() =>
      Promise.reject(mockErrorApiResponse)
    );
    const expectedActions = [
      actions.postItemsRequestAction(),
      actions.postItemsFailedAction(),
    ];
    await store.dispatch(actions.postItems(TestIds));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should request order with Network error", async () => {
    api.postItemsRequest.mockImplementationOnce(
      () => new Error("Network error")
    );
    const expectedActions = [
      actions.postItemsRequestAction(),
      actions.postItemsFailedAction(),
    ];

    await store.dispatch(actions.postItems(TestIds));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("shoulde initialize to correct default state", () => {
    expect(checkoutReducer(undefined, {})).toEqual(initialState);
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
