import { baseUrl, processRes } from "./constants";

export const getClothing = () => {
  return fetch(`${baseUrl}/items`).then((res) => processRes(res));
};

export const addClothing = (card, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.imageUrl,
    }),
  }).then((res) => processRes(res));
};

export const deleteCard = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => processRes(res));
};

export const editProfile = (updatedInfo, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: updatedInfo.name,
      avatar: updatedInfo.avatarUrl,
    }),
  }).then((res) => processRes(res));
};

export const addLike = (id, user, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => processRes(res));
};

export const removeLike = (id, user, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => processRes(res));
};
