import { TRequestOrderActions } from "../actions/checkout";
import { TIngredientsActions } from "../actions/cart";
import { TConstructorActions } from "../actions/create-burger";
import { UserActionTypes } from "../reducers/user";

export type TApplicationActions =
  | UserActionTypes
  | TIngredientsActions
  | TRequestOrderActions
  | TConstructorActions;
