export enum ingredientType {
  type_bun = "bun",
  type_sauce = "sauce",
  type_main = "main",
}

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly __v: number;
};

export type TContructorIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly __v: number;
  readonly uuid: string;
};
