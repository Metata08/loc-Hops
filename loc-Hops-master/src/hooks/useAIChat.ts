import { useState, useCallback } from "react";
import { Language } from "@/i18n/translations";
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
  services: GLBService[]
): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Petit helper pour normaliser les noms (sans accents / en minuscule)
  const normalize = (s: string | undefined | null) =>
    (s || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

  const sendMessage = useCallback(
    async (userMessage: string): Promise<AIResponse | null> => {
      if (!userMessage.trim()) return null;

      setIsLoading(true);
      setError(null);

      const userChatMessage: ChatMessage = { role: "user", content: userMessage };
      setMessages((prev) => [...prev, userChatMessage]);

      try {
        // 👉 Appel à ton backend Django
        const response = await fetch(
          "http://127.0.0.1:8000/api/assistant/chat/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: userMessage,
              language, // si tu veux l’utiliser côté Django plus tard
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erreur de communication avec l'assistant (HTTP ${response.status})`
          );
        }

        const data = await response.json() as {
          reply: string;
          poi?: {
            id: number;
            type: string;
            floor_id?: number | null;
            is_entry_point?: boolean;
          } | null;
        };

        const cleanedMessage = data.reply || "";

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: cleanedMessage,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        let serviceInfo: ServiceInfo | undefined;

        // 👉 Si Django a trouvé un POI, on essaie de le mapper à un GLBService
        if (data.poi) {
          const poiTypeNorm = normalize(data.poi.type);

          // 1) Essayer de trouver un service dont le nom == type du POI
          let matched = services.find(
            (s) => normalize(s.name) === poiTypeNorm
          );

          // 2) Sinon, essayer "contains"
          if (!matched) {
            matched = services.find((s) =>
              normalize(s.name).includes(poiTypeNorm) ||
              poiTypeNorm.includes(normalize(s.name))
            );
          }

          if (matched) {
            serviceInfo = {
              serviceName: matched.name,
              serviceId: String(matched.id),
              servicePosition: {
                x: matched.position[0],
                y: matched.position[1],
                z: matched.position[2],
              },
              floor: matched.floor,
              building: matched.building,
            };
          } else {
            // Fallback : utiliser l'id du POI seulement (pas de position 3D connue)
            serviceInfo = {
              serviceName: data.poi.type,
              serviceId: String(data.poi.id),
              servicePosition: { x: 0, y: 0, z: 0 },
              floor: data.poi.floor_id ?? undefined,
              building: undefined,
            };
          }
        }

        return {
          message: cleanedMessage,
          serviceInfo,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erreur inconnue";
        setError(errorMessage);
        console.error("❌ Erreur chat IA:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [language, services, messages]
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
