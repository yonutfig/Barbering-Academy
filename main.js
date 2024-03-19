import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x508991, metalness: 0.6, normalScale: new THREE.Vector2(1, 1) });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
pointLight.intensity = 1;
pointLight.clone = 1;
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xadd8e6 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
  const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x99ccff, transparent: true, opacity: 0.5 });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.position.set(x, y, z);
  scene.add(glow);
}

Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  moon.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();

