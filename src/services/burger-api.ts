import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "./actions/user";
import {
  TRawUser,
  TRegister,
  IGetUser,
  ICheck,
  TEmail,
  TBodyReset,
  TToken,
  TUser,
  TBodyLogin,
} from "./types/user";
import { IGetItem, IOrderRequest, IBodyOrder, IOrder } from "./types/order";
import { TIngredient, TTokens } from "./types/data";

enum ENDPOINTS {
  login = "https://norma.nomoreparties.space/api/auth/login",
  register = "https://norma.nomoreparties.space/api/auth/register",
  ingredients = "https://norma.nomoreparties.space/api/ingredients",
  orders = "https://norma.nomoreparties.space/api/orders",
  user = "https://norma.nomoreparties.space/api/auth/user",
  logout = "https://norma.nomoreparties.space/api/auth/logout",
  forgotPassword = "https://norma.nomoreparties.space/api/password-reset",
  resetPassword = "https://norma.nomoreparties.space/api/password-reset/reset",
  refresh = "https://norma.nomoreparties.space/api/auth/token",
}

const checkResponse = <T>(res: Response) => {
  return res.ok
    ? (res.json() as Promise<T>)
    : res.json().then((err) => Promise.reject(err));
};

const refreshToken = async (): Promise<TTokens> => {
  const url = ENDPOINTS.refresh;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(REFRESH_TOKEN_KEY),
    }),
  }).then(checkResponse<TTokens>);
};

const fetchWithRefresh = async <T>(url: ENDPOINTS, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshData.refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, refreshData.accessToken);
      options = {
        ...options,
        headers: {
          ...options?.headers,
          authorization: refreshData.accessToken,
        },
      };
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
interface TResponse {
  success: boolean;
  message?: string;
  headers?: Headers;
  user?: TRawUser;
  accessToken?: string;
  refreshToken?: string;
  data?: TIngredient[];
  name?: string;
  order?: IOrder;
}

const createRequest =
  <T extends TResponse, D = null>(
    endpoint: ENDPOINTS,
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
  ) =>
  async (form: D) => {
    const url: ENDPOINTS = endpoint;
    const requestOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
      },
      method,
      body: form && JSON.stringify(form),
    };
    return await fetchWithRefresh<T>(url, requestOptions);
  };

export const loginRequest = createRequest<TTokens, TBodyLogin>(
  ENDPOINTS.login,
  "POST"
);
export const registerRequest = createRequest<TRegister, TUser>(
  ENDPOINTS.register,
  "POST"
);
export const getItemsRequest = createRequest<IGetItem>(
  ENDPOINTS.ingredients,
  "GET"
);
export const postItemsRequest = createRequest<IOrderRequest, IBodyOrder>(
  ENDPOINTS.orders,
  "POST"
);
export const getUserRequest = createRequest<IGetUser>(ENDPOINTS.user, "GET");
export const updateUserRequest = createRequest<IGetUser, TUser>(
  ENDPOINTS.user,
  "PATCH"
);
export const logoutRequest = createRequest<ICheck, TToken>(
  ENDPOINTS.logout,
  "POST"
);
export const forgotPasswordRequest = createRequest<ICheck, TEmail>(
  ENDPOINTS.forgotPassword,
  "POST"
);
export const resetPasswordRequest = createRequest<ICheck, TBodyReset>(
  ENDPOINTS.resetPassword,
  "POST"
);

// const BURGER_API_URL = "https://norma.nomoreparties.space/api";

// type TArrayId = Pick<TIngredient, "_id">;
// type TOrder = {
//   ingredients:TArrayId
// }

// type TRegUser = TRawUser & {
//   readonly password: string;
// };
// type THeaders = {
//   "Content-Type": string;
//   authorization?: string;
// };
// type TOptions = {
//   method: string;
//   mode: string;
//   cache:string;
//   credentials:string;
//   headers:THeaders;
//   redirect:string;
//   referrerPolicy:string;
//   body:string
// };
// interface IEndpoint {
//   login: string;
//   register: string;
//   ingredients: string;
//   orders: string;
//   user: string;
//   logout: string;
//   forgotPassword: string;
//   resetPassword: string;
//   refresh: string;
// }

