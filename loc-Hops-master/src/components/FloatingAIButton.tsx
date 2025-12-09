import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language } from "@/i18n/translations";
import { useTranslation } from "@/hooks/useTranslation";

interface FloatingAIButtonProps {
  onClick: () => void;
  language?: Language;
}

const FloatingAIButton = ({ onClick, language = "fr" }: FloatingAIButtonProps) => {
  const { t } = useTranslation(language);
  
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 bg-[#0f766e] hover:bg-[#0d6560] text-white rounded-full pl-5 pr-3 py-6 shadow-xl flex items-center gap-2"
      aria-label={t("aiAssistant")}
    >
      <span className="font-medium text-sm">{t("aiAssistant")}</span>
      <div className="bg-[#10b981] rounded-full p-2.5 ml-1">
        <Mic className="h-4 w-4 text-white" />
      </div>
    </Button>
  );
};

export default FloatingAIButton;
