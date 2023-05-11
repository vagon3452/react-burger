import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { checkoutReducer } from "./checkout";
import { burgerReducer } from "./create-burger";
import { userReducer } from "./user";
import { feedReducer } from "./feed";
import { profileFeedReducer } from "./profile-feed";

export const rootReducer = combineReducers({
  cart: cartReducer,
  create: burgerReducer,
  checkout: checkoutReducer,
  user: userReducer,
  feed: feedReducer,
  profileFeed: profileFeedReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
