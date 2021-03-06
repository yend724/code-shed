import "./style.scss";
import * as THREE from "three";

const aspect = 16 / 9;

const init = () => {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

  const scene = new THREE.Scene();

  const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(canvas.clientWidth, canvas.clientWidth / aspect);
  renderer.setPixelRatio(window.devicePixelRatio);

  const boxGeometory = new THREE.BoxGeometry(6, 6, 6);
  const boxMaterial = new THREE.MeshNormalMaterial();

  const boxes = Array.from({ length: 3 }).map((_, i) => {
    const box = new THREE.Mesh(boxGeometory, boxMaterial);
    box.position.x = (i - 1) * 11;
    return box;
  });

  scene.add(...boxes);

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 25);
  camera.lookAt(scene.position);

  window.addEventListener("resize", () => {
    camera.aspect = aspect;
    camera.lookAt(scene.position);
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientWidth / aspect);
  });

  const pointer = new THREE.Vector2(-9999, -9999);
  const pointerEvent =
    typeof window.ontouchstart === "undefined" ? "pointermove" : "pointerenter";

  canvas.addEventListener(pointerEvent, event => {
    const element = event.currentTarget as HTMLCanvasElement;
    const x = event.clientX - element.offsetLeft + window.scrollX;
    const y = event.clientY - element.offsetTop + window.scrollY;
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    pointer.x = (x / w) * 2 - 1;
    pointer.y = -(y / h) * 2 + 1;
  });

  const raycaster = new THREE.Raycaster();
  const renderScene = () => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      intersects[0].object.rotation.x += 0.01;
      intersects[0].object.rotation.y += 0.01;
      intersects[0].object.rotation.z += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  };

  renderScene();
};

window.addEventListener("load", init);
