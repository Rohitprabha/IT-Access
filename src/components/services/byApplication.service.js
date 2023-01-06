import { resolveOrigin } from "./configs";
import { resolveUserMail } from "./configs";

const host = resolveOrigin();

export function GetApplicationName(name) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/access/applicationname/" + name + "?manager=" + manager, options);
}

export function GetEmployeesByApplication(id) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/access/application/" + id, options);
}

export function GetApplicationById(id) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/application/" + id, options);
}

export function ApplicationEmployeeAccess(reqData, id) {
  var options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };
  return fetch(host + "/access/employee/" + id, options);
}
