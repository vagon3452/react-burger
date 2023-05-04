import { TContructorIngredient } from "../types/data";
import { ADD_BUN, ADD_INGREDIENTS, DELETE_ITEM, REPLACE } from "../constants";

interface IAddBunConstructorAction {
  readonly type: typeof ADD_BUN;
  readonly payload: TContructorIngredient;
}

interface IAddIngredientsConstructorAction {
  readonly type: typeof ADD_INGREDIENTS;
  readonly payload: TContructorIngredient;
}

interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly payload: string;
}

interface IReplaceItemsAction {
  readonly type: typeof REPLACE;
  readonly payload: Array<TContructorIngredient>;
}

export type TConstructorActions =
  | IAddBunConstructorAction
  | IAddIngredientsConstructorAction
  | IDeleteItemAction
  | IReplaceItemsAction;
