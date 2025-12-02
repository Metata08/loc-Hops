import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export interface GeminiResponse {
  text: string;
  destination: string | null;
}

export const generateHospitalResponse = async (userPrompt: string, language: 'fr' | 'wo' | 'ar'): Promise<GeminiResponse> => {
  try {
    const ai = getAiClient();

    // Add language instruction to the prompt
    let langInstruction = "";
    switch (language) {
      case 'wo': langInstruction = "Réponds en Wolof si possible, ou en Français simple."; break;
      case 'ar': langInstruction = "Réponds en Arabe."; break;
      default: langInstruction = "Réponds en Français."; break;
    }

    const fullPrompt = `${langInstruction} Question utilisateur: "${userPrompt}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // Switched to Flash model
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
        responseMimeType: "application/json", // Required for Map
      },
    });

    const text = response.text;

    if (!text) {
      return { text: "Désolé, je n'ai pas compris.", destination: null };
    }

    try {
      const jsonResponse = JSON.parse(text);
      return {
        text: jsonResponse.text || "Erreur de format.",
        destination: jsonResponse.destination || null
      };
    } catch (e) {
      console.error("JSON Parse Error", e);
      return { text: text, destination: null };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Service indisponible (Vérifiez la clé API).", destination: null };
  }
};