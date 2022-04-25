import "./style.scss";
import * as THREE from "three";

const aspect = 16 / 9;

const init = () => {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

  const scene = new THREE.Scene();

  const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
  });
  renderer.setClearColor(new THREE.Color(0x000));
  renderer.setSize(canvas.clientWidth, canvas.clientWidth / aspect);
  renderer.setPixelRatio(window.devicePixelRatio);

  const planeGeometory = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshNormalMaterial();

  const planes = Array.from({ length: 3 }).map((_, i) => {
    const plane = new THREE.Mesh(planeGeometory, planeMaterial);
    plane.position.x = (i - 1) * 11;
    return plane;
  });

  scene.add(...planes);

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
  const pointerEvent = typeof window.ontouchstart === "undefined" ? "pointermove" : "pointerenter";
  canvas.addEventListener(pointerEvent, event => {
    const element = event.currentTarget as HTMLCanvasElement;
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
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
      intersects[0].object.rotation.z += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  };

  renderScene();
};

window.addEventListener("load", init);
