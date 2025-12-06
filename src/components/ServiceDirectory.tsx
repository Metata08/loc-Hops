import { useState, useMemo } from "react";
import {
  Heart,
  Baby,
  Camera,
  Ambulance,
  Building,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Activity,
  Pill,
  TestTube,
  Coffee,
  Car,
  ArrowUpDown,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { Language } from "@/i18n/translations";
import { useServices } from "@/contexts/ServicesContext";
import { getServiceIcon, getServiceName, GLBService } from "@/hooks/useGLBServices";
import PageHeader from "./PageHeader";

interface ServiceDirectoryProps {
  language: Language;
  onServiceSelect: (service: string) => void;
  onNavigate: (screen: "welcome" | "ai") => void;
  onLanguageChange: (lang: Language) => void;
}

// Map des icônes Lucide par nom
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Ambulance,
  Heart,
  Baby,
  Stethoscope,
  Building,
  Activity,
  Pill,
  TestTube,
  Coffee,
  Car,
  ArrowUpDown,
};

// Génère une couleur basée sur l'ID du service
const getServiceColor = (id: string): string => {
  if (id.includes("urgence") || id.includes("emergency")) return "text-red-500";
  if (id.includes("cardio")) return "text-red-500";
  if (id.includes("mater") || id.includes("pediatr")) return "text-pink-500";
  if (id.includes("radio")) return "text-blue-500";
  if (id.includes("pharma")) return "text-green-500";
  if (id.includes("labo")) return "text-purple-500";
  return "text-primary";
};

// Génère un temps d'attente simulé
const getWaitTime = (id: string): string => {
  const waitTimes = ["5 min", "10 min", "15 min", "20 min", "Sur RDV"];
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return waitTimes[hash % waitTimes.length];
};

// Génère un statut simulé (80% OUVERT, 20% FERMÉ)
const getServiceStatus = (id: string): "OUVERT" | "FERME" => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 5 === 0 ? "FERME" : "OUVERT";
};

const ServiceDirectory = ({
  language,
  onServiceSelect,
  onNavigate,
}: ServiceDirectoryProps) => {
  const { services, loading, error, modelLoaded, usingFallback } = useServices();
  const [currentPage, setCurrentPage] = useState(0);
  const servicesPerPage = 3;

  // Transforme les services GLB en services affichables
  const displayServices = useMemo(() => {
    return services.map((service: GLBService) => {
      const iconName = getServiceIcon(service.id);
      const IconComponent = iconMap[iconName] || Building;
      
      return {
        id: service.id,
        name: getServiceName(service.id, language),
        originalName: service.originalName,
        icon: IconComponent,
        status: getServiceStatus(service.id),
        waitTime: getWaitTime(service.id),
        color: getServiceColor(service.id),
        floor: service.floor,
        building: service.building,
      };
    });
  }, [services, language]);

  const totalPages = Math.ceil(displayServices.length / servicesPerPage);
  const currentServices = displayServices.slice(
    currentPage * servicesPerPage,
    (currentPage + 1) * servicesPerPage
  );

  const translations = {
    fr: {
      title: "SERVICES DISPONIBLES",
      urgences: "URGENCES",
      waitTime: "Attente estimée",
    },
    en: {
      title: "AVAILABLE SERVICES",
      urgences: "EMERGENCY",
      waitTime: "Estimated wait",
    },
    wo: {
      title: "SERWIS YI NINGA",
      urgences: "URGENCES",
      waitTime: "Xaar",
    },
    ar: {
      title: "الخدمات المتاحة",
      urgences: "الطوارئ",
      waitTime: "وقت الانتظار",
    },
  };

  const t = translations[language];

  // État de chargement
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <PageHeader
          title={t.title}
          language={language}
          onBack={() => onNavigate("welcome")}
          onHome={() => onNavigate("welcome")}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "fr" ? "Chargement des services..." : "Loading services..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Pas de services trouvés
  if (displayServices.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <PageHeader
          title={t.title}
          language={language}
          onBack={() => onNavigate("welcome")}
          onHome={() => onNavigate("welcome")}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "fr" ? "Aucun service disponible" : "No services available"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title={t.title}
        language={language}
        onBack={() => onNavigate("welcome")}
        onHome={() => onNavigate("welcome")}
      />

      {/* Info de source des données (dev only) */}
      {usingFallback && (
        <div className="px-6 py-2 text-center">
          <span className="text-xs text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Mode démo - Services de démonstration
          </span>
        </div>
      )}

      {/* Urgences Banner */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center gap-4 bg-red-100 rounded-full py-3 px-8 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-card border-2 border-red-300 flex items-center justify-center">
            <Ambulance className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-xl font-bold text-red-600 uppercase tracking-wide">
            {t.urgences}
          </span>
        </div>
      </div>

      {/* Services Carousel */}
      <div className="flex-1 px-6 py-4">
        <div className="flex items-center justify-center gap-6">
          {/* Left Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Service Cards */}
          <div className="flex gap-6 justify-center">
            {currentServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => onServiceSelect(service.id)}
                  className="w-56 bg-card rounded-3xl border-2 border-border p-6 cursor-pointer hover:border-primary hover:shadow-lg transition-all"
                >
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className={`w-7 h-7 ${service.color}`} />
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        service.status === "OUVERT"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      • {service.status}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {service.name}
                  </h3>

                  {/* Floor/Building info if available */}
                  {(service.floor !== undefined || service.building) && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {service.building && <span>{service.building}</span>}
                      {service.building && service.floor !== undefined && " • "}
                      {service.floor !== undefined && (
                        <span>
                          {language === "fr" ? `Étage ${service.floor}` : `Floor ${service.floor}`}
                        </span>
                      )}
                    </p>
                  )}

                  {/* Wait Time */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="text-sm">
                      {t.waitTime} : {service.waitTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentPage ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Service count info */}
        <div className="text-center mt-4">
          <span className="text-sm text-muted-foreground">
            {displayServices.length} {language === "fr" ? "services disponibles" : "services available"}
          </span>
        </div>
      </div>

      {/* Bottom Bar fixed et flottant */}
      <div className="fixed bottom-0 left-0  bg-background/90 backdrop-blur-md  px-6 py-4 flex items-center justify-between">
        {/* Settings */}
        <button className="w-14 h-14 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-8 h-8" />
        </button>
{/*  */}
        {/* Spacer for AI Button (rendered by parent) */}
        <div />
      </div>
    </div>
  );
};

export default ServiceDirectory;