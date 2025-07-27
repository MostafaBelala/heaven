`use strict`;

const header = document.querySelector("header");
const search = document.querySelector(
  ".infinte-scrolling-container__search-bar"
);
const searchBox = document.querySelector(
  ".infinte-scrolling-container__search-box"
);
const filter = document.querySelector(".infinte-scrolling-container__filter");

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    search.style.top = "78px";
  } else {
    search.style.top = "88px";
  }
});

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    filter.style.top = "152px";
  } else {
    filter.style.top = "162px";
  }
});

searchBox.addEventListener("click", (e) => {
  e.currentTarget.querySelector(
    ".infinte-scrolling-container__search-icon"
  ).innerHTML = `
   <svg width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="white" stroke-width="100"><path fill="#000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g><g id="SVGRepo_iconCarrier"><path fill="rgb(255, 174, 160)" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
  `;
  e.currentTarget
    .querySelector(".infinte-scrolling-container__searchh-icon-label")
    .classList.add("hidden");
  e.currentTarget.nextElementSibling.classList.remove("hidden");
});
