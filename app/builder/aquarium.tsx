// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import Fish from "@/app/builder/components/Fish";
// import Coral from "./components/Coral";

// export default function Aquarium() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const scene = useRef(new THREE.Scene());
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const [isInitialized, setIsInitialized] = useState(false);
  
//   // 🌟 Coral Position State
//   const [coralPosition, setCoralPosition] = useState<[number, number, number]>([0, -2.4, 0]);

//   // 🌟 Define movement boundaries
//   const minX = -5, maxX = 5;   // Left (-X) to Right (+X)
//   const minZ = -5, maxZ = 5;   // Inside (-Z) to Outside (+Z)
//   const step = 0.2;            // Movement step size

//   // 🌟 Handle Key Press for Coral Movement
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       setCoralPosition((prev) => {
//         let [x, y, z] = prev;

//         switch (event.key) {
//           case "ArrowLeft":  // Move left (-X)
//             x = Math.max(x - step, minX);
//             break;
//           case "ArrowRight": // Move right (+X)
//             x = Math.min(x + step, maxX);
//             break;
//           case "ArrowUp":    // Move inside (-Z)
//             z = Math.max(z - step, minZ);
//             break;
//           case "ArrowDown":  // Move outside (+Z)
//             z = Math.min(z + step, maxZ);
//             break;
//           default:
//             return prev; // No change for other keys
//         }
//         return [x, y, z];
//       });
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // 🎥 Scene, Camera, Renderer
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       containerRef.current.clientWidth / containerRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 3, 12);
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(
//       containerRef.current.clientWidth,
//       containerRef.current.clientHeight
//     );
//     containerRef.current.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     // 🕹️ OrbitControls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.minDistance = 5; // Minimum zoom-in distance
//     controls.maxDistance = 20; // Maximum zoom-out distance

//     // 🎨 Background Gradient
//     const canvas = document.createElement("canvas");
//     canvas.width = 2;
//     canvas.height = 512;
//     const context = canvas.getContext("2d");
//     const gradient = context.createLinearGradient(0, 0, 0, 512);
//     gradient.addColorStop(0, "#0e2a47");
//     gradient.addColorStop(0.6, "#4f74a0");
//     gradient.addColorStop(1, "#5fa9c7");
//     context.fillStyle = gradient;
//     context.fillRect(0, 0, 2, 512);
//     scene.current.background = new THREE.CanvasTexture(canvas);

//     // 💡 Lighting
//     const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.5);
//     scene.current.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
//     directionalLight.position.set(10, 10, 10);
//     scene.current.add(directionalLight);

//     // 🏝️ Sand (Ground)
//     const textureLoader = new THREE.TextureLoader();
//     const sandTexture = textureLoader.load("/textures/sand.jpg");
//     sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping;
//     sandTexture.repeat.set(4, 4);

//     const groundGeometry = new THREE.PlaneGeometry(20, 20);
//     const groundMaterial = new THREE.MeshStandardMaterial({
//       map: sandTexture,
//       roughness: 0.9,
//     });
//     const ground = new THREE.Mesh(groundGeometry, groundMaterial);
//     ground.rotation.x = -Math.PI / 2;
//     ground.position.set(0, -2.5, 0);
//     scene.current.add(ground);

//     // 🎥 Animation Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene.current, camera);
//     };
//     animate();

//     setIsInitialized(true);

//     return () => {
//       renderer.dispose();
//       containerRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} style={{ width: "100%", height: "100vh", position: "relative" }}>
//       {isInitialized && cameraRef.current && rendererRef.current && (
//         <Fish scene={scene.current} camera={cameraRef.current} renderer={rendererRef.current} />
//       )}
      
//       <Coral scene={scene.current} position={coralPosition} />
//     </div>
//   );
// }
// // import { useEffect, useRef, useState } from "react";
// // import * as THREE from "three";
// // import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// // import Coral from "./components/Coral";

// // export default function Aquarium() {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const scene = useRef(new THREE.Scene());
// //   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
// //   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
// //   const [isInitialized, setIsInitialized] = useState(false);

// //   // ✅ Store multiple corals with IDs
// //   const [corals, setCorals] = useState([
// //     { id: 1, position: [0, -2.4, 0] },
// //     { id: 2, position: [2, -2.4, 1] },
// //   ]);
// //   const [selectedCoral, setSelectedCoral] = useState<number | null>(null);

// //   // ✅ Define movement boundaries
// //   const minX = -5,
// //     maxX = 5;
// //   const minZ = -5,
// //     maxZ = 5;
// //   const step = 0.2;

// //   // ✅ Click to Select Coral
// //   useEffect(() => {
// //     const handleClick = (event: MouseEvent) => {
// //       if (!rendererRef.current || !cameraRef.current) return;

// //       const rect = rendererRef.current.domElement.getBoundingClientRect();
// //       const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
// //       const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

// //       const raycaster = new THREE.Raycaster();
// //       raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
// //       const intersects = raycaster.intersectObjects(scene.current.children, true);

// //       if (intersects.length > 0) {
// //         const clickedObject = intersects[0].object;
// //         let coralId = null;

// //         // ✅ Traverse up to get the correct object with `userData.id`
// //         let obj: THREE.Object3D | null = clickedObject;
// //         while (obj && !coralId) {
// //           if (obj.userData.id) {
// //             coralId = obj.userData.id;
// //           }
// //           obj = obj.parent;
// //         }

// //         if (coralId) {
// //           setSelectedCoral(coralId);
// //         }
// //       }
// //     };

// //     window.addEventListener("click", handleClick);
// //     return () => window.removeEventListener("click", handleClick);
// //   }, []);

// //   // ✅ Move Selected Coral with Arrow Keys
// //   useEffect(() => {
// //     const handleKeyDown = (event: KeyboardEvent) => {
// //       if (selectedCoral === null) return;

// //       setCorals((prevCorals) =>
// //         prevCorals.map((coral) =>
// //           coral.id === selectedCoral
// //             ? {
// //                 ...coral,
// //                 position: [
// //                   Math.max(
// //                     Math.min(
// //                       coral.position[0] +
// //                         (event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0),
// //                       maxX
// //                     ),
// //                     minX
// //                   ),
// //                   coral.position[1],
// //                   Math.max(
// //                     Math.min(
// //                       coral.position[2] +
// //                         (event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0),
// //                       maxZ
// //                     ),
// //                     minZ
// //                   ),
// //                 ],
// //               }
// //             : coral
// //         )
// //       );
// //     };

// //     window.addEventListener("keydown", handleKeyDown);
// //     return () => window.removeEventListener("keydown", handleKeyDown);
// //   }, [selectedCoral]);

// //   // ✅ Setup Scene, Camera & Renderer
// //   useEffect(() => {
// //     if (!containerRef.current) return;

// //     const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
// //     camera.position.set(0, 3, 12);
// //     cameraRef.current = camera;

// //     const renderer = new THREE.WebGLRenderer({ antialias: true });
// //     renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
// //     containerRef.current.appendChild(renderer.domElement);
// //     rendererRef.current = renderer;

// //     const controls = new OrbitControls(camera, renderer.domElement);
// //     controls.enableDamping = true;
// //     controls.minDistance = 5;
// //     controls.maxDistance = 20;

// //     const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.5);
// //     scene.current.add(ambientLight);
// //     const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
// //     directionalLight.position.set(10, 10, 10);
// //     scene.current.add(directionalLight);

// //     const animate = () => {
// //       requestAnimationFrame(animate);
// //       controls.update();
// //       renderer.render(scene.current, camera);
// //     };
// //     animate();

// //     setIsInitialized(true);

// //     return () => {
// //       renderer.dispose();
// //       containerRef.current?.removeChild(renderer.domElement);
// //     };
// //   }, []);

// //   return (
// //     <div ref={containerRef} style={{ width: "100%", height: "100vh", position: "relative" }}>
// //       {corals.map((coral) => (
// //         <Coral key={coral.id} scene={scene.current} position={coral.position} id={coral.id} isSelected={selectedCoral === coral.id} />
// //       ))}
// //     </div>
// //   );
// // }


import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Fish from "@/app/builder/components/Fish";
import Coral from "./components/Coral";

export default function Aquarium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene = useRef(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // State for backgrounds and selected template
  const [backgrounds] = useState([
    { id: "gradient", name: "Ocean Gradient" },
    { id: "image1", name: "Underwater Rocks", url: "/textures/underwater1.jpg" },
    { id: "image2", name: "Coral Reef", url: "/textures/coralreef.jpg" },
    { id: "image3", name: "Tropical Lagoon", url: "/textures/tropical.jpg" },
    { id: "image4", name: "Living Room", url: "/textures/living.jpg" },
    { id: "image5", name: "Beach", url: "/textures/water.jpg" },
  ]);
  
  const [selectedBackground, setSelectedBackground] = useState<string>("gradient");
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(reader.result as string, (texture) => {
          scene.current.background = texture;
          setSelectedBackground("custom");
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to update background
  const updateBackground = (id: string) => {
    if (id === "gradient") {
      const canvas = document.createElement("canvas");
      canvas.width = 2;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      const gradient = context.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, "#0e2a47");
      gradient.addColorStop(0.6, "#4f74a0");
      gradient.addColorStop(1, "#5fa9c7");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 2, 512);
      scene.current.background = new THREE.CanvasTexture(canvas);
    } else {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(backgrounds.find(bg => bg.id === id)?.url || "", (texture) => {
        scene.current.background = texture;
      });
    }
    setSelectedBackground(id);
  };

  
  // Initialize corals with different positions
  const [corals, setCorals] = useState([
    { id: 1, position: [-2, -2.4, -2] as [number, number, number] },
    { id: 2, position: [2, -2.4, -2] as [number, number, number] },
    { id: 3, position: [0, -2.4, 2] as [number, number, number] }
  ]);
  const [selectedCoralId, setSelectedCoralId] = useState<number | null>(null);

  // Movement boundaries and step size
  const minX = -5, maxX = 5;
  const minZ = -5, maxZ = 5;
  const step = 0.2;

  // Handle click selection
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rendererRef.current || !cameraRef.current) return;

      // Calculate mouse position in normalized device coordinates
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Setup raycaster
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

      // Get all intersected objects
      const intersects = raycaster.intersectObjects(scene.current.children, true);

      // Find clicked coral
      let foundCoralId = null;
      for (const intersect of intersects) {
        let obj: THREE.Object3D | null = intersect.object;
        while (obj) {
          if (obj.userData.coralId !== undefined) {
            foundCoralId = obj.userData.coralId;
            break;
          }
          obj = obj.parent;
        }
        if (foundCoralId !== null) break;
      }

      // Update selection
      setSelectedCoralId(foundCoralId);
      console.log("Selected coral:", foundCoralId); // Debug log
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Handle keyboard movement
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedCoralId === null) return;

      setCorals(prevCorals => 
        prevCorals.map(coral => {
          if (coral.id !== selectedCoralId) return coral;

          const [x, y, z] = coral.position;
          let newX = x;
          let newZ = z;

          switch (event.key) {
            case "ArrowLeft":
              newX = Math.max(x - step, minX);
              break;
            case "ArrowRight":
              newX = Math.min(x + step, maxX);
              break;
            case "ArrowUp":
              newZ = Math.max(z - step, minZ);
              break;
            case "ArrowDown":
              newZ = Math.min(z + step, maxZ);
              break;
            default:
              return coral;
          }

          console.log("Moving coral:", coral.id, "to:", [newX, y, newZ]); // Debug log
          return { ...coral, position: [newX, y, newZ] as [number, number, number] };
        })
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCoralId]);

  // Initialize scene
  useEffect(() => {
    if (!containerRef.current) return;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 20;

    // Default background
    updateBackground(selectedBackground);

    const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.5);
    scene.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.current.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const sandTexture = textureLoader.load("/textures/sand.jpg");
    sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping;
    sandTexture.repeat.set(4, 4);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      map: sandTexture,
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -2.5, 0);
    scene.current.add(ground);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene.current, camera);
    };
    animate();

    setIsInitialized(true);

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

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedBackground]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
  <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
    <select
      value={selectedBackground}
      onChange={(e) => updateBackground(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        background: "#222",
        color: "#fff",
        border: "none",
      }}
    >
      {backgrounds.map((bg) => (
        <option key={bg.id} value={bg.id}>
          {bg.name}
        </option>
      ))}
    </select>
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      style={{
        padding: "10px",
        borderRadius: "8px",
        background: "#222",
        color: "#fff",
        border: "none",
        marginLeft: "10px",
      }}
    />
  </div>

  {/* Unified container with conditional rendering */}
  <div
    ref={containerRef}
    style={{ width: "100%", height: "100vh", position: "relative" }}
  >
    {isInitialized && (
      <>
        {corals.map((coral) => (
          <Coral
            key={coral.id}
            scene={scene.current}
            position={coral.position}
            id={coral.id}
            isSelected={selectedCoralId === coral.id}
          />
        ))}
        {cameraRef.current && rendererRef.current && (
          <Fish
            scene={scene.current}
            camera={cameraRef.current}
            renderer={rendererRef.current}
          />
        )}
      </>
    )}
  </div>
</div>


  );
}