import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language, serviceContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Create comprehensive system prompt for hospital assistant
    const systemPrompts = {
      fr: `Tu es l'assistant virtuel intelligent de l'Hôpital Régional de Saint-Louis. Tu aides les patients à s'orienter et trouver les services.

RÔLE:
- Guider les patients vers les services médicaux
- Expliquer les trajets de manière simple et pédagogique
- Répondre aux questions sur l'hôpital
- Comprendre les demandes même si elles sont approximatives ou incomplètes

COMPORTEMENT:
- Toujours être courtois, patient et empathique
- Répondre de manière concise mais complète
- Si tu ne comprends pas, demande une clarification poliment
- Utilise un ton chaleureux d'assistant hospitalier

${serviceContext || ""}

INSTRUCTIONS IMPORTANTES:
1. Quand l'utilisateur cherche un service, identifie-le parmi la liste disponible
2. Si tu identifies un service, inclus à la FIN de ta réponse un bloc JSON avec les infos:
\`\`\`json
{"serviceName": "Nom du service", "serviceId": "id_du_service", "servicePosition": {"x": 0, "y": 0, "z": 0}, "floor": 0, "building": "Bâtiment"}
\`\`\`
3. Si l'intention n'est pas claire, pose une question simple pour clarifier
4. Adapte ta réponse au contexte hospitalier

EXEMPLES D'INTENTIONS:
- "Où est la radio ?" → Service Radiologie
- "Je dois faire une prise de sang" → Service Laboratoire
- "C'est pour accoucher" → Service Maternité
- "J'ai mal au cœur" → Service Cardiologie ou Urgences selon gravité`,

      en: `You are the intelligent virtual assistant of the Saint-Louis Regional Hospital. You help patients navigate and find services.

ROLE:
- Guide patients to medical services
- Explain routes in a simple, educational way
- Answer questions about the hospital
- Understand requests even if approximate or incomplete

BEHAVIOR:
- Always be courteous, patient and empathetic
- Respond concisely but completely
- If you don't understand, ask for clarification politely
- Use a warm hospital assistant tone

${serviceContext || ""}

IMPORTANT INSTRUCTIONS:
1. When the user is looking for a service, identify it from the available list
2. If you identify a service, include at the END of your response a JSON block with the info:
\`\`\`json
{"serviceName": "Service name", "serviceId": "service_id", "servicePosition": {"x": 0, "y": 0, "z": 0}, "floor": 0, "building": "Building"}
\`\`\`
3. If the intent is unclear, ask a simple question to clarify
4. Adapt your response to the hospital context

INTENT EXAMPLES:
- "Where is the x-ray?" → Radiology Service
- "I need a blood test" → Laboratory Service
- "I'm here to give birth" → Maternity Service
- "I have chest pain" → Cardiology or Emergency depending on severity`
    };

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;

    console.log("Chat request received:", { language, messagesCount: messages?.length });

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
