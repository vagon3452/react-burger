export type TRawUser = {
  readonly email: string;
  readonly name: string;
};
export type TToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};
// export type TRawUser = Omit<TUser, "id"> & { _id: number };

export type TBurger = {
  readonly calories: string;
  readonly carbohydrates: string;
  readonly fat: string;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: string;
  readonly proteins: string;
  readonly type: string;
  readonly __v: string;
  readonly _id: string;
};
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

type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};

interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}
interface IEndpoint {
  login: string;
  register: string;
  ingredients: string;
  orders: string;
  user: string;
  logout: string;
  forgotPassword: string;
  resetPassword: string;
  refresh: string;
}
enum ENDPOINTS {
  login = "https://norma.nomoreparties.space/api/auth/login",
  register = "https://norma.nomoreparties.space/api/auth/register",
  ingredients = "https://norma.nomoreparties.space/api/ingredients",
  orders = "https://norma.nomoreparties.space/api/orders",
  user = "https://norma.nomoreparties.space/api/auth/user`",
  logout = "https://norma.nomoreparties.space/api/auth/logout",
  forgotPassword = "https://norma.nomoreparties.space/api/password-reset",
  resetPassword = "https://norma.nomoreparties.space/api/password-reset/reset",
  refresh = "https://norma.nomoreparties.space/api/auth/token",
}
