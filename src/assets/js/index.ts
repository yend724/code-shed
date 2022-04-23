import bgInit from "./modules/bgInit";
import gsap from "gsap";

const init = () => {
  // three.js
  bgInit();

  // init animation
  const initTextTl = gsap.timeline();
  initTextTl.to("html", {
    "--line-translateX": 0,
    duration: 0.3,
    ease: "power3.out",
    delay: 0.2,
  }).set(".js-slide-anime > .text", {
    opacity: 1,
  }).to("html", {
    "--line-translateX": 100,
    ease: "power3.out",
    duration: 0.3,
    delay: 0.3,
  });

  gsap.to(".main", {
    opacity: 1,
    webkitFilter: "blur(0px)",
    duration: 0.3,
    ease: "power3.out",
    delay: 1.5,
  });
  gsap.to(".bg", {
    opacity: 1,
    scale: 1,
    webkitFilter: "blur(0px)",
    duration: 0.3,
    ease: "power3.out",
    delay: 1.5,
  });
};

window.addEventListener("DOMContentLoaded", init);
