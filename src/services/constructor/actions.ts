import { v1 as uuid } from "uuid";
import { ADD_BUN, ADD_INGREDIENTS, DELETE_ITEM, REPLACE } from "./constants";
import {
  IAddBunConstructorAction,
  IAddIngredientsConstructorAction,
} from "./types";
import { TIngredient, TContructorIngredient } from "../ingredients/types";

export const addToConstructor = (
  ingredient: TIngredient
): IAddIngredientsConstructorAction => ({
  type: ADD_INGREDIENTS,
  payload: { ...ingredient, uuid: uuid() },
});

export const addBunToConstructor = (
  bun: TIngredient
): IAddBunConstructorAction => ({
  type: ADD_BUN,
  payload: { ...bun, uuid: uuid() },
});

export const replaceIndex = (newArray: TContructorIngredient[]) => ({
  type: REPLACE,
  payload: newArray,
});

export const deleteIngredient = (id: string) => ({
  type: DELETE_ITEM,
  payload: id,
});
