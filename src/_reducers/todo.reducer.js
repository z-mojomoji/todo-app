import { todoConstants } from "../_constants";

export function todos(state = {}, action) {
  switch (action.type) {
    case todoConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case todoConstants.GETALL_SUCCESS:
      return {
        items: action.todos,
      };
    case todoConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case todoConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.id ? { ...todo, deleting: true } : todo
        ),
      };
    case todoConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((todo) => todo.id !== action.id),
      };
    case todoConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((todo) => {
          if (todo.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...todoCopy } = todo;
            // return copy of user with 'deleteError:[error]' property
            return { ...todoCopy, deleteError: action.error };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
}
