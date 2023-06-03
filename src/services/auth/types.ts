import { SET_USER, SET_AUTH_CHECKED } from "./constants";

export type TTokens = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type TUser = {
  readonly email: string;
  readonly name: string;
  readonly password: string;
};

export type TRawUser = Omit<TUser, "password">;
export type TBodyLogin = Omit<TUser, "name">;
export type TEmail = Pick<TUser, "email">;

export type TRegister = {
  readonly user: TRawUser;
} & TTokens;
export type TToken = {
  readonly token: string;
};
export type TBodyReset = {
  readonly password: string;
} & TToken;

export interface IGetUser {
  readonly success: boolean;
  readonly user: TRawUser;
}

export interface IMessage {
  readonly success: boolean;
  readonly message: string;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TRawUser | null;
}
export interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: true;
}
