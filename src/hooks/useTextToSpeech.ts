import { useState, useCallback, useRef } from "react";

interface UseTextToSpeechReturn {
  isSpeaking: boolean;
  speak: (text: string, lang?: string) => void;
  stop: () => void;
  isSupported: boolean;
}

export function useTextToSpeech(): UseTextToSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const speak = useCallback((text: string, lang: string = "fr-FR") => {
    if (!isSupported) {
      console.warn("Synthèse vocale non supportée");
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a good voice for the language
    const voices = window.speechSynthesis.getVoices();
    const langVoice = voices.find(
      (voice) => voice.lang.startsWith(lang.split("-")[0])
    );
    if (langVoice) {
      utterance.voice = langVoice;
    }

    utterance.onstart = () => {
      console.log("🔊 Synthèse vocale démarrée");
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      console.log("🔊 Synthèse vocale terminée");
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("❌ Erreur synthèse vocale:", event.error);
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    isSpeaking,
    speak,
    stop,
    isSupported,
  };
}
