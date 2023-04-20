import { TIngredient, TTokens } from "./data";

export type TUser = {
  readonly email: string;
  readonly name: string;
  readonly password: string;
};

export type TRawUser = Omit<TUser, "password">;
export type TBodyLogin = Omit<TUser, "name">;

export type TRegister = {
  readonly user: TRawUser;
} & TTokens;
export type TToken = {
  readonly token: string;
};
export type TBodyReset = {
  readonly password: string;
} & TToken;

export type TEmail = {
  readonly email: string;
};
export interface IGetUser {
  readonly success: boolean;
  readonly user: TRawUser;
}

export interface ICheck {
  readonly success: boolean;
  readonly message: string;
}

