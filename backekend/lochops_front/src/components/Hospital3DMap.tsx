import { useServices } from "@/contexts/ServicesContext";
import { useNavigation } from "@/hooks/useNavigation";
import { Environment, Html, Line, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface Hospital3DMapProps {
  modelPath?: string;
  targetService?: string;
  showPath?: boolean;
  onServiceClick?: (serviceId: string) => void;
  showAllMarkers?: boolean;
}

// Modèle GLB principal
const GLBModel = ({ modelPath, highlightServices, onScaleCalculated }: {
  modelPath: string;
  highlightServices?: string[];
  onScaleCalculated?: (scale: number) => void;
}) => {
  const { scene } = useGLTF(modelPath);
  const [hovered, setHovered] = useState<string | null>(null);
  const initializedRef = useRef(false);

  // 1. Configuration INITIALE (Position, Échelle, Matériaux de base)
  // Ne s'exécute que quand la scène change (chargement initial)
  useEffect(() => {
    if (!scene) return;

    console.log("🎨 Initialisation du modèle 3D...");

    // Configuration initiale des meshes
    let meshCount = 0;
    scene.traverse((child: any) => {
      if (child.isMesh) {
        meshCount++;
        child.visible = true;
        child.frustumCulled = false;
        child.castShadow = true;
        child.receiveShadow = true;

        // Sauvegarde du matériau original et correction
        if (child.material) {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          // Force les propriétés de base pour éviter les modèles invisibles
          const fixMaterial = (mat: any) => {
            // Ne pas forcer transparent = false si le matériau est censé être transparent
            // mat.transparent = false; 
            // mat.opacity = 1.0;

            mat.visible = true;
            mat.depthTest = true;
            mat.depthWrite = true;

            // Correction pour les textures avec transparence alpha (cutouts)
            if (mat.map && mat.transparent) {
              mat.alphaTest = 0.5;
              mat.depthWrite = true; // Important pour que les objets transparents écrivent dans le depth buffer
            }


            // Correction pour les textures avec transparence alpha (cutouts)
            if (mat.map && mat.transparent) {
              mat.alphaTest = 0.5;
              mat.depthWrite = true; // Important pour que les objets transparents écrivent dans le depth buffer
            }

            if (!mat.color || (mat.color.r === 0 && mat.color.g === 0 && mat.color.b === 0)) {
              mat.color = new THREE.Color(0xcccccc);
            }
          };

          if (Array.isArray(child.material)) {
            child.material.forEach(fixMaterial);
          } else {
            fixMaterial(child.material);
          }
        }
      }
    });

    // Calcul de l'échelle et positionnement
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z);

    if (maxSize > 0.001) {
      let scale: number;
      if (maxSize > 100) {
        scale = 18 / maxSize;
      } else {
        scale = 6 / maxSize;
      }

      // Appliquer l'échelle
      scene.scale.setScalar(scale);

      // Positionner
      scene.position.x = 0;
      scene.position.z = 0;
      const scaledBox = new THREE.Box3().setFromObject(scene);
      scene.position.y = -scaledBox.min.y;

      // Notifier le parent (une seule fois si possible)
      if (onScaleCalculated && !initializedRef.current) {
        onScaleCalculated(scale);
        initializedRef.current = true;
      }

      console.log("✅ Modèle 3D initialisé et mis à l'échelle:", scale);
    } else {
      let totalCount = 0;
      scene.traverse(() => totalCount++);

      console.error("⚠️ Modèle 3D a une bounding box de taille 0:", {
        size,
        objectCount: totalCount
      });
      console.warn("Le modèle pourrait être vide ou avoir toutes les géométries à la même position");

      // Try to render anyway with default scale
      scene.scale.setScalar(1);
    }

    // Cleanup à la destruction
    return () => {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]); // Dépendance unique : la scène

  // 2. Mise à jour VISUELLE (Highlight)
  // S'exécute quand highlightServices change
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh && child.userData?.serviceId) {
        const isHighlighted = highlightServices?.includes(child.userData.serviceId);

        if (isHighlighted) {
          // Appliquer le matériau de highlight
          child.material = new THREE.MeshStandardMaterial({
            color: '#3b82f6',
            emissive: '#3b82f6',
            emissiveIntensity: 0.2,
            transparent: false,
            opacity: 1.0
          });
        } else if (child.userData.originalMaterial) {
          // Restaurer le matériau original
          child.material = child.userData.originalMaterial;
        }
      }
    });
  }, [scene, highlightServices]); // Dépendances : scène et services à surligner

  // Animation pour les éléments survolés
  useFrame((state) => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.userData?.serviceId === hovered) {
        child.rotation.y = state.clock.elapsedTime * 0.5;
        child.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    });
  });

  const handlePointerOver = (event: any) => {
    event.stopPropagation();
    const object = event.object;
    if (object.userData?.serviceId) {
      setHovered(object.userData.serviceId);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = () => {
    setHovered(null);
    document.body.style.cursor = 'auto';
  };

  return (
    <primitive
      object={scene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
};

// 3D Marker component amélioré
const ServiceMarker = ({
  position,
  label,
  isTarget,
  serviceId,
  onClick
}: {
  position: [number, number, number];
  label: string;
  isTarget?: boolean;
  serviceId: string;
  onClick?: (id: string) => void;
}) => {
  const markerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (markerRef.current) {
      if (isTarget) {
        // Animation pour la cible
        markerRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.5;
      } else if (hovered) {
        // Animation de survol
        markerRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05 + 0.3;
      } else {
        markerRef.current.position.y = position[1] + 0.3;
      }
    }
  });

  const handleClick = () => {
    if (onClick) {
      onClick(serviceId);
    }
  };

  return (
    <group position={position}>
      {/* Marker pin */}
      <mesh
        ref={markerRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={isTarget ? "#ef4444" : hovered ? "#10b981" : "#3b82f6"}
          emissive={isTarget ? "#ef4444" : hovered ? "#10b981" : "#3b82f6"}
          emissiveIntensity={0.5}
          transparent={hovered}
          opacity={hovered ? 0.9 : 1}
        />
      </mesh>

      {/* Glow effect */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial
            color={isTarget ? "#ef4444" : "#3b82f6"}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Ground ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.2, 0.3, 32]} />
        <meshStandardMaterial
          color={isTarget ? "#ef4444" : "#3b82f6"}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Label */}
      {(isTarget || hovered) && (
        <Html position={[0, 1.2, 0]} center distanceFactor={8}>
          <div className={`
            px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap
            ${isTarget
              ? 'bg-red-500 text-white'
              : hovered
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
            }
          `}>
            {label}
            {hovered && (
              <div className="text-xs opacity-80 mt-0.5">Cliquez pour sélectionner</div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

// Avatar qui marche le long du chemin
const WalkingAvatar = ({ path, speed = 2.5 }: { path: THREE.Vector3[], speed?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || path.length < 2) return;

    const time = state.clock.elapsedTime;
    const totalDistance = path.length; // Approximation simple

    // Calcul de la position sur le chemin
    // On boucle sur le chemin
    const dist = (time * speed) % totalDistance;
    const currentIndex = Math.floor(dist);
    const nextIndex = (currentIndex + 1) % path.length;
    const progress = dist - currentIndex;

    const currentPoint = path[currentIndex];
    const nextPoint = path[nextIndex];

    // Positionnement
    groupRef.current.position.lerpVectors(currentPoint, nextPoint, progress);

    // Orientation (regarder vers le prochain point)
    // On ajoute un petit offset Y pour que lookAt fonctionne bien sur le plan horizontal
    const lookTarget = nextPoint.clone();
    lookTarget.y = groupRef.current.position.y;
    groupRef.current.lookAt(lookTarget);

    // Animation de marche (Bobbing)
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.7 + Math.sin(time * 15) * 0.05;
    }

    // Animation des jambes
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 15) * 0.5;
      rightLegRef.current.rotation.x = Math.sin(time * 15 + Math.PI) * 0.5;
    }
  });

  if (path.length < 2) return null;

  return (
    <group ref={groupRef} scale={[0.5, 0.5, 0.5]}>
      {/* Corps */}
      <mesh ref={bodyRef} position={[0, 0.7, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Tête */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffccaa" />
      </mesh>

      {/* Jambes */}
      <group position={[0, 0.5, 0]}>
        <mesh ref={leftLegRef} position={[-0.08, -0.25, 0]}>
          <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
        <mesh ref={rightLegRef} position={[0.08, -0.25, 0]}>
          <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
      </group>

      {/* Ombre portée simple */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[0.25, 16]} />
        <meshBasicMaterial color="black" opacity={0.3} transparent />
      </mesh>
    </group>
  );
};

// 3D Path line améliorée avec flèches
const PathLine = ({ points, animated = true }: {
  points: THREE.Vector3[];
  animated?: boolean;
}) => {
  const arrowsRef = useRef<THREE.Group>(null);

  // Animation des flèches
  useFrame((state) => {
    if (!arrowsRef.current || points.length < 2) return;

    const totalLength = points.length;
    const speed = 1.0; // Vitesse de déplacement réduite pour plus de douceur
    const arrowCount = 32;

    arrowsRef.current.children.forEach((arrow, i) => {
      const offset = i * (totalLength / arrowCount); // Répartir 32 flèches sur le chemin
      let t = (state.clock.elapsedTime * speed + offset) % totalLength;

      const index = Math.floor(t);
      const nextIndex = (index + 1) % totalLength;
      const subT = t - index;

      if (index < points.length - 1) {
        const p1 = points[index];
        const p2 = points[index + 1];

        // Position
        arrow.position.lerpVectors(p1, p2, subT);

        // Orientation : Regarder vers le point suivant
        arrow.lookAt(p2);
        // Ajustement car le cône pointe vers Y par défaut, on le couche
        arrow.rotateX(Math.PI / 2);
      } else {
        // Fin du chemin, on cache ou on boucle
        arrow.position.copy(points[points.length - 1]);
      }
    });
  });

  if (!points || points.length < 2) return null;

  return (
    <group>
      {/* Ligne principale rouge */}
      <Line
        points={points}
        color="#ef4444" // ROUGE
        lineWidth={3}
        opacity={0.6}
        transparent
        dashed={false}
      />

      {/* Flèches animées */}
      {animated && (
        <group ref={arrowsRef}>
          {[...Array(32)].map((_, i) => (
            <mesh key={i}>
              <coneGeometry args={[0.1, 0.25, 8]} />
              <meshStandardMaterial
                color="#ef4444" // ROUGE
                emissive="#ef4444"
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Point de départ (Accueil) */}
      <mesh position={points[0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#10b981" />
        <Html position={[0, 0.5, 0]} center>
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
            Départ
          </div>
        </Html>
      </mesh>

      {/* Point d'arrivée */}
      <mesh position={points[points.length - 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#ef4444" />
        <Html position={[0, 0.5, 0]} center>
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
            Arrivée
          </div>
        </Html>
      </mesh>
    </group>
  );
};

// Contrôleur de caméra amélioré
const CameraController = ({
  targetPosition,
  defaultPosition = [10, 8, 10]
}: {
  targetPosition?: [number, number, number];
  defaultPosition?: [number, number, number];
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const animationRef = useRef({ progress: 0, targetPos: new THREE.Vector3() });

  useEffect(() => {
    if (targetPosition) {
      // Animation vers la position cible
      const targetVec = new THREE.Vector3(...targetPosition);
      animationRef.current.targetPos = targetVec.clone().add(new THREE.Vector3(4, 4, 4));
      animationRef.current.progress = 0;

      if (controlsRef.current) {
        controlsRef.current.target.copy(targetVec);
      }
    } else {
      // Retour à la position par défaut
      camera.position.set(...defaultPosition);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
      }
    }
  }, [targetPosition, camera, defaultPosition]);

  useFrame(() => {
    if (animationRef.current.progress < 1) {
      animationRef.current.progress += 0.03; // Adjust speed as needed
      const t = Math.min(animationRef.current.progress, 1);
      const startPos = new THREE.Vector3(...defaultPosition);
      camera.position.lerpVectors(startPos, animationRef.current.targetPos, t);
    }
  });

  return null;
};

// Loading fallback
const ModelLoadingFallback = () => {
  return (
    <Html center>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
        <div className="text-muted-foreground">Chargement du modèle 3D...</div>
      </div>
    </Html>
  );
};

const Hospital3DMap = ({
  modelPath = "/models/DalalJam.glb",
  targetService,
  showPath = true,
  onServiceClick,
  showAllMarkers = false
}: Hospital3DMapProps) => {
  const { services, servicePositions, modelLoaded, usingFallback } = useServices();
  const { calculateRoute, path, loading: pathLoading } = useNavigation();
  const [selectedService, setSelectedService] = useState<string | undefined>(targetService);
  const [modelScale, setModelScale] = useState<number>(1); // Échelle par défaut

  // Position par défaut (réception)
  // Assuming '1' is reception ID based on fallback/DB convention
  const startPosition: [number, number, number] = servicePositions['1'] || [0, 0, 3];
  const targetPosition = selectedService ? servicePositions[selectedService] : undefined;

  useEffect(() => {
    if (targetService) {
      setSelectedService(targetService);
    }
  }, [targetService]);

  // Calculate route when selected service changes
  // Start point is always Reception (ID '1') as requested
  useEffect(() => {
    if (showPath && selectedService) {
      // Assuming start point is always Reception (ID '1') for now
      // In a real app, this could be the user's current location
      calculateRoute('1', selectedService);
    }
  }, [selectedService, showPath, calculateRoute]);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    if (onServiceClick) {
      onServiceClick(serviceId);
    }
  };

  // Services à afficher
  const servicesToShow = useMemo(() => {
    if (showAllMarkers) {
      return services;
    }
    // Afficher seulement la cible et quelques services importants
    return services.filter(s =>
      String(s.id) === String(selectedService) || // Correction comparaison ID
      true // Show all services by default now that we have a clean list
    );
  }, [services, selectedService, showAllMarkers]);

  // Calcul des points du chemin mis à l'échelle et orientés
  const scaledPath = useMemo(() => {
    if (!path) return null;

    return path.map(p => new THREE.Vector3(
      p.x * modelScale,
      p.z * modelScale,      // Z devient Y (Hauteur normale)
      -p.y * modelScale      // Y devient -Z (Profondeur inversée)
    ));
  }, [path, modelScale]);

  // Handler stable pour l'échelle
  const handleScaleCalculated = useCallback((scale: number) => {
    setModelScale(prev => {
      // Ne mettre à jour que si la différence est significative
      if (Math.abs(prev - scale) > 0.0001) {
        return scale;
      }
      return prev;
    });
  }, []);

  // Mémorisation du tableau highlightServices pour éviter les re-renders de GLBModel
  const highlightServicesArray = useMemo(() => {
    return selectedService ? [selectedService] : [];
  }, [selectedService]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-800 relative">
      {/* En-tête d'informations */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
        <div className="bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="font-medium">Services: {services.length}</span>
          </div>
        </div>

        {selectedService && (
          <div className="bg-red-500/90 text-white backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white"></div>
              {/* CORRECTION: Comparaison robuste String(id) === String(selected) */}
              <span className="font-medium">Destination: {services.find(s => String(s.id) === String(selectedService))?.name || "Service sélectionné"}</span>
            </div>
          </div>
        )}

        {usingFallback && (
          <div className="bg-yellow-500/90 text-white backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <span className="font-medium">Mode démonstration</span>
            </div>
          </div>
        )}

        {pathLoading && (
          <div className="bg-blue-500/90 text-white backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="animate-spin w-3 h-3 rounded-full border-2 border-white border-t-transparent"></div>
              <span className="font-medium">Calcul de l'itinéraire...</span>
            </div>
          </div>
        )}
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        className="w-full h-full"
        style={{ minHeight: '400px', background: 'linear-gradient(to bottom, #f0f9ff, #ffffff)' }}
        gl={{ antialias: true, alpha: false }}
      >
        <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={50} />
        <CameraController
          targetPosition={targetPosition}
          defaultPosition={[10, 8, 10]}
        />

        {/* Lighting setup */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[15, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        <hemisphereLight intensity={0.4} groundColor="#e5e7eb" />

        {/* Environnement */}
        <Environment preset="apartment" />
        <fog attach="fog" args={["#f0f2f5", 20, 40]} />
        <color attach="background" args={["#f0f2f5"]} />

        {/* Grille supprimée à la demande */}
        {/* <gridHelper args={[20, 20, '#cbd5e1', '#e2e8f0']} position={[0, 0, 0]} /> */}

        <Suspense fallback={<ModelLoadingFallback />}>
          {/* Toujours charger le modèle GLB */}
          <GLBModel
            modelPath={modelPath}
            highlightServices={highlightServicesArray}
            onScaleCalculated={handleScaleCalculated}
          />

          {/* Marqueurs de service - Positions mises à l'échelle et orientées (Blender Z-up -> Three.js Y-up) */}
          {servicesToShow.map((service) => (
            <ServiceMarker
              key={service.id}
              position={[
                service.position[0] * modelScale,
                (service.position[2] * modelScale),
                -service.position[1] * modelScale      // Y devient -Z (Profondeur inversée)
              ]}
              label={service.name}
              serviceId={service.id}
              isTarget={String(service.id) === String(selectedService)}
              onClick={handleServiceClick}
            />
          ))}

          {/* Chemin de navigation - Points mis à l'échelle et orientés */}
          {showPath && scaledPath && (
            <>
              <PathLine
                points={scaledPath}
                animated={true}
              />
              <WalkingAvatar path={scaledPath} />
            </>
          )}
        </Suspense>

        {/* Contrôles */}
        <OrbitControls
          ref={(ref: any) => {
            // Store ref for camera controller
            if (ref) {
              (ref as any).target.set(0, 0, 0);
            }
          }}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.1}
          target={targetPosition ? new THREE.Vector3(...targetPosition) : new THREE.Vector3(0, 0, 0)}
          dampingFactor={0.1}
        />
      </Canvas>

      {/* Légende et contrôles */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-lg text-sm text-muted-foreground space-y-2 max-w-xs">
        <div className="font-medium mb-1">Légende</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Service disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Destination sélectionnée</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Itinéraire calculé</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>🖱️ Rotation</span>
          <span>•</span>
          <span>🔍 Zoom</span>
          <span>•</span>
          <span>✋ Déplacer</span>
        </div>
      </div>

      {/* GLB Debug Panel - Uncomment for debugging */}
      {/* <GLBDebugPanel modelPath={modelPath} /> */}
    </div>
  );
};

// Préchargement du modèle
useGLTF.preload("/models/DalalJam.glb");

export default Hospital3DMap; 