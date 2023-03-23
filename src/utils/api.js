import { baseUrl } from "./constants";

const processRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothing = () => {
  return fetch(`${baseUrl}/items`).then((res) => processRes(res));
};

export const addClothing = (card) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.imageUrl,
    }),
  }).then((res) => processRes(res));
};

export const deleteCard = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => processRes(res));
};
