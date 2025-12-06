/* useGLBServices.ts */
import { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface GLBService {
  id: string;
  name: string;
  originalName: string;
  position: [number, number, number];
  floor?: number;
  building?: string;
  type?: string; // Ajouté: type d'objet (mesh, group, etc.)
}

/* ------------------------------------------- */
/* SERVICE NAME MAPPINGS - Version élargie */
/* ------------------------------------------- */
const serviceNameMappings: Record<string, { fr: string; en: string; wo: string; ar: string; icon: string }> = {
  // Services médicaux
  radiologie: { fr: "Radiologie", en: "Radiology", wo: "Radiologie", ar: "الأشعة", icon: "Camera" },
  radiology: { fr: "Radiologie", en: "Radiology", wo: "Radiologie", ar: "الأشعة", icon: "Camera" },
  radio: { fr: "Radiologie", en: "Radiology", wo: "Radiologie", ar: "الأشعة", icon: "Camera" },
  
  urgences: { fr: "Urgences", en: "Emergency", wo: "Urgences", ar: "الطوارئ", icon: "Ambulance" },
  emergency: { fr: "Urgences", en: "Emergency", wo: "Urgences", ar: "الطوارئ", icon: "Ambulance" },
  er: { fr: "Urgences", en: "Emergency", wo: "Urgences", ar: "الطوارئ", icon: "Ambulance" },
  
  maternite: { fr: "Maternité", en: "Maternity", wo: "Maternité", ar: "الولادة", icon: "Baby" },
  maternity: { fr: "Maternité", en: "Maternity", wo: "Maternité", ar: "الولادة", icon: "Baby" },
  mater: { fr: "Maternité", en: "Maternity", wo: "Maternité", ar: "الولادة", icon: "Baby" },
  
  cardiologie: { fr: "Cardiologie", en: "Cardiology", wo: "Cardiologie", ar: "أمراض القلب", icon: "Heart" },
  cardiology: { fr: "Cardiologie", en: "Cardiology", wo: "Cardiologie", ar: "أمراض القلب", icon: "Heart" },
  cardio: { fr: "Cardiologie", en: "Cardiology", wo: "Cardiologie", ar: "أمراض القلب", icon: "Heart" },
  
  chirurgie: { fr: "Chirurgie", en: "Surgery", wo: "Chirurgie", ar: "الجراحة", icon: "Activity" },
  surgery: { fr: "Chirurgie", en: "Surgery", wo: "Chirurgie", ar: "الجراحة", icon: "Activity" },
  chirurg: { fr: "Chirurgie", en: "Surgery", wo: "Chirurgie", ar: "الجراحة", icon: "Activity" },
  
  // Autres services
  consultation: { fr: "Consultation", en: "Consultation", wo: "Consultation", ar: "الاستشارة", icon: "Stethoscope" },
  consult: { fr: "Consultation", en: "Consultation", wo: "Consultation", ar: "الاستشارة", icon: "Stethoscope" },
  
  pharmacie: { fr: "Pharmacie", en: "Pharmacy", wo: "Farmasii", ar: "الصيدلية", icon: "Pill" },
  pharmacy: { fr: "Pharmacie", en: "Pharmacy", wo: "Farmasii", ar: "الصيدلية", icon: "Pill" },
  pharma: { fr: "Pharmacie", en: "Pharmacy", wo: "Farmasii", ar: "الصيدلية", icon: "Pill" },
  
  laboratoire: { fr: "Laboratoire", en: "Laboratory", wo: "Laboratoire", ar: "المختبر", icon: "TestTube" },
  laboratory: { fr: "Laboratoire", en: "Laboratory", wo: "Laboratoire", ar: "المختبر", icon: "TestTube" },
  labo: { fr: "Laboratoire", en: "Laboratory", wo: "Laboratoire", ar: "المختبر", icon: "TestTube" },
  lab: { fr: "Laboratoire", en: "Laboratory", wo: "Laboratoire", ar: "المختبر", icon: "TestTube" },
  
  reception: { fr: "Réception", en: "Reception", wo: "Jëkkër", ar: "الاستقبال", icon: "Building" },
  accueil: { fr: "Réception", en: "Reception", wo: "Jëkkër", ar: "الاستقبال", icon: "Building" },
  frontdesk: { fr: "Réception", en: "Reception", wo: "Jëkkër", ar: "الاستقبال", icon: "Building" },
  
  // Nouveaux services possibles
  administration: { fr: "Administration", en: "Administration", wo: "Administration", ar: "الإدارة", icon: "Building" },
  admin: { fr: "Administration", en: "Administration", wo: "Administration", ar: "الإدارة", icon: "Building" },
  
  cafeteria: { fr: "Cafétéria", en: "Cafeteria", wo: "Cafétéria", ar: "الكافتيريا", icon: "Coffee" },
  cafe: { fr: "Cafétéria", en: "Cafeteria", wo: "Cafétéria", ar: "الكافتيريا", icon: "Coffee" },
  
  parking: { fr: "Parking", en: "Parking", wo: "Parking", ar: "موقف السيارات", icon: "Car" },
  park: { fr: "Parking", en: "Parking", wo: "Parking", ar: "موقف السيارات", icon: "Car" },
  
  elevator: { fr: "Ascenseur", en: "Elevator", wo: "Ascenseur", ar: "المصعد", icon: "ArrowUpDown" },
  ascenseur: { fr: "Ascenseur", en: "Elevator", wo: "Ascenseur", ar: "المصعد", icon: "ArrowUpDown" },
  lift: { fr: "Ascenseur", en: "Elevator", wo: "Ascenseur", ar: "المصعد", icon: "ArrowUpDown" },
  
  stairs: { fr: "Escalier", en: "Stairs", wo: "Escalier", ar: "الدرج", icon: "Stairs" },
  escalier: { fr: "Escalier", en: "Stairs", wo: "Escalier", ar: "الدرج", icon: "Stairs" },
  staircase: { fr: "Escalier", en: "Stairs", wo: "Escalier", ar: "الدرج", icon: "Stairs" },
  
  toilet: { fr: "Toilettes", en: "Toilets", wo: "Toilettes", ar: "الحمامات", icon: "Wc" },
  wc: { fr: "Toilettes", en: "Toilets", wo: "Toilettes", ar: "الحمامات", icon: "Wc" },
  toilettes: { fr: "Toilettes", en: "Toilets", wo: "Toilettes", ar: "الحمامات", icon: "Wc" },
  restroom: { fr: "Toilettes", en: "Toilets", wo: "Toilettes", ar: "الحمامات", icon: "Wc" },
};

/* ------------------------------------------- */
/* KEYWORDS POUR IDENTIFICATION - Version élargie */
/* ------------------------------------------- */
const serviceKeywords = [
  // Mots-clés génériques
  "service", "dept", "department", "ward", "unit", "room", "salle", 
  "office", "bureau", "area", "zone", "section", "department",
  
  // Préfixes courants dans les modèles 3D
  "mesh", "obj", "object", "node", "group", "box", "cube", "cylinder",
  
  // Tous les services de notre mapping
  ...Object.keys(serviceNameMappings)
];

/* ------------------------------------------- */
/* NORMALISATION - Version améliorée */
/* ------------------------------------------- */
function normalizeServiceName(name: string): string {
  if (!name || name.length < 2) return "";
  
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[_-]/g, " ")           // Remplace underscores et tirets par espaces
    .replace(/[^a-z0-9\s]/g, "")     // Garde seulement lettres, chiffres, espaces
    .trim();
}

