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

  const buildServiceContext = useCallback(() => {
    if (services.length === 0) return "";

    const serviceList = services
      .slice(0, 20) // Limit to avoid token overflow
      .map((s) => {
        const floor = s.floor !== undefined ? `Étage ${s.floor}` : "";
        const building = s.building || "";
        const pos = `(${s.position[0].toFixed(1)}, ${s.position[1].toFixed(1)}, ${s.position[2].toFixed(1)})`;
        return `- ${s.name} (ID: ${s.id}): Position ${pos}, ${floor} ${building}`.trim();
      })
      .join("\n");

    return `
SERVICES DISPONIBLES DANS L'HÔPITAL:
${serviceList}
`;
  }, [services]);

  const sendMessage = useCallback(
    async (userMessage: string): Promise<AIResponse | null> => {
      if (!userMessage.trim()) return null;

      setIsLoading(true);
      setError(null);

      const userChatMessage: ChatMessage = { role: "user", content: userMessage };
      setMessages((prev) => [...prev, userChatMessage]);

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        const response = await fetch(`${supabaseUrl}/functions/v1/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            messages: [
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: userMessage },
            ],
            language,
            serviceContext: buildServiceContext(),
          }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("Limite de requêtes dépassée. Réessayez dans un moment.");
          }
          if (response.status === 402) {
            throw new Error("Crédit IA épuisé.");
          }
          throw new Error("Erreur de communication avec l'assistant.");
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) throw new Error("Pas de réponse");

        const decoder = new TextDecoder();
        let fullResponse = "";
        let textBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          textBuffer += decoder.decode(value, { stream: true });

          // Process line by line
          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                fullResponse += content;
              }
            } catch {
              // Incomplete JSON, continue
            }
          }
        }

        // Parse response for service info
        let serviceInfo: ServiceInfo | undefined;
        const jsonMatch = fullResponse.match(/```json\n?([\s\S]*?)\n?```/);
        let cleanedMessage = fullResponse;

        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[1]);
            if (parsed.serviceId || parsed.serviceName) {
              serviceInfo = {
                serviceName: parsed.serviceName || "",
                serviceId: parsed.serviceId || "",
                servicePosition: parsed.servicePosition || { x: 0, y: 0, z: 0 },
                floor: parsed.floor,
                building: parsed.building,
              };
            }
            // Remove JSON block from displayed message
            cleanedMessage = fullResponse.replace(/```json[\s\S]*?```/g, "").trim();
          } catch (e) {
            console.log("Pas de JSON service dans la réponse");
          }
        }

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: cleanedMessage,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        return {
          message: cleanedMessage,
          serviceInfo,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        setError(errorMessage);
        console.error("❌ Erreur chat IA:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [messages, language, buildServiceContext]
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
