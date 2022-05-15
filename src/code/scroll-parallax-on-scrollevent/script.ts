import "./style.scss";
const html = document.documentElement;
const itemsHTMLCollection = document.querySelectorAll(
  ".img"
) as NodeListOf<HTMLElement>;
const itemsArray = Array.from(itemsHTMLCollection);

// setup inpit
const input = {
  scrollY: {
    start: 0,
    end: html.scrollHeight - window.innerHeight,
    current: 0,
    progress: 0, // 0 ~ 1
    range: 0,
  },
};

// setup output
const output = {
  scrollY: {
    start: 0,
    end: (window.innerHeight - 200) / 3,
    current: 0,
    range: 0,
  },
};

const updateInputs = () => {
  input.scrollY.range = input.scrollY.end - input.scrollY.start;
  input.scrollY.current = document.documentElement.scrollTop;
  input.scrollY.progress =
    (input.scrollY.current - input.scrollY.start) / input.scrollY.range;
};

const updateOutputs = () => {
  output.scrollY.range = output.scrollY.end - output.scrollY.start;
  output.scrollY.current =
    output.scrollY.start + input.scrollY.progress * output.scrollY.range;
};

const updateEachPrallaxItem = () => {
  itemsArray.forEach(item => {
    const parentSection = item.closest(".section") as HTMLElement;
    const parentSectionTop = parentSection.getBoundingClientRect().top;
    const itemInput = {
      scrollY: {
        start: window.pageYOffset + parentSectionTop,
        end: window.pageYOffset + parentSectionTop + window.innerHeight,
        range: 0,
        progress: 0,
      },
    };
    itemInput.scrollY.range = itemInput.scrollY.end - itemInput.scrollY.start;
    itemInput.scrollY.progress =
      (input.scrollY.current - itemInput.scrollY.start) /
      itemInput.scrollY.range;

    const itemOutput = { y: 0 };
    itemOutput.y =
      output.scrollY.start + itemInput.scrollY.progress * output.scrollY.range;
    item.style.transform = `translateY(${itemOutput.y}px)`;
  });
};

const init = () => {
  updateInputs();
  updateOutputs();
  updateEachPrallaxItem();
};

const handleScroll = () => {
  updateInputs();
  updateOutputs();
  updateEachPrallaxItem();
};

const handleResize = () => {
  updateInputs();
  updateOutputs();
  updateEachPrallaxItem();
};

window.addEventListener("load", init);
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);
