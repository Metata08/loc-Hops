// hooks/useGLBDebug.ts
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function useGLBDebug(modelPath: string = "/models/hospital.glb") {
  useEffect(() => {
    const loader = new GLTFLoader();
    
    console.log("🔍 Chargement du modèle GLB pour débogage...");
    
    loader.load(
      modelPath,
      (gltf) => {
        console.log("✅ Modèle GLB chargé avec succès");
        console.log("📊 Informations sur le modèle:");
        
        let objectCount = 0;
        const objectNames: string[] = [];
        
        gltf.scene.traverse((object: any) => {
          objectCount++;
          if (object.name && object.name.trim() !== "") {
            objectNames.push(object.name);
            console.log(`📌 Objet ${objectCount}:`, {
              name: object.name,
              type: object.type,
              position: object.position
            });
          }
        });
        
        console.log(`📈 Total d'objets: ${objectCount}`);
        console.log(`🏷️  Noms d'objets non-vides: ${objectNames.length}`);
        console.log("📋 Liste des noms:", objectNames);
        
        // Afficher aussi les meshes spécifiquement
        console.log("🎯 Meshes trouvés:");
        gltf.scene.traverse((object: any) => {
          if (object.isMesh && object.name) {
            console.log(`   Mesh: "${object.name}"`, {
              position: [object.position.x, object.position.y, object.position.z],
              visible: object.visible
            });
          }
        });
      },
      (progress) => {
        console.log(`📥 Chargement: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error("❌ Erreur de chargement:", error);
      }
    );
  }, [modelPath]);
}