import { resolveOrigin } from "./configs";
import { resolveUserMail } from "./configs";

const host = resolveOrigin();

export function GetTemplateById(id) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/template/" + id, options);
}

export function UpTemplateById(id) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/template/" + id, options);
}

export function ShareApp(reqData) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };
  return fetch(host + "/access", options);
}

export function GetTemplateByEmail(mail) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/access/search/" + mail, options);
}

export function GetEmployeeByMailId(empId) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/access/employee/" + empId + "?manager=" + manager, options);
}

export function GetEmployeeById(empId) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/employee/" + empId + "?manager=" + manager, options);
}
