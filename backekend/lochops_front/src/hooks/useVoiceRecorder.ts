import { useState, useRef, useCallback } from "react";

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionInterface extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognitionInterface, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionInterface, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionErrorEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInterface;
    webkitSpeechRecognition: new () => SpeechRecognitionInterface;
  }
}

interface UseVoiceRecorderReturn {
  isRecording: boolean;
  isProcessing: boolean;
  transcript: string;
  error: string | null;
  startRecording: (lang?: string) => void;
  stopRecording: () => void;
  resetTranscript: () => void;
}

export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognitionInterface | null>(null);
  const finalTranscriptRef = useRef("");

  const startRecording = useCallback((lang: string = "fr-FR") => {
    setError(null);
    setTranscript("");
    finalTranscriptRef.current = "";

    // Check for browser support
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionConstructor) {
      setError("La reconnaissance vocale n'est pas supportée par ce navigateur.");
      return;
    }

    try {
      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;
      
      recognition.onstart = () => {
        console.log("🎤 Reconnaissance vocale démarrée");
        setIsRecording(true);
        setIsProcessing(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        if (finalTranscript) {
          finalTranscriptRef.current += finalTranscript + " ";
        }

        setTranscript(finalTranscriptRef.current + interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("❌ Erreur reconnaissance vocale:", event.error);
        
        switch (event.error) {
          case "not-allowed":
            setError("Accès au microphone refusé. Veuillez autoriser l'accès.");
            break;
          case "no-speech":
            // Don't show error for no speech, just stop
            break;
          case "audio-capture":
            setError("Aucun microphone détecté.");
            break;
          case "aborted":
            // User aborted, no error needed
            break;
          default:
            setError(`Erreur: ${event.error}`);
        }
        
        setIsRecording(false);
        setIsProcessing(false);
      };

      recognition.onend = () => {
        console.log("🎤 Reconnaissance vocale terminée");
        setIsRecording(false);
        setTranscript(finalTranscriptRef.current.trim());
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("❌ Erreur lors du démarrage:", err);
      setError("Impossible de démarrer la reconnaissance vocale.");
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      setIsProcessing(true);
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    finalTranscriptRef.current = "";
    setError(null);
  }, []);

  return {
    isRecording,
    isProcessing,
    transcript,
    error,
    startRecording,
    stopRecording,
    resetTranscript,
  };
}
