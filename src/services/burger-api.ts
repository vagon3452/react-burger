import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "./auth/constants";
import {
  TRegister,
  IGetUser,
  IMessage,
  TEmail,
  TBodyReset,
  TToken,
  TUser,
  TBodyLogin,
  TTokens,
} from "./auth/types";
import {
  IGetItem,
  IOrderRequest,
  IBodyOrder,
  TOrderRequestFromNumber,
} from "./order/types";

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

const checkResponse = <T>(res: Response): Promise<T> => {
  return res?.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async (): Promise<TTokens> => {
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

const fetchWithRefresh = async <T>(url: string, options: RequestInit) => {
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

type TResponse =
  | TTokens
  | TRegister
  | IGetItem
  | IOrderRequest
  | IGetUser
  | IMessage;

type TForm = TBodyReset | TEmail | TToken | IBodyOrder | TUser | TBodyLogin;

const createRequest =
  <T extends TResponse, D extends TForm>(
    endpoint: ENDPOINTS,
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
  ) =>
  async (form: D) => {
    const url: ENDPOINTS = endpoint;
    const requestOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(form),
    };
    return await fetchWithRefresh<T>(url, requestOptions);
  };
const itemsCreateRequest =
  <T extends TResponse>(endpoint: ENDPOINTS, method: "GET") =>
  async () => {
    const url: ENDPOINTS = endpoint;
    const requestOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method,
    };
    return await fetchWithRefresh<T>(url, requestOptions);
  };

const authCreateRequest =
  <T extends TResponse, D>(endpoint: ENDPOINTS, method: "PATCH") =>
  async (form: D) => {
    const url: ENDPOINTS = endpoint;
    const requestOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
      },
      method,
      body: JSON.stringify(form),
    };
    return await fetchWithRefresh<T>(url, requestOptions);
  };

const userCreateRequest =
  <T extends TResponse>(endpoint: ENDPOINTS, method: "GET") =>
  async () => {
    const url: ENDPOINTS = endpoint;
    const requestOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
      },
      method,
    };
    return await fetchWithRefresh<T>(url, requestOptions);
  };

export const loginRequest = createRequest<TRegister, TBodyLogin>(
  ENDPOINTS.login,
  "POST"
);
export const registerRequest = createRequest<TRegister, TUser>(
  ENDPOINTS.register,
  "POST"
);
export const getItemsRequest = itemsCreateRequest<IGetItem>(
  ENDPOINTS.ingredients,
  "GET"
);
export const postItemsRequest = createRequest<IOrderRequest, IBodyOrder>(
  ENDPOINTS.orders,
  "POST"
);
export const getUserRequest = userCreateRequest<IGetUser>(
  ENDPOINTS.user,
  "GET"
);
export const updateUserRequest = authCreateRequest<IGetUser, TUser>(
  ENDPOINTS.user,
  "PATCH"
);
export const logoutRequest = createRequest<IMessage, TToken>(
  ENDPOINTS.logout,
  "POST"
);
export const forgotPasswordRequest = createRequest<IMessage, TEmail>(
  ENDPOINTS.forgotPassword,
  "POST"
);
export const resetPasswordRequest = createRequest<IMessage, TBodyReset>(
  ENDPOINTS.resetPassword,
  "POST"
);

export const getOrderRequest = async (
  number: string
): Promise<TOrderRequestFromNumber> => {
  const url = `${ENDPOINTS.orders}/${number}`;
  const requestOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
    },
  };

  return await fetchWithRefresh(url, requestOptions);
};
