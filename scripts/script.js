`use strict`;

// ! imports:
import { getSlideWidth } from "./slider-utils.js";
import { makeSlider } from "./slider.js";
import { worksSliderData } from "./slidersData.js";
import { projectsSliderData } from "./slidersData.js";

// ! selectors:
const nav = document.querySelector(".nav");
const header = document.querySelector("header");
const sections = document.querySelectorAll(".translate-section");
const projectsSliderContainer = document.querySelector(".projects .grid");

const projects = document.querySelector(".projects");
const animatedComponents = document.querySelectorAll(".main-component");
const overlay = document.querySelector(".main-overlay");
const closeButton = document.querySelector(".main-overlay .close");
const goUp = document.querySelector(".go-up");
const changePhone = document.querySelector("button.btn-quote");

const worksSlider = document.querySelector(".works-pictures.slider");
// const projectsSlider = document.querySelector(".projects-slider");
const animatedTypedPara = document.querySelectorAll(".auto-typing");
const worksSliderContainer = document.querySelector(
  ".works-pictures .slider__container"
);
const worksSliderBtns = document.querySelector(".our-works .slider__btns");
const increasingNumbers = document.querySelectorAll(".increasing-number");
const hamburger = document.querySelector(".hamburger");
const navLinksList = document.querySelector(".nav__links");

// ! DOM stuff
const increasingNumberObserverImplementaion = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // let time = 100;
      const span = entry.target.querySelector("span");
      let increasing = 0;
      const autotyping = setInterval(() => {
        span.textContent = ++increasing;
        // time += 1000;
        if (increasing == entry.target.getAttribute("data-number"))
          clearInterval(autotyping);
      }, 100); // time
      observer.unobserve(entry.target);
    }
  });
};

const increasingNumberObserver = new IntersectionObserver(
  increasingNumberObserverImplementaion,
  {
    root: null,
    threshold: 0,
    // rootMargin: "50px",
  }
);

increasingNumbers.forEach((increasingNumber) =>
  increasingNumberObserver.observe(increasingNumber)
);
changePhone.addEventListener("mouseover", (e) => {
  e.currentTarget.querySelector("img").src = "imgs/phone.png";
});
changePhone.addEventListener("mouseout", (e) => {
  e.currentTarget.querySelector("img").src = "imgs/telephone.png";
});

const autoTypingMechanism = () => {
  const autoTypedTextObserverImplementation = (entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry.target);
      if (entry.isIntersecting) {
        const copiedPara = entry.target.textContent
          .trim(" ")
          .split(" ")
          .filter((w) => w)
          .join(" ");
        // animatedTypedPara.innerHTML = `<span style="height: 30px; width: 21px; background-color: rgb(114, 114, 114);"></span>`;
        entry.target.innerHTML = `<span class="typed-text"></span>`;
        const typedSpan = entry.target.querySelector(".typed-text");
        let i = 0;
        const autotyping = setInterval(() => {
          typedSpan.textContent += copiedPara[i];
          i++;
          if (i === copiedPara.length) clearInterval(autotyping);
        }, 50);
        observer.unobserve(entry.target);
      }
    });
  };
  const autoTypedTextObserver = new IntersectionObserver(
    autoTypedTextObserverImplementation,
    {
      root: null,
      threshold: 0,
      rootMargin: "100px",
    }
  );
  animatedTypedPara.forEach((animatedTypedP) =>
    autoTypedTextObserver.observe(animatedTypedP)
  );
};
autoTypingMechanism();

const stickyHeaderMechanism = () => {
  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 0) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
};
stickyHeaderMechanism();

const animatedComponentMechanism = () => {
  const animatedComponentImplementation = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("heading-filling");
      }
    });
  };
  const animatedComponentObserver = new IntersectionObserver(
    animatedComponentImplementation,
    {
      root: null,
      threshold: 0,
      // rootMargin: "100px",
    }
  );
  animatedComponents.forEach((c) => animatedComponentObserver.observe(c));
};
animatedComponentMechanism();

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 300) {
    goUp.classList.remove("hidden");
  } else {
    goUp.classList.add("hidden");
  }
});

