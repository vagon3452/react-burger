import { TIngredient } from "./data";

export interface TRawUser {
  readonly email: string;
  readonly name: string;
}
export interface IGetItem {
    success:boolean;
    data:TIngredient[]
  }
  
export interface ILogin {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
}
export interface IRegister {
  readonly success: boolean;
  readonly user: TRawUser;
  readonly accessToken: string;
  readonly refreshToken: string;
}
interface IOwner {
  readonly createdAt: string;
  readonly email: string;
  readonly name: string;
  readonly updateAt: string;
}
export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: TIngredient[];
  readonly name: string;
  readonly number: number;
  readonly owner: IOwner;
  readonly price: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}
export interface IOrderRequest {
  readonly success: boolean;
  readonly name: string;
  readonly order: IOrder;
}
export interface IGetUser {
  readonly success: boolean;
  readonly user: TRawUser;
}

export interface ICheck {
  readonly success: boolean;
  readonly message: string;
}
export interface IBodyEmail {
  readonly email: string;
}
export interface IBodyReset {
  readonly password: string;
  readonly token: string;
}

export interface IBodyReg {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}
export interface IBodyLogin {
  readonly email: string;
  readonly password: string;
}
export interface IBodyOrder {
  readonly ingredients: string[];
}
export interface IBodyGetUser {
  readonly token: string;
}
export interface IBodyUpdateUser {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}
export interface IBodyLogout {
  readonly token: string;
}
