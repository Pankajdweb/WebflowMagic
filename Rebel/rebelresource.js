document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  // *1* Start Page loader code

  let tl = gsap.timeline();

  tl.to("[resource='title']", {
    y: "0%",
    duration: 0.3,
    ease: "circ.out",
  })
    .to("[resource='desc']", {
      y: "0%",
      duration: 0.3,
      ease: "circ.out",
    })
    .to("[resource='card']", {
      duration: 0.3,
      opacity: 1,
      ease: "circ.out",
    });

  // *1* End Page loader code
});

// Assuming you have a reference to your target element
var targetElement = $(".swiper-slide.swiper-slide-prev");

// Add a class to the previous sibling
targetElement.prev().addClass("previous-sibling-highlight");

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll("[rcard]");
  const popups = document.querySelectorAll("[rpoup]");

  console.log(cards);
  console.log(popups);

  gsap.set(popups, { opacity: 0, scale: 0.8, display: "none" });

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = this.getAttribute("rcard");
      const popup = document.querySelector(`[rpoup="${cardId}"]`);

      if (popup) {
        gsap.set(popup, { display: "block" });
        gsap.to(popup, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  });

  // Close popup animation
  document.querySelectorAll('[rpopup="close"]').forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const popup = this.closest("[rpoup]");
      gsap.to(popup, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        display: "none",
      });
    });
  });
});

// Popup Code

const toolHeader = document.querySelector("[tool='head']");
const toolBody = document.querySelector("[tool='body']");

if (toolHeader && toolBody) {
  const theaderHeight = toolHeader.offsetHeight;
  console.log(theaderHeight);
  toolBody.style.height = `calc(100% - ${theaderHeight}px)`;
  console.log(`calc(100vh - ${theaderHeight}px)`);
} else {
  console.error("Element(s) not found:", {
    toolHeader: !!toolHeader,
    toolBody: !!toolBody,
  });
}

///// last isScrollPastNavbar

// function isTouchDevice() {
//   return (
//     ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
//     window.innerWidth < 1025
//   );
// }

// const allowTouch = isTouchDevice();

var whatonSwiper = new Swiper("[tool-swiper]", {
  effect: "coverflow",
  loopAdditionalSlides: 2,
  mousewheel: true,
  loop: true,
  spaceBetween: 60,
  centeredSlides: false,
  slidesPerView: "auto",
  speed: 600,
  allowTouchMove: true, // ✅ Touch enabled if screen < 1025 and touch is available
  breakpoints: {
    768: {
      spaceBetween: 100,
    },
    992: {
      allowTouchMove: false,
    },
    1025: {
      spaceBetween: 100,
    },
  },
  lazyPreloadPrevNext: 5,
  initialSlide: 0,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 260,
    modifier: 0.5,
    slideShadows: true,
  },
});

// Slide to 1 if screen is min-width 768px
const mediaQueryws = window.matchMedia("(min-width: 768px)");
if (mediaQueryws.matches) {
  setTimeout(function () {
    whatonSwiper.slideTo(1, 1600);
  }, 900);
}