const sliderMechanithm = () => {
  // reseting transform property of the container
  worksSlider.querySelector(
    ".slider__container"
  ).style.transform = `translateX(0px)`;

  // ! logic of our-works section main slider

  worksSlider.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    // ! keyDown Event
    // document.addEventListener("keydown", (e) => {
    //   console.log(e.key);
    //   console.log(111);
    //   e.key = "rightArrow" && console.log("yes");
    // });

    // ^ slider`s core logic
    if (e.target == e.currentTarget) return;
    // ^ works full-slider
    else {
      const currentSlider = document.querySelector(`.full-page-slider`);
      currentSlider.classList.remove("hidden");
      overlay.classList.remove("hidden");
      document.documentElement.style.overflowY = "hidden";
      const SlidesNumber = e.target
        .closest(".slide")
        .querySelectorAll(".picture").length;
      currentSlider.querySelector(".slider__container").innerHTML = "";
      for (let i = 0; i < SlidesNumber; i++) {
        // * fullPageSlider -> slide`s img Attr
        const currentSliderSlide = e.target
          .closest(".slide")
          .querySelectorAll(".picture")
          [i].querySelector("img")
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
    }
  });
  let currentTranslate = 0;
  let flag = true;
  worksSliderBtns.addEventListener("click", (e) => {
    //////////////////////////////////////////////////////////////
    // ^ slider container selector
    const worksSliderContainer =
      worksSlider.querySelector(".slider__container");

    // ^ worksSliderContainer Co-ordinates
    const worksSliderLeftTranslate =
      -worksSliderContainer.getBoundingClientRect().x;
    const worksSliderRightTranslate =
      worksSliderContainer.getBoundingClientRect().width -
      worksSliderLeftTranslate -
      window.innerWidth +
      32;

    if (worksSliderRightTranslate == 0 || worksSliderLeftTranslate == -20)
      flag = true;
    // ^ Left Tarslate
    const cardWidth = getSlideWidth(
      worksSliderContainer.querySelector(".slide")
    );

    let worksSliderSlideActualLeftTranslate;

    if (cardWidth < worksSliderLeftTranslate) {
      console.log(flag);
      worksSliderSlideActualLeftTranslate = flag
        ? cardWidth + 40
        : cardWidth + 20;
      flag = false;
    } else {
      worksSliderSlideActualLeftTranslate = worksSliderLeftTranslate + 20;
    }

    // ^ Right Tarslate
    let worksSliderSlideActualRightTranslate;
    if (cardWidth < worksSliderRightTranslate) {
      console.log(flag);
      worksSliderSlideActualRightTranslate = flag
        ? -cardWidth - 40
        : -cardWidth - 20;
      flag = false;
    } else {
      worksSliderSlideActualRightTranslate = -worksSliderRightTranslate;
    }
    //////////////////////////////////////////////////////////////

    if (e.target == e.currentTarget || e.target.closest("a")) return;
    else if (e.target == e.currentTarget.querySelector(".btn__left")) {
      currentTranslate += worksSliderSlideActualLeftTranslate;
      worksSliderContainer.style.transform = `translateX(${currentTranslate}px)`;
    } else if (e.target == e.currentTarget.querySelector(".btn__right")) {
      currentTranslate += worksSliderSlideActualRightTranslate;
      worksSliderContainer.style.transform = `translateX(${currentTranslate}px)`;
    }
  });

  // projects.addEventListener("click", (e) => {
  //   if (
  //     e.target == e.currentTarget.querySelector("button") ||
  //     e.target.closest(".image")
  //   ) {
  //     const currentSlider = document.querySelector(`.full-page-slider`);
  //     currentSlider.classList.remove("hidden");
  //     overlay.classList.remove("hidden");
  //     document.documentElement.style.overflowY = "hidden";
  //     const SlidesNumber = e.currentTarget.querySelectorAll(".image").length;
  //     currentSlider.querySelector(".slider__container").innerHTML = "";
  //     for (let i = 0; i < SlidesNumber; i++) {
  //       // fullPageSlider -> slide`s img Attr
  //       const currentSliderSlide = e.currentTarget
  //         .querySelectorAll(".image")
  //         [i].querySelector("img")
  //         .getAttribute("src");

  //       const currentSliderSlideDescription = e.currentTarget
  //         .querySelectorAll(".image")
  //         [i].querySelector(".description").textContent;

  //       const currentSliderSlidePergolasName = e.currentTarget
  //         .querySelectorAll(".image")
  //         [i].querySelector(".title").textContent;

  //       // fullPageSlider -> slide element
  //       const html = `
  //       <div class="slide slide--${i + 1}">
  //         <img src="${currentSliderSlide}" alt=""/>
  //         <div class="project-slide__container">
  //           <div class="project-slide__info">
  //             <div class="project-slide__title">${currentSliderSlidePergolasName}</div>
  //             <div class="project-slide__description">${currentSliderSlideDescription}</div>
  //           </div>
  //           <div class="image"><img src="imgs/whatsapp.svg" atr=""/></div>
  //         </div>
  //       </div>
  //       `;

  //       // ! fullPageSlider -> pushing slide element (uploading imgs)
  //       currentSlider.querySelector(".slider__container").innerHTML += html;
  //     }
  //     const transformCondition =
  //       e.target == e.currentTarget.querySelector("button")
  //         ? 0
  //         : e.target.closest(".image").getAttribute("data-imageNumber") - 1;
  //     // make the slider
  //     currentSlider.querySelector(
  //       ".slider__container"
  //     ).style.transform = `translateX(calc( ${transformCondition} * 100%))`;

  //     makeSlider(currentSlider, transformCondition);
  //   }
  // });
};
sliderMechanithm();

