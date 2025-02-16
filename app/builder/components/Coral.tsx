// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// interface CoralProps {
//   scene: THREE.Scene;
//   position: [number, number, number];
// }

// export default function Coral({ scene, position }: CoralProps) {
//   const coralRef = useRef<THREE.Object3D | null>(null);

//   useEffect(() => {
//     const loader = new GLTFLoader();
//     loader.load("/models/coral.glb", (gltf) => {
//       const coral = gltf.scene;
//       coral.scale.set(0.9, 0.9, 0.9);
//       coral.position.set(...position);
//       coral.rotation.y = Math.random() * Math.PI * 2;

//       coralRef.current = coral;
//       scene.add(coral);
//     });

//     return () => {
//       if (coralRef.current) {
//         scene.remove(coralRef.current);
//       }
//     };
//   }, [scene]);

//   // ✅ Update Position Reactively when `position` changes
//   useEffect(() => {
//     if (coralRef.current) {
//       coralRef.current.position.set(...position);
//     }
//   }, [position]);

//   return null;
// }


// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// interface CoralProps {
//   scene: THREE.Scene;
//   position: [number, number, number];
//   id: number;
//   isSelected?: boolean;
// }

// export default function Coral({ scene, position, id, isSelected = false }: CoralProps) {
//   const coralRef = useRef<THREE.Group | null>(null);
//   const outlineRef = useRef<THREE.Group | null>(null);

//   useEffect(() => {
//     const loader = new GLTFLoader();
    
//     loader.load("/models/coral.glb", (gltf) => {
//       // Remove existing coral if it exists
//       if (coralRef.current) {
//         scene.remove(coralRef.current);
//       }
//       if (outlineRef.current) {
//         scene.remove(outlineRef.current);
//       }

//       const coral = gltf.scene;
      
//       // Set position, scale, and rotation
//       coral.position.set(...position);
//       coral.scale.set(0.9, 0.9, 0.9);
//       coral.rotation.y = Math.random() * Math.PI * 2;

//       // Add coral ID to all child objects
//       coral.traverse((object) => {
//         object.userData.coralId = id;
//       });

//       // Create outline for selection
//       const outlineGroup = new THREE.Group();
//       if (isSelected) {
//         coral.traverse((object) => {
//           if (object instanceof THREE.Mesh) {
//             const outlineMaterial = new THREE.MeshBasicMaterial({
//               color: 0xffff00,
//               side: THREE.BackSide,
//               transparent: true,
//               opacity: 0.5
//             });
            
//             const outlineMesh = new THREE.Mesh(
//               object.geometry.clone(),
//               outlineMaterial
//             );
//             outlineMesh.scale.multiplyScalar(1.1);
//             outlineMesh.position.copy(object.position);
//             outlineMesh.rotation.copy(object.rotation);
//             outlineGroup.add(outlineMesh);
//           }
//         });
//         outlineGroup.position.copy(coral.position);
//         scene.add(outlineGroup);
//       }

//       // Store refs and add to scene
//       coralRef.current = coral;
//       outlineRef.current = outlineGroup;
//       scene.add(coral);
//     });

//     // Cleanup
//     return () => {
//       if (coralRef.current) {
//         scene.remove(coralRef.current);
//       }
//       if (outlineRef.current) {
//         scene.remove(outlineRef.current);
//       }
//     };
//   }, [scene, id, isSelected]);

//   // Update position when it changes
//   useEffect(() => {
//     if (coralRef.current) {
//       coralRef.current.position.set(...position);
//       if (outlineRef.current) {
//         outlineRef.current.position.set(...position);
//       }
//     }
//   }, [position]);

//   return null;
// }

// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// interface CoralProps {
//   scene: THREE.Scene;
//   position: [number, number, number];
//   id: number;
//   isSelected?: boolean;
// }

// export default function Coral({ scene, position, id, isSelected = false }: CoralProps) {
//   const coralRef = useRef<THREE.Group | null>(null);
//   const outlineRef = useRef<THREE.Group | null>(null);

//   useEffect(() => {
//     const loader = new GLTFLoader();
    
//     loader.load("/models/coral.glb", (gltf) => {
//       // Cleanup previous instances
//       if (coralRef.current) {
//         scene.remove(coralRef.current);
//       }
//       if (outlineRef.current) {
//         scene.remove(outlineRef.current);
//       }

//       const coral = gltf.scene;
      
//       // Set position, scale, and rotation
//       coral.position.set(...position);
//       coral.scale.set(0.9, 0.9, 0.9);
//       coral.rotation.y = Math.random() * Math.PI * 2;

//       // Add coral ID to all child objects
//       coral.traverse((object) => {
//         object.userData.coralId = id;
//         // Make original coral slightly transparent when selected
//         if (object instanceof THREE.Mesh && isSelected) {
//           if (Array.isArray(object.material)) {
//             object.material.forEach(mat => {
//               mat.transparent = true;
//               mat.opacity = 0.9;
//             });
//           } else if (object.material) {
//             object.material.transparent = true;
//             object.material.opacity = 0.9;
//           }
//         }
//       });

//       // Create selection effect
//       if (isSelected) {
//         // Clone the coral for the outline effect
//         const outlineGroup = coral.clone();
        
//         // Apply outline material to all meshes in the clone
//         outlineGroup.traverse((object) => {
//           if (object instanceof THREE.Mesh) {
//             object.material = new THREE.MeshBasicMaterial({
//               color: 0x4fc3f7,  // Light blue color
//               side: THREE.BackSide,
//               transparent: true,
//               opacity: 0.3,
//               depthWrite: false,
//               depthTest: true
//             });
//           }
//         });
        
