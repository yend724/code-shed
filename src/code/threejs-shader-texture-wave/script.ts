import "./style.scss";
import * as THREE from "three";
import * as dat from "lil-gui";
//import vertexShader from "./shaders/vertexSahder.glsl";
//import fragmentShader from "./shaders/fragmentShader.glsl";
import texture from "./photo.png";

const vertexShader = `
  uniform vec2 uWave;
  uniform float uTime;

  varying vec2 vUv;
  varying float vElavation;

  void main () {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uWave.x + uTime) * 0.1;
    elevation += sin(modelPosition.y * uWave.y + uTime) * 0.1;

    modelPosition.z = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
    vElavation = elevation;
  }
`;
const fragmentShader = `
  uniform vec3 uColor;
  uniform sampler2D uTexture;

  varying vec2 vUv;
  varying float vElavation;

  void main () {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= (vElavation + 0.2) * 2.5 + 0.25;
    gl_FragColor = textureColor;
  }
`;

const aspect = 16 / 9;

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(canvas.clientWidth, canvas.clientWidth / aspect);
renderer.setPixelRatio(window.devicePixelRatio);

const textureLoader = new THREE.TextureLoader();
const photTexture = textureLoader.load(texture);

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  transparent: true,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uWave: { value: new THREE.Vector2(5, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("pink") },
    uTexture: { value: photTexture },
  },
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const gui = new dat.GUI();
gui
  .add(material.uniforms.uWave.value, "x")
  .min(0)
  .max(10)
  .step(0.01)
  .name("waveX");
gui
  .add(material.uniforms.uWave.value, "y")
  .min(0)
  .max(10)
  .step(0.01)
  .name("waveY");
gui.hide();

const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  100
);
camera.position.set(0, 0, 1);
scene.add(camera);

const clock = new THREE.Clock();

const loop = () => {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

window.addEventListener("resize", () => {
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientWidth / aspect);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
