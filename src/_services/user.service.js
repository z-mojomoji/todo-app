import config from "config";
import { authHeader, handleResponse } from "../_helpers";

export const userService = {
  login,
  logout,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${config.apiUrl}/users/auth`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    })
    .catch((error) => {
      history.push("/login");
      localStorage.removeItem("user");
    });
}

function logout() {
  localStorage.removeItem("user");
}
