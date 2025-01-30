import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Aquarium() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 🎥 Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 🕹️ OrbitControls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.zoomSpeed = 0.5;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;

    // 🎨 Background Gradient
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0e2a47');
    gradient.addColorStop(0.6, '#4f74a0');
    gradient.addColorStop(1, '#5fa9c7');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 2, 512);
    scene.background = new THREE.CanvasTexture(canvas);

    // 💡 Lighting
    const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // 🏝️ Sand (Ground)
    const textureLoader = new THREE.TextureLoader();
    const sandTexture = textureLoader.load("/textures/sand.jpg");
    sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping;
    sandTexture.repeat.set(4, 4);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ map: sandTexture, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -2.5, 0);
    scene.add(ground);

    // 🪸 Load Corals
    const loader = new GLTFLoader();
    loader.load("/models/coral.glb", (gltf) => {
      const coral = gltf.scene;
      coral.scale.set(0.9, 0.9, 0.9);
      coral.position.set(Math.random() * 6 - 3, -2.4, Math.random() * 6 - 3);
      coral.rotation.y = Math.random() * Math.PI * 2;
      scene.add(coral);
    });

    // 🐟 Load Fish
    loader.load("/models/fishe.glb", (gltf) => {
      const fish = gltf.scene;
      fish.scale.set(8, 8, 8);
      fish.position.set(Math.random() * 6 - 3, -1.5, Math.random() * 6 - 3);
      fish.rotation.y = Math.random() * Math.PI * 2;
      scene.add(fish);

      const fishSwim = () => {
        fish.position.x += 0.02;
        if (fish.position.x > 6) fish.position.x = -6;
        requestAnimationFrame(fishSwim);
      };
      fishSwim();
    });

    // 💦 Bubble System
    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      roughness: 0.05,
      metalness: 0.3,
      reflectivity: 0.8,
      transmission: 0.7,
    });

    const bubbles = [];
    const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    for (let i = 0; i < 30; i++) {
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      bubble.position.set(
        Math.random() * 6 - 3,
        Math.random() * 4 - 2,
        Math.random() * 6 - 3
      );
      bubble.scale.setScalar(Math.random() * 0.5 + 0.3);
      scene.add(bubble);
      bubbles.push({ mesh: bubble, speed: Math.random() * 0.02 + 0.01 });
    }

    const animateBubbles = () => {
      bubbles.forEach((bubble) => {
        bubble.mesh.position.y += bubble.speed;
        if (bubble.mesh.position.y > 3) {
          bubble.mesh.position.y = -2;
          bubble.mesh.position.x = Math.random() * 6 - 3;
          bubble.mesh.position.z = Math.random() * 6 - 3;
        }
      });
      requestAnimationFrame(animateBubbles);
    };
    animateBubbles();

    // 🎥 Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
