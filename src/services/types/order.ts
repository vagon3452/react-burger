import { TIngredient } from "./data";

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
  readonly orders: IOrder;
}

export interface IGetItem {
  readonly success: boolean;
  readonly data: TIngredient[];
}

export interface IBodyOrder {
  readonly ingredients: string[];
}
