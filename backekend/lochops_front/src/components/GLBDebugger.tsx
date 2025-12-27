import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface GLBDebugInfo {
    loaded: boolean;
    error: string | null;
    sceneInfo?: {
        totalObjects: number;
        meshes: number;
        lights: number;
        cameras: number;
        materials: number;
        geometries: number;
        boundingBox?: {
            min: { x: number; y: number; z: number };
            max: { x: number; y: number; z: number };
            size: { x: number; y: number; z: number };
            center: { x: number; y: number; z: number };
        };
    };
    meshDetails: Array<{
        name: string;
        type: string;
        position: { x: number; y: number; z: number };
        visible: boolean;
        materialType?: string;
        vertexCount?: number;
    }>;
}

export function useGLBDebug(modelPath: string = "/models/DalalJam.glb"): GLBDebugInfo {
    const [debugInfo, setDebugInfo] = useState<GLBDebugInfo>({
        loaded: false,
        error: null,
        meshDetails: [],
    });

    useEffect(() => {
        const loadAndAnalyze = async () => {
            try {
                console.log(`🔍 [GLBDebugger] Chargement du modèle: ${modelPath}`);

                const loader = new GLTFLoader();

                loader.load(
                    modelPath,
                    (gltf) => {
                        console.log("✅ [GLBDebugger] Modèle chargé avec succès!", gltf);

                        let totalObjects = 0;
                        let meshes = 0;
                        let lights = 0;
                        let cameras = 0;
                        const materials = new Set();
                        const geometries = new Set();
                        const meshDetails: GLBDebugInfo["meshDetails"] = [];

                        gltf.scene.traverse((object: any) => {
                            totalObjects++;

                            if (object.isMesh) {
                                meshes++;
                                if (object.material) {
                                    materials.add(object.material.uuid);
                                }
                                if (object.geometry) {
                                    geometries.add(object.geometry.uuid);
                                }

                                meshDetails.push({
                                    name: object.name || `Unnamed_Mesh_${meshes}`,
                                    type: object.type,
                                    position: {
                                        x: object.position.x,
                                        y: object.position.y,
                                        z: object.position.z,
                                    },
                                    visible: object.visible,
                                    materialType: object.material?.type,
                                    vertexCount: object.geometry?.attributes?.position?.count,
                                });
                            }

                            if (object.isLight) lights++;
                            if (object.isCamera) cameras++;
                        });

                        // Calculate bounding box
                        const box = new THREE.Box3().setFromObject(gltf.scene);
                        const size = box.getSize(new THREE.Vector3());
                        const center = box.getCenter(new THREE.Vector3());

                        const info: GLBDebugInfo = {
                            loaded: true,
                            error: null,
                            sceneInfo: {
                                totalObjects,
                                meshes,
                                lights,
                                cameras,
                                materials: materials.size,
                                geometries: geometries.size,
                                boundingBox: {
                                    min: { x: box.min.x, y: box.min.y, z: box.min.z },
                                    max: { x: box.max.x, y: box.max.y, z: box.max.z },
                                    size: { x: size.x, y: size.y, z: size.z },
                                    center: { x: center.x, y: center.y, z: center.z },
                                },
                            },
                            meshDetails,
                        };

                        console.log("📊 [GLBDebugger] Informations du modèle:", info);
                        setDebugInfo(info);
                    },
                    (progress) => {
                        console.log(
                            `⏳ [GLBDebugger] Progression: ${((progress.loaded / progress.total) * 100).toFixed(2)}%`
                        );
                    },
                    (error) => {
                        console.error("❌ [GLBDebugger] Erreur de chargement:", error);
                        setDebugInfo({
                            loaded: false,
                            error: (error as Error).message || "Erreur inconnue",
                            meshDetails: [],
                        });
                    }
                );
            } catch (err) {
                console.error("❌ [GLBDebugger] Exception:", err);
                setDebugInfo({
                    loaded: false,
                    error: err instanceof Error ? err.message : "Exception inconnue",
                    meshDetails: [],
                });
            }
        };

        loadAndAnalyze();
    }, [modelPath]);

    return debugInfo;
}

