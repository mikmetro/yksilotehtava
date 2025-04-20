import "../header.js";
import { getCurrentUserByToken } from "../helpers.js";

const userName = document.querySelector(".profile-user-name");
const favoriteName = document.querySelector(".profile-favorites-item-name");
const favoriteAddress = document.querySelector(
  ".profile-favorites-item-address"
);

document.querySelector(".profile-logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.assign("/");
});

async function loadProfileData() {
  const userResult = await getCurrentUserByToken();
  if (!userResult || userResult.statusCode !== 200)
    return window.location.replace("/profile/login.html");

  const userData = userResult.data;

  userName.textContent = userData.username;

  if (userData) {
  }

  console.log(userData);
}

loadProfileData();
