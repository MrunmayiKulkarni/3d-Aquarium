import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface CoralProps {
  scene: THREE.Scene;
  position: [number, number, number];
}

export default function Coral({ scene, position }: CoralProps) {
  const coralRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/coral.glb", (gltf) => {
      const coral = gltf.scene;
      coral.scale.set(0.9, 0.9, 0.9);
      coral.position.set(...position);
      coral.rotation.y = Math.random() * Math.PI * 2;

      coralRef.current = coral;
      scene.add(coral);
    });

    return () => {
      if (coralRef.current) {
        scene.remove(coralRef.current);
      }
    };
  }, [scene]);

  // ✅ Update Position Reactively when `position` changes
  useEffect(() => {
    if (coralRef.current) {
      coralRef.current.position.set(...position);
    }
  }, [position]);

  return null;
}
