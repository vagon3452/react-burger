import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { checkoutReducer } from "./checkout";
import { burgerReducer } from "./create-burger";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  cart: cartReducer,
  create: burgerReducer,
  checkout: checkoutReducer,
  user: userReducer
});
