import { getRestaurants } from "../helpers.js";

async function loadMap() {
  const restaurants = await getRestaurants();

  if (restaurants.statusCode !== 200) return;

  const map = L.map("map").setView([60.2, 25], 10);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  restaurants.data.forEach((i) =>
    L.marker(i.location.coordinates.reverse())
      .addTo(map)
      .bindPopup(`<h3>${i.name}</h3><p>${i.address}</p>`)
  );
}

export default loadMap();
