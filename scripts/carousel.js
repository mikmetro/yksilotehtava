const restaurantsContainer = document.querySelector(
  ".main-restaurants-carousel"
);

function moveCarousel(direction) {
  if (
    !restaurantsContainer.children ||
    restaurantsContainer.children.length === 0
  )
    return;

  const itemWidth = restaurantsContainer.children.item(0).clientWidth;
  const currentScroll = restaurantsContainer
    .computedStyleMap()
    .get("transform")[0].x.value;

  if (direction === "right") {
    restaurantsContainer.style.transform = `translateX(${Math.max(
      currentScroll - itemWidth - (currentScroll % (itemWidth + 32)) - 32,
      -restaurantsContainer.scrollWidth + restaurantsContainer.clientWidth
    )}px)`;
  } else if (direction === "left") {
    restaurantsContainer.style.transform = `translateX(${Math.min(
      currentScroll + itemWidth - (currentScroll % (itemWidth + 32)) + 32,
      0
    )}px)`;
  }
}

function carouselHandler() {
  const leftButton = document.querySelector(".main-restaurants-left");
  const rightButton = document.querySelector(".main-restaurants-right");

  leftButton.addEventListener("click", () => moveCarousel("left"));
  rightButton.addEventListener("click", () => moveCarousel("right"));
}

export default carouselHandler();
