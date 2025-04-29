import * as THREE from 'three';

export class Player {
    constructor() {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: 0xeeeeee })
        );
        this.mesh.position.set(0, 0.5, 0);
        this.mesh.castShadow = true;
        
        this.boundingBox = new THREE.Box3().setFromObject(this.mesh);
        this.velocityY = 0;
        this.isGrounded = true;
        this.moveSpeed = 5;
        this.jumpForce = 10;
    }

    /**
     * Updates player position and physics
     * @param {number} deltaTime - Time since last frame
     */
    update(deltaTime) {
        // Apply gravity
        this.velocityY -= 9.8 * deltaTime;
        this.mesh.position.y += this.velocityY * deltaTime;
        
        // Ground collision
        if (this.mesh.position.y <= 0.5) {
            this.mesh.position.y = 0.5;
            this.velocityY = 0;
            this.isGrounded = true;
        }
        
        // Update bounding box
        this.boundingBox.setFromObject(this.mesh);
    }

    /**
     * Makes the player jump if grounded
     */
    jump() {
        if (this.isGrounded) {
            this.velocityY = this.jumpForce;
            this.isGrounded = false;
        }
    }
} 