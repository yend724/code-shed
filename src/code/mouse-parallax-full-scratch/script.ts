import "./style.scss";

// html
const itemsHTMLCollection = document.querySelectorAll(
  ".js-container > .item"
) as NodeListOf<HTMLDivElement>;
const items = Array.from(itemsHTMLCollection);

// pointer
const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

// input
const input = {
  pointerX: {
    start: 0,
    end: window.innerWidth,
    current: 0,
    range: window.innerWidth - 0,
    progress: 0,
  },
  pointerY: {
    start: 0,
    end: window.innerHeight,
    current: 0,
    range: window.innerHeight - 0,
    progress: 0,
  },
};

// output
const output = {
  x: {
    start: -200,
    end: 200,
    current: 0,
    range: 200 - -200,
  },
  y: {
    start: -200,
    end: 200,
    current: 0,
    range: 200 - -200,
  },
  scale: {
    start: 1,
    end: 0.5,
    range: 0.5 - 1,
  },
};

const updateInputs = () => {
  // input pointerX and pointerY
  input.pointerX.current = pointer.x;
  input.pointerX.progress = input.pointerX.current / input.pointerX.range;
  input.pointerY.current = pointer.y;
  input.pointerY.progress = input.pointerY.current / input.pointerY.range;
};

const updateOutpus = () => {
  // output x and y
  output.x.current = output.x.start + input.pointerX.progress * output.x.range;
  output.y.current = output.y.start + input.pointerY.progress * output.y.range;
};

const updateElements = () => {
  items.forEach(element => {
    const depth = Number(element.dataset.depth!);
    const elementOutput = {
      x: output.x.current * (1 - depth),
      y: output.y.current * (1 - depth),
      zIndex: 1000 * depth,
      scale: output.scale.start + output.scale.range * depth,
    };
    element.style.zIndex = elementOutput.zIndex.toString();
    element.style.transform = `translate(${elementOutput.x}px, ${elementOutput.y}px) scale(${elementOutput.scale})`;
  });
};

const init = () => {
  updateInputs();
  updateOutpus();
  updateElements();
};

const handleResize = () => {
  input.pointerX.end = window.innerWidth;
  input.pointerY.end = window.innerHeight;

  input.pointerX.range = input.pointerX.end - input.pointerX.start;
  input.pointerY.range = input.pointerY.end - input.pointerY.start;
};

const handlePointerMove = (e: PointerEvent) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;

  updateInputs();
  updateOutpus();
  updateElements();
};

window.addEventListener("load", init);
window.addEventListener("resize", handleResize);
window.addEventListener("pointermove", handlePointerMove);
