import "destyle.css";
import "/assets/css/style.scss";
import "prismjs/themes/prism-funky.min.css";
import Prism from "prismjs";
import setWindowSize from "./modules/setWindowSize";

const init = () => {
  setWindowSize();
  Prism.highlightAll();
};

window.addEventListener("resize", setWindowSize);
window.addEventListener("DOMContentLoaded", init);
