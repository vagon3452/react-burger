import configureMockStore from "redux-mock-store";
import { rootReducer } from ".";
import { CLEAR_ORDER } from "../constants";
import { GET_ITEMS_SUCCESS, GET_ITEMS_REQUEST } from "../constants";
import { FEED_TABLE_WS_MESSAGE } from "../actions/feed";
import {
  arrayIngredients,
  socketOrders,
  orderResponse,
  user,
  stateUser,
} from "../../utils/index";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { profileFeed, feed } from "../store";
import { getItemsSuccessAction } from "../actions/cart";
import { wsMessage } from "../actions/feed";
import { postItemsSuccessAction } from "../actions/checkout";
import { setUserAction, setAuthChecked } from "../actions/user";

// const middlewares = [thunk, feed, profileFeed];
// const mockStore = configureMockStore(middlewares);

// const initialStore = {
//   cart: { items: [], isLoading: false, hasError: false },
//   create: { bun: null, tsngredients: [] },
//   checkout: { isLoading: false, order: null, hasError: false },
//   user: { user: null, isAuthChecked: false },
//   feed: { nconnectionError: "", publicFeed: null },
//   profileFeed: { privateFeed: null, nconnectionError: "" },
// };

// describe("actions and reducers test", () => {
//   let store;
//   beforeEach(() => {
//     store = mockStore(initialStore);
//   });

//   afterEach(() => {
//     store.clearActions();
//   });

//   it("should dispatch getItemsSuccessAction and update the items state", () => {

//     store.dispatch(getItemsSuccessAction(arrayIngredients));

//     expect(store.getState().cart.items).toEqual(arrayIngredients);
//   });

// it("should dispatch wsMessage action and update the statelyccordingly", () => {
//   const expectedActions = [
//     {
//       type: FEED_TABLE_WS_MESSAGE,
//       payload: socketOrders,
//     },
//   ];

//   store.dispatch(wsMessage(socketOrders));
//   expect(store.getActions()).toEqual(expectedActions);
//   expect(store.getState().feed.publicFeed).toEqual(socketOrders);
// });

// it("should dispatch postItemsSuccessAction and update the statelyccordingly", () => {
//   const expectedActions = [
//     { type: "POST_ITEMS_REQUEST" },
//     { type: "POST_ITEMS_SUCCESS", payload: orderResponse },
//   ];

//   store.dispatch(postItemsSuccessAction(orderResponse));
//   expect(store.getActions()).toEqual(expectedActions);
//   expect(store.getState().checkout.order).toEqual(orderResponse);
// });

// it("should dispatch setUserAction, setAuthChecked and update the user state", () => {
//   const expectedActions = [
//     { type: "SET_USER", payload: stateUser },
//     { type: "SET_AUTH_CHECKED" },
//   ];

//   store.dispatch(setUserAction(stateUser));
//   store.dispatch(setAuthChecked());
//   expect(store.getActions()).toEqual(expectedActions);
//   expect(store.getState().user.user).toEqual(stateUser);
//   expect(store.getState().user.isAuthChecked).toEqual(true);
// });
// });

const websocketStatus = {
  CONNECTING: "CONNECTING...",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

const initStore = {
  cart: { items: [], isLoading: false, hasError: false },
  create: { bun: null, ingredients: [] },
  checkout: { isLoading: false, order: null, hasError: false },
  user: { user: null, isAuthChecked: false },
  feed: {
    connectionError: "",
    publicFeed: null,
    status: websocketStatus.OFFLINE,
  },
  profileFeed: {
    privateFeed: null,
    connectionError: "",
    status: websocketStatus.OFFLINE,
  },
};

const resStoreItems = {
  ...initStore,
  cart: { ...initStore.cart, items: arrayIngredients },
};
const resStorePublicFeed = {
  ...initStore,
  feed: { ...initStore.feed, publicFeed: socketOrders },
};
const resStoreUser = {
  ...initStore,
  user: { ...initStore.user, user: stateUser },
};

const resStoreOrder = {
  ...initStore,
  checkout: { ...initStore.checkout, order: orderResponse },
};

describe("Проверка экшенов и редьюсеров", () => {
  const middleware = [thunk, feed, profileFeed];
  const enhancer = applyMiddleware(...middleware);
  let store;

  beforeEach(() => {
    store = createStore(rootReducer, enhancer);
  });

  afterEach(() => {});

  it("Диспатчим экшен получения товаров и сравниваем с желаемым стейтом", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(getItemsSuccessAction(arrayIngredients));
    expect(getState().cart.items).toStrictEqual(arrayIngredients);
    expect(getState()).toStrictEqual(resStoreItems);
  });
  it("Диспатчим экшен wsMessage заказов и сравниваем с желаемым стейтом", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(wsMessage(socketOrders));
    expect(getState().feed.publicFeed).toStrictEqual(socketOrders);
    expect(getState()).toStrictEqual(resStorePublicFeed);
  });
  it("Диспатчим экшен с оформленным заказом и сравниваем с желаемым стейтом, потом удаляем", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(postItemsSuccessAction(orderResponse));
    expect(getState().checkout.order).toStrictEqual(orderResponse);
    expect(getState()).toStrictEqual(resStoreOrder);
    store.dispatch({ type: CLEAR_ORDER });
    expect(getState()).toStrictEqual(initStore);
  });
  it("Диспатчим User и сравниваем с желаемым стейтом", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(setUserAction(stateUser));
    expect(getState().user.user).toStrictEqual(stateUser);
    expect(getState()).toStrictEqual(resStoreUser);
    store.dispatch(setAuthChecked());
    expect(getState().user.isAuthChecked).toStrictEqual(true);
  });
});
