import { baseUrl } from "../utils/constants";

export const signUp = (avatar, email, name, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar, email, name, password }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .then((data) => {
      signIn(data.email, data.password);
    })
    .catch((err) => console.log(err));
};

export const signIn = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        console.log(data);
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
