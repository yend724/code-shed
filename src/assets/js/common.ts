import "destyle.css";
import "/assets/css/style.scss";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import Prism from "prismjs";
import "prismjs/components/prism-pug.min.js";
import "prismjs/components/prism-scss.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/themes/prism-funky.min.css";
import setWindowSize from "./modules/setWindowSize";
import gsap from "gsap";

const init = () => {
  setWindowSize();
  Prism.manual = true;
  Prism.highlightAll();

  const slideupTrigger = document.getElementById("js-trigger-slideup");
  if (slideupTrigger) {
    const tl = gsap.timeline({ duration: 0.3, ease: "power3.out" });
    tl.fromTo(
      "#code-info",
      {
        transform:
          "translate(0, calc(var(--window-h-full, 100vh) - 3rem))",
      },
      {
        transform: "translate(0,0)",
      }
    );
    tl.reversed(true);
    const slideToggle = () => {
      tl.reversed(!tl.reversed());
    };
    slideupTrigger.addEventListener("click", slideToggle);
  }
};
window.addEventListener("resize", setWindowSize);
window.addEventListener("DOMContentLoaded", init);
