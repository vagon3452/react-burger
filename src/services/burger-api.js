import { getCookie } from "./cookie";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
  const url = "https://norma.nomoreparties.space/api/auth/token";
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getItemsRequest = async () => {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  return await fetch(url).then(checkResponse);
};

export const postItemsRequest = async (body) => {
  const url = "https://norma.nomoreparties.space/api/orders";
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
};

export const loginRequest = async (form) => {
  const url = "https://norma.nomoreparties.space/api/auth/login";
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};
export const registerRequest = async (form) => {
  const url = "https://norma.nomoreparties.space/api/auth/register";
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export const getUserRequest = async () => {
  const url = "https://norma.nomoreparties.space/api/auth/user";
  return await fetchWithRefresh(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(checkResponse);
};

export const logoutRequest = async () => {
  const url = "https://norma.nomoreparties.space/api/auth/logout";
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkResponse);
};

export const forgotPasswordRequest = async (form) => {
  const url = "https://norma.nomoreparties.space/api/password-reset";
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};
export const resetPasswordRequest = async (form) => {
  const url = "https://norma.nomoreparties.space/api/password-reset/reset.";
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};
