import { createSelector } from "reselect";
import { TContructorIngredient } from "../services/types/data";

interface IIngredientsState {
  create: {
    bun: TContructorIngredient | null;
    ingredients: Array<TContructorIngredient>;
  };
}
//= Pick<TContructorIngredient, "_id"> &

// type TAcc<TDataKey extends string = "", TDataType = {}> = {
//   [key in TDataKey]: TDataType;
// } & {
//   ingredients: string[],
//   totalPrice: number
// }
type TAcc2 = {
  _id: number;
  ingredients: string[];
  totalPrice: number;
};
type TAcc = {
  count: Map<string, number>;
  ingredients: string[];
  totalPrice: number;
};
export const totalPriceSelector = createSelector(
  (state: IIngredientsState) => state.create.bun,
  (state: IIngredientsState) => state.create.ingredients,
  (
    bun: TContructorIngredient | null,
    ingredients: Array<TContructorIngredient>
  ) => {
    const items: TContructorIngredient[] = bun
      ? [bun, ...ingredients, bun]
      : ingredients;

    return items.reduce(
      (acc, item) => {
        return {
          ...acc,
          count: acc.count.set(item._id, (acc.count.get(item._id) || 0) + 1),
          ingredients: [...acc.ingredients, item._id],
          totalPrice: (acc.totalPrice += item.price),
        };
      },
      {
        count: new Map(),
        ingredients: [],
        totalPrice: 0,
      } as TAcc
    );
  }
);
