import AIAssistant from "@/components/AIAssistant";
import FloatingAIButton from "@/components/FloatingAIButton";
import MapView from "@/components/MapView";
import ServiceDirectory from "@/components/ServiceDirectory";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/i18n/translations";
import { useEffect, useState } from "react";

type Screen = "welcome" | "ai" | "services" | "map";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("fr");

  // Handle RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  }, [selectedLanguage]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation(selectedLanguage);

  // Set document language
  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  // Auto-reset after 90 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCurrentScreen("welcome");
        setSelectedLanguage("fr");
        setSelectedService(null);
        document.documentElement.dir = "ltr";
        toast({
          title: t("sessionEnded"),
          description: t("backToHome"),
        });
      }, 90000);
    };

    const handleActivity = () => resetTimeout();

    window.addEventListener("click", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("keydown", handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [toast]);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setCurrentScreen("map");
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "welcome" && (
        <WelcomeScreen
          onLanguageSelect={handleLanguageSelect}
          selectedLanguage={selectedLanguage}
          onNavigate={handleNavigate}
        />
      )}

      {currentScreen === "ai" && (
        <AIAssistant
          language={selectedLanguage}
          onNavigate={handleNavigate}
          onServiceSelect={handleServiceSelect}
          onLanguageChange={handleLanguageSelect}
        />
      )}

      {currentScreen === "services" && (
        <ServiceDirectory
          language={selectedLanguage}
          onServiceSelect={handleServiceSelect}
          onNavigate={handleNavigate}
          onLanguageChange={handleLanguageSelect}
        />
      )}

      {currentScreen === "map" && selectedService && (
        <MapView
          service={selectedService}
          language={selectedLanguage}
          onNavigate={handleNavigate}
          onLanguageChange={handleLanguageSelect}
        />
      )}

      {/* Floating AI Button - Visible on all screens except welcome and ai */}
      {currentScreen !== "welcome" && currentScreen !== "ai" && (
        <FloatingAIButton onClick={() => setIsAIOpen(true)} language={selectedLanguage} />
      )}

      {/* AI Assistant Side Panel */}
      {/* AI Assistant Compact Pop-up */}
      <Sheet open={isAIOpen} onOpenChange={setIsAIOpen}>
        <SheetContent
          side="right"
          className="w-[70vw] min-w-[500px] h-[70vh] min-h-[500px] p-[2px] overflow-hidden flex flex-col fixed bottom-6 right-6 top-auto translate-y-0 rounded-xl shadow-2xl border-2"
        >
          <AIAssistant
            language={selectedLanguage}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              setIsAIOpen(false);
            }}
            onServiceSelect={(service) => {
              handleServiceSelect(service);
              setIsAIOpen(false);
            }}
            onLanguageChange={handleLanguageSelect}
            isOverlay={true}
            onClose={() => setIsAIOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
