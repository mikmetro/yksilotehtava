import { postLogin, getCurrentUserByToken } from "../helpers.js";

const userData = await getCurrentUserByToken();
if (userData) window.location.replace("/profile");

const loginError = document.querySelector(".login-error");

async function loginUser(event) {
  event.preventDefault();

  loginError.textContent = "";

  const username = document.querySelector("#username");
  const password = document.querySelector("#password");

  const loginResult = await postLogin(username, password);

  if (loginResult.statusCode === 200) {
    localStorage.setItem("token", loginResult.data.token);
    window.location.replace("/profile");
  } else {
    loginError.textContent = loginResult.data.message ?? "Unknown error";
  }
}

document
  .querySelector(".login-card")
  .addEventListener("submit", (e) => loginUser(e));
