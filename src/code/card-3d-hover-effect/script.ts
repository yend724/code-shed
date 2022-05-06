import "./style.scss";

type InputArgs = {
  start: number;
  end: number;
  current: number;
};
class Input {
  mouseX: {
    start: number;
    end: number;
    current: number;
    range: number;
    progress: number;
  };
  mouseY: {
    start: number;
    end: number;
    current: number;
    range: number;
    progress: number;
  };
  constructor({ mouseX, mouseY }: { mouseX: InputArgs; mouseY: InputArgs }) {
    this.mouseX = {
      ...mouseX,
      range: mouseX.end - mouseX.start,
      progress: 0,
    };
    this.mouseY = {
      ...mouseY,
      range: mouseY.end - mouseY.start,
      progress: 0,
    };
  }
  _updateProgress() {
    this.mouseX.progress = this.mouseX.current / this.mouseX.range;
    this.mouseY.progress = this.mouseY.current / this.mouseY.range;
  }
  udpateCurrent(x: number, y: number) {
    this.mouseX.current = x;
    this.mouseY.current = y;
    this._updateProgress();
  }
  updateRange(
    x: {
      start: number;
      end: number;
    },
    y: {
      start: number;
      end: number;
    }
  ) {
    this.mouseX.start = x.start;
    this.mouseX.end = x.end;
    this.mouseX.range = x.end - x.start;

    this.mouseY.start = y.start;
    this.mouseY.end = y.end;
    this.mouseY.range = y.end - y.start;
  }
}

type OutputArgs = {
  start: number;
  end: number;
  current: number;
};
class Output {
  x: {
    start: number;
    end: number;
    current: number;
    range: number;
  };
  y: {
    start: number;
    end: number;
    current: number;
    range: number;
  };
  constructor({ x, y }: { x: OutputArgs; y: OutputArgs }) {
    this.x = {
      ...x,
      range: x.end - x.start,
    };
    this.y = {
      ...y,
      range: y.end - y.start,
    };
  }
  updateCurrent(x: number, y: number) {
    this.x.current = x;
    this.y.current = y;
  }
}

const init = () => {
  const cardContainer = document.getElementById(
    "js-card-container"
  ) as HTMLDivElement;
  const card = cardContainer.querySelector(".card") as HTMLDivElement;

  const mouse = {
    x: 0,
    y: 0,
  };

  const input = new Input({
    mouseX: {
      start: 0,
      end: window.innerWidth,
      current: 0,
    },
    mouseY: {
      start: 0,
      end: window.innerHeight,
      current: 0,
    },
  });

  const output = new Output({
    x: {
      start: -45,
      end: 45,
      current: 0,
    },
    y: {
      start: -60,
      end: 60,
      current: 0,
    },
  });

  const updatedInputs = () => {
    input.udpateCurrent(mouse.x, mouse.y);
  };
  const updatedOutpus = () => {
    const x = output.x.start + input.mouseX.progress * output.x.range;
    const y = output.y.start + input.mouseY.progress * output.y.range;
    output.updateCurrent(x, y);
  };

  const handleResize = () => {
    const x = {
      start: 0,
      end: window.innerWidth,
    };
    const y = {
      start: 0,
      end: window.innerHeight,
    };
    input.updateRange(x, y);
  };
  const handlePointerMove = (e: PointerEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    updatedInputs();
    updatedOutpus();
    card.style.transform = `rotateX(${output.y.current}deg) rotateY(${output.x.current}deg)`;
  };
  const handlePointerLeave = () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  cardContainer.addEventListener("pointermove", handlePointerMove);
  cardContainer.addEventListener("pointerleave", handlePointerLeave);
  window.addEventListener("resize", handleResize);
};
window.addEventListener("DOMContentLoaded", init);
