import { BehaviorSubject } from "rxjs";
import { toast } from "react-toastify";

import config from "config";
import { handleResponse } from "@/_helpers";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };

  return fetch(
    `https://cors-anywhere.herokuapp.com/${config.apiUrl}/Account/Login`,
    requestOptions
  )
    .then(handleResponse)
    .then((user) => {
      if (user.StatusCode !== 200) {
        toast.error(user.ResponseMessage);
      } else {
        localStorage.setItem("currentUser", JSON.stringify(user));
        currentUserSubject.next(user);

        return user;
      }
    })
    .catch((error) => {
      history.push("/Login");
      toast.error(error);
    });
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
