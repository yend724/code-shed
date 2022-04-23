import bgInit from "./modules/bgInit";
import gsap from "gsap";

const init = () => {
  // three.js
  bgInit();

  // init animation
  const targetContainers = document.querySelectorAll(".js-split-anime")!;
  targetContainers.forEach(targetContainer => {
    const targetString = targetContainer.textContent || "";
    const splitTexts = targetString.split("");
    const newHtml = splitTexts.reduce((acc, cur) => {
      return (acc += `<span>${cur}</span>`);
    }, "");
    targetContainer.innerHTML = newHtml;
    targetContainer.querySelectorAll(":scope > span").forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        rotation: -90,
        yPercent: -200,
        ease: "bounce",
        duration: 0.5,
        delay: i * 0.1 + 0.2,
      });
    });
  });

  gsap.set(".js-split-anime", {
    opacity: 1,
  });

  gsap.to(".main", {
    opacity: 1,
    duration: 0.5,
    delay: 1.5,
  });
  gsap.to(".bg", {
    opacity: 1,
    scale: 1,
    rotate: 0,
    webkitFilter: "blur(" + 0 + "px)",
    duration: 0.5,
    delay: 1.5,
  });
};

window.addEventListener("DOMContentLoaded", init);
