import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "./actions/user";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const BURGER_API_URL = "https://norma.nomoreparties.space/api";
const ENDPOINTS = {
  login: `${BURGER_API_URL}/auth/login`,
  register: `${BURGER_API_URL}/auth/register`,
  ingredients: `${BURGER_API_URL}/ingredients`,
  orders: `${BURGER_API_URL}/orders`,
  user: `${BURGER_API_URL}/auth/user`,
  logout: `${BURGER_API_URL}/auth/logout`,
  forgotPassword: `${BURGER_API_URL}/password-reset`,
  resetPassword: `${BURGER_API_URL}/password-reset/reset`,
  refresh: `${BURGER_API_URL}/auth/token`,
};

const refreshToken = async () => {
  const url = ENDPOINTS.refresh;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(REFRESH_TOKEN_KEY),
    }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshData.refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const createRequest = (endpoint, method) => async (data) => {
  const url = endpoint;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem(ACCESS_TOKEN_KEY),
    },
    method,
    body: JSON.stringify(data),
  };
  return await fetchWithRefresh(url, requestOptions);
};
export const loginRequest = createRequest(ENDPOINTS.login, "POST");
export const registerRequest = createRequest(ENDPOINTS.register, "POST");
export const getItemsRequest = createRequest(ENDPOINTS.ingredients, "GET");
export const postItemsRequest = createRequest(ENDPOINTS.orders, "POST");
export const getUserRequest = createRequest(ENDPOINTS.user, "GET");
export const reversUserRequest = createRequest(ENDPOINTS.user, "PATCH");
export const logoutRequest = createRequest(ENDPOINTS.logout, "POST");
export const forgotPasswordRequest = createRequest(ENDPOINTS.forgotPassword,"POST");
export const resetPasswordRequest = createRequest(ENDPOINTS.resetPassword,"POST");