// Composant React pour afficher les informations de debug dans l'UI
export function GLBDebugPanel({ modelPath = "/models/DalalJam.glb" }: { modelPath?: string }) {
    const debugInfo = useGLBDebug(modelPath);

    return (
        <div className="fixed top-4 right-4 max-w-md max-h-[80vh] overflow-auto bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50">
            <h3 className="text-lg font-bold mb-2">🔍 GLB Debug Info</h3>

            {debugInfo.error && (
                <div className="bg-red-500/20 border border-red-500 p-2 rounded mb-2">
                    <div className="font-bold">❌ Erreur:</div>
                    <div>{debugInfo.error}</div>
                </div>
            )}

            {debugInfo.loaded && debugInfo.sceneInfo && (
                <>
                    <div className="bg-green-500/20 border border-green-500 p-2 rounded mb-2">
                        <div className="font-bold">✅ Modèle chargé</div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div>
                            <span className="text-gray-400">Objets totaux:</span>{" "}
                            <span className="text-yellow-300">{debugInfo.sceneInfo.totalObjects}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Meshes:</span>{" "}
                            <span className="text-green-300">{debugInfo.sceneInfo.meshes}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Lumières:</span>{" "}
                            <span className="text-blue-300">{debugInfo.sceneInfo.lights}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Caméras:</span>{" "}
                            <span className="text-purple-300">{debugInfo.sceneInfo.cameras}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Matériaux:</span>{" "}
                            <span className="text-orange-300">{debugInfo.sceneInfo.materials}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Géométries:</span>{" "}
                            <span className="text-pink-300">{debugInfo.sceneInfo.geometries}</span>
                        </div>
                    </div>

                    {debugInfo.sceneInfo.boundingBox && (
                        <div className="bg-blue-500/10 border border-blue-500 p-2 rounded mb-4">
                            <div className="font-bold mb-1">📦 Bounding Box:</div>
                            <div className="pl-2 space-y-1">
                                <div>
                                    <span className="text-gray-400">Taille:</span>{" "}
                                    <span className="text-cyan-300">
                                        {debugInfo.sceneInfo.boundingBox.size.x.toFixed(2)} x{" "}
                                        {debugInfo.sceneInfo.boundingBox.size.y.toFixed(2)} x{" "}
                                        {debugInfo.sceneInfo.boundingBox.size.z.toFixed(2)}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Centre:</span>{" "}
                                    <span className="text-cyan-300">
                                        ({debugInfo.sceneInfo.boundingBox.center.x.toFixed(2)},{" "}
                                        {debugInfo.sceneInfo.boundingBox.center.y.toFixed(2)},{" "}
                                        {debugInfo.sceneInfo.boundingBox.center.z.toFixed(2)})
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {debugInfo.meshDetails.length > 0 && (
                        <div>
                            <div className="font-bold mb-2">🎨 Meshes ({debugInfo.meshDetails.length}):</div>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {debugInfo.meshDetails.slice(0, 10).map((mesh, i) => (
                                    <div key={i} className="bg-gray-800/50 p-2 rounded text-[10px]">
                                        <div className="font-semibold text-yellow-300">{mesh.name}</div>
                                        <div className="text-gray-400">
                                            Position: ({mesh.position.x.toFixed(2)}, {mesh.position.y.toFixed(2)},{" "}
                                            {mesh.position.z.toFixed(2)})
                                        </div>
                                        <div className="text-gray-400">
                                            Vertices: {mesh.vertexCount || "N/A"}
                                        </div>
                                        <div className="text-gray-400">Material: {mesh.materialType || "N/A"}</div>
                                        <div>
                                            Visible:{" "}
                                            {mesh.visible ? (
                                                <span className="text-green-400">✓</span>
                                            ) : (
                                                <span className="text-red-400">✗</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {debugInfo.meshDetails.length > 10 && (
                                    <div className="text-gray-400 text-center">
                                        ... et {debugInfo.meshDetails.length - 10} autres
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}

            {!debugInfo.loaded && !debugInfo.error && (
                <div className="text-gray-400 animate-pulse">⏳ Chargement...</div>
            )}
        </div>
    );
}
