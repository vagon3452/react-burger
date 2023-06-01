import { TIngredient } from "../ingredients/types";
import {
  POST_ITEMS_REQUEST,
  POST_ITEMS_FAILED,
  CLEAR_ORDER,
  POST_ITEMS_SUCCESS,
} from "./constants";

interface IOwner {
  readonly createdAt: string;
  readonly email: string;
  readonly name: string;
  readonly updateAt: string;
}
export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: string[];
  readonly name: string;
  readonly number: number;
  readonly owner: IOwner;
  readonly price: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}

export type THttpOrder = Omit<IOrder, "price">;

export type TOrderRequestFromNumber = {
  readonly success: boolean;
  readonly orders: ReadonlyArray<THttpOrder>;
};
export interface IOrderRequest {
  readonly success: boolean;
  readonly name: string;
  readonly order: IOrder;
}

export interface IGetItem {
  readonly success: boolean;
  readonly data: TIngredient[];
}

export interface IBodyOrder {
  readonly ingredients: string[];
}

export interface IPostItemsAction {
  readonly type: typeof POST_ITEMS_REQUEST;
}

export interface IPostItemsFailedAction {
  readonly type: typeof POST_ITEMS_FAILED;
}
export interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export interface IPostItemsSuccessAction {
  readonly type: typeof POST_ITEMS_SUCCESS;
  readonly payload: Readonly<IOrder>;
}

export type TRequestOrderActions =
  | IPostItemsAction
  | IPostItemsFailedAction
  | IPostItemsSuccessAction
  | IClearOrderAction;
