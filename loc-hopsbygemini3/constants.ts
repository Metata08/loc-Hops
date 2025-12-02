// Simulation of the RAG Knowledge Base
export const HOSPITAL_CONTEXT = `
DONNÉES DE L'HÔPITAL LOC-HOPS (SÉNÉGAL):

1. LOCALISATION DES SERVICES:
- Accueil / Admissions : Rez-de-chaussée, Hall Principal (Entrée Mermoz).
- Urgences : Rez-de-chaussée, Aile Ouest.
- Radiologie / Imagerie : 1er Étage, Couloir Bleu.
- Laboratoire d'Analyses : 1er Étage, face aux ascenseurs.
- Maternité : 2ème Étage, Aile Est (Zone Calme).
- Pédiatrie : 2ème Étage, Décoration "Savane".
- Cardiologie : 3ème Étage.
- Neurologie : 4ème Étage.
- Mosquée / Salle de prière : Rez-de-chaussée, près du jardin intérieur.

2. HORAIRES:
- Urgences : 24h/24 et 7j/7.
- Visites : 12h00 - 21h00 (Restrictions possibles selon service).
- Cafétéria "Teranga" : 7h00 - 20h00.
`;

export const LOCATIONS = {
    accueil: { id: 'accueil', label: 'Accueil', floor: 'RDC', color: 'bg-blue-500' },
    urgences: { id: 'urgences', label: 'Urgences', floor: 'RDC', color: 'bg-red-500' },
    radiologie: { id: 'radiologie', label: 'Radiologie', floor: '1er Étage', color: 'bg-indigo-500' },
    laboratoire: { id: 'laboratoire', label: 'Laboratoire', floor: '1er Étage', color: 'bg-green-500' },
    maternite: { id: 'maternite', label: 'Maternité', floor: '2ème Étage', color: 'bg-pink-500' },
    pediatrie: { id: 'pediatrie', label: 'Pédiatrie', floor: '2ème Étage', color: 'bg-orange-500' },
    cardiologie: { id: 'cardiologie', label: 'Cardiologie', floor: '3ème Étage', color: 'bg-red-700' },
    neurologie: { id: 'neurologie', label: 'Neurologie', floor: '4ème Étage', color: 'bg-purple-600' },
    mosquee: { id: 'mosquee', label: 'Mosquée', floor: 'RDC', color: 'bg-emerald-600' },
    cafeteria: { id: 'cafeteria', label: 'Cafétéria', floor: 'RDC', color: 'bg-yellow-600' },
};

export const SYSTEM_INSTRUCTION = `
Tu es un assistant virtuel intelligent de l'hôpital Loc-Hops.
Ton objectif est d'aider l'utilisateur de manière précise et naturelle.

RÈGLES:
1. Tu parles couramment Français, Wolof et Arabe. Adapte-toi à la langue de l'utilisateur.
2. Tes réponses doivent être concises et claires (optimisées pour la synthèse vocale).
3. Utilise le CONTEXTE fourni pour orienter les gens.
4. Si on te demande une localisation, sois précis.
5. FORMAT DE RÉPONSE JSON OBLIGATOIRE :
   Tu dois TOUJOURS répondre au format JSON strict suivant :
   {
     "text": "Ta réponse textuelle ici (courte)",
     "destination": "id_de_la_destination_si_pertinent" (ex: "radiologie", "accueil", ou null)
   }

CONTEXTE:
${HOSPITAL_CONTEXT}
`;