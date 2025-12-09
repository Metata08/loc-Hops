import { Printer, Smartphone } from "lucide-react";
import { Language } from "@/i18n/translations";
import { useTranslation } from "@/hooks/useTranslation";
import { getServiceName } from "@/hooks/useGLBServices";
import Hospital3DMap from "./Hospital3DMap";
import PageHeader from "./PageHeader";

interface MapViewProps {
  service: string;
  language: Language;
  onNavigate: (screen: "welcome" | "services") => void;
  onLanguageChange: (lang: Language) => void;
}

const MapView = ({ service, language, onNavigate }: MapViewProps) => {
  const { t } = useTranslation(language);
  const serviceName = getServiceName(service, language);

  const translations = {
    fr: {
      itinerary: "ITINÉRAIRE",
      walkTime: "Temps de marche estimé",
      qrCode: "QR code",
      scanText: "Scannez pour obtenir le plan sur votre téléphone",
      printPlan: "Imprimer le plan",
    },
    en: {
      itinerary: "ITINERARY",
      walkTime: "Estimated walk time",
      qrCode: "QR code",
      scanText: "Scan to get the map on your phone",
      printPlan: "Print the map",
    },
    wo: {
      itinerary: "YOON",
      walkTime: "Waxtu dox",
      qrCode: "QR code",
      scanText: "Scan ngir am plan bi ci sa telefon",
      printPlan: "Imprimer plan bi",
    },
    ar: {
      itinerary: "المسار",
      walkTime: "وقت المشي المقدر",
      qrCode: "رمز QR",
      scanText: "امسح للحصول على الخريطة على هاتفك",
      printPlan: "طباعة الخريطة",
    },
  };

  const txt = translations[language];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title={serviceName.toUpperCase()}
        language={language}
        onBack={() => onNavigate("services")}
        onHome={() => onNavigate("welcome")}
      />

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-6">
        {/* 3D Map - Left Side */}
        <div className="flex-1 rounded-3xl overflow-hidden border-2 border-border bg-muted/30">
          <Hospital3DMap targetService={service} showPath={true} />
        </div>

        {/* Right Side Panel */}
        <div className="w-72 flex flex-col gap-4">
          {/* Itinerary Card */}
          <div className="bg-card rounded-2xl border-2 border-primary p-4">
            <h3 className="text-lg font-bold text-primary mb-3">{txt.itinerary}</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L12 6M12 18L12 22M6 12L2 12M22 12L18 12" />
              </svg>
              <span className="text-sm">{txt.walkTime} : 5 min</span>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="bg-card rounded-2xl border-2 border-border p-4 flex-1">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-foreground">{txt.qrCode}</h3>
              <Smartphone className="w-5 h-5 text-muted-foreground" />
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <div className="w-40 h-40 bg-card border-2 border-border rounded-xl p-3">
                <div className="w-full h-full grid grid-cols-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square ${
                        // Create a QR-like pattern
                        (i < 24 && (i % 8 < 3 || (i < 8 && i > 4) || (i > 15 && i < 19))) ||
                        (i > 39 && i < 48 && i % 8 < 3) ||
                        (i > 55 && i % 8 < 3) ||
                        Math.random() > 0.6
                          ? "bg-foreground"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              {txt.scanText}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Print Button */}
      <div className="flex justify-center pb-6">
        <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full py-4 px-8 flex items-center gap-3 font-bold text-lg transition-colors border-2 border-amber-200">
          <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center">
            <span className="text-amber-700 text-xl">(</span>
          </div>
          {txt.printPlan}
          <Printer className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MapView;