# Three.js Scene Implementation

## Core Scene Setup
The main Three.js scene is implemented in [index.html](mdc:index.html). This file contains a complete, self-contained WebGL scene with the following key features:

### Scene Components
- WebGL renderer with fullscreen canvas and window resize handling
- PerspectiveCamera (60° FOV) with orbit-style follow behavior
- Large ground plane (200x200 green "grass" surface)
- Player character (capsule geometry) with WASD movement
- Dynamic sky system with configurable sun position
- Lighting system with ambient and directional lights
- Shadow mapping enabled for realistic shadows
- Optional grid helper toggled with 'G' key
- Geodesic dome model loaded via GLTFLoader, positioned 20 units ahead of player
- Scattered tree instances for environment decoration
- Four aligned colored portals with membranes and always-facing labels

### Technical Implementation Details
- Uses ES6 modules with CDN imports via importmap
- Three.js, OrbitControls, GLTFLoader, and Sky loaded from unpkg.com
- Responsive design with proper viewport handling
- Implements requestAnimationFrame loop with deltaTime
- Clean CSS setup for fullscreen canvas
- Physics-based movement and jumping system
- Local file serving required (use `npx serve` for model loading)
- InstancedMesh for efficient tree rendering
- Portal system with aligned positions, membranes, and billboarded labels

### Key Features
1. **Player Character**
   - Capsule geometry (0.5 radius, 1 height)
   - Light gray material (#eeeeee)
   - Positioned at y=0.5 on ground plane
   - Casts shadows

2. **Environment**
   - 200x200 ground plane with MeshPhongMaterial
   - Dynamic sky system scaled to 1000 units
   - Sun positioned at 45° elevation, 180° azimuth
   - 50 procedurally placed trees using InstancedMesh
   - Trees consist of trunk (cylinder) and foliage (cone)
   - Trees cast shadows and are randomly distributed

3. **Geodesic Dome**
   - Loaded from models/geodesic_dome.glb
   - Scaled to 0.5x original size
   - Positioned at (0, 0, -20)
   - Casts and receives shadows
   - Loaded asynchronously with progress tracking

4. **Portal System**
   - Four aligned colored portals with unique destinations
   - Each portal consists of:
     - Half-torus arch (radius 3, tube 0.4)
     - Transparent colored material (opacity 0.5)
     - Membrane plane (5.5 × 3) with matching color (opacity 0.25)
     - Canvas-based text label that always faces camera
     - Box3 trigger volume for collision detection
   - Portal positions (all at z = -60):
     - Cyan Portal: x = -30
     - Pink Portal: x = -10
     - Green Portal: x = 10
     - Orange Portal: x = 30
   - Each portal opens a unique URL in a new tab when triggered
   - One-time use per portal (tracked with used flag)
   - Labels automatically orient to face camera each frame

5. **Movement System**
   - WASD keyboard controls
   - Camera-relative movement
   - Frame-rate independent movement (5 units/second)
   - Space bar jumping with gravity
   - Ground collision detection

6. **Camera System**
   - Orbit-style follow camera using OrbitControls
   - Camera mounted on pivot object that follows player
   - Configurable distance limits (4-12 units)
   - Mouse-controlled rotation and zoom
   - Optional pointer lock mode (toggle with 'L' key)
   - Prevents camera from going under ground plane
   - Smooth camera following with automatic target updates

7. **Lighting System**
   - Dynamic sky-based lighting
   - Soft white ambient light (intensity: 0.4)
   - Directional light positioned from sun vector
   - Shadow casting enabled for all relevant objects

8. **Interactive Features**
   - WASD movement controls
   - Space bar jumping
   - Grid helper toggle with 'G' key
   - Mouse-controlled camera orbit
   - Mouse wheel zoom
   - Pointer lock mode with 'L' key
   - Portal interaction with URL opening

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
- InstancedMesh for efficient tree rendering
- Dynamic sky system for realistic lighting
- Reusable portal creation system with configurable properties
- Billboarded labels for optimal readability
- Double-sided portal membranes for proper visibility 