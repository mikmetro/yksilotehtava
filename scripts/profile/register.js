import {
  checkIfUsernameAvailable,
  fetchData,
  postLogin,
  getCurrentUserByToken,
} from "../helpers.js";

const userData = await getCurrentUserByToken();
if (userData) window.location.replace("/profile");

const usernameError = document.querySelector("#username-error");
const emailError = document.querySelector("#email-error");

async function registerUser(event) {
  event.preventDefault();

  usernameError.textContent = "";
  emailError.textContent = "";

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const email = document.querySelector("#email").value;

  const registerData = {
    username,
    password,
    email,
  };

  const registerResult = await postRegister(registerData);

  if (registerResult.statusCode === 400) {
    if (registerResult.data.message === "Username or email already exists") {
      const usernameAvailable = await checkIfUsernameAvailable(username);
      if (!usernameAvailable) {
        usernameError.textContent = "Already exists! ";

        const rng = Math.floor(Math.random() * 999);
        const attemptUserName = `${username}${rng}`;

        if (!(await checkIfUsernameAvailable(attemptUserName))) {
          return;
        }

        const tryUsernameContainer = document.createElement("span");
        tryUsernameContainer.classList.add("login-try");
        tryUsernameContainer.textContent = `Use ${attemptUserName}?`;
        usernameError.appendChild(tryUsernameContainer);

        tryUsernameContainer.addEventListener(
          "click",
          () => (document.querySelector("#username").value = attemptUserName)
        );
      } else {
        emailError.textContent = "Already exists!";
      }
    }
  } else if (registerResult.statusCode === 200) {
    const loginResult = await postLogin(username, password);

    if (loginResult.statusCode === 200) {
      localStorage.setItem("token", loginResult.data.token);
      window.location.replace("/profile");
    }
  }
}

async function postRegister(registerData) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(registerData),
  };

  const registerResult = await fetchData("/users", fetchOptions);

  return registerResult;
}

document
  .querySelector(".login-card")
  .addEventListener("submit", (e) => registerUser(e));