/* ------------------------------------------- */
/* MATCH SERVICE - Version améliorée */
/* ------------------------------------------- */
function extractServiceInfo(name: string) {
  const normalized = normalizeServiceName(name);
  
  if (!normalized || normalized.length < 2) return null;
  
  // Cherche d'abord des correspondances exactes
  for (const [key, mapping] of Object.entries(serviceNameMappings)) {
    if (normalized === key || normalized.includes(` ${key} `) || 
        normalized.startsWith(`${key} `) || normalized.endsWith(` ${key}`)) {
      return { id: key, mapping };
    }
  }
  
  // Cherche des correspondances partielles
  for (const [key, mapping] of Object.entries(serviceNameMappings)) {
    if (normalized.includes(key)) {
      return { id: key, mapping };
    }
  }
  
  // Si on trouve un mot-clé générique, on retourne un service générique
  if (normalized.includes("room") || normalized.includes("salle")) {
    const roomMatch = normalized.match(/(room|salle)[_\s]*(\d+)/);
    const roomNum = roomMatch ? roomMatch[2] : "";
    return {
      id: `room_${roomNum || "unknown"}`,
      mapping: { 
        fr: `Salle ${roomNum || ""}`.trim(), 
        en: `Room ${roomNum || ""}`.trim(), 
        icon: "Building" 
      }
    };
  }
  
  return null;
}

