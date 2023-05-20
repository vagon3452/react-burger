import { TRequestOrderActions } from "../actions/checkout";
import { TIngredientsActions } from "../actions/cart";
import { TConstructorActions } from "../actions/create-burger";
import { UserActionTypes } from "../reducers/user";
import { TFeedActions } from "../actions/feed";
import { TProfileFeedActions } from "../actions/profile-feed";

export type TApplicationActions =
  | UserActionTypes
  | TIngredientsActions
  | TRequestOrderActions
  | TConstructorActions
  | TFeedActions
  | TProfileFeedActions
