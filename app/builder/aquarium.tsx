// "use client";

// import * as THREE from "three";
// import { useEffect } from "react";

// const Aquarium = () => {
//   useEffect(() => {
//     // Create the scene
//     const scene = new THREE.Scene();

//     // Gradient ocean background
//     const canvas = document.createElement("canvas");
//     canvas.width = 32;
//     canvas.height = window.innerHeight;
//     const context = canvas.getContext("2d")!;
//     const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
//     gradient.addColorStop(0, "#001f3f"); // Deep blue
//     gradient.addColorStop(0.5, "#0074D9"); // Bright blue
//     gradient.addColorStop(1, "#7FDBFF"); // Light blue
//     context.fillStyle = gradient;
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     const backgroundTexture = new THREE.CanvasTexture(canvas);
//     scene.background = backgroundTexture;

//     // Create a camera
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 3, 15);

//     // Create the renderer
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Add lighting
//     const ambientLight = new THREE.AmbientLight(0x99ccff, 1.2);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(10, 15, 10);
//     scene.add(directionalLight);

//     // Aquarium walls
//     const aquariumMaterial = new THREE.MeshPhongMaterial({
//       color: 0x0099cc,
//       transparent: true,
//       opacity: 0.6,
//       side: THREE.DoubleSide,
//     });

//     const aquariumGeometry = new THREE.BoxGeometry(10, 6, 10);
//     const aquarium = new THREE.Mesh(aquariumGeometry, aquariumMaterial);
//     scene.add(aquarium);

//     // Aquarium floor
//     const floorGeometry = new THREE.PlaneGeometry(10, 10);
//     const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x4d4d4d });
//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = -Math.PI / 2;
//     floor.position.y = -3;
//     scene.add(floor);

//     // Add bubbles
//     const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
//     const bubbleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

//     function createBubble() {
//       const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
//       bubble.position.set(
//         THREE.MathUtils.randFloat(-4, 4),
//         THREE.MathUtils.randFloat(-2.5, 2.5),
//         THREE.MathUtils.randFloat(-4, 4)
//       );
//       scene.add(bubble);

//       function animateBubble() {
//         bubble.position.y += 0.02;
//         if (bubble.position.y > 3) {
//           bubble.position.y = -3;
//         }
//         requestAnimationFrame(animateBubble);
//       }
//       animateBubble();
//     }

//     for (let i = 0; i < 30; i++) {
//       createBubble();
//     }

//     // Handle rotation on click
//     let isRotating = false;

//     function onClick() {
//       isRotating = !isRotating;
//     }
//     document.addEventListener("click", onClick);

//     // Animation loop
//     function animate() {
//       requestAnimationFrame(animate);

//       if (isRotating) {
//         aquarium.rotation.y += 0.01;
//       }

//       renderer.render(scene, camera);
//     }

//     // Handle window resize
//     window.addEventListener("resize", () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     });

//     // Start animation
//     animate();

//     // Cleanup on unmount
//     return () => {
//       document.body.removeChild(renderer.domElement);
//       document.removeEventListener("click", onClick);
//     };
//   }, []);

//   return null; // The scene is directly rendered on the DOM
// };

// export default Aquarium;

// "use client";

// import * as THREE from "three";
// import { useEffect, useRef } from "react";

// const Aquarium = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Create scene
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf0f0f0); // Light gray background

//     // Create camera
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       containerRef.current.clientWidth / containerRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 0, 5);

//     // Create renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//     containerRef.current.appendChild(renderer.domElement);

//     // Add lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(10, 10, 10);
//     scene.add(directionalLight);

//     // Create aquarium box
//     const aquariumMaterial = new THREE.MeshPhongMaterial({
//       color: 0x156289,
//       transparent: true,
//       opacity: 0.2,
//       side: THREE.DoubleSide,
//     });

//     const aquariumGeometry = new THREE.BoxGeometry(4, 3, 3);
//     const aquarium = new THREE.Mesh(aquariumGeometry, aquariumMaterial);
//     scene.add(aquarium);

//     // Add base
//     const baseGeometry = new THREE.BoxGeometry(4.2, 0.2, 3.2);
//     const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
//     const base = new THREE.Mesh(baseGeometry, baseMaterial);
//     base.position.y = -1.6;
//     scene.add(base);

//     // Handle window resize
//     const handleResize = () => {
//       if (!containerRef.current) return;
      
//       const width = containerRef.current.clientWidth;
//       const height = containerRef.current.clientHeight;
      
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener('resize', handleResize);

