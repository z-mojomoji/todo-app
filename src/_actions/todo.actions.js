import { todoConstants } from "../_constants";
import { todoService } from "../_services";

export const todoActions = {
  getTodoList,
  addTodo,
  removeTodo,
};

function getTodoList() {
  return (dispatch) => {
    dispatch(request());

    todoService.getTodoList().then(
      (todos) => dispatch(success(todos)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: todoConstants.GETALL_REQUEST };
  }
  function success(todos) {
    return { type: todoConstants.GETALL_SUCCESS, todos };
  }
  function failure(error) {
    return { type: todoConstants.GETALL_FAILURE, error };
  }
}

function addTodo(title, description) {
  return (dispatch) => {
    dispatch(request(title));

    todoService.addTodo(title, description).then(
      (title) => {
        dispatch(success(title));
        window.location.reload();
      },
      (error) => dispatch(failure(error.toString()))
    );
  };
  function request(title) {
    return { type: todoConstants.ADD_REQUEST, title };
  }
  function success(title) {
    return { type: todoConstants.ADD_SUCCESS, title };
  }
  function failure(error) {
    return { type: todoConstants.ADD_FAILURE, error };
  }
}

function removeTodo(id) {
  return (dispatch) => {
    dispatch(request(id));

    todoService.removeTodo(id).then(
      (todo) => {
        dispatch(success(todo._id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: todoConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: todoConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: todoConstants.DELETE_FAILURE, id, error };
  }
}
