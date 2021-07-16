import { authenticationService } from "@/_services";

export function authHeader() {
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}

export function authHeaderWithType() {
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser.token}`,
    };
  } else {
    return {};
  }
}
