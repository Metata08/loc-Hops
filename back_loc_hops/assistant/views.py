import json
import re
import unicodedata

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Poi


def strip_accents(s: str) -> str:
    if not s:
        return ""
    return "".join(
        c for c in unicodedata.normalize("NFD", s)
        if unicodedata.category(c) != "Mn"
    )


def extract_query_from_message(message: str) -> str:
    msg = message.lower()

    # Expressions à enlever au début du message
    patterns_to_remove = [
        r"où est ", r"ou est ",
        r"où sont ", r"ou sont ",

        r"je cherche le service ",   # nouveau
        r"je cherche le ",           # plus général
        r"je cherche la ",           # plus général
        r"je cherche les ",          # plus général
        r"je cherche ",

        r"je veux aller au service ",   # nouveau
        r"je veux aller au ",           # nouveau
        r"je veux aller à ", r"je veux aller a ",

        r"je veux me rendre au service ",  # nouveau
        r"je veux me rendre au ",          # nouveau
        r"je veux me rendre à ", r"je veux me rendre a ",

        r"dirige[- ]?moi vers ",
        r"c'est où ", r"c est ou ",
        r"où se trouve ", r"ou se trouve ",
    ]
    for p in patterns_to_remove:
        msg = re.sub(p, "", msg)

    msg = msg.strip()

    # Suppression des articles au début
    msg = re.sub(r"^(la |le |les |l'|au |aux |du |des )", "", msg)

    # Nettoyage des ponctuations finales
    msg = msg.strip(" ?!.")

    print(f"[DEBUG] terme extrait = '{msg}'")
    return msg


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

        # On accepte les deux sens : "urgences" in "les urgences"
        # ou "les urgences" in "urgences"
        if target_norm and (target_norm in type_norm or type_norm in target_norm):
            print("[DEBUG] MATCH pour", type_db)
            return poi

    print("[DEBUG] Aucun match pour", name)
    return None


def find_poi_in_message(message: str):
    """
    Cherche un POI dont le type apparaît directement dans le message complet
    (en ignorant accents / casse).
    Exemple : message = 'je veux aller aux urgences'
              type_db = 'Urgences' → match
    """
    norm_msg = strip_accents(message.lower())

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


def build_reply(message: str):
    msg = message.lower()

    # Salutations
    if any(x in msg for x in ["bonjour", "salut", "salam", "wa alaykoum"]):
        return (
            "Bonjour, je suis l'assistant de localisation de l'hôpital. "
            "Comment puis je vous aider ?"
            ,
            None,
        )

    # Intention de localisation (toutes les phrases de guidage)
    if any(
        x in msg
        for x in [
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
    ):
        # 1) On essaie d'abord avec le terme extrait
        query = extract_query_from_message(message)
        if not query:
            return "Quel service ou quelle unité veux-tu trouver exactement ?", None

        poi = find_poi_by_name(query)

        # 2) Si rien trouvé, on essaie en cherchant le nom du service
        # directement dans tout le message
        if poi is None:
            poi = find_poi_in_message(message)

        if poi:
            # Info localisation (si tu veux la garder pour debug ou affichage futur)
            if poi.floor_id is not None:
                localisation = f"à l'étage {poi.floor_id}"
            else:
                localisation = "dans l'hôpital"

            extra = " C'est aussi un point d'entrée de l'hôpital." if poi.is_entry_point else ""

            # 🔴 Nouveau message adapté au QR code
            reply = (
                f"Pour se rendre au service {poi.type}, scannez le code QR suivant "
                f"pour avoir le chemin correspondant. Merci "
                
            )
            return reply, poi

        return (
            f"Le service  '{query}' n'existe pas dans cet hopital. "
            "Veuillez reVérifier le nom du service s'il vous plait",
            None,
        )

    # Par défaut
    return (
        "Je n'ai pas bien compris. Reformulez votre question s'il vous plait",
        None,
    )


@csrf_exempt  # simple pour commencer
def chat(request):
    """
    Endpoint : POST /api/assistant/chat/
    Body : { "message": "Où est la pédiatrie ?" }
    """
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON"}, status=400)

    message = data.get("message", "")
    print(f"[API] message reçu : {message!r}")

    reply, poi = build_reply(message)

    poi_data = None
    if poi is not None:
        poi_data = {
            "id": poi.id,
            "type": poi.type,
            "floor_id": poi.floor_id,
            "is_entry_point": poi.is_entry_point,
        }

    return JsonResponse(
        {
            "reply": reply,
            "poi": poi_data,
        }
    )