//     // Animation
//     let rotation = 0;
//     const animate = () => {
//       requestAnimationFrame(animate);
//       rotation += 0.005;
//       aquarium.rotation.y = rotation;
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//       if (containerRef.current) {
//         containerRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return <div ref={containerRef} className="w-full h-full" />;
// };

// export default Aquarium;

// "use client";

// import * as THREE from "three";
// import { useEffect, useRef } from "react";

// const Aquarium = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Create scene
//     const scene = new THREE.Scene();
    
//     // Create gradient background
//     const canvas = document.createElement('canvas');
//     canvas.width = 2;
//     canvas.height = 512;
//     const context = canvas.getContext('2d')!;
//     const gradient = context.createLinearGradient(0, 0, 0, 512);
//     gradient.addColorStop(0, '#1e40af');  // Brighter blue at top
//     gradient.addColorStop(1, '#3b82f6');  // Brighter blue at bottom
//     context.fillStyle = gradient;
//     context.fillRect(0, 0, 2, 512);
//     const backgroundTexture = new THREE.CanvasTexture(canvas);
//     scene.background = backgroundTexture;

//     // Create camera with adjusted position for larger aquarium
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       containerRef.current.clientWidth / containerRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 0, 7); // Moved camera back to accommodate larger size

//     // Create renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//     containerRef.current.appendChild(renderer.domElement);

//     // Enhanced lighting with brighter values
//     const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.8); // Brighter ambient light
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
//     directionalLight.position.set(10, 10, 10);
//     scene.add(directionalLight);

//     // Add point lights with brighter colors
//     const pointLight1 = new THREE.PointLight(0x7dd3fc, 0.7);
//     pointLight1.position.set(5, 5, 5);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0x7dd3fc, 0.5);
//     pointLight2.position.set(-5, -5, -5);
//     scene.add(pointLight2);

//     // Create larger aquarium box with brighter glass material
//     const aquariumMaterial = new THREE.MeshPhysicalMaterial({
//       color: 0x93c5fd, // Brighter blue
//       transparent: true,
//       opacity: 0.2,
//       roughness: 0.1,
//       metalness: 0.9,
//       side: THREE.DoubleSide,
//       envMapIntensity: 1.5
//     });

//     const aquariumGeometry = new THREE.BoxGeometry(6, 4, 4); // Increased size
//     const aquarium = new THREE.Mesh(aquariumGeometry, aquariumMaterial);
//     scene.add(aquarium);

//     // Create water inside the aquarium with brighter color
//     const waterMaterial = new THREE.MeshPhysicalMaterial({
//       color: 0x60a5fa, // Brighter blue for water
//       transparent: true,
//       opacity: 0.2,
//       roughness: 0.1,
//       metalness: 0.2
//     });

//     const waterGeometry = new THREE.BoxGeometry(5.9, 3.9, 3.9); // Adjusted for larger size
//     const water = new THREE.Mesh(waterGeometry, waterMaterial);
//     scene.add(water);

//     // Add larger base with brighter material
//     const baseGeometry = new THREE.BoxGeometry(6.2, 0.3, 4.2); // Increased size
//     const baseMaterial = new THREE.MeshPhysicalMaterial({ 
//       color: 0x3b82f6, // Brighter blue
//       roughness: 0.5,
//       metalness: 0.8
//     });
//     const base = new THREE.Mesh(baseGeometry, baseMaterial);
//     base.position.y = -2.1; // Adjusted position for larger size
//     scene.add(base);

//     // Create bubbles
//     const bubbles: THREE.Mesh[] = [];
//     const bubbleGeometry = new THREE.SphereGeometry(0.03, 16, 16); // Slightly larger bubbles
//     const bubbleMaterial = new THREE.MeshPhysicalMaterial({
//       color: 0xffffff,
//       transparent: true,
//       opacity: 0.6,
//       roughness: 0.1,
//       metalness: 0.9
//     });

//     // Function to create a new bubble
//     const createBubble = () => {
//       const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
//       // Random position within the larger aquarium
//       bubble.position.set(
//         Math.random() * 5 - 2.5,  // x: -2.5 to 2.5
//         -1.9,                     // y: start from bottom
//         Math.random() * 3 - 1.5   // z: -1.5 to 1.5
//       );
//       bubble.userData = {
//         speed: 0.01 + Math.random() * 0.01,
//         wobble: {
//           speed: 0.02 + Math.random() * 0.02,
//           amplitude: 0.05 + Math.random() * 0.05,
//           offset: Math.random() * Math.PI * 2
//         }
//       };
//       scene.add(bubble);
//       bubbles.push(bubble);
//     };

//     // Create initial bubbles
//     for (let i = 0; i < 30; i++) { // More bubbles for larger tank
//       createBubble();
//     }

