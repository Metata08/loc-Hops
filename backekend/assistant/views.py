import json
import re
import unicodedata

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from core.models import Poi


def strip_accents(s: str) -> str:
    if not s:
        return ""
    return "".join(
        c for c in unicodedata.normalize("NFD", s)
        if unicodedata.category(c) != "Mn"
    )


def extract_query_from_message(message: str, language: str = "fr") -> str:
    """
    Extrait le nom du service à partir d'une phrase utilisateur.
    Gère des tournures FR et EN.
    """
    msg = message.lower()

    # Expressions à enlever au début du message
    patterns_fr = [
        r"où est ", r"ou est ",
        r"où sont ", r"ou sont ",

        r"je cherche le service ",
        r"je cherche le ",
        r"je cherche la ",
        r"je cherche les ",
        r"je cherche ",

        r"je veux aller au service ",
        r"je veux aller au ",
        r"je veux aller à ", r"je veux aller a ",

        r"je veux me rendre au service ",
        r"je veux me rendre au ",
        r"je veux me rendre à ", r"je veux me rendre a ",

        r"dirige[- ]?moi vers ",
        r"c'est où ", r"c est ou ",
        r"où se trouve ", r"ou se trouve ",
    ]

    patterns_en = [
        r"where is ",
        r"where are ",
        r"i am looking for ",
        r"i'm looking for ",
        r"take me to ",
        r"guide me to ",
        r"how do i get to ",
        r"how can i get to ",
        r"how can i go to ",
        r"where can i find ",
    ]

    # On enlève TOUS les patterns FR + EN
    for p in (patterns_fr + patterns_en):
        msg = re.sub(p, "", msg)

    msg = msg.strip()

    # Suppression des articles au début (FR + EN)
    msg = re.sub(
        r"^(la |le |les |l'|au |aux |du |des |the |a |an )",
        "",
        msg,
    )

    # Nettoyage des ponctuations finales
    msg = msg.strip(" ?!.")

    print(f"[DEBUG] terme extrait = '{msg}'")
    return msg


def translate_service_term(term: str, language: str = "fr") -> str:
    """
    Traduit / normalise certains noms de services anglais
    vers les labels utilisés dans la base (souvent en français).
    """
    norm = strip_accents(term.lower().strip())
    if language.lower() == "en":
        # 🧠 À ADAPTER selon les vrais noms dans ta base (poi.type)
        mapping = {
            # urgences
            "emergency": "urgences",
            "emergencies": "urgences",
            "emergency room": "urgences",
            "er": "urgences",

            # radiologie
            "radiology": "radiologie",
            "xray": "radiologie",
            "x-ray": "radiologie",
            "x ray": "radiologie",

            # laboratoire
            "lab": "laboratoire",
            "laboratory": "laboratoire",
            "blood test": "laboratoire",

            # maternité
            "maternity": "maternité",
            "delivery room": "maternité",

            # pharmacie
            "pharmacy": "pharmacie",
            "drugstore": "pharmacie",

            # pédiatrie
            "pediatrics": "pédiatrie",
            "pediatric": "pédiatrie",
            "children ward": "pédiatrie",

            # accueil
            "reception": "accueil",
            "information desk": "accueil",
        }

        for key, val in mapping.items():
            if key in norm:
                print(f"[DEBUG] traduction service '{norm}' -> '{val}'")
                return val

    # par défaut, on renvoie le terme original
    return term


def find_poi_by_name(name: str):
    """
    Recherche dans la table poi en ignorant accents / casse.
    Retourne un objet Poi ou None.
    Stratégie : on accepte que la requête contienne des mots en plus,
    ou que le type du POI soit contenu dans la requête.
    """
    target_norm = strip_accents(name.lower().strip())
    print(f"[DEBUG] target_norm = '{target_norm}'")

    pois = Poi.objects.all()
    print(f"[DEBUG] nb POI : {pois.count()}")

    for poi in pois:
        type_db = poi.type or ""
        type_norm = strip_accents(type_db.lower()).strip()

        if not type_norm:
            continue

        print(f"[DEBUG] compare '{target_norm}' avec '{type_norm}'")

        # "urgences" in "les urgences" ou "les urgences" in "urgences"
        if target_norm and (target_norm in type_norm or type_norm in target_norm):
            print("[DEBUG] MATCH pour", type_db)
            return poi

    print("[DEBUG] Aucun match pour", name)
    return None


def find_poi_in_message(message: str, language: str = "fr"):
    """
    Cherche un POI dont le type apparaît directement dans le message complet
    (en ignorant accents / casse).
    Pour l'anglais, on peut aussi traduire certains mots clés dans le message.
    """
    norm_msg = strip_accents(message.lower())

    # Si anglais, on remplace quelques termes dans le message
    if language.lower() == "en":
        norm_msg = norm_msg.replace("emergency room", "urgences")
        norm_msg = norm_msg.replace("emergency", "urgences")
        norm_msg = norm_msg.replace("er", "urgences")
        norm_msg = norm_msg.replace("radiology", "radiologie")
        norm_msg = norm_msg.replace("lab", "laboratoire")
        norm_msg = norm_msg.replace("laboratory", "laboratoire")
        norm_msg = norm_msg.replace("maternity", "maternité")
        norm_msg = norm_msg.replace("pharmacy", "pharmacie")
        norm_msg = norm_msg.replace("pediatrics", "pédiatrie")
        norm_msg = norm_msg.replace("children ward", "pédiatrie")
        norm_msg = norm_msg.replace("reception", "accueil")

    for poi in Poi.objects.all():
        type_db = poi.type or ""
        type_norm = strip_accents(type_db.lower()).strip()

        if not type_norm:
            continue

        if type_norm in norm_msg:
            print("[DEBUG] MATCH dans message pour", type_db)
            return poi

    print("[DEBUG] Aucun POI trouvé dans le message complet")
    return None


