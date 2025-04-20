const RADIUS_OF_EARTH = 6371;

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
    headers: {
      Authorization: `Bearer: ${userToken}`,
    },
  });
}

async function updateFavoriteRestaurant(favouriteRestaurant) {
  const userToken = localStorage.getItem("token");
  if (!userToken) return null;

  const fetchOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer: ${userToken}`,
    },
    body: JSON.stringify({
      favouriteRestaurant,
    }),
  };
  return await fetchData("/users", fetchOptions);
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

function distanceBetweenPoints(p1, p2) {
  const distanceLat = ((p2[0] - p1[0]) * Math.PI) / 180;
  const distanceLon = ((p2[1] - p1[1]) * Math.PI) / 180;

  const lat1Radians = (p1[0] * Math.PI) / 180;
  const lat2Radians = (p2[0] * Math.PI) / 180;

  const haversine =
    Math.sin(distanceLat / 2) ** 2 +
    Math.sin(distanceLon / 2) ** 2 *
      Math.cos(lat1Radians) *
      Math.cos(lat2Radians);

  const result = RADIUS_OF_EARTH * (2 * Math.asin(Math.sqrt(haversine)));

  return result;
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
  updateFavoriteRestaurant,
  distanceBetweenPoints,
};