//         // Scale up the outline slightly
//         outlineGroup.scale.multiplyScalar(1.1);
        
//         outlineRef.current = outlineGroup;
//         scene.add(outlineGroup);
//       }

//       // Store ref and add to scene
//       coralRef.current = coral;
//       scene.add(coral);
//     });

//     return () => {
//       if (coralRef.current) {
//         scene.remove(coralRef.current);
//       }
//       if (outlineRef.current) {
//         scene.remove(outlineRef.current);
//       }
//     };
//   }, [scene, id, isSelected]);

//   // Update position when it changes
//   useEffect(() => {
//     if (coralRef.current) {
//       coralRef.current.position.set(...position);
//       if (outlineRef.current) {
//         outlineRef.current.position.set(...position);
//       }
//     }
//   }, [position]);

//   return null;
// }

// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// interface CoralProps {
//   scene: THREE.Scene;
//   position: [number, number, number];
//   id: number;
//   isSelected?: boolean;
// }

// export default function Coral({ scene, position, id, isSelected = false }: CoralProps) {
//   const coralRef = useRef<THREE.Group | null>(null);
//   const outlineRef = useRef<THREE.Group | null>(null);
//   const initialRotation = useRef(Math.random() * Math.PI * 2);

//   useEffect(() => {
//     const loader = new GLTFLoader();
    
//     loader.load("/models/coral.glb", (gltf) => {
//       // Cleanup previous instances
//       if (coralRef.current) {
//         scene.remove(coralRef.current);
//       }
//       if (outlineRef.current) {
//         scene.remove(outlineRef.current);
//       }

//       const coral = gltf.scene;
      
//       // Set position, scale, and fixed rotation
//       coral.position.set(...position);
//       coral.scale.set(0.9, 0.9, 0.9);
//       coral.rotation.y = initialRotation.current;

//       // Add coral ID to all child objects
//       coral.traverse((object) => {
//         object.userData.coralId = id;
//       });

//       // Create selection effect
//       if (isSelected) {
//         // Clone the coral for the outline effect
//         const outlineGroup = coral.clone();
        
//         // Apply outline material to all meshes in the clone
//         outlineGroup.traverse((object) => {
//           if (object instanceof THREE.Mesh) {
//             object.material = new THREE.MeshBasicMaterial({
//               color: 0x00ff88,  // Bright turquoise color
//               side: THREE.BackSide,
//               transparent: true,
//               opacity: 0.4,
//               depthWrite: false,
//               depthTest: true
//             });
//           }
//         });
        
//         // Scale up the outline slightly
//         outlineGroup.scale.multiplyScalar(1.07);
//         outlineGroup.position.set(...position);
//         outlineGroup.rotation.y = initialRotation.current;
        
//         outlineRef.current = outlineGroup;
//         scene.add(outlineGroup);
//       }

//       // Store ref and add to scene
//       coralRef.current = coral;
//       scene.add(coral);
//     });

//     return () => {
//       if (coralRef.current) {
//         scene.remove(coralRef.current);
//       }
//       if (outlineRef.current) {
//         scene.remove(outlineRef.current);
//       }
//     };
//   }, [scene, id, isSelected]);

//   // Update position when it changes
//   useEffect(() => {
//     if (coralRef.current) {
//       coralRef.current.position.set(...position);
//       if (outlineRef.current) {
//         outlineRef.current.position.set(...position);
//       }
//     }
//   }, [position]);

//   return null;
// }

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface CoralProps {
  scene: THREE.Scene;
  position: [number, number, number];
  id: number;
  isSelected?: boolean;
}

export default function Coral({ scene, position, id, isSelected = false }: CoralProps) {
  const coralRef = useRef<THREE.Group | null>(null);
  const outlineRef = useRef<THREE.Group | null>(null);
  const initialRotation = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    const loader = new GLTFLoader();
    
    loader.load("/models/coral.glb", (gltf) => {
      // Cleanup previous instances
      if (coralRef.current) {
        scene.remove(coralRef.current);
      }
      if (outlineRef.current) {
        scene.remove(outlineRef.current);
      }

      const coral = gltf.scene;
      
      // Set position, scale, and fixed rotation
      coral.position.set(...position);
      coral.scale.set(0.9, 0.9, 0.9);
      coral.rotation.y = initialRotation.current;

      // Add coral ID to all child objects
      coral.traverse((object) => {
        object.userData.coralId = id;
      });

      // Create selection effect
      if (isSelected) {
        // Clone the coral for the outline effect
        const outlineGroup = coral.clone();
        
        // Apply outline material to all meshes in the clone
        outlineGroup.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.material = new THREE.MeshBasicMaterial({
              color: 0x0088ff,  // Changed to a more subtle blue
              side: THREE.BackSide,
              transparent: true,
              opacity: 0.25,    // Reduced opacity
              depthWrite: false,
              depthTest: true
            });
          }
        });
        
        // Scale up the outline slightly less
        outlineGroup.scale.multiplyScalar(1.03);  // Reduced from 1.07
        outlineGroup.position.set(...position);
        outlineGroup.rotation.y = initialRotation.current;
        
        outlineRef.current = outlineGroup;
        scene.add(outlineGroup);
      }

      // Store ref and add to scene
      coralRef.current = coral;
      scene.add(coral);
    });

    return () => {
      if (coralRef.current) {
        scene.remove(coralRef.current);
      }
      if (outlineRef.current) {
        scene.remove(outlineRef.current);
      }
    };
  }, [scene, id, isSelected]);

  // Update position when it changes
  useEffect(() => {
    if (coralRef.current) {
      coralRef.current.position.set(...position);
      if (outlineRef.current) {
        outlineRef.current.position.set(...position);
      }
    }
  }, [position]);

  return null;
}