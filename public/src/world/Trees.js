import * as THREE from 'three';

/**
 * Creates and scatters instanced trees around the scene
 * @param {THREE.Scene} scene - The scene to add trees to
 */
export function scatterTrees(scene) {
    const treeCount = 50;
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8);
    const foliageGeometry = new THREE.ConeGeometry(1, 2, 8);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x006400 });

    const trunkMesh = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, treeCount);
    const foliageMesh = new THREE.InstancedMesh(foliageGeometry, foliageMaterial, treeCount);
    trunkMesh.castShadow = true;
    foliageMesh.castShadow = true;

    const matrix = new THREE.Matrix4();
    for (let i = 0; i < treeCount; i++) {
        let x, z;
        if (i < treeCount / 4) {
            x = (Math.random() - 0.5) * 90;
            z = -45 + (Math.random() - 0.5) * 10;
        } else if (i < treeCount / 2) {
            x = (Math.random() - 0.5) * 90;
            z = 45 + (Math.random() - 0.5) * 10;
        } else if (i < 3 * treeCount / 4) {
            x = -45 + (Math.random() - 0.5) * 10;
            z = (Math.random() - 0.5) * 90;
        } else {
            x = 45 + (Math.random() - 0.5) * 10;
            z = (Math.random() - 0.5) * 90;
        }
        
        matrix.setPosition(x, 1, z);
        trunkMesh.setMatrixAt(i, matrix);
        matrix.setPosition(x, 3, z);
        foliageMesh.setMatrixAt(i, matrix);
    }
    scene.add(trunkMesh);
    scene.add(foliageMesh);
} 