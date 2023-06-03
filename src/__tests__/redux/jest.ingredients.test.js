import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../services/ingredients/actions";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../../services/ingredients/constants";
import * as api from "../../services/burger-api";
import { getItems } from "../../services/ingredients/actions";
import { cartReducer, initialState } from "../../services/ingredients/reducer";

jest.mock("../../services/burger-api");

const mockSuccessApiResponse = {
  data: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ],
  success: true,
};

const mockErrorApiResponse = {
  error: "Something went wrong",
  success: false,
};

describe("Redux store and actions ingredients", () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    store = mockStore(initialState);
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("dispatches getItemsAction and getItemsSuccessAction actions when API request is successful", async () => {
    api.getItemsRequest.mockImplementationOnce(() =>
      Promise.resolve(mockSuccessApiResponse)
    );

    const expectedActions = [
      actions.getItemsRequestAction(),
      actions.getItemsSuccessAction(mockSuccessApiResponse.data),
    ];

    await store.dispatch(getItems());
    expect(api.getItemsRequest).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it("dispatches getItemsAction and getItemsSuccessAction actions when API request is successful", async () => {
    api.getItemsRequest.mockResolvedValue(mockSuccessApiResponse);

    const expectedActions = [
      actions.getItemsRequestAction(),
      actions.getItemsSuccessAction(mockSuccessApiResponse.data),
    ];

    await store.dispatch(getItems());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("dispatches getItemsAction and getItemsFailedAction actions when API request fails", async () => {
    api.getItemsRequest.mockImplementationOnce(() =>
      Promise.reject(mockErrorApiResponse)
    );

    const expectedActions = [
      actions.getItemsRequestAction(),
      actions.getItemsFailedAction(),
    ];

    await store.dispatch(getItems());
    expect(api.getItemsRequest).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches getItemsAction and getItemsFailedAction actions when API request throws an error", async () => {
    api.getItemsRequest.mockImplementationOnce(
      () => new Error("Network Error")
    );

    const expectedActions = [
      actions.getItemsRequestAction(),
      actions.getItemsFailedAction(),
    ];

    await store.dispatch(getItems());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("cards reducer, should correct state from undefined", () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
    expect(cartReducer(undefined, { type: GET_ITEMS_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
    });
    expect(
      cartReducer(undefined, {
        type: GET_ITEMS_SUCCESS,
        items: mockSuccessApiResponse.data,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: false,
      items: mockSuccessApiResponse.data,
    });
    expect(cartReducer(undefined, { type: GET_ITEMS_FAILED })).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
    });
  });
});
