import * as THREE from 'three';

const PORTALS = [
    { x: -15, color: 0x00bfff, text: 'kimchi', url: 'https://shipkimchi.xyz/' },
    { x: -5, color: 0xff00ff, text: 'zubenefits', url: 'https://vibemeta.example' },
    { x: 5, color: 0x00ff00, text: 'zubazaar', url: 'https://vibeverse.example' },
    { x: 15, color: 0xffa500, text: 'netsolist', url: 'https://netsovillages.com/' }
];

/**
 * Creates a text sprite for portal labels
 * @param {string} text - The text to display
 * @param {number} color - The color of the text
 * @returns {THREE.Sprite} The text sprite
 */
function createTextSprite(text, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 72px Arial';
    context.fillStyle = '#' + color.toString(16).padStart(6, '0');
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(8, 2, 1);
    return sprite;
}

/**
 * Builds all portals in the scene
 * @param {THREE.Scene} scene - The scene to add portals to
 * @returns {Array} Array of portal objects
 */
export function buildPortals(scene) {
    return PORTALS.map(spec => {
        const portalGeometry = new THREE.TorusGeometry(4, 0.4, 16, 32, Math.PI);
        const portalMaterial = new THREE.MeshBasicMaterial({
            color: spec.color,
            transparent: true,
            opacity: 0.5
        });
        const portal = new THREE.Mesh(portalGeometry, portalMaterial);
        portal.position.set(spec.x, 0.5, -30);
        portal.rotation.y = Math.PI;
        scene.add(portal);

        const label = createTextSprite(spec.text, spec.color);
        label.position.set(spec.x, 6.5, -30);
        scene.add(label);

        const box = new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(spec.x, 0.5, -30),
            new THREE.Vector3(7, 8, 2)
        );

        return {
            mesh: portal,
            label: label,
            box: box,
            url: spec.url,
            used: false
        };
    });
}

/**
 * Updates portal interactions based on player position
 * @param {Array} portals - Array of portal objects
 * @param {THREE.Box3} playerBox - Player's bounding box
 * @param {THREE.Camera} camera - The camera for label orientation
 */
export function updatePortals(portals, playerBox, camera) {
    portals.forEach(portal => {
        portal.label.lookAt(camera.position);
        if (!portal.used && playerBox.intersectsBox(portal.box)) {
            portal.used = true;
            window.open(portal.url, '_blank');
        }
    });
} 