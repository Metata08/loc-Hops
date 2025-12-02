import { type FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import type { Language } from '../types';
import { destinations as allDestinations } from '../constants';

interface HospitalMap3DProps {
  destinationKey?: string;
  language: Language;
  isMobile?: boolean;
}

// Composant pour un bâtiment avec étages
const Building: FC<{
  position: [number, number, number];
  floors: number;
  width: number;
  depth: number;
  buildingName: string;
  color: string;
  isSelected: boolean;
  hasBasement?: boolean;
}> = ({ position, floors, width, depth, buildingName, color, isSelected, hasBasement = false }) => {
  const floorHeight = 1.5;
  const baseHeight = 0.3;
  
  // Si le bâtiment a un sous-sol, on commence à -floorHeight au lieu de baseHeight
  const startY = hasBasement ? -floorHeight : baseHeight;
  const actualFloors = hasBasement ? floors - 1 : floors; // Exclure le sous-sol du compte des étages visibles

  return (
    <group position={position}>
      {/* Base du bâtiment */}
      <mesh position={[0, baseHeight / 2, 0]} castShadow>
        <boxGeometry args={[width, baseHeight, depth]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      
      {/* Sous-sol (si présent) */}
      {hasBasement && (
        <mesh 
          position={[0, -floorHeight / 2, 0]}
          castShadow
        >
          <boxGeometry args={[width * 0.95, floorHeight * 0.9, depth * 0.95]} />
          <meshStandardMaterial 
            color={isSelected ? '#ff6b6b' : '#555'} 
            emissive={isSelected ? '#ff0000' : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : 0}
          />
        </mesh>
      )}
      
      {/* Étages au-dessus du sol */}
      {Array.from({ length: actualFloors }).map((_, i) => {
        const floorY = baseHeight + (i * floorHeight) + (floorHeight / 2);
        
        return (
          <group key={i}>
            <mesh 
              position={[0, floorY, 0]}
              castShadow
            >
              <boxGeometry args={[width * 0.95, floorHeight * 0.9, depth * 0.95]} />
              <meshStandardMaterial 
                color={isSelected ? '#ff6b6b' : color} 
                emissive={isSelected ? '#ff0000' : '#000000'}
                emissiveIntensity={isSelected ? 0.3 : 0}
              />
            </mesh>
            {/* Séparation entre étages */}
            {i < actualFloors - 1 && (
              <mesh 
                position={[0, baseHeight + (i + 1) * floorHeight, 0]}
                castShadow
              >
                <boxGeometry args={[width, 0.1, depth]} />
                <meshStandardMaterial color="#444" />
              </mesh>
            )}
          </group>
        );
      })}
      
      {/* Label du bâtiment */}
      <Text
        position={[0, baseHeight + (actualFloors * floorHeight) + 0.5, 0]}
        fontSize={0.5}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {buildingName}
      </Text>
    </group>
  );
};

// Composant pour le sol
const Ground: FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#e8f5e9" />
    </mesh>
  );
};

// Composant principal de la scène 3D
const Scene3D: FC<{
  destinationKey?: string;
  language: Language;
}> = ({ destinationKey, language }) => {
  const destinations = allDestinations[language];
  const selectedDestination = destinationKey 
    ? destinations.find(d => d.key === destinationKey)
    : null;

  // Définition des bâtiments
  const buildings = [
    {
      key: 'A',
      position: [-4, 0, 0] as [number, number, number],
      floors: 2, // Rez-de-chaussée + 1 étage au-dessus (sous-sol géré séparément)
      width: 2,
      depth: 2,
      color: '#4a90e2',
      destinations: ['radiology', 'laboratory'],
      hasBasement: true, // Bâtiment A a un sous-sol
    },
    {
      key: 'B',
      position: [0, 0, 0] as [number, number, number],
      floors: 3, // Rez-de-chaussée + 2 étages
      width: 2,
      depth: 2,
      color: '#50c878',
      destinations: ['cardiology'],
      hasBasement: false,
    },
    {
      key: 'C',
      position: [4, 0, 0] as [number, number, number],
      floors: 2, // Rez-de-chaussée + 1er étage
      width: 2,
      depth: 2,
      color: '#ffa500',
      destinations: ['maternity', 'pharmacy'],
      hasBasement: false,
    },
  ];

  // Déterminer quel bâtiment est sélectionné
  const getSelectedBuilding = () => {
    if (!selectedDestination) return null;
    return buildings.find(b => 
      b.destinations.includes(selectedDestination.key)
    );
  };

  const selectedBuilding = getSelectedBuilding();

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.3} />
      
      <Ground />
      
      {buildings.map((building) => {
        const isSelected = selectedBuilding?.key === building.key;
        return (
          <Building
            key={building.key}
            position={building.position}
            floors={building.floors}
            width={building.width}
            depth={building.depth}
            buildingName={`Bâtiment ${building.key}`}
            color={building.color}
            isSelected={isSelected}
            hasBasement={building.hasBasement}
          />
        );
      })}
      
      {/* Point de position "Vous êtes ici" */}
      <group position={[-4, 0.5, -2]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </mesh>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.3}
          color="#ff0000"
          anchorX="center"
          anchorY="middle"
        >
          Vous êtes ici
        </Text>
      </group>
      
      {/* Marqueur pour la destination sélectionnée */}
      {selectedDestination && selectedBuilding && (
        <group position={[selectedBuilding.position[0], selectedBuilding.position[1] + 1, selectedBuilding.position[2]]}>
          <mesh>
            <coneGeometry args={[0.3, 0.8, 8]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          <Text
            position={[0, 1, 0]}
            fontSize={0.4}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
          >
            {selectedDestination.name}
          </Text>
        </group>
      )}
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
};

const HospitalMap3D: FC<HospitalMap3DProps> = ({
  destinationKey,
  language,
  isMobile = false,
}) => {
  return (
    <div className={`w-full h-full flex flex-col`}>
      {/* Canvas 3D */}
      <div className={`flex-1 ${isMobile ? 'h-[400px]' : 'h-[500px]'} bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden shadow-lg`}>
        <Canvas
          camera={{ position: [8, 8, 8], fov: 50 }}
          shadows
        >
          <Scene3D destinationKey={destinationKey} language={language} />
        </Canvas>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>🖱️ Utilisez la souris pour tourner, zoomer et déplacer la vue 3D</p>
        <p className="mt-1">📦 Bâtiment A (bleu), B (vert), C (orange)</p>
      </div>
    </div>
  );
};

export default HospitalMap3D;

