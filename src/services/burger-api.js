const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getItemsRequest = () => {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  return fetch(url).then(checkReponse);
};

export const postItemsRequest = (body) => {
  const url = "https://norma.nomoreparties.space/api/orders";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(checkReponse);
};
