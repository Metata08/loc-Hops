import { Language } from "@/i18n/translations";
import { sendMessage as apiSendMessage } from "@/lib/api";
import { useCallback, useState } from "react";
import { GLBService } from "./useGLBServices";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ServiceInfo {
  serviceName: string;
  serviceId: string;
  servicePosition: { x: number; y: number; z: number };
  floor?: number;
  building?: string;
}

export interface AIResponse {
  message: string;
  serviceInfo?: ServiceInfo;
}

interface UseAIChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (userMessage: string) => Promise<AIResponse | null>;
  clearMessages: () => void;
}

export function useAIChat(
  language: Language,
  services: GLBService[] // Kept for signature compatibility, but unused
): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (userMessage: string): Promise<AIResponse | null> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (!userMessage.trim()) return null;

      setIsLoading(true);
      setError(null);

      const userChatMessage: ChatMessage = { role: "user", content: userMessage };
      setMessages((prev) => [...prev, userChatMessage]);

      try {
        const response = await apiSendMessage(userMessage, language);

        let serviceInfo: ServiceInfo | undefined;
        if (response.poi) {
          // Map backend POI to frontend ServiceInfo
          // The backend returns coordinates now
          const coords = (response.poi as any).coordinates || { x: 0, y: 0, z: 0 };

          serviceInfo = {
            serviceName: response.poi.type,
            serviceId: response.poi.id.toString(), // Convert to string as expected by ServiceInfo
            servicePosition: {
              x: coords.x,
              y: coords.y,
              z: coords.z
            },
            floor: response.poi.floor_id || undefined,
            building: undefined // Backend doesn't send building info yet
          };
        }

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: response.reply,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        return {
          message: response.reply,
          serviceInfo,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        setError(errorMessage);
        console.error("❌ Erreur chat IA:", err);
        return null; // Return null on error so UI handles it gracefully
      } finally {
        setIsLoading(false);
      }
    },
    [language]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}

