const ppswiperHolder = document.querySelector(".sec-features");

const ppswiper = new Swiper("[ppswiper]", {
  autoplay: false, // Disable autoplay initially
  slidesPerView: 1,
  effect: "fade",
  on: {
    init: function () {
      startProgress(0);
      setupDotboxClick();
      updateActiveDot(0);
    },
    slideChange: function () {
      startProgress(ppswiper.activeIndex);
      updateActiveDot(ppswiper.activeIndex);
    },
  },
});

// Start autoplay only when .pay-performance-slider enters view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        ppswiper.params.autoplay = {
          delay: 5000,
          disableOnInteraction: false,
        };
        ppswiper.autoplay.start(); // Start autoplay with delay
        observer.disconnect(); // Trigger only once
      }
    });
  },
  { threshold: 0.01 }
);

const target = document.querySelector(".sec-features");
if (target) {
  observer.observe(target);
}

function startProgress(activeIndex) {
  let dotboxes = document.querySelectorAll("[ppslidebtn]");
  let lines = document.querySelectorAll("[ppslidebtn] .line");

  dotboxes.forEach((dotbox, index) => {
    // Remove "progress-done" from all dotboxes before animation starts
    dotbox.classList.remove("progress-done");

    if (index < activeIndex) {
      // Instantly fill for previous slides
      lines[index].style.transition = "none";
      lines[index].style.width = "100%";
      dotbox.classList.add("progress-done"); // Mark as done immediately
    } else if (index === activeIndex) {
      // Reset width before animating
      lines[index].style.transition = "none";
      lines[index].style.width = "0%";

      setTimeout(() => {
        lines[index].style.transition = "width 5s linear";
        lines[index].style.width = "100%";

        // After 5s, mark progress as done
        setTimeout(() => {
          dotbox.classList.add("progress-done");
        }, 5000);
      }, 50);
    } else {
      // Reset future slides
      lines[index].style.transition = "none";
      lines[index].style.width = "0%";
    }
  });
}

// Make dotboxes clickable
function setupDotboxClick() {
  document.querySelectorAll("[ppslidebtn]").forEach((dotbox, index) => {
    dotbox.addEventListener("click", () => {
      ppswiper.slideTo(index); // Navigate to the corresponding slide
      ppswiper.autoplay.stop(); // Stop autoplay when a dot is clicked
      ppswiperHolder.classList.add("its_clicked");
    });
  });
}

// Update active dotbox class
function updateActiveDot(activeIndex) {
  let dotboxes = document.querySelectorAll("[ppslidebtn]");

  dotboxes.forEach((dotbox, index) => {
    if (index === activeIndex) {
      dotbox.classList.add("activedot"); // Add active class
    } else {
      dotbox.classList.remove("activedot"); // Remove from others
    }
  });
}

// Manually trigger the `init` event for the first slide progress animation
ppswiper.emit("init");
