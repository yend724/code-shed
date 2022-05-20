import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { lerp } from "./lerp";

const pageArray = [
  {
    text: "Code Shed",
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
const handleMouseLeave = () => {
  focusedLinkIndex = 0;
};
linksList.forEach(link => {
  if (link instanceof HTMLElement) {
    pageArray.push({ text: link.textContent || "" });
  }
  link.addEventListener("mouseenter", handleMouseEnter);
  link.addEventListener("mouseleave", handleMouseLeave);
});

const bgInit = () => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000, 50, 150);

  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bgCanvas") as HTMLCanvasElement,
  });
  renderer.setClearColor(new THREE.Color(0x000));
  renderer.setSize(window.innerWidth, window.innerHeight);
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
        size: 0.5,
        height: 0.3,
      });
      geometry.center();
      const material = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      return {
        target: mesh,
        material: material,
      };
    });
  });

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  camera.position.set(0, 0, 25);
  camera.lookAt(scene.position);

  // const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  // directionalLight.position.set(0, 50, 100);
  // scene.add(directionalLight);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
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
        const targetZ = target.position.z;

        if (i === focusedLinkIndex) {
          let opacity = lerp(targetOpaciry, 1, elapsedTime * 2);
          let z = lerp(targetZ, 0, elapsedTime * 2);
          if (opacity > 0.95) {
            opacity = 1;
          }
          material.opacity = opacity;
          target.position.z = z;
        } else {
          let opacity = lerp(targetOpaciry, 0, elapsedTime * 2);
          if (opacity < 0.01) {
            opacity = 0;
          }
          material.opacity = opacity;
        }

        if (material.opacity === 0) {
          target.position.z = -3;
        }

        target.rotation.z = Math.sin(ts / 1000) * 0.1;
      });
    }

    const cameraPos = {
      x: mouseX * 10,
      y: mouseY * 10 * -1,
    };
    camera.position.x += (cameraPos.x - camera.position.x) * 0.03;
    camera.position.y += (cameraPos.y - camera.position.y) * 0.03;
    const cameraLookAt = {
      x: camera.position.x / 3,
      y: camera.position.y / 3,
      z: 0,
    };
    camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  };
  renderScene();
};

export default bgInit;
