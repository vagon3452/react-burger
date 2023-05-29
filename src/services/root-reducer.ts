import { combineReducers } from "redux";
import { cartReducer } from "./ingredients/reducer";
import { checkoutReducer } from "./order/reducer";
import { burgerReducer } from "./constructor/reducer";
import { userReducer } from "./auth/reducer";
import { feedReducer } from "./feed/reducer";
import { profileFeedReducer } from "./profile-orders/reducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  create: burgerReducer,
  checkout: checkoutReducer,
  user: userReducer,
  feed: feedReducer,
  profileFeed: profileFeedReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
