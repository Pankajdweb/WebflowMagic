let videoContainer = $("[video-content]");
let videoElement = videoContainer.find(".plyr_video")[0];
let player = new Plyr(videoElement, {
  controls: ["play", "progress", "current-time", "mute", "fullscreen"],
  resetOnEnd: true,
});

// Open popup and play video
$("[button='videoplay']").on("click", () => {
  $("[popup='video']").fadeIn(); // Show popup
  player.play(); // Play video
});

// Open popup and play video
$("[buttonmob='videoplay']").on("click", () => {
  $("[popup='video']").fadeIn(); // Show popup
  player.play(); // Play video
});
// Close popup on background click
$("[bg='videopopup']").on("click", function (e) {
  $("[popup='video']").fadeOut();
  player.pause();
});

// Close popup on background click
$("[close='videopopup']").on("click", function (e) {
  console.log("Click on close button");
  $("[popup='video']").fadeOut();
  player.pause();
});

// Listen for when the video ends to close the popup
videoElement.addEventListener("ended", function () {
  $("[popup='video']").fadeOut(); // Close the popup when video ends
  player.pause(); // Pause the video (optional, in case the video is still playing)
});
