function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

async function fetchData(endPoint, options) {
  const response = await fetch(
    "https://media2.edu.metropolia.fi/restaurant/api/v1" + endPoint,
    options
  );
  const data = await response.json();
  return { data, statusCode: response.status };
}

async function getCurrentUserByToken() {
  const userToken = localStorage.getItem("token");
  if (!userToken) return null;

  return await fetchData("/users/token", {
    Authorization: `Bearer: ${userToken}`,
  });
}

async function getRestaurants() {
  return await fetchData("/restaurants");
}

async function checkIfUsernameAvailable(username) {
  const response = await fetchData(`/users/available/${username}`, {});
  return response.data.available;
}

async function postLogin(username, password) {
  if (!username || !password) return;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };
  const loginResult = await fetchData("/auth/login", fetchOptions);

  return loginResult;
}

async function getRestaurantById(id) {
  if (!id) return null;
  return await fetchData(`/restaurants/${id}`, {});
}

async function getRestaurantWeeklyMenuById(id, lang) {
  return await fetchData(`/restaurants/weekly/${id}/${lang}`);
}

async function getRestaurantDailyMenuById(id, lang) {
  return await fetchData(`/restaurants/daily/${id}/${lang}`);
}

export {
  createElementWithClass,
  getRestaurants,
  getCurrentUserByToken,
  fetchData,
  checkIfUsernameAvailable,
  postLogin,
  getRestaurantById,
  getRestaurantWeeklyMenuById,
  getRestaurantDailyMenuById,
};
