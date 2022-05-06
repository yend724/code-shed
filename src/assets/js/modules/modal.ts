const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
]
export class Modal {
  modalTarget: HTMLElement;
  trigger: HTMLElement;
  constructor({
    modalTarget,
    trigger,
  }: {
    modalTarget: string;
    trigger: string;
  }) {
    this.modalTarget = document.getElementById(modalTarget)!;
    this.trigger = document.getElementById(trigger)!;

    if (!this.modalTarget) {
      console.error("modalTargetが存在しません");
      return;
    }
    if (!this.trigger) {
      console.error("triggerが存在しません");
      return;
    }

    this.toggle = this.toggle.bind(this);
    this.trapTabKey = this.trapTabKey.bind(this);
    this.trigger.addEventListener("click", this.toggle);
    this.modalTarget.addEventListener('keydown', this.trapTabKey)
  }
  toggle() {
    const state = this.trigger.getAttribute("aria-expanded") as
      | "true"
      | "false";
    const next = state === "true" ? "false" : "true";
    const label = next === "true" ? "メニューを閉じる" : "メニューを開く";
    this.trigger.setAttribute("aria-expanded", next);
    this.trigger.setAttribute("aria-label", label);
    this.modalTarget.setAttribute("aria-hidden", state);
  }
  getFocusableNodes () {
    const nodes = this.modalTarget.querySelectorAll(FOCUSABLE_ELEMENTS.join(",")) as NodeListOf<HTMLElement>
    return [this.trigger, ...Array.from(nodes)];
  }
  trapTabKey(e:KeyboardEvent){
    const focusableElements = this.getFocusableNodes();
    const firstTabStop = focusableElements[0]
    const lastTabStop = focusableElements[focusableElements.length -1]
    if (e.code === "Tab") {
      if(e.shiftKey) {
        if(document.activeElement === firstTabStop) {
          e.preventDefault()
          lastTabStop.focus()
        }
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
    if (e.code === "Escape") {
      this.toggle();
    }
  }
}
