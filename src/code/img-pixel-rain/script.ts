import "./style.scss";
import image from "./image.jpg";
const loaded = () => {
  const myImage = new Image();
  myImage.src = image;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const ctx = canvas.getContext("2d")!;

  const imageLoaded = () => {
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particlesArray: Particle[] = [];
    const numberOfParticles = 5000;

    const caclRelativeBrightness = (
      red: number,
      green: number,
      blue: number
    ) => {
      return (
        Math.sqrt(
          red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
        ) / 100
      );
    };

    const mappedImage: number[][][] = [];
    for (let y = 0; y < canvas.height; y++) {
      const row: number[][] = [];
      for (let x = 0; x < canvas.width; x++) {
        const red = pixels.data[y * 4 * pixels.width + x * 4];
        const green = pixels.data[y * 4 * pixels.width + x * 4 + 1];
        const blue = pixels.data[y * 4 * pixels.width + x * 4 + 2];
        const brithness = caclRelativeBrightness(red, green, blue);
        const cell = [brithness];
        row.push(cell);
      }
      mappedImage.push(row);
    }

    class Particle {
      public x: number;
      public y: number;
      public speed: number;
      public velocity: number;
      public size: number;
      public positionY: number;
      public positionX: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 0.5;
        this.size = Math.random() * 1.5 + 1;
        this.positionY = Math.floor(this.y);
        this.positionX = Math.floor(this.x);
      }

      update(time: number) {
        this.positionY = Math.floor(this.y);
        this.positionX = Math.floor(this.x);
        this.speed = mappedImage[this.positionY][this.positionX][0];
        const movement = 2.5 - this.speed + this.velocity;

        this.y += movement * (time / 10);
        if (this.y >= canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgb(200,200,200)";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    init();

    let lastTime = performance.now();
    const loop = () => {
      const nowTime = performance.now();
      const time = nowTime - lastTime;
      lastTime = nowTime;
      ctx.globalAlpha = 0.075;
      ctx.fillStyle = `rgb(0,0,0)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(time);
        ctx.globalAlpha = particlesArray[i].speed;
        particlesArray[i].draw();
      }
      requestAnimationFrame(loop);
    };
    loop();
  };
  myImage.addEventListener("load", imageLoaded);
};
window.addEventListener("load", loaded);
