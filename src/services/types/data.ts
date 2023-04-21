export type TTokens = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};

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

// type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
//   [key in TDataKey]: TDataType;
// } & {
//   success: boolean;
//   message?: string;
//   headers?: Headers;
// };

// interface CustomBody<T extends any> extends Body {
//   json(): Promise<T>;
// }

// interface CustomResponse<T> extends CustomBody<T> {
//   readonly headers: Headers;
//   readonly ok: boolean;
//   readonly redirected: boolean;
//   readonly status: number;
//   readonly statusText: string;
//   readonly type: ResponseType;
//   readonly url: string;
//   clone(): Response;
// }
