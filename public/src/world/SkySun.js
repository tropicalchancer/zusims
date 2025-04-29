import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

/**
 * Initializes the sky and sun lighting for the scene
 * @param {THREE.Scene} scene - The scene to add sky and lighting to
 */
export function initSkySun(scene) {
    // Sky setup
    const sky = new Sky();
    sky.scale.setScalar(1000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = 2;
    skyUniforms['rayleigh'].value = 1;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const sun = new THREE.Vector3();
    const phi = THREE.MathUtils.degToRad(90 - 30);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms['sunPosition'].value.copy(sun);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.copy(sun);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
} 