/* ------------------------------------------- */
/* DÉTECTION D'OBJET INTÉRESSANT - Version améliorée */
/* ------------------------------------------- */
function isServiceObject(name: string): boolean {
  const normalized = normalizeServiceName(name);
  
  if (!normalized || normalized.length < 2) return false;
  
  // 1. Vérifie si le nom correspond à un service connu
  if (extractServiceInfo(name)) return true;
  
  // 2. Vérifie les mots-clés génériques
  if (serviceKeywords.some(keyword => normalized.includes(keyword))) {
    return true;
  }
  
  // 3. Vérifie les noms qui pourraient être des salles (chiffres)
  if (normalized.match(/(room|salle|chambre|office)[_\s]*\d+/)) {
    return true;
  }
  
  // 4. Vérifie les noms qui contiennent des indications d'étage
  if (normalized.match(/(floor|etage|niveau|level)[_\s]*\d+/)) {
    return true;
  }
  
  return false;
}

/* ------------------------------------------- */
/* EXTRACTION D'ÉTAGE - Version améliorée */
/* ------------------------------------------- */
function extractFloorFromName(name: string): number | undefined {
  const n = name.toLowerCase();
  
  // RDC / Ground floor
  if (n.includes("rdc") || n.includes("r0") || n.includes("f0") || 
      n.includes("ground") || n.includes("rez")) return 0;
  
  // Patterns: étage_1, floor-2, niveau3, f4, etc.
  const patterns = [
    /(?:etage|floor|niveau|level|f|r)[-_]?(\d+)/,
    /(?:et|fl|niv|lev)[-_]?(\d+)/,
    /(\d+)(?:st|nd|rd|th)[\s]*(?:floor|etage|level)/
  ];
  
  for (const pattern of patterns) {
    const match = n.match(pattern);
    if (match) {
      const floorNum = parseInt(match[1]);
      if (!isNaN(floorNum)) return floorNum;
    }
  }
  
  return undefined;
}

/* ------------------------------------------- */
/* EXTRACTION DE BÂTIMENT - Version améliorée */
/* ------------------------------------------- */
function extractBuildingFromName(name: string): string | undefined {
  const patterns = [
    /(?:bat|building|bldg|bloc|pavillon)[-_]?([a-z])/i,
    /(?:bat|building|bldg|bloc|pavillon)[\s]+([a-z])/i,
    /([a-z])[\s]*(?:bat|building|bldg|bloc)/i
  ];
  
  for (const pattern of patterns) {
    const match = name.match(pattern);
    if (match) {
      return `Bâtiment ${match[1].toUpperCase()}`;
    }
  }
  
  return undefined;
}

/* ------------------------------------------- */
/* HOOK PRINCIPAL - Version améliorée */
/* ------------------------------------------- */
export function useGLBServices(modelPath: string = "/models/hospital.glb") {
  const [services, setServices] = useState<GLBService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelInfo, setModelInfo] = useState<{
    totalObjects: number;
    namedObjects: number;
    meshCount: number;
  } | null>(null);

  useEffect(() => {
    if (!modelPath) {
      setError("Chemin du modèle non fourni");
      setLoading(false);
      return;
    }

    const loader = new GLTFLoader();
    
    console.log(`🔄 Chargement du modèle GLB: ${modelPath}`);

    loader.load(
      modelPath,
      (gltf) => {
        console.log("✅ Modèle GLB chargé avec succès");
        
        const extractedServices: GLBService[] = [];
        const seenIds = new Set<string>();
        
        let totalObjects = 0;
        let namedObjects = 0;
        let meshCount = 0;

        gltf.scene.traverse((object: any) => {
          totalObjects++;
          
          const name = object.name || "";
          
          if (name && name.trim() !== "") {
            namedObjects++;
            
            if (object.isMesh) {
              meshCount++;
            }
            
            // Détection plus permissive
            if (isServiceObject(name) || object.isMesh) {
              const info = extractServiceInfo(name);
              
              // Crée un ID unique basé sur le nom et la position
              const pos = new THREE.Vector3();
              object.getWorldPosition(pos);
              const serviceId = info?.id || `obj_${name.replace(/\s+/g, '_')}_${Date.now()}`;
              
              if (!seenIds.has(serviceId)) {
                seenIds.add(serviceId);
                
                extractedServices.push({
                  id: serviceId,
                  name: info ? info.mapping.fr : name,
                  originalName: name,
                  position: [pos.x, pos.y, pos.z],
                  floor: extractFloorFromName(name),
                  building: extractBuildingFromName(name),
                  type: object.type,
                });
                
                console.log(`📍 Service détecté: "${name}" -> ${info ? info.mapping.fr : name}`, {
                  position: [pos.x, pos.y, pos.z],
                  floor: extractFloorFromName(name),
                  building: extractBuildingFromName(name)
                });
              }
            }
          }
        });

        console.log(`📊 Statistiques du modèle:`);
        console.log(`   Total objets: ${totalObjects}`);
        console.log(`   Objets nommés: ${namedObjects}`);
        console.log(`   Meshes: ${meshCount}`);
        console.log(`   Services détectés: ${extractedServices.length}`);

        // Si aucun service n'a été détecté, essayez une approche différente
        if (extractedServices.length === 0) {
          console.log("⚠️ Aucun service détecté. Tentative d'extraction de tous les objets nommés...");
          
          gltf.scene.traverse((object: any) => {
            const name = object.name || "";
            if (name && name.trim() !== "" && !seenIds.has(name)) {
              const pos = new THREE.Vector3();
              object.getWorldPosition(pos);
              
              extractedServices.push({
                id: `obj_${name.replace(/\s+/g, '_')}`,
                name: name,
                originalName: name,
                position: [pos.x, pos.y, pos.z],
                floor: extractFloorFromName(name),
                building: extractBuildingFromName(name),
                type: object.type,
              });
            }
          });
        }

        // Trie par nom
        extractedServices.sort((a, b) => a.name.localeCompare(b.name));

        setServices(extractedServices);
        setModelInfo({
          totalObjects,
          namedObjects,
          meshCount
        });
        setModelLoaded(true);
        setLoading(false);
        
        console.log(`🎯 Services finalisés: ${extractedServices.length}`);
      },
      (progress) => {
        // Callback de progression
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total * 100).toFixed(1);
          console.log(`📥 Chargement: ${percent}%`);
        }
      },
      (err) => {
        console.error("❌ Échec du chargement du GLB:", err);
        setError(
          `Échec du chargement du modèle: ${
            err && typeof err === "object" && "message" in err
              ? (err as Error).message
              : "Erreur inconnue"
          }`
        );
        setModelLoaded(false);
        setLoading(false);
      }
    );

    // Cleanup function
    return () => {
      // Nettoyage éventuel des ressources Three.js
    };
  }, [modelPath]);

  return { 
    services, 
    loading, 
    error, 
    modelLoaded,
    modelInfo 
  };
}