// type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
//   [key in TDataKey]: TDataType;
// } & {
//   success: boolean;
//   message?: string;
//   headers?: Headers;
// };
// type TResponseUser<TDataKey extends string = "", TDataType = {}> = {
//   [key in TDataKey]: TDataType;
// } & {
//   success: boolean;
//   message?: string;
//   headers?: Headers;
//   accessToken:string;
//   refreshToken:string;
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
// const checkResponse = <T>(res: Response): Promise<T> => {
//   console.log(res);
//   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };

// const ENDPOINTS = {
//   login: `${BURGER_API_URL}/auth/login`,
//   register: `${BURGER_API_URL}/auth/register`,
//   ingredients: `${BURGER_API_URL}/ingredients`,
//   orders: `${BURGER_API_URL}/orders`,
//   user: `${BURGER_API_URL}/auth/user`,
//   logout: `${BURGER_API_URL}/auth/logout`,
//   forgotPassword: `${BURGER_API_URL}/password-reset`,
//   resetPassword: `${BURGER_API_URL}/password-reset/reset`,
//   refresh: `${BURGER_API_URL}/auth/token`,
// };
// type TENDPOINTS = typeof ENDPOINTS;

// const refreshToken = async (): Promise<TResponseBody> => {
//   const url = ENDPOINTS.refresh;
//   return await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem(REFRESH_TOKEN_KEY),
//     }),
//   }).then(checkResponse<TResponseBody>);
// };

// const fetchWithRefresh = async <T>(
//   url: IEndpoint,
//   options: TOptions
// ): Promise<T> => {
//   try {
//     const res = await fetch(url, options);
//     return await checkResponse(res);
//   } catch (err: any) {
//     if (err.message === "jwt expired") {
//       const refreshData = await refreshToken();
//       if (!refreshData.success) {
//         return Promise.reject(refreshData);
//       }
//       localStorage.setItem(REFRESH_TOKEN_KEY, refreshData.refreshToken);
//       localStorage.setItem(ACCESS_TOKEN_KEY, refreshData.accessToken);
//       options.headers.authorization = refreshData.accessToken;
//       const res = await fetch(url, options);
//       return await checkResponse(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };

// export const getItemsRequest = async (): Promise<TResponseBody<"data", ReadonlyArray<TIngredient>>> => {
//   const url = ENDPOINTS.ingredients;
//   return await fetch(url, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   }).then(checkResponse<TResponseBody<"data", ReadonlyArray<TIngredient>>>);
// };

// export const postItemsRequest = async (body: TOrder): Promise<TResponseBody> => {
//   const url = ENDPOINTS.orders;
//   return await fetchWithRefresh(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(body),
//   });
// };

// export const loginRequest = async (form: {
//   email: string;
//   password: string;
// }): Promise<TResponseUser<"user", TRawUser>> => {
//   const url = ENDPOINTS.login;
//   return await fetch(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       // authorization: localStorage.getItem(ACCESS_TOKEN_KEY),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(form),
//   }).then(checkResponse<TResponseUser<"user", TRawUser>>);
// };

// export const registerRequest = async (
//   form: TRegUser
// ): Promise<TResponseUser<"user", TRawUser>> => {
//   const url = "https://norma.nomoreparties.space/api/auth/register";
//   return await fetch(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(form),
//   }).then(checkResponse<TResponseUser<"user", TRawUser>>);
// };

// export const getUserRequest = async (): Promise<
//   CustomResponse<TResponseUser<"user", TRawUser>>
// > => {
//   const url = ENDPOINTS.user;
//   return await fetchWithRefresh(url, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: localStorage.getItem("accessToken"),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   });
// };
// export const reversUserRequest = async () => {
//   const url = ENDPOINTS.user;
//   return await fetchWithRefresh(url, {
//     method: "PATH",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: localStorage.getItem("accessToken"),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   });
// };

// export const logoutRequest = async (): Promise<
//   CustomResponse<TResponseBody>
// > => {
//   const url = ENDPOINTS.logout;
//   return await fetchWithRefresh(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
//   });
// };

// export const forgotPasswordRequest = async (form: { email: string }):Promise<TResponseUser> => {
//   const url = ENDPOINTS.forgotPassword;
//   return await fetchWithRefresh(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(form),
//   });
// };
// export const resetPasswordRequest = async (form: {
//   email: string;
//   password: string;
// }):Promise<TResponseUser> => {
//   const url = ENDPOINTS.resetPassword;
//   return await fetchWithRefresh(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(form),
//   });
// };
