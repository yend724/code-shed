export const menuController = () => {
  const FOCUSABLE_ELEMENTS = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden])",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"])',
  ];
  class MenuController {
    menuTarget: HTMLElement;
    menuTrigger: HTMLElement;
    focusedElementBefore: HTMLElement | null;
    focusableElements: HTMLElement[];
    constructor({ id, trigger }: { id: string; trigger: string }) {
      const menuTarget = document.getElementById(id);
      const menuTrigger = document.querySelector(trigger) as HTMLElement | null;
      if (!menuTarget) {
        throw new Error("idが存在しません");
      }
      if (!menuTrigger) {
        throw new Error("triggerが存在しません");
      }
      this.menuTarget = menuTarget;
      this.menuTrigger = menuTrigger;
      this.focusedElementBefore = null;
      this.focusableElements = this.getFocusableNodes();

      // bind
      this.toggle = this.toggle.bind(this);
      this.focusTrap = this.focusTrap.bind(this);

      // addEventListeners
      this.registerEvents();
    }

    registerEvents() {
      this.menuTrigger.addEventListener("click", this.toggle);
      this.menuTarget.addEventListener("keydown", this.focusTrap);
    }

    toggle() {
      const isMenuOpen = this.menuTrigger.getAttribute("aria-expanded");

      if (isMenuOpen === "true") {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.menuTrigger.setAttribute("aria-expanded", "true");
      this.menuTrigger.setAttribute("arira-label", "メニューを閉じる");

      this.menuTarget.setAttribute("aria-hidden", "false");

      this.bgScrollBehavior(true);

      // focusTrap
      this.focusedElementBefore = document.activeElement as HTMLElement | null;

      const firstTabStop = this.focusableElements[0];
      if (firstTabStop) {
        firstTabStop.focus();
      }
    }

    close() {
      this.menuTrigger.setAttribute("aria-expanded", "false");
      this.menuTrigger.setAttribute("aria-label", "メニューを開く");

      this.menuTarget.setAttribute("aria-hidden", "true");

      this.bgScrollBehavior(false);

      // focusTrap
      if (this.focusedElementBefore) {
        this.focusedElementBefore.focus();
      }
    }

    destroy() {
      this.menuTrigger.removeEventListener("click", this.toggle);
      this.menuTarget.addEventListener("keydown", this.focusTrap);
    }

    bgScrollBehavior(bool: Boolean) {
      const scrollY = bool
        ? document.documentElement.scrollTop
        : parseInt(document.body.style.top || "0");
      document.documentElement.dataset["fixed"] = "true";
      const styles = {
        position: "fixed",
        top: `${scrollY * -1}px`,
        left: "0",
        overflow: "hidden",
      };

      Object.keys(styles).forEach(key => {
        const style = key as keyof typeof styles;
        document.body.style[style] = bool ? styles[style] : "";
      });
      if (!bool) {
        window.scrollTo(0, scrollY * -1);
        document.documentElement.dataset["fixed"] = "false";
      }
    }

    getFocusableNodes() {
      const nodes = this.menuTarget.querySelectorAll(
        FOCUSABLE_ELEMENTS.join(",")
      ) as NodeListOf<HTMLElement>;
      return [this.menuTrigger, ...Array.from(nodes)];
    }

    focusTrap(e: KeyboardEvent) {
      const firstTabStop = this.focusableElements[0];
      const lastTabStop =
        this.focusableElements[this.focusableElements.length - 1];
      if (e.code === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
        } else {
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }

      if (e.code === "Escape") this.close();
    }
  }

  let menu: MenuController | null = null;
  const init = ({ id, trigger }: { id: string; trigger: string }) => {
    menu = new MenuController({
      id,
      trigger,
    });
  };
  const open = () => {
    if (!menu) return console.error("メニューが存在しません");
    menu.open();
  };
  const close = () => {
    if (!menu) return console.error("メニューが存在しません");
    menu.close();
  };
  const destroy = () => {
    if (!menu) return console.error("メニューが存在しません");
    menu.destroy();
  };

  return { init, open, close, destroy };
};
