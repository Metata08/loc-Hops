/* useGLBServices.ts */
import { fetchPOIs, fetchServices } from "@/lib/api";
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface GLBService {
  id: string;
  name: string;
  originalName: string;
  position: [number, number, number];
  floor?: number;
  building?: string;
  type?: string;
}

/* ------------------------------------------- */
/* SERVICE NAME MAPPINGS (Keep existing for icons/translations if needed) */
/* ------------------------------------------- */
const serviceNameMappings: Record<string, { fr: string; en: string; wo: string; ar: string; icon: string }> = {
  // Services médicaux
  radiologie: { fr: "Radiologie", en: "Radiology", wo: "Radiologie", ar: "الأشعة", icon: "Camera" },
  urgences: { fr: "Urgences", en: "Emergency", wo: "Urgences", ar: "الطوارئ", icon: "Ambulance" },
  maternite: { fr: "Maternité", en: "Maternity", wo: "Maternité", ar: "الولادة", icon: "Baby" },
  cardiologie: { fr: "Cardiologie", en: "Cardiology", wo: "Cardiologie", ar: "أمراض القلب", icon: "Heart" },
  chirurgie: { fr: "Chirurgie", en: "Surgery", wo: "Chirurgie", ar: "الجراحة", icon: "Activity" },

  // Autres services
  consultation: { fr: "Consultation", en: "Consultation", wo: "Consultation", ar: "الاستشارة", icon: "Stethoscope" },
  pharmacie: { fr: "Pharmacie", en: "Pharmacy", wo: "Farmasii", ar: "الصيدلية", icon: "Pill" },
  laboratoire: { fr: "Laboratoire", en: "Laboratory", wo: "Laboratoire", ar: "المختبر", icon: "TestTube" },
  reception: { fr: "Réception", en: "Reception", wo: "Jëkkër", ar: "الاستقبال", icon: "Building" },

  // Nouveaux services
  administration: { fr: "Administration", en: "Administration", wo: "Administration", ar: "الإدارة", icon: "Building" },
  cafeteria: { fr: "Cafétéria", en: "Cafeteria", wo: "Cafétéria", ar: "الكافتيريا", icon: "Coffee" },
  parking: { fr: "Parking", en: "Parking", wo: "Parking", ar: "موقف السيارات", icon: "Car" },
  elevator: { fr: "Ascenseur", en: "Elevator", wo: "Ascenseur", ar: "المصعد", icon: "ArrowUpDown" },
  stairs: { fr: "Escalier", en: "Stairs", wo: "Escalier", ar: "الدرج", icon: "Stairs" },
  toilet: { fr: "Toilettes", en: "Toilets", wo: "Toilettes", ar: "الحمامات", icon: "Wc" },
};

/* ------------------------------------------- */
/* HOOK PRINCIPAL */
/* ------------------------------------------- */
export function useGLBServices(modelPath: string = "/models/DalalJam.glb") {
  const [services, setServices] = useState<GLBService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false); // Add this state
  const [modelInfo, setModelInfo] = useState<{
    totalObjects: number;
    namedObjects: number;
    meshCount: number;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 1. Load GLB Model (Visuals only)
        const loader = new GLTFLoader();
        console.log(`🔄 Chargement du modèle GLB: ${modelPath}`);

        await new Promise((resolve, reject) => {
          loader.load(
            modelPath,
            (gltf) => {
              console.log("✅ Modèle GLB chargé avec succès");
              let totalObjects = 0;
              let namedObjects = 0;
              let meshCount = 0;

              gltf.scene.traverse((object: any) => {
                totalObjects++;
                if (object.name) namedObjects++;
                if (object.isMesh) meshCount++;
              });

              setModelInfo({ totalObjects, namedObjects, meshCount });
              setModelLoaded(true);
              resolve(gltf);
            },
            undefined,
            (err) => {
              console.error("❌ Échec du chargement du GLB:", err);
              // Don't fail completely if model fails, we might still have data
              setModelLoaded(false);
              resolve(null);
            }
          );
        });

        // 2. Fetch Data from Backend
        console.log("🔄 Récupération des données depuis le backend...");
        try {
          const [backendPois, backendServices] = await Promise.all([
            fetchPOIs(),
            fetchServices()
          ]);

          console.log(`✅ Données reçues: ${backendPois.length} POIs, ${backendServices.length} Services`);

          const mappedServices: GLBService[] = [];

          // Map Services to their representative POI
          backendServices.forEach(service => {
            // Find the best POI for this service (e.g., entry point or first found)
            const servicePois = backendPois.filter(p => p.service === service.id);

            if (servicePois.length > 0) {
              // Prioritize entry point, otherwise take the first one
              const representativePoi = servicePois.find(p => p.is_entry_point) || servicePois[0];

              // Try to find mapping for nice name/icon
              const mapping = Object.entries(serviceNameMappings).find(([key]) =>
                service.code.toLowerCase().includes(key)
              );

              const displayName = mapping ? mapping[1].fr : service.code;

              mappedServices.push({
                id: String(representativePoi.id), // Keep POI ID for navigation!
                name: displayName,
                originalName: service.code,
                position: representativePoi.coordinates as [number, number, number],
                floor: representativePoi.floor,
                building: "Principal",
                type: "Service"
              });
            }
          });

          // Optional: Add specific non-service POIs if needed (like Reception if not a service)
          // For now, strictly following "List of Services" request.

          setServices(mappedServices);
          setUsingFallback(false);

        } catch (apiError) {
          console.error("❌ Erreur API:", apiError);
          console.warn("⚠️ Utilisation des données de secours (fallback)");
          setServices(fallbackServices);
          setUsingFallback(true);
          setError("Erreur de connexion au serveur. Mode hors ligne.");
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [modelPath]);

  return {
    services,
    loading,
    error,
    modelLoaded,
    modelInfo,
    usingFallback,
    servicePositions: getServicePositions(services) // Helper included below
  };
}

/* ------------------------------------------- */
/* FALLBACK SERVICES */
/* ------------------------------------------- */
export const fallbackServices: GLBService[] = [
  {
    id: "1", // Changed to match likely DB IDs
    name: "Réception",
    originalName: "reception",
    position: [0, 0, 0],
    floor: 0,
    building: "Bâtiment principal"
  },
  {
    id: "2",
    name: "Urgences",
    originalName: "urgences",
    position: [10, 0, 5],
    floor: 0,
    building: "Bâtiment A"
  },
  // ... keep other fallbacks if needed, but ensure IDs are consistent
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
  // This might need adjustment depending on how we want to handle names now
  // For now, simple lookup or return ID
  return id;
}

export function getServiceIcon(id: string): string {
  // Simplified icon logic
  const lowerId = id.toLowerCase();
  // ... (keep existing logic if possible, or map from DB fields)
  return "Building";
}