const request = () => {
  const url = "https://norma.nomoreparties.space/api/ingredients";

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("get", url);

    xhr.responseType = "json";

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject(xhr.response);
    };

    xhr.send();
  });
};

export default request;
