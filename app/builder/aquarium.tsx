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
  
  // 🌟 Coral Position State
  const [coralPosition, setCoralPosition] = useState<[number, number, number]>([0, -2.4, 0]);

  // 🌟 Define movement boundaries
  const minX = -5, maxX = 5;   // Left (-X) to Right (+X)
  const minZ = -5, maxZ = 5;   // Inside (-Z) to Outside (+Z)
  const step = 0.2;            // Movement step size

  // 🌟 Handle Key Press for Coral Movement
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setCoralPosition((prev) => {
        let [x, y, z] = prev;

        switch (event.key) {
          case "ArrowLeft":  // Move left (-X)
            x = Math.max(x - step, minX);
            break;
          case "ArrowRight": // Move right (+X)
            x = Math.min(x + step, maxX);
            break;
          case "ArrowUp":    // Move inside (-Z)
            z = Math.max(z - step, minZ);
            break;
          case "ArrowDown":  // Move outside (+Z)
            z = Math.min(z + step, maxZ);
            break;
          default:
            return prev; // No change for other keys
        }
        return [x, y, z];
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // 🎥 Scene, Camera, Renderer
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 12);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 🕹️ OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 5; // Minimum zoom-in distance
    controls.maxDistance = 20; // Maximum zoom-out distance

    // 🎨 Background Gradient
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

    // 💡 Lighting
    const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.5);
    scene.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.current.add(directionalLight);

    // 🏝️ Sand (Ground)
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

    // 🎥 Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene.current, camera);
    };
    animate();

    setIsInitialized(true);

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh", position: "relative" }}>
      {isInitialized && cameraRef.current && rendererRef.current && (
        <Fish scene={scene.current} camera={cameraRef.current} renderer={rendererRef.current} />
      )}
      
      <Coral scene={scene.current} position={coralPosition} />
    </div>
  );
}
