import * as THREE from 'three';

/**
 * Creates the ground plane and grid helper
 * @param {THREE.Scene} scene - The scene to add terrain to
 */
export function createTerrain(scene) {
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const textureLoader = new THREE.TextureLoader();
    const grassTexture = textureLoader.load('/textures/grass.jpg');
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(25, 25);
    
    const groundMaterial = new THREE.MeshStandardMaterial({
        map: grassTexture,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);

    // Add keyboard listener for grid toggle
    window.addEventListener('keydown', (e) => {
        if (e.key === 'g') gridHelper.visible = !gridHelper.visible;
    });
} 