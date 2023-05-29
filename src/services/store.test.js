import configureMockStore from "redux-mock-store";
import { rootReducer } from "./root-reducer";
import { CLEAR_ORDER } from "./constants";
import configureMockStore from "redux-mock-store";
import { GET_ITEMS_SUCCESS, GET_ITEMS_REQUEST } from "./constants";
import { FEED_TABLE_WS_MESSAGE } from "./feed/actions";
import {
  arrayIngredients,
  socketOrders,
  orderResponse,
  user,
  stateUser,
} from "../utils/index";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { profileFeed, feed } from "./store";
import { getItemsSuccessAction } from "./ingredients/actions";
import { wsMessage } from "./feed/actions";
import { postItemsSuccessAction } from "./order/actions";
import { setUserAction, setAuthChecked } from "./auth/actions";

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

  //  const mockStore = configureMockStore(middleware);
  const enhancer = applyMiddleware(...middleware);
  let store;

  beforeEach(() => {
    store = createStore(rootReducer, enhancer);
  });

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
