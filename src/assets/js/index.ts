import * as THREE from "three";

const init = () => {
  // three.js
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000, 50, 150);

  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bgCanvas") as HTMLCanvasElement,
  });
  renderer.setClearColor(new THREE.Color(0x000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // const axes = new THREE.AxesHelper(20);
  // scene.add(axes);

  const cubeGeometory = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshPhysicalMaterial();
  const range = 100;
  const cubes = Array.from({ length: 125 }).map(_ => {
    const cube = new THREE.Mesh(cubeGeometory, cubeMaterial);
    const speed = 1 - Math.random() * 0.5;
    const posX = (Math.random() - 0.5) * range;
    const posY = (Math.random() - 0.5) * range;
    const posZ = (Math.random() - 0.5) * range;
    const rotX = Math.random() * Math.PI * 2;
    const rotY = Math.random() * Math.PI * 2;
    const rotZ = Math.random() * Math.PI * 2;
    cube.position.set(posX, posY, posZ);
    cube.rotation.set(rotX, rotY, rotZ);
    scene.add(cube);
    return {
      target: cube,
      speed: speed,
    };
  });

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  camera.position.set(0, 0, 75);
  camera.lookAt(scene.position);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 100, 100);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xf1f8e9);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  let mouseX = 0,
    mouseY = 0;
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let previousTimestamp = 0;
  const renderScene = (timestamp?: number) => {
    timestamp = timestamp || 0;
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;

    cubes.forEach((cube, i) => {
      const { target, speed } = cube;
      const ts = timestamp || 0;
      target.position.x += Math.sin((ts / 1000) + i) * 0.03;
      target.position.y += Math.cos((ts / 1000) + i) * 0.05;
      target.position.z += Math.sin((ts / 1000) + i) * 0.07;
      (["x", "y", "z"] as ("x" | "y" | "z")[]).forEach(r => {
        target.rotation[r] += elapsed * speed;
      });
    });

    const cameraPos = {
      x: mouseX * 30,
      y: mouseY * 30 * -1,
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

window.addEventListener("DOMContentLoaded", init);
