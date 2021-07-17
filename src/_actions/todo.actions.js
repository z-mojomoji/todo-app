import { todoConstants } from "../_constants";
import { todoService } from "../_services";

export const todoActions = {
  getTodoList,
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

function removeTodo(id) {
  return (dispatch) => {
    dispatch(request(id));

    todoService.removeTodo(id).then(
      (todo) => dispatch(success(id)),
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
