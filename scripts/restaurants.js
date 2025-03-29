import { createElementWithClass } from "./helpers.js";

async function loadRestaurants() {
  const response = await fetch(
    "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants"
  );
  const json = await response.json();

  const carousel = document.querySelector(".main-restaurants-carousel");

  for (const restaurant of json) {
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
