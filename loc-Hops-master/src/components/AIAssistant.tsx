import { useState, useEffect, useRef } from "react";
import { Mic, ArrowLeft, Send, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Language } from "@/i18n/translations";
import { useTranslation } from "@/hooks/useTranslation";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useAIChat, ChatMessage } from "@/hooks/useAIChat";
import { useServices } from "@/contexts/ServicesContext";
import PageHeader from "./PageHeader";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface AIAssistantProps {
  language: Language;
  onNavigate: (screen: "welcome" | "services" | "map" | "ai") => void;
  onServiceSelect: (service: string) => void;
  onLanguageChange: (lang: Language) => void;
  isOverlay?: boolean;
  onClose?: () => void;
}

const AIAssistant = ({
  language,
  onNavigate,
  onServiceSelect,
  onLanguageChange,
  isOverlay = false,
  onClose,
}: AIAssistantProps) => {
  const { t } = useTranslation(language);
  const { services } = useServices();
  const [inputText, setInputText] = useState("");
  const [enableTTS, setEnableTTS] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice recorder hook
  const {
    isRecording,
    transcript,
    error: voiceError,
    startRecording,
    stopRecording,
    resetTranscript,
  } = useVoiceRecorder();

  // Text-to-speech hook
  const { isSpeaking, speak, stop: stopSpeaking } = useTextToSpeech();

  // AI Chat hook
  const {
    messages,
    isLoading,
    error: chatError,
    sendMessage,
  } = useAIChat(language, services);

  const translations = {
    fr: {
      title: "ASSISTANT IA",
      greeting: "Bonjour ! Je suis l'assistant virtuel de l'hôpital. Comment puis-je vous aider ?",
      instruction: "Touchez le microphone ou tapez votre question.",
      pushToTalk: "APPUYER POUR PARLER",
      listening: "J'ÉCOUTE...",
      thinking: "Je réfléchis...",
      placeholder: "Tapez votre question...",
      send: "Envoyer",
      suggestions: [
        "Où est la radiologie ?",
        "Je cherche les urgences",
        "Comment aller au laboratoire ?",
        "Où puis-je trouver la maternité ?"
      ],
    },
    en: {
      title: "AI ASSISTANT",
      greeting: "Hello! I am the hospital's virtual assistant. How can I help you?",
      instruction: "Touch the microphone or type your question.",
      pushToTalk: "PUSH TO TALK",
      listening: "LISTENING...",
      thinking: "Thinking...",
      placeholder: "Type your question...",
      send: "Send",
      suggestions: [
        "Where is radiology?",
        "I'm looking for the emergency room",
        "How do I get to the laboratory?",
        "Where can I find maternity?"
      ],
    },
    wo: {
      title: "NDIMBAL IA",
      greeting: "Salaamaalekum! Maa ngi tudd ndimbal bi. Lan laa la mën di dimbali?",
      instruction: "Tëral bouton bi ngir laaj sa laaj.",
      pushToTalk: "TËRAL NGIR WAX",
      listening: "DÉGG NAA...",
      thinking: "Maa ngi xalaat...",
      placeholder: "Bind sa laaj...",
      send: "Yónne",
      suggestions: [
        "Ana radiologie bi?",
        "Maa ngiy seet urgences yi",
        "Nan laa jëme ci laboratoire bi?",
        "Fan laa mën gise maternité?"
      ],
    },
    ar: {
      title: "مساعد الذكاء الاصطناعي",
      greeting: "مرحباً! أنا المساعد الافتراضي للمستشفى. كيف يمكنني مساعدتك؟",
      instruction: "اضغط على الميكروفون أو اكتب سؤالك.",
      pushToTalk: "اضغط للتحدث",
      listening: "أستمع...",
      thinking: "أفكر...",
      placeholder: "اكتب سؤالك...",
      send: "إرسال",
      suggestions: [
        "أين قسم الأشعة؟",
        "أبحث عن الطوارئ",
        "كيف أصل إلى المختبر؟",
        "أين يمكنني إيجاد قسم الولادة؟"
      ],
    },
  };

  const txt = translations[language];
  const langCode = language === "fr" ? "fr-FR" : language === "ar" ? "ar-SA" : language === "wo" ? "fr-SN" : "en-US";

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle voice transcript
  useEffect(() => {
    if (transcript && !isRecording) {
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [transcript, isRecording]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setInputText("");
    const response = await sendMessage(text);
    
    if (response) {
      // Speak the response if TTS is enabled
      if (enableTTS && response.message) {
        speak(response.message, langCode);
      }
      
      // If a service was identified, offer to navigate
      if (response.serviceInfo?.serviceId) {
        // Auto-navigate to the service on the map
        setTimeout(() => {
          onServiceSelect(response.serviceInfo!.serviceId);
          if (!isOverlay) {
            onNavigate("map");
          }
        }, 2000);
      }
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording(langCode);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };



  const renderSuggestions = () => (
    <div className="grid grid-cols-2 gap-2 p-4">
      {txt.suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          className="bg-card hover:bg-accent border border-border rounded-xl p-3 text-left text-sm transition-colors"
          disabled={isLoading}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );

  const renderInputBar = () => (
    <div className="p-4 border-t border-border bg-card/50">
      {/* Voice error */}
      {voiceError && (
        <p className="text-destructive text-xs mb-2">{voiceError}</p>
      )}
      {chatError && (
        <p className="text-destructive text-xs mb-2">{chatError}</p>
      )}
      
      <div className="flex items-center gap-2">
        {/* Microphone button */}
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="icon"
          className={`rounded-full w-12 h-12 flex-shrink-0 ${isRecording ? "animate-pulse" : ""}`}
          onClick={handleMicClick}
          disabled={isLoading}
        >
          <Mic className="w-5 h-5" />
        </Button>
        
        {/* Text input */}
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isRecording ? txt.listening : txt.placeholder}
          className="flex-1 rounded-full"
          disabled={isLoading || isRecording}
        />
        
        {/* Send button */}
        <Button
          variant="default"
          size="icon"
          className="rounded-full w-10 h-10 flex-shrink-0"
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim() || isLoading}
        >
          <Send className="w-4 h-4" />
        </Button>
        
        {/* TTS toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10 flex-shrink-0"
          onClick={() => {
            if (isSpeaking) stopSpeaking();
            setEnableTTS(!enableTTS);
          }}
        >
          {enableTTS ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );

  // Overlay mode (side panel)
  if (isOverlay) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <div className="flex items-center justify-center px-5 py-4 border-b border-border bg-card/50 relative">
          <button
            onClick={onClose}
            className="absolute left-3 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">{txt.title}</h2>
        </div>


        {/* Suggestions (only when no messages) */}
        {messages.length === 0 && renderSuggestions()}

        {/* Input bar */}
        {renderInputBar()}
      </div>
    );
  }

  // Full page mode
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title={txt.title}
        language={language}
        onBack={() => onNavigate("welcome")}
        onHome={() => onNavigate("welcome")}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Messages area */}
        <ScrollArea className="flex-1">
          
          {/* Large mic button when no messages */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="relative mb-8">
                <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center">
                  <button
                    className={`w-36 h-36 rounded-full bg-primary flex items-center justify-center cursor-pointer transition-transform shadow-lg ${
                      isRecording ? "scale-110 animate-pulse" : "hover:scale-105"
                    }`}
                    onClick={handleMicClick}
                    disabled={isLoading}
                  >
                    <Mic className="w-16 h-16 text-primary-foreground" />
                  </button>
                </div>
              </div>
              
              <p className="text-lg font-semibold text-center mb-4">
                {isRecording ? txt.listening : txt.pushToTalk}
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Suggestions (only when no messages) */}
        {messages.length === 0 && renderSuggestions()}

        {/* Input bar */}
        {renderInputBar()}
      </div>
    </div>
  );
};

export default AIAssistant;
