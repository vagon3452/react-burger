import { TContructorIngredient } from "../ingredients/types";
import { ADD_BUN, ADD_INGREDIENTS, DELETE_ITEM, REPLACE } from "./constants";

export interface IAddBunConstructorAction {
  readonly type: typeof ADD_BUN;
  readonly payload: TContructorIngredient;
}

export interface IAddIngredientsConstructorAction {
  readonly type: typeof ADD_INGREDIENTS;
  readonly payload: TContructorIngredient;
}

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly payload: string;
}

export interface IReplaceItemsAction {
  readonly type: typeof REPLACE;
  readonly payload: Array<TContructorIngredient>;
}

export type TConstructorActions =
  | IAddBunConstructorAction
  | IAddIngredientsConstructorAction
  | IDeleteItemAction
  | IReplaceItemsAction;