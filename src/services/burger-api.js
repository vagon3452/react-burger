const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
const ENDPOINTS = {
  login: "https://norma.nomoreparties.space/api/auth/login",
  register: "https://norma.nomoreparties.space/api/auth/register",
  ingredients: "https://norma.nomoreparties.space/api/ingredients",
  orders: "https://norma.nomoreparties.space/api/orders",
  user: "https://norma.nomoreparties.space/api/auth/user",
  logout: "https://norma.nomoreparties.space/api/auth/logout",
  forgotPassword: "https://norma.nomoreparties.space/api/password-reset",
  resetPassword: "https://norma.nomoreparties.space/api/password-reset/reset",
  refresh: "https://norma.nomoreparties.space/api/auth/token",
};

const refreshToken = async () => {
  const url = ENDPOINTS.refresh;
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

const createRequest =
  (endpoint, method = "GET") =>
  async (data) => {
    const url = endpoint;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(data),
    };
    if (method !== "GET") {
      requestOptions.headers.Authorization =
        localStorage.getItem("accessToken");
    }
    return await fetchWithRefresh(url, requestOptions);
  };
export const loginRequest = createRequest(ENDPOINTS.login, "POST");
export const registerRequest = createRequest(ENDPOINTS.register, "POST");
export const getItemsRequest = createRequest(ENDPOINTS.ingredients);
export const postItemsRequest = createRequest(ENDPOINTS.orders, "POST");
export const getUserRequest = createRequest(ENDPOINTS.user);
export const reversUserRequest = createRequest(ENDPOINTS.user, "PATCH");
export const logoutRequest = createRequest(ENDPOINTS.logout, "POST");
export const forgotPasswordRequest = createRequest(
  ENDPOINTS.forgotPassword,
  "POST"
);
export const resetPasswordRequest = createRequest(
  ENDPOINTS.resetPassword,
  "POST"
);

// export const getItemsRequest = async () => {
//   const url = `${BURGER_API_URL}/ingredients`;
//   return await fetch(url).then(checkResponse);
// };

// export const postItemsRequest = async (body) => {
//   const url = `${BURGER_API_URL}/orders`;
//   return await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   }).then(checkResponse);
// };

// export const loginRequest = async (form) => {
//   const url = `${BURGER_API_URL}/auth/login`;
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
//   }).then(checkResponse);
// };
// export const registerRequest = async (form) => {
//   const url = `${BURGER_API_URL}/auth/register`;
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
//   }).then(checkResponse);
// };

// export const getUserRequest = async () => {
//   const url = `${BURGER_API_URL}/auth/user`;
//   return await fetchWithRefresh(url, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("accessToken"),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   }).then(checkResponse);
// };
// export const reversUserRequest = async (form) => {
//   const url = `${BURGER_API_URL}/auth/user`;
//   return await fetchWithRefresh(url, {
//     method: "PATCH",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("accessToken"),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(form),
//   }).then(checkResponse);
// };

// export const logoutRequest = async () => {
//   const url = `${BURGER_API_URL}/auth/logout`;
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
//     body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
//   }).then(checkResponse);
// };

// export const forgotPasswordRequest = async (form) => {
//   const url = `${BURGER_API_URL}/password-reset`;
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
//   }).then(checkResponse);
// };
// export const resetPasswordRequest = async (form) => {
//   const url = `${BURGER_API_URL}/password-reset/reset`;
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
//   }).then(checkResponse);
// };
