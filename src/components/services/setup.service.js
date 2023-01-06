import { resolveOrigin } from "./configs";
import { resolveUserMail } from "./configs";

const host = resolveOrigin();

export function GetEmployees() {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/employee?manager=" + manager, options);
}

export function AddEmployee(reqData) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };
  return fetch(host + "/employee", options);
}

export function UpdateEmployee(record, _id) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  };
  return fetch(host + "/employee/" + _id, options);
}

export function DeleteEmployee(record, _id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  };
  return fetch(host + "/employee/" + _id, options);
}

export function GetEmployeeByMail(mail) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/employee/search/" + mail + "?manager=" + manager, options);
}

export function GetEmployeeByMailWithParam(mail) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    host +
      "/employee/search/" +
      mail +
      "?checkaccess=Y" +
      "&manager=" +
      manager ,
    options
  );
}
