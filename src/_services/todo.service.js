import config from "config";
import { authHeader, handleResponse } from "../_helpers";

export const todoService = {
  getTodoList,
  getTodoById,
  editTodo,
  removeTodo,
};

function getTodoList() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function getTodoById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(
    handleResponse
  );
}

function editTodo(todo) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  };

  return fetch(`${config.apiUrl}/todos/${todo.id}`, requestOptions).then(
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
