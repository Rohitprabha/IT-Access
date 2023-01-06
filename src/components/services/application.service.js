import { resolveOrigin } from "./configs";

const host = resolveOrigin();

export function GetApplications() {
    var options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(host + "/application", options);
}

export function AddApplication(reqData) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
    };
    return fetch(host + "/application", options);
}

export function UpdateApplication(record, _id) {
    var options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
    };
    return fetch(host + "/application/" + _id, options);
}


export function DeleteApplicaion(record, _id) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
    };
    return fetch(host + "/application/" + _id, options);
}

export function GetApplicationByName(name) {
    var options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(host + "/application/search/" + name, options);
}
