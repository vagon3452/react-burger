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

    return items.reduce((acc, item) => {
      // const currentCount = acc[item._id] || 0;
      const currentCount = acc.count || new Map<string, number>();
      const arrayId = acc["ingredients"] || [];
      let result = acc["totalPrice"] || 0;
      return {
        ...acc,
        count: currentCount.set(item._id, currentCount.get(item._id) || 0 + 1),
        // [item._id]: currentCount + 1,
        ingredients: [...arrayId, item._id],
        totalPrice: (result += item.price),
      };
    }, {} as TAcc);
  }
);
