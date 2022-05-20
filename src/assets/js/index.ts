import "destyle.css";
import "/assets/css/index.scss";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import bgInit from "./modules/bgInit";
import setWindowSize from "./modules/setWindowSize";

const init = () => {
  setWindowSize();
};

const load = () => {
  const siteTitle = document.getElementById("js-site-title")!;
  const siteIcons = document.getElementById("js-site-icons")!;
  const canvas = document.getElementById("js-l-canvas")!;
  const main = document.getElementById("js-l-main")!;
  siteTitle.addEventListener(
    "animationend",
    () => {
      siteIcons.classList.add("__animated");
      canvas.classList.add("__animated");
      main.classList.add("__animated");
    },
    { once: true }
  );

  siteTitle.classList.add("__animated");
  // three.js
  bgInit();
};

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", load);
