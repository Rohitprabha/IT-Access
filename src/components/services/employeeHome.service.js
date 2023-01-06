import { resolveOrigin } from "./configs";

const host = resolveOrigin();

export function GetAppDetails(reqBody) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    host + "/dashboard/emp/" + reqBody.empId + "/" + reqBody.appId,
    options
  );
}

export function RemainderEMail(reqData) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };
  return fetch(host + "/reminder/access", options);
}