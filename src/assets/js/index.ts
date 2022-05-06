import "destyle.css";
import "/assets/css/index.scss";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import bgInit from "./modules/bgInit";
import setWindowSize from "./modules/setWindowSize";

const init = () => {
  setWindowSize()
  // three.js
  bgInit();
};

const load = () => {
  const body = document.body;
  body.dataset.loaded = "true";
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", load)