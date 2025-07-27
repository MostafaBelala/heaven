const makeSlider = (el, index = 0) => {
  let currentSlide = index;
  const emplementaion = (e) => {
    const generalMove = (slide) => {
      el.querySelector(".slider__container").style.transform = `translateX(${
        slide * 100
      }%)`;
    };
    if (e.target == e.currentTarget.querySelector(".btn__left")) {
      currentSlide++;
      if (
        currentSlide ==
        [...el.querySelector(".slider__container").children].length
      )
        currentSlide = 0;
      generalMove(currentSlide);
    }
    if (e.target == e.currentTarget.querySelector(".btn__right")) {
      if (currentSlide == 0)
        currentSlide = [...el.querySelector(".slider__container").children]
          .length;
      currentSlide--;
      generalMove(currentSlide);
    }
  };
  el.addEventListener("click", emplementaion);

  document
    .querySelector(".main-overlay .close")
    .addEventListener("click", () => {
      document.documentElement.style.overflowY = "visible";
      document.querySelector(`.full-page-slider`).classList.add("hidden");
      document.querySelector(".main-overlay").classList.add("hidden");
      removeEventListener(el, emplementaion);
    });
};

export { makeSlider };
