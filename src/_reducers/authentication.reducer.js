import { userConstants } from "../_constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      console.log("login request");
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      console.log("login success");
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      console.log("login failure");
      return {};
    case userConstants.LOGOUT:
      console.log("logout");
      return {};
    default:
      console.log("default");
      return state;
  }
}
