import React, { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, PerspectiveCamera, Line, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useServices } from "@/contexts/ServicesContext";

interface Hospital3DMapProps {
  modelPath?: string;
  targetService?: string;
  showPath?: boolean;
  onServiceClick?: (serviceId: string) => void;
  showAllMarkers?: boolean;
}

// Modèle GLB principal
const GLBModel = ({ modelPath, highlightServices }: { 
  modelPath: string; 
  highlightServices?: string[];
}) => {
  const { scene } = useGLTF(modelPath);
  const [hovered, setHovered] = useState<string | null>(null);
  
  // Configure le modèle
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Configure les matériaux pour une meilleure visibilité
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Ajoute un effet de survol
        if (child.userData?.serviceId) {
          child.userData.originalMaterial = child.material.clone();
          
          if (highlightServices?.includes(child.userData.serviceId)) {
            child.material = new THREE.MeshStandardMaterial({
              color: '#3b82f6',
              emissive: '#3b82f6',
              emissiveIntensity: 0.2,
              transparent: true,
              opacity: 0.8
            });
          }
        }
      }
    });
    
    // Centrer et ajuster l'échelle du modèle
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    scene.position.x = -center.x;
    scene.position.y = -center.y;
    scene.position.z = -center.z;
    
    // Ajuster l'échelle
    const maxSize = Math.max(size.x, size.y, size.z);
    const scale = 10 / maxSize;
    scene.scale.setScalar(scale);
    
    console.log("✅ Modèle 3D chargé:", {
      size,
      center,
      scale
    });
    
    return () => {
      // Cleanup des matériaux
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.dispose();
        }
      });
    };
  }, [scene, highlightServices]);
  
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

// 3D Path line améliorée
const PathLine = ({ start, end, animated = true }: { 
  start: [number, number, number]; 
  end: [number, number, number];
  animated?: boolean;
}) => {
  const dotRefs = useRef<THREE.Mesh[]>([]);
  
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 30;
    
    // Créer une courbe plus naturelle
    const midY = Math.max(start[1], end[1]) + 0.5;
    const controlY = midY + 0.5;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      
      // Courbe de Bézier quadratique
      const x = (1 - t) * (1 - t) * start[0] + 
                2 * (1 - t) * t * ((start[0] + end[0]) / 2) + 
                t * t * end[0];
                
      const y = (1 - t) * (1 - t) * start[1] + 
                2 * (1 - t) * t * controlY + 
                t * t * end[1];
                
      const z = (1 - t) * (1 - t) * start[2] + 
                2 * (1 - t) * t * ((start[2] + end[2]) / 2) + 
                t * t * end[2];
      
      pts.push([x, y, z]);
    }
    return pts;
  }, [start, end]);

  // Animation des points
  useFrame((state) => {
    // Animation des points
    dotRefs.current.forEach((dot, i) => {
      if (dot) {
        const t = (i + state.clock.elapsedTime * 0.5) % 1;
        const pointIndex = Math.floor(t * (points.length - 1));
        const point = points[pointIndex];
        dot.position.set(point[0], point[1], point[2]);
      }
    });
  });

  return (
    <group>
      {/* Ligne principale */}
      <Line
        points={points}
        color="#22c55e"
        lineWidth={4}
        dashed={true}
        dashSize={0.3}
        gapSize={0.2}
      />
      
      {/* Points animés */}
      {animated && [...Array(3)].map((_, i) => (
        <mesh 
          key={i}
          ref={(el) => {
            if (el) dotRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Point de départ */}
      <mesh position={start}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Point d'arrivée */}
      <mesh position={end}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
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
  modelPath = "/models/hospital.glb", 
  targetService, 
  showPath = true,
  onServiceClick,
  showAllMarkers = false
}: Hospital3DMapProps) => {
  const { services, servicePositions, modelLoaded, usingFallback } = useServices();
  const [selectedService, setSelectedService] = useState<string | undefined>(targetService);
  
  // Position par défaut (réception)
  const startPosition: [number, number, number] = servicePositions.reception || [0, 0, 3];
  const targetPosition = selectedService ? servicePositions[selectedService] : undefined;
  
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
      s.id === selectedService || 
      ['reception', 'urgences', 'radiologie', 'maternite'].includes(s.id)
    );
  }, [services, selectedService, showAllMarkers]);

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
              <span className="font-medium">Destination: {selectedService}</span>
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
      </div>
      
      <Canvas shadows dpr={[1, 2]}>
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
        <fog attach="fog" args={["#f0f9ff", 20, 40]} />
        
        {/* Grille de référence */}
        <gridHelper args={[20, 20, '#cbd5e1', '#e2e8f0']} position={[0, 0, 0]} />
        
        <Suspense fallback={<ModelLoadingFallback />}>
          {modelLoaded && !usingFallback ? (
            // Modèle GLB réel
            <GLBModel 
              modelPath={modelPath} 
              highlightServices={selectedService ? [selectedService] : []}
            />
          ) : (
            // Bâtiment placeholder
            <group>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#f8fafc" />
              </mesh>
            </group>
          )}
          
          {/* Marqueurs de service */}
          {servicesToShow.map((service) => (
            <ServiceMarker
              key={service.id}
              position={service.position}
              label={service.name}
              serviceId={service.id}
              isTarget={service.id === selectedService}
              onClick={handleServiceClick}
            />
          ))}
          
          {/* Chemin de navigation */}
          {showPath && targetPosition && (
            <PathLine 
              start={startPosition} 
              end={targetPosition} 
              animated={true}
            />
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
    </div>
  );
};

// Préchargement du modèle
useGLTF.preload("/models/hospital.glb");

export default Hospital3DMap;