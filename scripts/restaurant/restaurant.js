import {
  createElementWithClass,
  getRestaurantById,
  getRestaurantDailyMenuById,
  getRestaurantWeeklyMenuById,
  updateFavoriteRestaurant,
} from "../helpers.js";
import "../header.js";

const restaurantMain = document.querySelector(".restaurant-main");

const searchParams = new URLSearchParams(window.location.search);
const restaurantId = searchParams.get("id");
const restaurantResult = await getRestaurantById(restaurantId);
const restaurantDailyMenu = await getRestaurantDailyMenuById(restaurantId);
const restaurantWeeklyMenu = await getRestaurantWeeklyMenuById(restaurantId);

const restaurantName = document.querySelector(".restaurant-name");
const restaurantAddress = document.querySelector(".restaurant-address");
const restaurantCourses = document.querySelector(".restaurant-courses-listing");
const restaurantSelect = document.querySelector(".restaurant-select");
const restaurantSelectSlider = document.querySelector(
  ".restaurant-select-slider"
);
const restaurantFavorite = document.querySelector(".restaurant-favorite");

let isWeeklyMenu = false;

swapMenuType();

restaurantSelect.addEventListener("click", swapMenuType);

if (restaurantResult.statusCode === 200) {
  const restaurantData = restaurantResult.data;
  console.log(restaurantData);
  restaurantName.textContent = restaurantData.name;
  restaurantAddress.textContent = `${restaurantData.address}, ${restaurantData.city}`;

  restaurantFavorite.addEventListener("click", async () => {
    console.log(restaurantData._id);
    const x = await updateFavoriteRestaurant(restaurantData._id);
    console.log(x);
  });

  loadMenu();
} else {
  restaurantMain.innerHTML = "";

  const errorContainer = createElementWithClass("div", "restaurant-error");

  const errorCode = document.createElement("h1");
  errorCode.textContent = "404";

  const errorMessage = document.createElement("h3");
  errorMessage.textContent = "Restaurant not found";
  errorContainer.append(errorCode, errorMessage);

  restaurantMain.appendChild(errorContainer);
}

function loadMenu() {
  restaurantCourses.innerHTML = "";
  if (isWeeklyMenu) {
    for (const menuItem of restaurantWeeklyMenu.data.days) {
      console.log(menuItem);

      const courseContainer = createElementWithClass(
        "div",
        "restaurant-course-item"
      );

      const courseDate = createElementWithClass(
        "h3",
        "restaurant-course-item-date"
      );
      courseDate.textContent = menuItem.date;
      courseContainer.appendChild(courseDate);

      for (const course of menuItem.courses) {
        const courseList = createElementWithClass(
          "div",
          "restaurant-course-item-list"
        );

        const courseName = document.createElement("h4");
        courseName.textContent = course.name;

        const coursePrice = document.createElement("p");
        coursePrice.textContent = course.price;

        const courseDiets = document.createElement("p");
        courseDiets.textContent = course.diets;

        courseList.append(courseName, coursePrice, courseDiets);
        courseContainer.appendChild(courseList);
      }

      restaurantCourses.appendChild(courseContainer);
    }
  } else {
    for (const course of restaurantDailyMenu.data.courses) {
      const courseList = createElementWithClass(
        "div",
        "restaurant-course-item-list"
      );

      const courseName = document.createElement("h4");
      courseName.textContent = course.name;

      const coursePrice = document.createElement("p");
      coursePrice.textContent = course.price;

      const courseDiets = document.createElement("p");
      courseDiets.textContent = course.diets;

      courseList.append(courseName, coursePrice, courseDiets);

      restaurantCourses.appendChild(courseList);
    }
  }
}

function swapMenuType() {
  isWeeklyMenu = !isWeeklyMenu;
  restaurantSelectSlider.style = isWeeklyMenu
    ? "left: 0.5em"
    : "left: calc(50% + 0.25em)";
  loadMenu();
}
