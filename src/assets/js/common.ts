import "destyle.css";
import "/assets/css/style.scss";
import Prism from "prismjs";
import 'prismjs/components/prism-pug.min.js'
import 'prismjs/components/prism-scss.min.js'
import 'prismjs/components/prism-typescript.min.js'
import "prismjs/themes/prism-funky.min.css";
import setWindowSize from "./modules/setWindowSize";

const init = () => {
  setWindowSize();
  Prism.manual = true;
  Prism.highlightAll();
};

window.addEventListener("resize", setWindowSize);
window.addEventListener("DOMContentLoaded", init);
