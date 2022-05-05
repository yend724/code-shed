import "destyle.css";
import "/assets/css/code.scss";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import Prism from "prismjs";
import "prismjs/components/prism-pug.min.js";
import "prismjs/components/prism-scss.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/themes/prism-funky.min.css";
import setWindowSize from "./modules/setWindowSize";

const init = () => {
  setWindowSize();
  Prism.manual = true;
  Prism.highlightAll();

  const wrapper = document.getElementById("js-wrapper") as HTMLElement;
  const slideBtn = document.getElementById("js-button-slide") as HTMLButtonElement;

  slideBtn.addEventListener("click", () => {
    const state = slideBtn.getAttribute("aria-expanded") as "true" | "false";
    const next = state === "true" ? "false" : "true";
    const label = next === "true" ? "メニューを閉じる" : "メニューを開く";
    slideBtn.setAttribute("aria-expanded", next)
    slideBtn.setAttribute("aria-label", label)
    wrapper.setAttribute("aria-hidden", state)
  })
};
window.addEventListener("resize", setWindowSize);
window.addEventListener("DOMContentLoaded", init);