import { getCurrentUserByToken } from "../helpers.js";

async function loadProfileData() {
  const userData = await getCurrentUserByToken();
  if (!userData) return window.location.replace("/profile/login.html");
}

loadProfileData();
