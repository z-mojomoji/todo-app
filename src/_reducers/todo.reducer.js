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
      
    // Add todo
    case todoConstants.ADD_REQUEST:
      return {};
    case todoConstants.ADD_SUCCESS:
      return {};
    case todoConstants.ADD_FAILURE:
      return {};

    // Edit todo
    case todoConstants.EDIT_REQUEST:
      return {};
    case todoConstants.EDIT_SUCCESS:
      return {};
    case todoConstants.EDIT_FAILURE:
      return {};

    // Delete todo
    case todoConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.id ? { ...todo, deleting: true } : todo
        ),
      };
    case todoConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((todo) => todo.id !== action.id),
      };
    case todoConstants.DELETE_FAILURE:
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
