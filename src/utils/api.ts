// const ACCESS_TOKEN_KEY = "accessToken";
// const REFRESH_TOKEN_KEY = "refreshToken";

// type TRawUser = {
//     readonly email: string;
//     readonly name: string;
//   };
  
 
//   type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
//     [key in TDataKey]: TDataType;
//   } & {
//     success: boolean;
//     message?: string;
//     headers?: Headers;
//   };
//   type TResponseUser<TDataKey extends string = "", TDataType = {}> = {
//     [key in TDataKey]: TDataType;
//   } & {
//     success: boolean;
//     message?: string;
//     headers?: Headers;
//     accessToken:string;
//     refreshToken:string;
//   };
//   type TToken = {
//     success: boolean,
//     accessToken: string,
//     refreshToken: string
//   }


//   interface CustomBody<T extends any> extends Body {
//     json(): Promise<T>;
//   }
//   interface CustomResponse<T> extends CustomBody<T> {
//     readonly headers: Headers;
//     readonly ok: boolean;
//     readonly redirected: boolean;
//     readonly status: number;
//     readonly statusText: string;
//     readonly type: ResponseType;
//     readonly url: string;
//     clone(): Response;
//   }
//   export type TIngredient = {
//     readonly _id: string;
//     readonly name: string;
//     readonly type: string;
//     readonly proteins: number;
//     readonly fat: number;
//     readonly carbohydrates: number;
//     readonly calories: number;
//     readonly price: number;
//     readonly image: string;
//     readonly image_large: string;
//     readonly image_mobile: string;
//     readonly __v: number;
//   };
  

// enum ENDPOINTS {
//   login = "https://norma.nomoreparties.space/api/auth/login",
//   register = "https://norma.nomoreparties.space/api/auth/register",
//   ingredients = "https://norma.nomoreparties.space/api/ingredients",
//   orders = "https://norma.nomoreparties.space/api/orders",
//   user = "https://norma.nomoreparties.space/api/auth/user`",
//   logout = "https://norma.nomoreparties.space/api/auth/logout",
//   forgotPassword = "https://norma.nomoreparties.space/api/password-reset",
//   resetPassword = "https://norma.nomoreparties.space/api/password-reset/reset",
//   refresh = "https://norma.nomoreparties.space/api/auth/token",
// }

// const checkResponse = <T>(res:Response) => {
//   console.log(res);
//   return res.ok ? res.json() as Promise<T> : res.json().then((err) => Promise.reject(err));
// };

// const refreshToken = async ():Promise<TToken> => {
//   const url = ENDPOINTS.refresh;
//   return await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem(REFRESH_TOKEN_KEY),
//     }),
//   }).then(checkResponse<TToken>);
// };

// const fetchWithRefresh = async <T>(url:ENDPOINTS, options?: RequestInit) => {
//   try {
//     const res = await fetch(url, options);
//     return await checkResponse<T>(res);
//   } catch (err) {
//     if ((err as Error).message === "jwt expired") {
//       const refreshData = await refreshToken();
//       if (!refreshData.success) {
//         return Promise.reject(refreshData);
//       }
      
//       localStorage.setItem(REFRESH_TOKEN_KEY, refreshData.refreshToken);
//       localStorage.setItem(ACCESS_TOKEN_KEY, refreshData.accessToken);
//       // options.headers.authorization = refreshData.accessToken;
//       options = {
//         ...options,
//         headers: {
//           ...options?.headers,
//           authorization: refreshData.accessToken,
//         },
//       }
//       const res = await fetch(url, options);
//       return await checkResponse<T>(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };


// const createRequest = <T, D=undefined>(endpoint:ENDPOINTS, method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE") => async (data:D) => {
//   const url:ENDPOINTS = endpoint;
//   const requestOptions:RequestInit = {
//     headers: {
//       "Content-Type": "application/json",
//       authorization: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
//     },
//     method,
//     body:data && JSON.stringify(data),
//   };
//   return await fetchWithRefresh<T>(url, requestOptions);
// };

// export const loginRequest = createRequest<{ success: boolean; accessToken: string }>(ENDPOINTS.login, "POST");
// export const registerRequest = createRequest(ENDPOINTS.register, "POST");
// export const getItemsRequest = createRequest<TIngredient[]>(ENDPOINTS.ingredients, "GET");
// export const postItemsRequest = createRequest(ENDPOINTS.orders, "POST");
// export const getUserRequest = createRequest(ENDPOINTS.user, "GET");
// export const reversUserRequest = createRequest(ENDPOINTS.user, "PATCH");
// export const logoutRequest = createRequest(ENDPOINTS.logout, "POST");
// export const forgotPasswordRequest = createRequest(ENDPOINTS.forgotPassword,"POST");
// export const resetPasswordRequest = createRequest(ENDPOINTS.resetPassword,"POST");
export {}