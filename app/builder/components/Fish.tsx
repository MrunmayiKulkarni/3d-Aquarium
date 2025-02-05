import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Fish({
  scene,
  camera,
  renderer,
}: {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
}) {
  const fishRef = useRef<THREE.Object3D | null>(null);
  const isRotatingRef = useRef(false);
  const [fishInfo, setFishInfo] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  useEffect(() => {
    if (fishRef.current) return;

    const loader = new GLTFLoader();
    loader.load("/models/fishe.glb", (gltf) => {
      const fish = gltf.scene;
      fish.scale.set(1, 1, 1);
      fish.position.set(0, 0, 0);
      fish.rotation.y = Math.random() * Math.PI * 2;

      // ✅ Remove any existing fish before adding new one
      const existingFish = scene.getObjectByName("fish");
      if (existingFish) {
        scene.remove(existingFish);
      }

      fish.name = "fish";
      scene.add(fish);
      fishRef.current = fish;

      // 🏊‍♂️ Fish Swimming Animation (Slower)
      const fishSwim = () => {
        if (fishRef.current) {
          fishRef.current.position.x += 0.005;
          if (fishRef.current.position.x > 6) fishRef.current.position.x = -6;
        }
        requestAnimationFrame(fishSwim);
      };
      fishSwim();
    });

    // 🖱️ Click Interaction to Rotate 360°
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      if (!fishRef.current || isRotatingRef.current) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(fishRef.current, true);

      if (intersects.length > 0) {
        isRotatingRef.current = true;
        let rotationAmount = 0;

        const rotateFish = () => {
          if (!fishRef.current) return;
          const rotationSpeed = Math.PI / 50;
          fishRef.current.rotation.y += rotationSpeed;
          rotationAmount += rotationSpeed;

          if (rotationAmount < Math.PI * 2) {
            requestAnimationFrame(rotateFish);
          } else {
            fishRef.current.rotation.y = Math.round(fishRef.current.rotation.y);
            isRotatingRef.current = false;
          }
        };

        rotateFish();
      }
    };

    // 🖱️ Double Click Interaction to Show Info
    const onDoubleClick = (event: MouseEvent) => {
      if (!fishRef.current) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(fishRef.current, true);

      if (intersects.length > 0) {
        setFishInfo({
          x: event.clientX, // Get screen position
          y: event.clientY,
          visible: true,
        });

        setTimeout(() => {
          setFishInfo((prev) => ({ ...prev, visible: false })); // Hide after 3 seconds
        }, 3000);
      }
    };

    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.addEventListener("dblclick", onDoubleClick);

    return () => {
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("dblclick", onDoubleClick);
    };
  }, [scene, camera, renderer]);

  return (
    <>
      {fishInfo.visible && (
        <div
          style={{
            position: "absolute",
            top: `${fishInfo.y}px`,
            left: `${fishInfo.x}px`,
            background: "rgba(10, 25, 47, 0.9)", // Dark blue semi-transparent
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // Soft shadow
            zIndex: 100,
            minWidth: "180px",
          }}
        >
          <strong style={{ fontSize: "16px", display: "block", textAlign: "center" }}>
            🐠 Clownfish (Amphiprioninae)
          </strong>
          <hr style={{ border: "0.5px solid rgba(255, 255, 255, 0.3)", margin: "6px 0" }} />
          <p><strong>🌊 Habitat:</strong> Coral reefs, Indo-Pacific</p>
          <p><strong>📏 Size:</strong> 4 to 5 inches</p>
          <p><strong>🤝 Fun Fact:</strong> Clownfish live in symbiosis with sea anemones!</p>
        </div>
      )}
    </>
  );
}  

