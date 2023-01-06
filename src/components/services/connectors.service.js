import { resolveOrigin } from "./configs";

const host = resolveOrigin();

export function GetConnectors() {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/connector", options);
}

export function AddConnector(reqData) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };
  return fetch(host + "/connector", options);
}

export function UpdateConnector(record, _id) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  };
  return fetch(host + "/connector/" + _id, options);
}

export function DeleteConnector(record, _id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  };
  return fetch(host + "/connector/" + _id, options);
}

export function GetConnectorById(_id) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/connector/" + _id, options);
}

export function GetConnectorByName(name) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(host + "/connector/search/" + name, options);
}
