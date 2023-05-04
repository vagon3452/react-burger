import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { checkoutReducer } from "./checkout";
import { burgerReducer } from "./create-burger";
import { userReducer } from "./user";
import { feedReducer } from "./web-socked";

export const rootReducer = combineReducers({
  cart: cartReducer,
  create: burgerReducer,
  checkout: checkoutReducer,
  user: userReducer,
  feed: feedReducer
});

export type TRootState = ReturnType<typeof rootReducer>