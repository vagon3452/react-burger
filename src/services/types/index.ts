import type { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../../index";
import { TRequestOrderActions } from "../actions/checkout";
import { TIngredientsActions } from "../actions/cart";
import { TConstructorActions } from "../actions/create-burger";
import { UserActionTypes } from "../reducers/user";

type TApplicationActions =
  | UserActionTypes
  | TIngredientsActions
  | TRequestOrderActions
  | TConstructorActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
