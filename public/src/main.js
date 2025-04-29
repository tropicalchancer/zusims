import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { initSkySun } from './world/SkySun.js';
import { createTerrain } from './world/Terrain.js';
import { scatterTrees } from './world/Trees.js';
import { buildPortals, updatePortals } from './world/Portals.js';
import { Player } from './player/Player.js';
import { useControls } from './player/Controls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Initialize world components
initSkySun(scene);
createTerrain(scene);
scatterTrees(scene);

// Load geodesic dome
const loader = new GLTFLoader();
loader.load(
    '/models/geodesic_dome.glb',
    (gltf) => {
        const dome = gltf.scene;
        dome.scale.set(0.5, 0.5, 0.5);
        dome.position.set(40, 0, 40);
        dome.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(dome);
    },
    undefined,
    (err) => console.error('GLB load error:', err)
);

// Create player and controls
const player = new Player();
scene.add(player.mesh);

const controls = useControls(camera, player);
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enablePan = false;
orbitControls.enableZoom = true;
orbitControls.minDistance = 4;
orbitControls.maxDistance = 50;
orbitControls.maxPolarAngle = Math.PI * 0.49;
orbitControls.target.copy(player.mesh.position);

// Create portals
const portals = buildPortals(scene);

// Animation loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();

    // Update player and controls
    player.update(deltaTime);
    controls.update(deltaTime);

    // Update portal interactions
    updatePortals(portals, player.boundingBox, camera);

    // Update camera and orbit controls
    orbitControls.target.copy(player.mesh.position);
    orbitControls.update();

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 