hamburger.addEventListener("click", (e) => {
  hamburger.classList.toggle("active");
  document.querySelector("header ul").classList.toggle("active");
});

navLinksList.addEventListener("click", (e) => {
  if (e.target.closest("li") && document.documentElement.offsetWidth < 1105) {
    hamburger.classList.toggle("active");
    e.currentTarget.classList.toggle("active");
  }
});

// ! add sliders` data by JS
worksSliderData.forEach((e, i) => {
  if (i < 4) {
    let acc = "";
    e.slideImages.forEach((el) => {
      acc += `<div class="picture">
      <img src="${el}" alt="" />
    </div> `;
    });
    const html = `
        <div class="work-station-container slide">
          <div class="work-station" data-number="${i + 1}">
            ${acc}
          </div>
          <div class="up-box">
            <div class="address">
              <p>${e.slideText.location}</p>
            </div>
            <div class="short-description">
              <p>${e.slideText.shortDescription}</p>
            </div>
            <div class="long-description">
              <p>${e.slideText.longDescription}</p>
            </div>
          </div>
        </div>`;
    worksSliderContainer.innerHTML += html;
  }
});

const screenWidth = document.documentElement.offsetWidth;

const numOfDisplayedImages =
  screenWidth < 515 ? 4 : screenWidth < 1110 ? 6 : 12;

for (let i = 0; i < numOfDisplayedImages; i++) {
  const html = `
        <div class="image" data-imageNumber="${i + 1}">
          <img src="${projectsSliderData.slideImages[i]}" alt="${
    projectsSliderData.altText[i]
  }" />
          <div class="up-box">
            <div class="title">${projectsSliderData.titles[i]}</div>
            <div class="description">
              ${projectsSliderData.describtion[i].slice(0, 100)}
              <span style="color: blue;">...المزيد</span>
            </div>
          </div>
        </div>`;
  projectsSliderContainer.innerHTML += html;
}

let projectsSliderImplementation = (e) => {
  if (
    e.target == e.currentTarget.querySelector("button") ||
    e.target.closest(".image")
  ) {
    const currentSlider = document.querySelector(`.full-page-slider`);
    currentSlider.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.documentElement.style.overflowY = "hidden";
    const SlidesNumber = e.currentTarget.querySelectorAll(".image").length;
    currentSlider.querySelector(".slider__container").innerHTML = "";
    for (let i = 0; i < SlidesNumber; i++) {
      // fullPageSlider -> slide`s img Attr
      const currentSliderSlide = e.currentTarget
        .querySelectorAll(".image")
        [i].querySelector("img")
        .getAttribute("src");

      const currentSliderSlideDescription = e.currentTarget
        .querySelectorAll(".image")
        [i].querySelector(".description").textContent;

      const currentSliderSlidePergolasName = e.currentTarget
        .querySelectorAll(".image")
        [i].querySelector(".title").textContent;

      // fullPageSlider -> slide element
      const html = `
        <div class="slide slide--${i + 1}">
          <img src="${currentSliderSlide}" alt=""/>
          <div class="project-slide__container">
            <div class="project-slide__info">
              <div class="project-slide__title">${currentSliderSlidePergolasName}</div>
              <div class="project-slide__description">${currentSliderSlideDescription}</div>
            </div>
            <div class="image"><img src="imgs/whatsapp.svg" atr=""/></div>
          </div>
        </div>
        `;

      // ! fullPageSlider -> pushing slide element (uploading imgs)
      currentSlider.querySelector(".slider__container").innerHTML += html;
    }
    const transformCondition =
      e.target == e.currentTarget.querySelector("button")
        ? 0
        : e.target.closest(".image").getAttribute("data-imageNumber") - 1;
    // make the slider
    currentSlider.querySelector(
      ".slider__container"
    ).style.transform = `translateX(calc( ${transformCondition} * 100%))`;

    makeSlider(currentSlider, transformCondition);
  }
};

projects.addEventListener("click", projectsSliderImplementation);

if (document.documentElement.offsetWidth <= 515) {
  projects.removeEventListener("click", projectsSliderImplementation);
}

const sectionObserverImplementation = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry.target);
      entry.target.style.transform = `translateY(0)`;
      entry.target.style.opacity = `1`;
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(
  sectionObserverImplementation,
  {
    root: null,
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// map

var map = L.map("location").setView([30.384515, 31.259784], 13);

L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([30.384515, 31.259784])
  .addTo(map)
  .bindPopup("القليوبية, مصر")
  .openPopup();

// ! submit form data
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(this);

  const name = data.get("name");
  const message = data.get("message");

  const phoneNumber = "201146184055";

  const url = `https://wa.me/${phoneNumber}?text=مرحبا أنا اسمى${name}%0A${message}`;

  window.open(url, "_blank");
});
