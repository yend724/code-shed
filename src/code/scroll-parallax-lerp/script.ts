import "./style.scss";
const html = document.documentElement;
const targetsHTMLCollection = document.querySelectorAll(
  "*[data-scroll]"
) as NodeListOf<HTMLElement>;
const targets = Array.from(targetsHTMLCollection);

const lerp = (a: number, b: number, t: number) => {
  return (1 - t) * a + t * b;
};

let diffY = 0;
let targetScrollY = 0;
const loop = () => {
  const windowScrollY = html.scrollTop;
  targetScrollY = lerp(targetScrollY, windowScrollY, 0.1);
  diffY = Math.round((windowScrollY - targetScrollY) * 10) / 10;
  targets.forEach(target => {
    target.style.transform = `translateY(${diffY}px)`;
  });
  requestAnimationFrame(loop);
};
loop();
