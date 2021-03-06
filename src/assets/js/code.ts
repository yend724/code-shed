import "destyle.css";
import "/assets/css/code.scss";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import Prism from "prismjs";
import "prismjs/components/prism-pug.min.js";
import "prismjs/components/prism-scss.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/themes/prism-funky.min.css";
import setWindowSize from "./modules/setWindowSize";
import { menuController } from "./modules/menuController";

const init = () => {
  setWindowSize();
  Prism.manual = true;
  Prism.highlightAll();

  const menu = menuController();
  menu.init({
    id:"menu",
    trigger: `*[data-menu-trigger="menu"]`
  })
};
window.addEventListener("resize", setWindowSize);
window.addEventListener("DOMContentLoaded", init);