/* ------------------------------------------- */
/* FALLBACK SERVICES - À utiliser si GLB échoue */
/* ------------------------------------------- */
export const fallbackServices: GLBService[] = [
  {
    id: "reception",
    name: "Réception",
    originalName: "Réception",
    position: [0, 0, 0],
    floor: 0,
    building: "Bâtiment principal"
  },
  {
    id: "urgences",
    name: "Urgences",
    originalName: "Urgences",
    position: [10, 0, 5],
    floor: 0,
    building: "Bâtiment A"
  },
  {
    id: "radiologie",
    name: "Radiologie",
    originalName: "Radiologie",
    position: [15, 0, -5],
    floor: 1,
    building: "Bâtiment B"
  },
  {
    id: "maternite",
    name: "Maternité",
    originalName: "Maternité",
    position: [-10, 0, 8],
    floor: 2,
    building: "Bâtiment C"
  },
  {
    id: "cardiologie",
    name: "Cardiologie",
    originalName: "Cardiologie",
    position: [-5, 0, -10],
    floor: 1,
    building: "Bâtiment A"
  }
];

/* ------------------------------------------- */
/* UTILITAIRES */
/* ------------------------------------------- */
export function getServicePositions(services: GLBService[]) {
  const positions: Record<string, [number, number, number]> = {};

  services.forEach((srv) => {
    positions[srv.id] = srv.position;
  });

  return positions;
}

export function getServiceName(id: string, lang: "fr" | "en" | "wo" | "ar" = "fr") {
  // Cherche d'abord dans le mapping
  const entry = serviceNameMappings[id];
  if (entry) {
    return entry[lang] || entry.fr;
  }
  
  // Si l'ID commence par "obj_", c'est un objet générique
  if (id.startsWith("obj_")) {
    const originalName = id.replace("obj_", "").replace(/_/g, " ");
    return originalName;
  }
  
  // Fallback
  return id;
}

export function getServiceIcon(id: string): string {
  // Cherche d'abord dans le mapping
  const entry = serviceNameMappings[id];
  if (entry) {
    return entry.icon;
  }
  
  // Déduit l'icône du nom
  const lowerId = id.toLowerCase();
  if (lowerId.includes("radio")) return "Camera";
  if (lowerId.includes("urgence")) return "Ambulance";
  if (lowerId.includes("mater")) return "Baby";
  if (lowerId.includes("cardio")) return "Heart";
  if (lowerId.includes("chirurg")) return "Activity";
  if (lowerId.includes("consult")) return "Stethoscope";
  if (lowerId.includes("pharma")) return "Pill";
  if (lowerId.includes("lab")) return "TestTube";
  
  // Fallback
  return "Building";
}