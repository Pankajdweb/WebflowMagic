let typeSplit = new SplitType('[split="text"]', {
  types: "lines, words, chars",
  tagName: "span",
});

gsap.set("[logo]", { y: -100, opacity: 0 });
gsap.set("[navbtn]", { y: -100, opacity: 0 });
gsap.set("[desc]", { y: 20, opacity: 0 });
gsap.set("[buttons]", { y: 20, opacity: 0 });
gsap.set("[split='text'] .word", { opacity: 0, y: "100%" });
gsap.set("[title='wrap']", { opacity: 0 });

// Create a GSAP timeline with smooth easing
const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2.out" },
  delay: 3.8,
});

// Step 1: Move up logo and navbtn together
tl.to("[logo]", { y: 0, opacity: 1 }, 0) // starts at time 0
  .to("[navbtn]", { y: 0, opacity: 1 }, 0) // also starts at time 0
  .to("[title='wrap']", { y: 0, opacity: 1 }, 0)

  .to("[desc]", { opacity: 1, y: 0 }, "-=0.2")
  .to("[buttons]", { opacity: 1, y: 0 }, "-=0.2")

  .to("[split='text'] .word", { opacity: 1, y: 0, stagger: 0.1 }, "-=0.3");
