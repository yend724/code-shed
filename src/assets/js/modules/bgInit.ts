import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
const pageData = [
  {
    pageTitle: "線形補間を用いた追従エフェクト",
    path: "/code/scroll-parallax-lerp/",
    date: "2022-05-16",
    category: "code",
  },
  {
    pageTitle: "スクロールイベントによるパララックス",
    path: "/code/scroll-parallax-on-scrollevent/",
    date: "2022-05-15",
    category: "code",
  },
  {
    pageTitle: "Three.jsとShaderを使って画像をゆらゆらさせる",
    path: "/code/threejs-shader-texture-wave/",
    date: "2022-05-14",
    category: "code",
  },
  {
    pageTitle: "3Dホバーエフェクト（カードUI）",
    path: "/code/card-3d-hover-effect/",
    date: "2022-05-06",
    category: "code",
  },
  {
    pageTitle: "マウスによるパララックス（フルスクラッチ）",
    path: "/code/mouse-parallax-full-scratch/",
    date: "2022-05-05",
    category: "code",
  },
  {
    pageTitle: "SVGでstrokeのテキストアニメーション",
    path: "/code/text-stroke-animation/",
    date: "2022-05-05",
    category: "code",
  },
  {
    pageTitle: "CSSのtext-shadowでテキストの3D表現",
    path: "/code/css-textshadow-3d/",
    date: "2022-05-01",
    category: "code",
  },
  {
    pageTitle: "ドーナツセレクタ",
    path: "/code/donut-selector/",
    date: "2022-05-02",
    category: "code",
  },
  {
    pageTitle: "Three.jsのRaycasterで交差をしらべる",
    path: "/code/threejs-raycaster/",
    date: "2022-05-01",
    category: "code",
  },
];

const bgInit = () => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000, 50, 150);

  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bgCanvas") as HTMLCanvasElement,
  });
  renderer.setClearColor(new THREE.Color(0x000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  let title: THREE.Mesh<TextGeometry, THREE.MeshNormalMaterial>;
  let texts: {
    target: THREE.Mesh<TextGeometry, THREE.MeshNormalMaterial>;
    random: {
      x: number;
      y: number;
      z: number;
    };
    speed: number;
  }[] = [];
  const fontloader = new FontLoader();
  fontloader.load("/assets/fonts/BIZUDPGothic_Bold.json", font => {
    const titleGeometory = new TextGeometry("Code Shed", {
      font: font,
      size: 0.5,
      height: 0.3,
    });
    titleGeometory.center();
    const titleMaterial = new THREE.MeshNormalMaterial();
    title = new THREE.Mesh(titleGeometory, titleMaterial);
    title.position.set(0, 0, 0);
    scene.add(title);

    texts = pageData.map(v => {
      const random = {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
      };
      const speed = Math.random() + 0.2;
      const geometry = new TextGeometry(v.pageTitle, {
        font: font,
        size: 0.25,
        height: 0.15,
      });
      geometry.center();
      const material = new THREE.MeshNormalMaterial();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        Math.cos(random.x) * 5,
        Math.sin(random.y) * 5,
        Math.sin(random.z) * 5
      );
      scene.add(mesh);
      return {
        target: mesh,
        random: random,
        speed: speed,
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
  window.addEventListener("pointermove", e => {
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
    const elapsed = (ts - previousTimestamp) / 1000;
    previousTimestamp = ts;

    if (title) {
      title.rotation.x += elapsed;
      title.rotation.y -= elapsed;
      title.rotation.z += elapsed;
    }
    if (texts.length > 0) {
      texts.forEach(text => {
        const { target, random, speed } = text;
        target.position.x = Math.cos(random.x + (ts * speed) / 1200) * 5.0;
        target.position.y = Math.sin(random.y + (ts * speed) / 1200) * 5.0;
        target.position.z = Math.sin(random.z + (ts * speed) / 1200) * 5.0;

        (["x", "y", "z"] as ("x" | "y" | "z")[]).forEach(r => {
          target.rotation[r] +=
            (elapsed * (random.x + random.y + random.z)) / 3 / 10;
        });
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
