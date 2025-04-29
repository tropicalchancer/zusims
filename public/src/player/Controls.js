import * as THREE from 'three';

/**
 * Sets up player controls and returns update/dispose functions
 * @param {THREE.Camera} camera - The camera to control
 * @param {Player} player - The player instance to control
 * @returns {Object} Object with update and dispose methods
 */
export function useControls(camera, player) {
    const keys = {};
    const moveSpeed = 5;
    let isPointerLocked = false;

    function keyHandler(e) {
        keys[e.key.toLowerCase()] = e.type === 'keydown';
        
        // Handle jump
        if (e.type === 'keydown' && e.key === ' ') {
            player.jump();
        }
    }

    function pointerLockHandler(e) {
        if (e.key === 'l') {
            document.body.requestPointerLock();
        }
    }

    function pointerLockChangeHandler() {
        isPointerLocked = document.pointerLockElement !== null;
    }

    // Event listeners
    window.addEventListener('keydown', keyHandler);
    window.addEventListener('keyup', keyHandler);
    window.addEventListener('keydown', pointerLockHandler);
    document.addEventListener('pointerlockchange', pointerLockChangeHandler);

    return {
        /**
         * Updates player movement based on input
         * @param {number} deltaTime - Time since last frame
         */
        update(deltaTime) {
            const moveDirection = new THREE.Vector3();
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            cameraDirection.y = 0;
            cameraDirection.normalize();

            if (keys['w']) moveDirection.add(cameraDirection);
            if (keys['s']) moveDirection.sub(cameraDirection);
            if (keys['a']) moveDirection.add(cameraDirection.clone().cross(new THREE.Vector3(0, 1, 0)));
            if (keys['d']) moveDirection.sub(cameraDirection.clone().cross(new THREE.Vector3(0, 1, 0)));

            if (moveDirection.length() > 0) {
                moveDirection.normalize();
                const newPosition = player.mesh.position.clone().add(
                    moveDirection.multiplyScalar(moveSpeed * deltaTime)
                );
                player.mesh.position.x = newPosition.x;
                player.mesh.position.z = newPosition.z;
            }
        },

        /**
         * Cleans up event listeners
         */
        dispose() {
            window.removeEventListener('keydown', keyHandler);
            window.removeEventListener('keyup', keyHandler);
            window.removeEventListener('keydown', pointerLockHandler);
            document.removeEventListener('pointerlockchange', pointerLockChangeHandler);
        }
    };
} 