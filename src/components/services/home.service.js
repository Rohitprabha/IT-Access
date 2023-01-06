import { resolveOrigin } from "./configs";
import { resolveUserMail } from "./configs";

const host = resolveOrigin();

export function GetPendingApprovals(status) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    host + "/dashboard/request/" + status + "?manager=" + manager,
    options
  );
}

export function GetPendingAccess(status) {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    host + "/dashboard/approved/" + status + "?manager=" + manager,
    options
  );
}

export function GetPendingInactiveEmployees() {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    host + "/dashboard/emp/Inactive/app/granted?manager=" + manager,
    options
  );
}

export function GetPendingInactiveMangers() {
  var manager = resolveUserMail();
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    host + "/dashboard/manager/Inactive?manager=" + manager,
    options
  );
}
