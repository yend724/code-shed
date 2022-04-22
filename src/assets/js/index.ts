// import * as THREE from "three";

// const init = () => {
//   // three.js
//   const scene = new THREE.Scene();

//   const renderer = new THREE.WebGL1Renderer({
//     canvas: document.querySelector("#bgCanvas") as HTMLCanvasElement,
//   });
//   renderer.setClearColor(new THREE.Color(0x000));
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.shadowMap.enabled = true;

//   const axes = new THREE.AxesHelper(20);
//   scene.add(axes);

//   const planeGeometory = new THREE.PlaneGeometry(60, 20);
//   const planeMaterial = new THREE.MeshLambertMaterial({
//     color: 0xffffff,
//   });
//   const plane = new THREE.Mesh(planeGeometory, planeMaterial);
//   plane.rotation.x = -0.5 * Math.PI;
//   plane.position.set(15, 0, 0);
//   plane.receiveShadow = true;
//   scene.add(plane);

//   const cubeGeometory = new THREE.BoxGeometry(4, 4, 4);
//   const cubeMaterial = new THREE.MeshLambertMaterial({
//     color: 0xff0000,
//   });
//   const cube = new THREE.Mesh(cubeGeometory, cubeMaterial);
//   cube.position.set(-4, 3, 0);
//   cube.castShadow = true;
//   scene.add(cube);

//   const sphereGeometory = new THREE.SphereGeometry(4, 20, 20);
//   const sphereMaterial = new THREE.MeshLambertMaterial({
//     color: 0x7777ff,
//   });
//   const sphere = new THREE.Mesh(sphereGeometory, sphereMaterial);
//   sphere.position.set(20, 4, 2);
//   sphere.castShadow = true;
//   scene.add(sphere);

//   const camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   camera.position.set(-30, 40, 30);
//   camera.lookAt(scene.position);

//   const spotLight = new THREE.SpotLight(0xffffff);
//   spotLight.position.set(-20, 30, -5);
//   spotLight.castShadow = true;
//   scene.add(spotLight);

//   let c = 0.02;
//   const renderScene = () => {
//     cube.rotation.x += c;
//     cube.rotation.y += c;
//     cube.rotation.z += c;

//     requestAnimationFrame(renderScene);
//     renderer.render(scene, camera);
//   };

//   renderScene();

//   window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     camera.lookAt(scene.position);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   });
// };

// window.addEventListener("DOMContentLoaded", init);