# Three.js Scene Implementation

## Core Scene Setup
The main Three.js scene is implemented in [index.html](mdc:index.html). This file contains a complete, self-contained WebGL scene with the following key features:

### Scene Components
- WebGL renderer with fullscreen canvas and window resize handling
- PerspectiveCamera (60° FOV) with orbit-style follow behavior
- Ground plane (50x50 green "grass" surface)
- Player character (capsule geometry) with WASD movement
- Lighting system with ambient and directional lights
- Shadow mapping enabled for realistic shadows
- Optional grid helper toggled with 'G' key
- Geodesic dome model loaded via GLTFLoader, positioned 20 units ahead of player

### Technical Implementation Details
- Uses ES6 modules with CDN imports via importmap
- Three.js, OrbitControls, and GLTFLoader loaded from unpkg.com
- Responsive design with proper viewport handling
- Implements requestAnimationFrame loop with deltaTime
- Clean CSS setup for fullscreen canvas
- Physics-based movement and jumping system
- Local file serving required (use `npx serve` for model loading)

### Key Features
1. **Player Character**
   - Capsule geometry (0.5 radius, 1 height)
   - Light gray material (#eeeeee)
   - Positioned at y=0.5 on ground plane
   - Casts shadows

2. **Geodesic Dome**
   - Loaded from models/geodesic_dome.glb
   - Scaled to 3x original size
   - Positioned at (0, 0, -20)
   - Casts and receives shadows
   - Loaded asynchronously with progress tracking

3. **Movement System**
   - WASD keyboard controls
   - Camera-relative movement
   - Frame-rate independent movement (5 units/second)
   - Space bar jumping with gravity
   - Ground collision detection

4. **Camera System**
   - Orbit-style follow camera using OrbitControls
   - Camera mounted on pivot object that follows player
   - Configurable distance limits (4-12 units)
   - Mouse-controlled rotation and zoom
   - Optional pointer lock mode (toggle with 'L' key)
   - Prevents camera from going under ground plane
   - Smooth camera following with automatic target updates

5. **Lighting System**
   - Soft white ambient light (intensity: 0.5)
   - White directional light at (5, 10, 2)
   - Shadow casting enabled

6. **Interactive Features**
   - WASD movement controls
   - Space bar jumping
   - Grid helper toggle with 'G' key
   - Mouse-controlled camera orbit
   - Mouse wheel zoom
   - Pointer lock mode with 'L' key

### Best Practices Implemented
- Proper cleanup and event handling
- Efficient render loop with deltaTime
- Modular code structure with clear comments
- Responsive design considerations
- Shadow and lighting optimization
- Physics-based movement system
- Smooth camera interpolation
- Proper camera constraints and limits
- Efficient pivot-based camera following
- Proper model loading with error handling and debugging 