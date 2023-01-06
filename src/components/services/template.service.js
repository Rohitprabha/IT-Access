import { resolveOrigin } from "./configs";

const host = resolveOrigin();

export function GetTemplates() {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/template", options);
}

export function AddTemplate(reqData) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };
  return fetch(host + "/template", options);
}

export function UpdateTemplate(record, _id) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  };
  return fetch(host + "/template/" + _id, options);
}

export function DeleteTemplate(record, _id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  };
  return fetch(host + "/template/" + _id, options);
}

export function GetTemplateByName(name) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/template/search/" + name, options);
}
