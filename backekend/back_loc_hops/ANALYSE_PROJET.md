# 📊 Analyse du Projet LocHops - Backend Django

**Date d'analyse:** 11 Décembre 2025  
**Projet:** LocHops - Assistant de Navigation Hospitalière  
**Framework:** Django 6.0

---

## 🎯 Vue d'ensemble du projet

**LocHops** est un système backend Django conçu pour fournir un assistant de navigation intelligent dans un environnement hospitalier. Le système permet aux utilisateurs de localiser des services hospitaliers via une interface conversationnelle multilingue (français/anglais).

---

## 📁 Structure du Projet

```
back_loc_hops/
├── back_loc_hops/          # Configuration principale du projet Django
│   ├── __init__.py
│   ├── settings.py         # Configuration Django
│   ├── urls.py             # Routes principales
│   ├── wsgi.py             # Configuration WSGI
│   └── asgi.py             # Configuration ASGI
├── assistant/              # Application principale
│   ├── __init__.py
│   ├── models.py           # Modèle POI (Point of Interest)
│   ├── views.py            # Logique métier et endpoints API
│   ├── urls.py             # Routes de l'application
│   ├── admin.py
│   ├── apps.py
│   └── tests.py
├── manage.py               # Utilitaire de gestion Django
└── db.sqlite3              # Base de données SQLite (dev)
```

---

## 🗄️ Architecture de la Base de Données

### Configuration actuelle

**Type:** PostgreSQL  
**Nom de la base:** `loc_hops`  
**Utilisateur:** `postgres`  
**Mot de passe:** `lala@postgres`  
**Hôte:** `localhost`  
**Port:** `5432`

### Modèle de données

#### Table `poi` (Point of Interest)

| Champ           | Type         | Description                              |
|-----------------|--------------|------------------------------------------|
| `id`            | AutoField    | Clé primaire                             |
| `type`          | CharField    | Type/nom du service (ex: "urgences")     |
| `is_entry_point`| BooleanField | Indique si c'est un point d'entrée       |
| `geom`          | TextField    | Géométrie (coordonnées spatiales)        |
| `floor_id`      | IntegerField | Numéro d'étage                           |

**Note:** Le modèle est configuré avec `managed = False`, ce qui signifie que Django ne gère pas la création/modification de cette table (elle existe déjà dans la base).

---

## 🔌 API Endpoints

### 1. **Chat Assistant** 
**Endpoint:** `POST /api/assistant/chat/`

**Description:** Endpoint principal pour l'interaction conversationnelle avec l'assistant.

**Request Body:**
```json
{
  "message": "Où est le service des urgences ?",
  "language": "fr"  // "fr" ou "en"
}
```

**Response:**
```json
{
  "reply": "Pour se rendre au service urgences, scannez le code QR...",
  "poi": {
    "id": 1,
    "type": "urgences",
    "floor_id": 0,
    "is_entry_point": true
  }
}
```

---

## 🧠 Fonctionnalités Intelligentes

### 1. **Traitement du Langage Naturel**

Le système comprend plusieurs formulations pour localiser un service:

**Français:**
- "Où est le service des urgences ?"
- "Je cherche la radiologie"
- "Je veux aller au laboratoire"
- "Dirige-moi vers la pharmacie"

**Anglais:**
- "Where is the emergency room?"
- "I'm looking for radiology"
- "Take me to the lab"
- "How can I get to the pharmacy?"

### 2. **Normalisation et Correspondance**

- **Suppression des accents:** Permet de matcher "urgences" avec "urgénces"
- **Insensibilité à la casse:** "URGENCES" = "urgences"
- **Correspondance partielle:** "urgences" trouvé dans "service des urgences"

### 3. **Traduction Automatique**

Le système traduit automatiquement les termes anglais vers les noms français utilisés dans la base:

| Anglais           | Français    |
|-------------------|-------------|
| emergency / ER    | urgences    |
| radiology / x-ray | radiologie  |
| lab / laboratory  | laboratoire |
| maternity         | maternité   |
| pharmacy          | pharmacie   |
| pediatrics        | pédiatrie   |
| reception         | accueil     |

### 4. **Gestion des Salutations**

Le système reconnaît et répond aux salutations:
- FR: "bonjour", "salut", "salam"
- EN: "hello", "hi", "good morning"

---

## ⚙️ Configuration Django

### Applications installées

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'assistant',          # Application principale
    'corsheaders',        # Gestion CORS pour API
]
```

### CORS (Cross-Origin Resource Sharing)

```python
CORS_ALLOW_ALL_ORIGINS = True
```

**⚠️ Attention:** Cette configuration est permissive et convient au développement. En production, il faudra restreindre les origines autorisées.

### Middleware

Le middleware CORS est correctement configuré pour permettre les requêtes cross-origin depuis le frontend.

---

## 🔍 Algorithme de Recherche

### Stratégie de recherche en 2 étapes:

1. **Extraction du terme:**
   - Suppression des patterns de question ("où est", "where is", etc.)
   - Suppression des articles ("le", "la", "the", etc.)
   - Nettoyage de la ponctuation

2. **Recherche du POI:**
   - **Étape 1:** Recherche par nom exact (avec normalisation)
   - **Étape 2:** Si échec, recherche dans le message complet
   - **Correspondance:** Utilise une logique de sous-chaîne bidirectionnelle

### Exemple de flux:

```
Input: "Où est le service des urgences ?"
  ↓
