import { createElementWithClass, getRestaurants } from "./helpers.js";

async function loadRestaurants() {
  const json = await getRestaurants();

  const carousel = document.querySelector(".main-restaurants-carousel");

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
