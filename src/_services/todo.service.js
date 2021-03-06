import config from "config";
import { authHeader, handleResponse } from "../_helpers";

export const todoService = {
  getTodoList,
  editTodo,
  addTodo,
  removeTodo,
};

function getTodoList() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function addTodo(title, description) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  };

  return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function editTodo(id, title, description) {
  const data = {
    title: title,
    description: description
  }
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(
    handleResponse
  );
}

function removeTodo(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(
    handleResponse
  );
}