Extraction: "urgences"
  ↓
Normalisation: "urgences" (sans accents, minuscules)
  ↓
Recherche dans POI.type
  ↓
Match trouvé: POI(type="urgences", floor_id=0)
  ↓
Réponse générée avec localisation
```

---

## 🚀 Points Forts

1. ✅ **Multilingue:** Support FR/EN avec traduction automatique
2. ✅ **Robuste:** Gestion des accents, casse, variations
3. ✅ **Flexible:** Comprend plusieurs formulations
4. ✅ **API REST:** Architecture moderne et scalable
5. ✅ **CORS configuré:** Prêt pour intégration frontend
6. ✅ **Debugging:** Logs détaillés pour le développement

---

## ⚠️ Points d'Attention

### 1. **Dépendances manquantes**

Le projet n'a pas de fichier `requirements.txt`. Les dépendances nécessaires sont:

```txt
Django>=6.0
psycopg2-binary>=2.9
django-cors-headers>=4.0
```

### 2. **Base de données**

- La configuration pointe vers PostgreSQL mais `db.sqlite3` existe aussi
- Vérifier que PostgreSQL est installé et que la base `loc_hops` existe
- Vérifier que la table `poi` est créée et peuplée

### 3. **Sécurité**

- `SECRET_KEY` exposée dans le code (à changer en production)
- `DEBUG = True` (à désactiver en production)
- `CORS_ALLOW_ALL_ORIGINS = True` (à restreindre en production)
- Mot de passe DB dans le code (utiliser variables d'environnement)

### 4. **Migrations**

Le modèle `Poi` est en mode `managed = False`, donc:
- Django ne créera pas la table automatiquement
- Les migrations Django ne s'appliquent pas à cette table
- La table doit exister dans la base avant de lancer l'application

---

## 📋 Checklist de Démarrage

### Prérequis

- [ ] Python 3.12+ installé
- [ ] PostgreSQL installé et en cours d'exécution
- [ ] Base de données `loc_hops` créée
- [ ] Table `poi` créée et peuplée
- [ ] Environnement virtuel Python créé

### Installation

```bash
# 1. Créer un environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# 2. Installer les dépendances
pip install Django psycopg2-binary django-cors-headers

# 3. Vérifier la connexion à la base
python manage.py dbshell

# 4. Appliquer les migrations (pour les tables Django natives)
python manage.py migrate

# 5. Créer un superutilisateur (optionnel)
python manage.py createsuperuser

# 6. Lancer le serveur de développement
python manage.py runserver
```

### Vérification

```bash
# Tester l'endpoint
curl -X POST http://localhost:8000/api/assistant/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour", "language": "fr"}'
```

---

## 🔧 Commandes Utiles

```bash
# Vérifier la configuration
python manage.py check

# Lister les migrations
python manage.py showmigrations

# Accéder au shell Django
python manage.py shell

# Tester les POIs
python manage.py shell
>>> from assistant.models import Poi
>>> Poi.objects.all()

# Créer un fichier requirements.txt
pip freeze > requirements.txt
```

---

## 🎯 Recommandations

### Court terme

1. **Créer `requirements.txt`** pour faciliter l'installation
2. **Vérifier la connexion PostgreSQL** et la présence des données
3. **Tester tous les endpoints** avec différents scénarios
4. **Ajouter des tests unitaires** pour les fonctions critiques

### Moyen terme

1. **Ajouter l'authentification** si nécessaire
2. **Implémenter le logging** en production
3. **Créer une documentation API** (Swagger/OpenAPI)
4. **Ajouter la validation des données** avec serializers DRF

### Long terme

1. **Migrer vers Django REST Framework** pour une API plus robuste
2. **Implémenter un cache** (Redis) pour les recherches fréquentes
3. **Ajouter des tests d'intégration** et CI/CD
4. **Optimiser les requêtes** avec select_related/prefetch_related
5. **Internationalisation complète** avec Django i18n

---

## 📞 Support et Documentation

- **Django Documentation:** https://docs.djangoproject.com/
- **Django REST Framework:** https://www.django-rest-framework.org/
- **PostgreSQL:** https://www.postgresql.org/docs/
- **CORS Headers:** https://github.com/adamchainz/django-cors-headers

---

## 📝 Notes de Version

**Version actuelle:** 1.0.0 (Développement)

**Fonctionnalités implémentées:**
- ✅ Chat conversationnel FR/EN
- ✅ Recherche de POI par nom
- ✅ Normalisation et traduction
- ✅ Gestion des salutations
- ✅ API REST avec CORS

**À venir:**
- ⏳ Navigation avec pgRouting
- ⏳ Génération de QR codes
- ⏳ Visualisation 3D des chemins
- ⏳ Historique des conversations

---

**Analysé par:** Antigravity AI  
**Contact:** Pour toute question sur cette analyse