//     // Handle window resize
//     const handleResize = () => {
//       if (!containerRef.current) return;
      
//       const width = containerRef.current.clientWidth;
//       const height = containerRef.current.clientHeight;
      
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener('resize', handleResize);

//     // Animation
//     let rotation = 0;
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       // Subtle rotation
//       rotation += 0.001;
//       aquarium.rotation.y = Math.sin(rotation) * 0.1;
//       water.rotation.y = Math.sin(rotation) * 0.1;

//       // Animate bubbles
//       bubbles.forEach((bubble) => {
//         bubble.position.y += bubble.userData.speed;
//         bubble.position.x += Math.sin(bubble.userData.wobble.offset) * bubble.userData.wobble.amplitude * 0.01;
//         bubble.userData.wobble.offset += bubble.userData.wobble.speed;

//         // Reset bubble when it reaches the top
//         if (bubble.position.y > 1.9) {
//           bubble.position.y = -1.9;
//           bubble.position.x = Math.random() * 5 - 2.5;
//           bubble.position.z = Math.random() * 3 - 1.5;
//         }
//       });

//       renderer.render(scene, camera);
//     };

//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//       if (containerRef.current) {
//         containerRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return <div ref={containerRef} className="w-full h-full" />;
// };

// export default Aquarium;

"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

const Aquarium = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    
    // Create gradient background
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#1e40af');  // Brighter blue at top
    gradient.addColorStop(1, '#3b82f6');  // Brighter blue at bottom
    context.fillStyle = gradient;
    context.fillRect(0, 0, 2, 512);
    const backgroundTexture = new THREE.CanvasTexture(canvas);
    scene.background = backgroundTexture;

    // Create camera with adjusted position for larger aquarium
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12); // Moved camera further back for larger aquarium

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Enhanced lighting with brighter values
    const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x7dd3fc, 0.7);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7dd3fc, 0.5);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Create larger aquarium box with brighter glass material
    const aquariumMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.2,
      roughness: 0.1,
      metalness: 0.9,
      side: THREE.DoubleSide,
      envMapIntensity: 1.5
    });

    // Increased dimensions for larger aquarium
    const aquariumGeometry = new THREE.BoxGeometry(10, 7, 7); // Significantly larger size
    const aquarium = new THREE.Mesh(aquariumGeometry, aquariumMaterial);
    scene.add(aquarium);

    // Create water inside the aquarium with brighter color
    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.2,
      roughness: 0.1,
      metalness: 0.2
    });

    // Water slightly smaller than aquarium
    const waterGeometry = new THREE.BoxGeometry(9.9, 6.9, 6.9);
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    scene.add(water);

    // Add larger base
    const baseGeometry = new THREE.BoxGeometry(10.2, 0.3, 7.2);
    const baseMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0x3b82f6,
      roughness: 0.5,
      metalness: 0.8
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -3.6; // Adjusted position for larger size
    scene.add(base);

    // Create bubbles
    const bubbles: THREE.Mesh[] = [];
    const bubbleGeometry = new THREE.SphereGeometry(0.05, 16, 16); // Slightly larger bubbles
    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.9
    });

    // Function to create a new bubble
    const createBubble = () => {
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      // Random position within the larger aquarium
      bubble.position.set(
        Math.random() * 9 - 4.5,   // x: -4.5 to 4.5
        -3.4,                      // y: start from bottom
        Math.random() * 6 - 3      // z: -3 to 3
      );
      bubble.userData = {
        speed: 0.01 + Math.random() * 0.01,
        wobble: {
          speed: 0.02 + Math.random() * 0.02,
          amplitude: 0.05 + Math.random() * 0.05,
          offset: Math.random() * Math.PI * 2
        }
      };
      scene.add(bubble);
      bubbles.push(bubble);
    };

    // Create initial bubbles
    for (let i = 0; i < 50; i++) { // More bubbles for larger tank
      createBubble();
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation
    let rotation = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Subtle rotation
      rotation += 0.001;
      aquarium.rotation.y = Math.sin(rotation) * 0.1;
      water.rotation.y = Math.sin(rotation) * 0.1;

      // Animate bubbles
      bubbles.forEach((bubble) => {
        bubble.position.y += bubble.userData.speed;
        bubble.position.x += Math.sin(bubble.userData.wobble.offset) * bubble.userData.wobble.amplitude * 0.01;
        bubble.userData.wobble.offset += bubble.userData.wobble.speed;

        // Reset bubble when it reaches the top
        if (bubble.position.y > 3.4) {
          bubble.position.y = -3.4;
          bubble.position.x = Math.random() * 9 - 4.5;
          bubble.position.z = Math.random() * 6 - 3;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default Aquarium;