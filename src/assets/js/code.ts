import "destyle.css";
import "/assets/css/code.scss";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import Prism from "prismjs";
import "prismjs/components/prism-pug.min.js";
import "prismjs/components/prism-scss.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/themes/prism-funky.min.css";
import setWindowSize from "./modules/setWindowSize";
import { Modal } from "./modules/modal";

const init = () => {
  setWindowSize();
  Prism.manual = true;
  Prism.highlightAll();

  new Modal({
    modalTarget: "js-wrapper",
    trigger: "js-button-slide"
  })
};
window.addEventListener("resize", setWindowSize);
window.addEventListener("DOMContentLoaded", init);
