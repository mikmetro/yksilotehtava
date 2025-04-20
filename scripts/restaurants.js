import {
  createElementWithClass,
  distanceBetweenPoints,
  getRestaurants,
} from "./helpers.js";

const json = await getRestaurants();

navigator.geolocation.getCurrentPosition((v) => {
  Object.keys(json.data).forEach((i) => {
    const distance = distanceBetweenPoints(
      json.data[i].location.coordinates.reverse(),
      [v.coords.latitude, v.coords.longitude]
    );
    json.data[i].distance = distance;
  });

  json.data.sort((a, b) => a.distance - b.distance);

  loadRestaurants();
});

async function loadRestaurants() {
  const carousel = document.querySelector(".main-restaurants-carousel");
  carousel.innerHTML = "";

  for (const restaurant of json.data) {
    const container = createElementWithClass("div", "main-restaurants-item");

    const coverImage = document.createElement("img");
    coverImage.src = "https://placecats.com/neo_banana/300/200";

    const descriptionContainer = createElementWithClass(
      "div",
      "main-restaurants-item-description"
    );

    const restaurantName = createElementWithClass(
      "h3",
      "main-restaurants-item-description-name"
    );
    restaurantName.textContent = restaurant.name;
    const restaurantAddress = createElementWithClass(
      "span",
      "main-restaurants-item-description-address"
    );
    restaurantAddress.textContent = restaurant.address;
    const restaurantDistance = createElementWithClass(
      "span",
      "main-restaurants-item-description-distance"
    );

    if (restaurant.distance)
      restaurantDistance.textContent = `${restaurant.distance.toFixed(1)}km`;

    container.addEventListener("click", () => {
      window.location.assign(`/restaurant/?id=${restaurant._id}`);
    });

    descriptionContainer.append(
      restaurantName,
      restaurantAddress,
      restaurantDistance
    );
    container.append(coverImage, descriptionContainer);
    carousel.append(container);
  }
}

export default loadRestaurants();
