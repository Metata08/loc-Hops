import { useState, useEffect } from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Language, languageNames } from "@/i18n/translations";
import { useTranslation } from "@/hooks/useTranslation";
import locHopsLogo from "@/assets/loc-hops-logo.png";
import PageHeader from "./PageHeader";

interface WelcomeScreenProps {
  onLanguageSelect: (lang: Language) => void;
  selectedLanguage: Language;
  onNavigate: (screen: "welcome" | "ai" | "services") => void;
}

const WelcomeScreen = ({ onLanguageSelect, selectedLanguage, onNavigate }: WelcomeScreenProps) => {
  const { t } = useTranslation(selectedLanguage);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const day = days[date.getDay()];
    return `${day} ${date.toLocaleDateString('fr-FR')}`;
  };
  
  const languages = (Object.keys(languageNames) as Language[]).map(code => ({
    code,
    name: languageNames[code].name,
    flag: languageNames[code].flag,
  }));

  return (
    <div className="relative flex flex-col h-screen bg-[#f8f9fa] " >
              <PageHeader
                title={t("tagline")}
                language={selectedLanguage} onBack={function (): void {
                  throw new Error("Function not implemented.");
                } } onHome={function (): void {
                  throw new Error("Function not implemented.");
                } }              
              />
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center">

        {/* Language Selection Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          {t("chooseLanguage")}
        </h2>

        {/* Language Cards - 4 in a row */}
        <div className="grid grid-cols-4 gap-8 w-[85%]">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              className={`cursor-pointer transition-all duration-200 bg-white p-10 flex flex-col items-center justify-center hover:scale-105 hover:shadow-lg rounded-2xl ${
                selectedLanguage === lang.code
                  ? "border-2 border-[#16a085] shadow-lg"
                  : "border border-gray-200 shadow-sm"
              }`}
              onClick={() => {
                onLanguageSelect(lang.code);
                onNavigate("services");
              }}
            >
              <div className="mb-5">
                <img 
                  src={lang.flag} 
                  alt={lang.name} 
                  className="w-24 h-16 object-cover rounded-lg shadow-sm" 
                />
              </div>
              <span className={`text-lg font-semibold text-gray-900 ${lang.code === 'ar' ? 'font-arabic' : ''}`}>
                {lang.name}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Assistant Button - Bottom Right */}
      <div className="fixed bottom-8 right-8">
        <Button
          size="lg"
          className="bg-[#16a085] hover:bg-[#0f766e] text-white rounded-full pl-6 pr-4 py-7 shadow-2xl flex items-center gap-3"
          onClick={() => onNavigate("ai")}
        >
          <span className="font-medium text-base">{t("aiAssistant")}</span>
          <div className="bg-[#2ecc71] rounded-full p-3">
            <Mic className="h-5 w-5 text-white" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;