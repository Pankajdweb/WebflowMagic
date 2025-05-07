const hiwSwiper = new Swiper("[hiwslider]", {
  autoplay: {
    delay: 5000, // 5 seconds
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  on: {
    init: function () {
      hiwStartProgress(0); // Start progress for first slide on load
      hiwSetupDots(); // Enable click navigation on dots
      hiwUpdateActiveDot(0); // Set the first dot as active
    },
    slideChange: function () {
      hiwStartProgress(hiwSwiper.activeIndex);
      hiwUpdateActiveDot(hiwSwiper.activeIndex);
    },
  },
});

function hiwStartProgress(activeIndex) {
  let dots = document.querySelectorAll("[hiw-dot]");
  let lines = document.querySelectorAll("[hiw-dot] .hiw-line");

  dots.forEach((dot, index) => {
    // Remove "progress-done" from all dots before animation starts
    dot.classList.remove("hiw-done");

    if (index < activeIndex) {
      // Instantly fill for previous slides
      lines[index].style.transition = "none";
      lines[index].style.height = "100%";
      dot.classList.add("hiw-done"); // Mark as done immediately
    } else if (index === activeIndex) {
      // Reset width before animating
      lines[index].style.transition = "none";
      lines[index].style.height = "0%";

      setTimeout(() => {
        lines[index].style.transition = "height 5s linear";
        lines[index].style.height = "100%";

        // After 5s, mark progress as done
        setTimeout(() => {
          dot.classList.add("hiw-done");
        }, 5000);
      }, 50);
    } else {
      // Reset future slides
      lines[index].style.transition = "none";
      lines[index].style.height = "0%";
    }
  });
}

// Make dots clickable
function hiwSetupDots() {
  document.querySelectorAll("[hiw-dot]").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      hiwSwiper.slideTo(index); // Navigate to the corresponding slide
      hiwSwiper.autoplay.stop(); // Stop autoplay when a dot is clicked
    });
  });
}

// Update active dot class
function hiwUpdateActiveDot(activeIndex) {
  let dots = document.querySelectorAll("[hiw-dot]");

  dots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.classList.add("hiw-active"); // Add active class
    } else {
      dot.classList.remove("hiw-active"); // Remove from others
    }
  });
}

// Manually trigger the `init` event for the first slide progress animation
hiwSwiper.emit("init");
