const productsSlider = document.getElementById("productsSlider");
const productsInput = document.getElementById("products");
const inputInaction = document.querySelector("[input='inaction']");
const inputCoanimation = document.querySelector("[input='coanimation']");
const integrationInput = document.querySelector("[input='integration']");

const totalCost = document.getElementById("totalCost");
const toggleForm = document.querySelector("[toggle='form']");
const toggleBlog = document.querySelector("[toggle='blog']");
const toggleMutilang = document.querySelector("[toggle='mutilang']");
const toggleEcom = document.querySelector("[toggle='ecom']");
const checkboxPagebuild = document.querySelector("[checkbox='pagebuild']");
const checkboxAccessibility = document.querySelector(
  "[checkbox='accessibility']"
);
const checkboxRush = document.querySelector("[checkbox='rush']");

// Assuming formData.defaults.products is the value from your JSON file
const initialProductValue = formData.defaults.products;

// Set the initial value of the slider and input field from JSON
productsSlider.value = initialProductValue;
productsInput.value = initialProductValue; // Sync the input field with the initial value

// Update slider background to reflect the new value
updateSliderBackground(productsSlider);

productsSlider.oninput = function () {
  productsInput.value = this.value;
  updateSliderBackground(this);
};

// âœ… Sync slider â†’ input
productsSlider.oninput = function () {
  productsInput.value = this.value;
  updateSliderBackground(this);
  calculateChange();
};

// âœ… Sync input â†’ slider
productsInput.oninput = function () {
  productsSlider.value = this.value;
  updateSliderBackground(productsSlider);
  calculateChange();
};

// âœ… Initial update
updateSliderBackground(productsSlider);

console.log("Script has fired");

productsInput.value = formData.defaults.products;
inputInaction.value = formData.defaults.inaction;
inputCoanimation.value = formData.defaults.coanimation;
integrationInput.value = formData.defaults.integration;
totalCost.value =
  formData.baseCost +
  formData.defaults.inaction * formData.inactionMultiplier +
  formData.defaults.coanimation * formData.coanimationMultiplier +
  formData.defaults.integration * formData.integrationMultiplier +
  formData.defaults.products * formData.productMultiplier;

$(document).ready(function () {
  $(".minus").click(function () {
    const $input = $(this).parent().find("input");
    let count = parseInt($input.val()) - 1;
    count = Math.max(count, 0);
    $input.val(count).change();
    return false;
  });

  $(".plus").click(function () {
    const $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1).change();
    return false;
  });
});

function calculateChange() {
  productsInput.value = productsSlider.value;

  let cost =
    formData.baseCost +
    inputInaction.value * formData.inactionMultiplier +
    inputCoanimation.value * formData.coanimationMultiplier +
    productsInput.value * formData.productMultiplier +
    integrationInput.value * formData.integrationMultiplier;

  if (toggleForm.checked) cost += formData.toggles.form;
  if (toggleBlog.checked) cost += formData.toggles.blog;
  if (toggleMutilang.checked) cost += formData.toggles.mutilang;
  if (toggleEcom.checked) cost += formData.toggles.ecom;

  if (checkboxPagebuild.checked) cost += formData.checkboxes.pagebuild;
  if (checkboxAccessibility.checked) cost += formData.checkboxes.accessibility;
  if (checkboxRush.checked) cost += formData.checkboxes.rush;

  let formatted = cost.toLocaleString();
  console.log(formatted); // "$125,000.00"

  totalCost.value = formatted;
  console.log("Cost recalculated:", cost);
  document.getElementById("pricefinal").textContent = formatted;
}

[
  productsSlider,
  inputInaction,
  inputCoanimation,
  integrationInput,
  toggleForm,
  toggleBlog,
  toggleMutilang,
  toggleEcom,
  checkboxPagebuild,
  checkboxAccessibility,
  checkboxRush,
].forEach((input) => (input.onchange = calculateChange));

$(".email-field").on("focusin", function () {
  $(this).siblings(".field-label").addClass("active");
});

$(".email-field").on("focusout", function () {
  if (!$(this).val().length) {
    $(this).siblings(".field-label").removeClass("active");
  }
});

function updateSliderBackground(slider) {
  const progress = ((slider.value - 1) / (slider.max - 1)) * 100;
  slider.style.background = `linear-gradient(to right, #042B2F ${progress}%, #FAFAFA ${progress}%)`;
}

productsSlider.oninput = function () {
  productsInput.value = this.value;
  updateSliderBackground(this);
};

updateSliderBackground(productsSlider);
