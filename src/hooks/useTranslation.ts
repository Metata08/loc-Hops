import { Language, translations } from "@/i18n/translations";

export const useTranslation = (language: Language) => {
  const t = (key: keyof typeof translations.fr, params?: Record<string, string>): string => {
    const langTranslations = translations[language] || translations.fr;
    let text = langTranslations[key] || translations.fr[key] || key;
    
    // Replace parameters if any
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        text = text.replace(`{${paramKey}}`, params[paramKey]);
      });
    }
    
    return text;
  };

  return { t, language };
};
