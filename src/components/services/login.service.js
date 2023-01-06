import { resolveOrigin } from "./configs";

const host = resolveOrigin();

export function LoginService(username, password) {
  let data = new Object();
  data.username = username;
  data.password = password;
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(data),
  };

  return fetch(host + "/login", options); 
}

export function storeDataToLocalStorage(userData) {
  userData = JSON.stringify(userData);
  localStorage.setItem("userData", userData);
}

export function logout() {
  localStorage.removeItem("userData");
  localStorage.removeItem("appData");
  window.location = "http://localhost:3000/";
}