import {
  getRestaurants,
  distanceBetweenPoints,
  createElementWithClass,
} from "./helpers.js";

async function Header() {
  const restaurantsResponse = await getRestaurants();

  if (restaurantsResponse.statusCode !== 200) return;
  const restaurants = restaurantsResponse.data;

  navigator.geolocation.getCurrentPosition((v) => {
    Object.keys(restaurants).forEach((i) => {
      const distance = distanceBetweenPoints(
        restaurants[i].location.coordinates.reverse(),
        [v.coords.latitude, v.coords.longitude]
      );
      restaurants[i].distance = distance;
    });

    restaurants.sort((a, b) => a.distance - b.distance);
  });

  const searchInput = document.querySelector(".header-search-content-input");
  const restaurantsContent = document.querySelector(
    ".header-search-content-restaurants"
  );

  searchInput.addEventListener("input", (e) => {
    const filteredRestaurants = Object.values(restaurants).filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    filteredRestaurants.sort((a, b) => a.distance - b.distance);
    restaurantsContent.innerHTML = "";

    for (let i = 0; i < Math.min(3, filteredRestaurants.length); i++) {
      console.log(i);
      const restaurantContainer = createElementWithClass(
        "a",
        "header-search-content-restaurants-container"
      );
      restaurantContainer.href = `/restaurant/?id=${filteredRestaurants[i]._id}`;

      const restaurantDetails = document.createElement("div");

      const restaurantName = document.createElement("h3");
      restaurantName.textContent = filteredRestaurants[i].name;
      const restaurantAddress = document.createElement("h3");
      restaurantAddress.textContent = `${filteredRestaurants[i].address}, ${filteredRestaurants[i].city}`;

      restaurantDetails.append(restaurantName, restaurantAddress);

      restaurantContainer.appendChild(restaurantDetails);

      if (filteredRestaurants[i].distance) {
        const restaurantDistance = createElementWithClass(
          "p",
          "header-search-content-restaurants-distance"
        );
        restaurantDistance.textContent = `${filteredRestaurants[
          i
        ].distance.toFixed(1)}km`;
        restaurantContainer.appendChild(restaurantDistance);
      }
      restaurantsContent.appendChild(restaurantContainer);
    }
  });

  restaurantsContent.addEventListener("mousedown", (e) => {
    if (document.activeElement === searchInput) e.preventDefault();
  });
}

export default Header();
