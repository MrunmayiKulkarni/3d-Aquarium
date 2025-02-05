import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Coral({ scene }: { scene: THREE.Scene }) {
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/coral.glb", (gltf) => {
      const coral = gltf.scene;
      coral.scale.set(0.9, 0.9, 0.9);
      coral.position.set(Math.random() * 6 - 3, -2.4, Math.random() * 6 - 3);
      coral.rotation.y = Math.random() * Math.PI * 2;
      scene.add(coral);
    });
  }, [scene]);

  return null;
}

