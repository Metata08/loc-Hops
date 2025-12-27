import locHopsLogo from "@/assets/loc-hops-logo.png";
import { useWeather } from "@/hooks/useWeather";
import { Language } from "@/i18n/translations";
import { ArrowLeft, Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  language: Language;
  onBack: () => void;
  onHome: () => void;
}

const PageHeader = ({ title, language, onBack, onHome }: PageHeaderProps) => {
  const { temperature, weatherIcon } = useWeather();
  const now = new Date();

  // const dayNames: Record<Language, string[]> = {
  //   fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  //   en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  //   wo: ["Dibeer", "Altine", "Talaata", "Àllarba", "Alxamis", "Àjjuma", "Gaawu"],
  //   ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  // };

  // const dayName = dayNames[language][now.getDay()];

  const date = now.toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const currentTime = now;
  return (
    <div className="w-full">
      {/* Top bar with time, logo, date/weather */}
      <div className="relative flex justify-between items-center px-8 py-4 mb-20">
        {/* Logo superposé */}
        <div className="absolute left-1/2 top-10  mt-10 -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src={locHopsLogo}
            alt="Loc-Hops"
            className="h-[450px] w-auto object-contain"
          />
        </div>

        <span className="text-4xl font-bold text-gray-900">{formatTime(currentTime)}</span>
        <div className="flex items-center gap-3 text-gray-600">
          <span className="text-2xl">{weatherIcon}</span>
          {/* la date */}
          <span className="text-base font-medium">{date}</span>
          <span className="text-base">🌡️ {temperature !== null ? `${temperature}°C` : "--°C"}</span>
        </div>
      </div>

      {/* Green banner with title and navigation */}
      <div className="flex items-center gap-4 px-6 py-2 bg-[#0f766e] w-[95%] mx-auto rounded-b-[20px]">
        {/* Back button */}
        <button
          onClick={onBack}
          className="w-14 h-14 rounded-xl border-2 border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>

        {/* Title banner */}
        <div className="flex-1 rounded-full py-4 px-8">
          <h1 className="text-2xl font-bold text-primary-foreground text-center uppercase tracking-wide">
            {title}
          </h1>
        </div>

        {/* Home button */}
        <button
          onClick={onHome}
          className="w-14 h-14 rounded-xl border-2 border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Home className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default PageHeader;