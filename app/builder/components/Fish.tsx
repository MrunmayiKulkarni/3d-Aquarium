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
    const loader = new GLTFLoader();
    loader.load("/models/fishe.glb", (gltf) => {
      const fish = gltf.scene;
      fish.scale.set(1, 1, 1);
      fish.position.set(0, 1, 0);
      fish.name = "fish";
      scene.add(fish);
      fishRef.current = fish;

      const SPEED = 0.002;
      const BOUNDARY = 5;
      let elapsedTime = 0;
      let rotationInterval = 2;

      

      const animate = () => {
        if (!fishRef.current) return;

        elapsedTime += 0.016;

        const randomFactor = Math.sin(elapsedTime) * 0.02;

        fish.position.z += (SPEED + randomFactor) * Math.cos(fish.rotation.y);
        fish.position.x += (SPEED + randomFactor) * Math.sin(fish.rotation.y);

        if (elapsedTime >= rotationInterval) {
          fish.rotation.y += (Math.random() * Math.PI / 2) - (Math.PI / 4);
          rotationInterval = 1 + Math.random() * 2;
          elapsedTime = 0;
        }

        if (Math.abs(fish.position.x) > BOUNDARY) {
          fish.position.x = Math.sign(fish.position.x) * BOUNDARY;
          fish.rotation.y *= -1;
        }
        if (Math.abs(fish.position.z) > BOUNDARY) {
          fish.position.z = Math.sign(fish.position.z) * BOUNDARY;
          fish.rotation.y = Math.PI - fish.rotation.y;
        }

        requestAnimationFrame(animate);
      };

      animate();
    });
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      if (isRotatingRef.current) return; // Prevent multiple simultaneous rotations
    
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true); // Check all objects
    
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object; // Get the clicked object
    
        // 🔥 Check if the clicked object belongs to a fish
        let clickedFish = clickedObject;
        while (clickedFish && clickedFish.parent) {
          if (clickedFish.name === "fish") break; // Found the fish
          clickedFish = clickedFish.parent; // Move up in hierarchy
        }
    
        if (!clickedFish || clickedFish.name !== "fish") return; // Not a fish, ignore
    
        isRotatingRef.current = true;
        let rotationAmount = 0;
    
        const rotateFish = () => {
          const rotationSpeed = Math.PI / 50;
          clickedFish.rotation.y += rotationSpeed;
          rotationAmount += rotationSpeed;
    
          if (rotationAmount < Math.PI * 2) {
            requestAnimationFrame(rotateFish);
          } else {
            clickedFish.rotation.y = Math.round(clickedFish.rotation.y);
            isRotatingRef.current = false;
          }
        };
    
        rotateFish();
      }
    };
    
    

    const onDoubleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true); // Check all objects
    
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object; // Get the clicked object
    
        // 🔥 Ensure we are interacting with a fish
        let clickedFish = clickedObject;
        while (clickedFish && clickedFish.parent) {
          if (clickedFish.name === "fish") break; // Found the fish
          clickedFish = clickedFish.parent; // Move up in hierarchy
        }
    
        if (!clickedFish || clickedFish.name !== "fish") return; // Not a fish, ignore
    
        // 🐠 Show fish info at the clicked position
        setFishInfo({
          x: event.clientX,
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

