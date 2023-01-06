import { resolveOrigin } from "./configs";
import { resolveUserMail } from "./configs";

const host = resolveOrigin();

export function GetEmployeeByName(name) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/employee/empName/" + name + "?manager=" + manager, options);
}

export function EmployeeApplicationAccess(reqData, id) {
  var options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };
  return fetch(host + "/access/application/" + id, options);
}
