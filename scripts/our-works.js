`use strict`;

import { worksSliderData, projectsSliderData } from "./slidersData.js";
import { makeSlider } from "./slider.js";

const header = document.querySelector("header");
const tracksContainer = document.querySelector(".our-works-page__hero");

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

worksSliderData.forEach((e, i) => {
  let acc = "";
  e.slideImages.forEach((el, k) => {
    acc += `<div class="our-works-page__picture picture-${k + 1}">
      <img src="${el}" alt="" />
    </div> `;
  });
  const html = `
      <div class="our-works-page__work-details">
        <h2 class="our-works-page__work-details__title">${e.slideText.shortDescription}</h2>
        <p class="our-works-page__work-details__description">
          ${e.slideText.longDescription}
        </p>
        <address class="our-works-page__work-details__location">
          ${e.slideText.location}
        </address>
      </div>
      <div class="works-pictures">
        <div
          class="our-works-page__pictures-container"
          style="transform: translateX(0px)"
        >
          <div class="our-works-page__pictures-track">
            ${acc}
          </div>
          <div class="our-works-page__pictures-track">
            ${acc}
          </div>
        </div>
      </div>
  `;

  tracksContainer.innerHTML += html;
});

tracksContainer.addEventListener("click", (e) => {
  if (!e.target.closest(".our-works-page__pictures-track")) return;
  const currentSlider = document.querySelector(`.full-page-slider`);
  currentSlider.classList.remove("hidden");
  document.querySelector(".main-overlay").classList.remove("hidden");
  document.documentElement.style.overflowY = "hidden";
  const SlidesNumber = e.target
    .closest(".our-works-page__pictures-track")
    .querySelectorAll(".our-works-page__picture").length;

  currentSlider.querySelector(".slider__container").innerHTML = "";
  for (let i = 0; i < SlidesNumber; i++) {
    // * fullPageSlider -> slide`s img Attr
    console.log(
      e.target
        .closest(".our-works-page__pictures-track")
        .querySelector(`.picture-${i + 1}`)
        .querySelector("img")
        .getAttribute("src"),
      e.target.closest(".our-works-page__pictures-track")
    );
    const currentSliderSlide = e.target
      .closest(".our-works-page__pictures-track")
      .querySelector(`.picture-${i + 1}`)
      .querySelector("img")
      .getAttribute("src");

    // * fullPageSlider -> slide element
    const html = `<div class="slide slide--${i + 1}">
        <img src="${currentSliderSlide}" alt=""/>
        </div>`;

    // * fullPageSlider -> pushing slide element (uploading imgs)
    currentSlider.querySelector(".slider__container").innerHTML += html;
  }

  // * make the slider
  currentSlider.querySelector(
    ".slider__container"
  ).style.transform = `translateX(0px)`;

  makeSlider(currentSlider);
});
