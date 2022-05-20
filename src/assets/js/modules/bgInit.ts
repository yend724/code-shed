import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import UAParser from "ua-parser-js";
import { lerp } from "./lerp";

const parser = new UAParser();
const ua = parser.getResult();
const isPC = !(ua.device.type === "mobile" || ua.device.type === "tablet");
const pageArray = [
  {
    text: "YENDのコード置き場",
  },
];

let focusedLinkIndex = 0;
const linksList = document.querySelectorAll("#js-link-list .link-list__link");
const handleMouseEnter = (e: Event) => {
  const target = e.currentTarget!;
  if (target instanceof HTMLElement) {
    const index = target.dataset.index;
    focusedLinkIndex = Number(index);
  }
};
linksList.forEach(link => {
  if (link instanceof HTMLElement) {
    pageArray.push({ text: link.textContent || "" });
  }
  if (!isPC) {
    return;
  }
  link.addEventListener("mouseenter", handleMouseEnter);
});

const bgInit = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const canvasSize = {
    w: canvas.parentElement!.clientWidth,
    h: canvas.parentElement!.clientHeight,
  };
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
  });
  renderer.setClearColor(new THREE.Color(0x000));
  renderer.setSize(canvasSize.w, canvasSize.h);
  renderer.setPixelRatio(window.devicePixelRatio);

  let texts: {
    target: THREE.Mesh<TextGeometry, THREE.MeshNormalMaterial>;
    material: THREE.MeshNormalMaterial;
  }[] = [];
  const fontloader = new FontLoader();
  fontloader.load("/fonts/BIZUDPGothic_Bold.json", font => {
    texts = pageArray.map(v => {
      const geometry = new TextGeometry(v.text, {
        font: font,
        size: 2,
        height: 0.5,
      });
      geometry.center();
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      return {
        target: mesh,
        material: material,
      };
    });
  });

  const camera = new THREE.OrthographicCamera(
    -canvasSize.w / 16,
    canvasSize.w / 16,
    canvasSize.h / 16,
    -canvasSize.h / 16,
    0.1,
    20
  );
  camera.position.set(0, 0, 10);
  camera.lookAt(scene.position);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 50, 50);
  scene.add(directionalLight);

  window.addEventListener("resize", () => {
    canvasSize.w = canvas.parentElement!.clientWidth;
    canvasSize.h = canvas.parentElement!.clientHeight;
    camera.left = -canvasSize.w / 16;
    camera.right = canvasSize.w / 16;
    camera.top = canvasSize.h / 16;
    camera.bottom = -canvasSize.h / 16;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
    renderer.setSize(canvasSize.w, canvasSize.h);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  let previousTimestamp = 0;
  const renderScene = (timestamp?: number) => {
    const ts = timestamp || 0;
    const elapsedTime = (ts - previousTimestamp) / 1000;
    previousTimestamp = ts;
    if (texts.length > 0) {
      texts.forEach((text, i) => {
        const { target, material } = text;
        const targetOpaciry = material.opacity;
        const targetScale = target.scale.x;
        if (i === focusedLinkIndex) {
          const progressOpaciry = lerp(targetOpaciry, 1, elapsedTime * 4);
          const progressScale = lerp(targetScale, 1, elapsedTime * 4);

          material.opacity = progressOpaciry;
          target.scale.set(progressScale, progressScale, progressScale);
          return;
        }
        material.opacity = 0;
        target.scale.set(0.5, 0.5, 0.5);
      });
    }

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  };
  renderScene();
};

export default bgInit;
