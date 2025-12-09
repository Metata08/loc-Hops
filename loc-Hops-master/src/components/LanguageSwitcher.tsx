import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languageNames, Language } from "@/i18n/translations";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="btn-secondary border-2 gap-3 md:gap-4">
          <img src={languageNames[currentLanguage].flag} alt={languageNames[currentLanguage].name} className="w-12 h-9 md:w-14 md:h-10 object-cover rounded shadow-sm" />
          <span className="font-semibold text-body">{languageNames[currentLanguage].name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        {(Object.keys(languageNames) as Language[]).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`text-body py-4 md:py-5 gap-4 cursor-pointer ${
              currentLanguage === lang ? "bg-primary/10 font-bold" : ""
            }`}
          >
            <img src={languageNames[lang].flag} alt={languageNames[lang].name} className="w-12 h-9 md:w-14 md:h-10 object-cover rounded shadow-sm" />
            <span className="font-semibold text-body">{languageNames[lang].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