def build_reply(message: str, language: str = "fr"):
    """
    Construit la réponse en fonction du message et de la langue ("fr" ou "en").
    """
    lang = language.lower()
    if lang not in ("fr", "en"):
        lang = "fr"  # fallback

    msg = message.lower()

    # ---------- Salutations ----------
    greetings_fr = ["bonjour", "salut", "salam", "wa alaykoum"]
    greetings_en = ["hello", "hi", "good morning", "good afternoon", "good evening"]

    if any(x in msg for x in greetings_fr + greetings_en):
        if lang == "en":
            return (
                "Hello, I am the hospital's navigation assistant. "
                "How can I help you?",
                None,
            )
        else:
            return (
                "Bonjour, je suis l'assistant de localisation de l'hôpital. "
                "Comment puis-je vous aider ?",
                None,
            )

    # ---------- Intentions de localisation ----------
    location_triggers_fr = [
        "où est", "ou est",
        "où sont", "ou sont",
        "je cherche le service",
        "je cherche le",
        "je cherche la",
        "je cherche les",
        "je cherche",
        "je veux aller au service",
        "je veux aller au",
        "je veux aller à", "je veux aller a",
        "je veux me rendre au service",
        "je veux me rendre au",
        "je veux me rendre à", "je veux me rendre a",
        "c'est où", "c est ou",
        "où se trouve", "ou se trouve",
        "dirige-moi vers", "dirige moi vers",
    ]

    location_triggers_en = [
        "where is",
        "where are",
        "i am looking for",
        "i'm looking for",
        "take me to",
        "guide me to",
        "how do i get to",
        "how can i get to",
        "how can i go to",
        "where can i find",
    ]

    if any(x in msg for x in (location_triggers_fr + location_triggers_en)):
        # 1) On extrait le terme
        raw_query = extract_query_from_message(message, lang)
        # 2) On traduit si besoin (emergency -> urgences, etc.)
        query = translate_service_term(raw_query, lang)

        print(f"[DEBUG] raw_query='{raw_query}', query_apres_traduction='{query}'")

        if not query:
            if lang == "en":
                return "Which service or unit would you like to find?", None
            else:
                return "Quel service ou quelle unité souhaitez-vous trouver exactement ?", None

        poi = find_poi_by_name(query)

        # 3) Si rien trouvé, on essaie en cherchant directement dans tout le message
        if poi is None:
            poi = find_poi_in_message(message, lang)

        if poi:
            if poi.floor_id is not None:
                localisation_fr = f"à l'étage {poi.floor_id}"
                localisation_en = f"on floor {poi.floor_id}"
            else:
                localisation_fr = "dans l'hôpital"
                localisation_en = "inside the hospital"

            extra_fr = " C'est aussi un point d'entrée de l'hôpital." if poi.is_entry_point else ""
            extra_en = " It is also a main entrance of the hospital." if poi.is_entry_point else ""

            if lang == "en":
                reply = (
                    f"To reach the {poi.type} service, please scan the QR code to get the corresponding path. "
                    f"The service is {localisation_en}.{extra_en}"
                )
            else:
                reply = (
                    f"Pour se rendre au service {poi.type}, scannez le code QR suivant "
                    f"pour avoir le chemin correspondant. Le service se trouve {localisation_fr}.{extra_fr}"
                )

            return reply, poi

        # Aucun service trouvé
        if lang == "en":
            return (
                f"The service '{raw_query}' does not exist in this hospital. "
                "Please check the service name.",
                None,
            )
        else:
            return (
                f"Le service '{raw_query}' n'existe pas dans cet hôpital. "
                "Veuillez vérifier le nom du service s'il vous plaît.",
                None,
            )

    # ---------- Par défaut ----------
    if lang == "en":
        return (
            "I did not understand. Please rephrase your question.",
            None,
        )
    else:
        return (
            "Je n'ai pas bien compris. Reformulez votre question s'il vous plaît.",
            None,
        )


@csrf_exempt
def chat(request):
    """
    Endpoint : POST /api/assistant/chat/
    Body : { "message": "...", "language": "fr" | "en" }
    """
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON"}, status=400)

    message = data.get("message", "")
    language = data.get("language", "fr")

    print(f"[API] message reçu : {message!r} (lang={language})")

    reply, poi = build_reply(message, language)

    poi_data = None
    if poi is not None:
        poi_data = {
            "id": poi.id,
            "type": poi.type,
            "floor_id": poi.floor_id,
            "is_entry_point": poi.is_entry_point,
            "coordinates": {
                "x": poi.geom.x,
                "y": poi.geom.y,
                "z": poi.geom.z if hasattr(poi.geom, 'z') else 0
            }
        }

    return JsonResponse(
        {
            "reply": reply,
            "poi": poi_data,
        }
    )
