import { TRequestOrderActions } from "../order/types";
import { TIngredientsActions } from "../ingredients/actions";
import { UserActionTypes } from "../auth/reducer";
import { TFeedActions } from "../feed/actions";
import { TProfileFeedActions } from "../profile-orders/actions";
import { TConstructorActions } from "../constructor/types";

export type TApplicationActions =
  | UserActionTypes
  | TIngredientsActions
  | TRequestOrderActions
  | TConstructorActions
  | TFeedActions
  | TProfileFeedActions;
