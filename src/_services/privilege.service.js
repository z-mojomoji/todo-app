import config from "config";
import { authHeader, authHeaderWithType, handleResponse } from "@/_helpers";
import { toast } from "react-toastify";

export const privilegeService = {
  getPrivilege,
  redeemPrivilege,
};

function getPrivilege() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `https://cors-anywhere.herokuapp.com/${config.apiUrl}/Privilege/PrivilegeDetail`,
    requestOptions
  ).then(handleResponse);
}

function redeemPrivilege(privilege_id) {
  const requestOptions = {
    method: "POST",
    headers: authHeaderWithType(),
    body: JSON.stringify({ privilege_id }),
  };

  return fetch(
    `https://cors-anywhere.herokuapp.com/${config.apiUrl}/Privilege/RedeemPrivilege`,
    requestOptions
  )
    .then(handleResponse)
    .then((privilege) => {
      console.log("status code", privilege.StatusCode);
      console.log("status ResponseMessage", privilege.ResponseMessage);
      if (privilege.StatusCode !== 200) {
        toast.error(privilege.ResponseMessage);
      } else {
        return privilege;
      }
    })
    .catch((error) => {
      history.push("/Login");
      toast.error(error);
    });
}
