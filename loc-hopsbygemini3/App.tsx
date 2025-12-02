import { Mic, MicOff, Send, Sparkles, Volume2, VolumeX } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatBubble } from './components/ChatBubble';
import { HospitalMap } from './components/HospitalMap';
import { generateHospitalResponse } from './services/geminiService';

// Types
// Removed local IWindow interface as it is now in types.d.ts

type Language = 'fr' | 'wo' | 'ar';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'wo', label: 'Wolof', flag: '🇸🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
] as const;

export default function App() {
  // View State
  const [selectedLang, setSelectedLang] = useState<Language>('fr');

  // Chat State
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [inputText, setInputText] = useState("");

  // Map State
  const [highlightedLocation, setHighlightedLocation] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const lastSpeechErrorRef = useRef<{ type?: string; time: number } | null>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

  // --- Logic ---

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionConstructor) {
      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech error", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    // Initial Greeting
    const initialMsg = "Bonjour ! Je suis votre assistant. Où souhaitez-vous aller ?";
    setMessages([{ role: 'model', text: initialMsg }]);

  }, []);

  // Update Recognition Language when selection changes
  useEffect(() => {
    if (recognitionRef.current) {
      if (selectedLang === 'wo') recognitionRef.current.lang = 'fr-FR';
      else if (selectedLang === 'ar') recognitionRef.current.lang = 'ar-SA';
      else recognitionRef.current.lang = 'fr-FR';
    }
  }, [selectedLang]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = useCallback((text: string, langCode: Language = selectedLang, onEnd?: () => void) => {
    if (!audioEnabled || !synthRef.current) {
      if (onEnd) onEnd();
      return;
    }

    if (recognitionRef.current && isListening) {
      try { recognitionRef.current.stop(); } catch (e) { }
    }

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (langCode === 'ar') utterance.lang = 'ar-SA';
    else utterance.lang = 'fr-FR';

    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };

    synthRef.current.speak(utterance);
  }, [audioEnabled, selectedLang, isListening]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error("Start error", e);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: text }]);
    setInputText("");
    setIsProcessing(true);

    try {
      const response = await generateHospitalResponse(text, selectedLang);

      // Update Chat
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);

      // Update Map
      if (response.destination) {
        setHighlightedLocation(response.destination);
      }

      speakText(response.text, selectedLang, () => {
        startListening();
      });
    } catch (error) {
      const errorMsg = "Désolé, une erreur est survenue.";
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
      speakText(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      try { recognitionRef.current.stop(); } catch (e) { }
    } else {
      synthRef.current.cancel();
      setIsSpeaking(false);
      startListening();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputText);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles size={24} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            AI Assistant
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-full p-1">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedLang === lang.code
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded-full transition-colors ${audioEnabled ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}
          >
            {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* Map Panel (Desktop: Left, Mobile: Hidden/Toggle - for now simplified as split) */}
        <div className="hidden md:block w-1/3 p-4 border-r border-slate-200 bg-slate-100/50">
          <HospitalMap highlightedLocationId={highlightedLocation} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth pb-32">
            <div className="max-w-3xl mx-auto w-full">
              {/* Mobile Map View (Only if highlighted) */}
              <div className="md:hidden mb-6 h-64">
                <HospitalMap highlightedLocationId={highlightedLocation} />
              </div>

              {messages.map((msg, idx) => (
                <ChatBubble key={idx} role={msg.role} text={msg.text} />
              ))}

              {isProcessing && (
                <div className="flex justify-start mb-6 animate-pulse">
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-3 rounded-2xl">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-10">
            <div className="max-w-3xl mx-auto w-full relative">

              {/* Voice Status Indicator */}
              {isListening && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-1 h-8">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1 bg-red-500 rounded-full animate-music-bar" style={{ height: Math.random() * 24 + 8 + 'px', animationDelay: i * 0.1 + 's' }}></div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Écoute en cours...</span>
                </div>
              )}

              <div className="bg-white rounded-3xl shadow-xl shadow-indigo-500/10 border border-slate-200 p-2 flex items-center gap-2">
                <button
                  onClick={toggleListening}
                  className={`
                  p-4 rounded-2xl transition-all duration-300 flex-shrink-0
                  ${isListening
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}
                `}
                >
                  {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-slate-400 px-2"
                  disabled={isListening}
                />

                <button
                  onClick={() => handleSend(inputText)}
                  disabled={!inputText.trim() || isProcessing}
                  className="p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={24} />
                </button>
              </div>

              <div className="text-center mt-3 text-xs text-slate-400 font-medium">
                Gemini 1.5 Pro • Supporte Français, Wolof & Arabe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}