# Analyse de la Structure du Projet LocHops

## 📋 Vue d'ensemble

**LocHops** est une application complète de navigation hospitalière intelligente qui combine :
- Un backend Django REST Framework avec PostGIS
- Un frontend React + TypeScript avec Vite
- Une visualisation 3D interactive
- Un système de navigation multilingue
- Une intégration d'IA assistante

---

## 🏗️ Architecture Globale

```
backekend/
├── core/                       # Application Django principale
├── lochops_backend/            # Configuration Django
├── lochops_front/              # Application React/TypeScript
├── DalalJam.glb                # Modèle 3D de l'hôpital
├── schema.sql                  # Schéma de base de données
├── navigation_functions.sql    # Fonctions pgRouting
├── export_hopital_complet.sql  # Export des données
└── diagrammeDe Classe.jpeg     # Diagramme de classes
```

---

## 🔧 Backend Django

### Structure des fichiers

```
core/
├── models.py          # 12 modèles Django (Hospital, Building, Floor, etc.)
├── views.py           # 13 ViewSets REST API
├── serializers.py     # Sérialiseurs pour l'API
├── urls.py            # Routes API
├── admin.py           # Interface d'administration
└── tests_navigation.py # Tests de navigation
```

### Modèles de données (12 modèles)

1. **Hospital** - Entité hôpital principale
   - `id`, `name`, `address`, `boundary` (Polygon)

2. **Building** - Bâtiments de l'hôpital
   - `id`, `code`, `default_name`, `footprint` (Polygon)
   - Relation: `hospital` (FK vers Hospital, CASCADE)

3. **Floor** - Étages des bâtiments
   - `id`, `level_index`, `name`, `height_m`, `plan_geom` (MultiPolygon)
   - `z_min_m`, `z_max_m`
   - Relation: `building` (FK vers Building, CASCADE)

4. **Model3D** - Modèles 3D
   - `id`, `description`, `file_path`, `format`
   - Relations: `building` (FK, CASCADE), `floor` (FK, SET_NULL)

5. **Service** - Services médicaux/administratifs
   - `id`, `code` (unique), `icon_name`

6. **Poi** (Point of Interest) - Points d'intérêt
   - `id`, `type`, `is_entry_point`, `geom` (PointZ), `z_m`
   - Relations: `floor` (FK, CASCADE), `service` (FK, SET_NULL)

7. **NavNode** - Nœuds de navigation
   - `id`, `kind`, `geom` (PointZ)
   - Relation: `floor` (FK, CASCADE)

8. **NavEdge** - Arêtes de navigation
   - `id`, `is_accessible`, `length_m`, `kind`, `geom` (LineStringZ)
   - Relations: `node_from` (FK, CASCADE), `node_to` (FK, CASCADE)

9. **Language** - Langues supportées
   - `code` (PK), `name`

10. **ServiceTranslation** - Traductions des services
    - Clé composite: `(service_id, lang_code)`
    - `label`, `description`

11. **PoiTranslation** - Traductions des POI
    - Clé composite: `(poi_id, lang_code)`
    - `label`

12. **NavigationSession** - Sessions de navigation
    - `id` (UUID), `created_at`, `via_qr`, `via_print`
    - `path_geom` (MultiLineString)
    - Relations: `hospital`, `language`, `poi_from`, `poi_to`

### ViewSets et API Endpoints

**Base URL:** `http://localhost:8000/api/`

| Endpoint | ViewSet | Méthodes | Description |
|----------|---------|----------|-------------|
| `/api/hospitals/` | HospitalViewSet | GET, POST, PUT, DELETE | Gestion des hôpitaux |
| `/api/buildings/` | BuildingViewSet | GET, POST, PUT, DELETE | Gestion des bâtiments |
| `/api/floors/` | FloorViewSet | GET, POST, PUT, DELETE | Gestion des étages |
| `/api/model3ds/` | Model3DViewSet | GET, POST, PUT, DELETE | Modèles 3D |
| `/api/services/` | ServiceViewSet | GET, POST, PUT, DELETE | Services médicaux |
| `/api/pois/` | PoiViewSet | GET, POST, PUT, DELETE | Points d'intérêt |
| `/api/navnodes/` | NavNodeViewSet | GET, POST, PUT, DELETE | Nœuds de navigation |
| `/api/navedges/` | NavEdgeViewSet | GET, POST, PUT, DELETE | Arêtes de navigation |
| `/api/languages/` | LanguageViewSet | GET, POST, PUT, DELETE | Langues |
| `/api/servicetranslations/` | ServiceTranslationViewSet | GET, POST, PUT, DELETE | Traductions services |
| `/api/poitranslations/` | PoiTranslationViewSet | GET, POST, PUT, DELETE | Traductions POI |
| `/api/navigation-sessions/` | NavigationSessionViewSet | GET, POST, PUT, DELETE | Sessions navigation |
| `/api/navigation-sessions/route/` | Action custom | GET | **Calcul de chemin** |

### Endpoint spécial : Calcul de chemin

```
GET /api/navigation-sessions/route/?from={poi_id}&to={poi_id}
```

**Algorithme:**
1. Trouve le NavNode le plus proche du POI de départ (utilise `<->` PostGIS)
2. Trouve le NavNode le plus proche du POI d'arrivée
3. Utilise `calculate_path(start_node, end_node)` (fonction SQL pgRouting)
4. Retourne la géométrie du chemin en GeoJSON

**Réponse:**
```json
{
  "type": "Feature",
  "geometry": { ... },
  "properties": {
    "start_poi": 1,
    "end_poi": 2,
    "start_node": 42,
    "end_node": 84
  }
}
```

### Configuration Backend

**Fichiers:**
- `lochops_backend/settings.py` - Configuration Django
- `lochops_backend/urls.py` - Routes principales
- `.env` - Variables d'environnement (DATABASE_URL)

**Dépendances** (`requirements.txt`):
```
Django>=4.2
djangorestframework>=3.14
psycopg2-binary>=2.9
django-environ>=0.10
djangorestframework-gis>=1.0
django-cors-headers>=4.3.1
```

**Base de données:**
- PostgreSQL 14+ avec PostGIS 3+
- Schéma: `lochops`
- Tous les modèles ont `managed = False` (structure existante)

---

## 🎨 Frontend React

### Structure des fichiers

```
lochops_front/
├── src/
│   ├── components/          # 60 composants (11 pages + 49 UI)
│   │   ├── Hospital3DMap.tsx          # Visualisation 3D principale
│   │   ├── Hospital3DMapContainer.tsx # Conteneur 3D
│   │   ├── ServiceDirectory.tsx       # Annuaire des services
│   │   ├── QRCodeScreen.tsx           # Génération QR codes
│   │   ├── WelcomeScreen.tsx          # Écran d'accueil
│   │   ├── AIAssistant.tsx            # Assistant IA
│   │   ├── FloatingAIButton.tsx       # Bouton IA flottant
│   │   ├── LanguageSwitcher.tsx       # Changement de langue
│   │   ├── MapView.tsx                # Vue carte
│   │   ├── NavLink.tsx                # Lien de navigation
│   │   ├── PageHeader.tsx             # En-tête de page
│   │   └── ui/                        # 49 composants UI (Radix/shadcn)
│   ├── pages/
│   │   ├── Index.tsx          # Page d'accueil
│   │   ├── ModelViewerPage.tsx # Page visualiseur 3D
│   │   └── NotFound.tsx       # Page 404
│   ├── hooks/                 # 9 hooks personnalisés
│   │   ├── useGLBServices.ts        # Chargement services depuis GLB
│   │   ├── useNavigation.ts         # Hook de navigation
│   │   ├── useAIChat.ts             # Chat IA
│   │   ├── useVoiceRecorder.ts      # Enregistrement vocal
│   │   ├── useTextToSpeech.ts       # Synthèse vocale
│   │   ├── useTranslation.ts        # Traductions
│   │   ├── useGLBDebug.ts           # Debug modèles 3D
│   │   ├── use-mobile.tsx           # Détection mobile
│   │   └── use-toast.ts             # Notifications toast
│   ├── lib/
│   │   ├── api.ts             # Client API REST
│   │   └── utils.ts           # Utilitaires
│   ├── contexts/              # Contextes React
│   ├── i18n/                  # Internationalisation
│   ├── integrations/          # Intégrations (Supabase, etc.)
│   └── assets/                # Ressources (images, etc.)
├── public/                     # Fichiers statiques
├── android/                    # Application Android (Capacitor)
├── capacitor.config.ts         # Configuration Capacitor
├── package.json                # Dépendances npm
├── tailwind.config.ts          # Configuration Tailwind CSS
├── vite.config.ts              # Configuration Vite
└── tsconfig.json               # Configuration TypeScript
```

### Technologies Frontend

**Framework et Build:**
- React 18.3.1
- TypeScript 5.8.3
- Vite 5.4.19 (build tool)
- React Router DOM 6.30.1

**Visualisation 3D:**
- Three.js 0.160.1
- @react-three/fiber 8.18.0
- @react-three/drei 9.122.0

**UI et Style:**
- Tailwind CSS 3.4.17
- Radix UI (composants accessibles)
- shadcn/ui (système de composants)
- Lucide React (icônes)

**État et Data Fetching:**
- @tanstack/react-query 5.83.0
- Axios 1.13.2

**Mobile:**
- @capacitor/core 7.4.4
- @capacitor/android 7.4.4
- @capacitor/ios 7.4.4

**Autres:**
- date-fns (manipulation dates)
- react-hook-form + zod (formulaires)
- qrcode.react (génération QR codes)
- recharts (graphiques)
- next-themes (thèmes)

### Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run build:dev    # Build en mode développement
npm run lint         # Linter ESLint
npm run preview      # Prévisualisation du build
```

### Hooks personnalisés principaux

1. **useGLBServices** (8162 octets)
   - Charge le modèle GLB (DalalJam.glb)
   - Extrait les métadonnées des services depuis le modèle 3D
   - Parse les noms des meshes pour identifier les services

2. **useNavigation** (2585 octets)
   - Gestion de la navigation entre POIs
   - Appelle l'API `/api/navigation-sessions/route/`
   - Traite les géométries GeoJSON retournées

3. **useAIChat** (6011 octets)
   - Interface avec l'assistant IA
   - Gestion de l'historique des conversations
   - Traitement des réponses IA

4. **useVoiceRecorder** (5087 octets)
   - Enregistrement audio via WebRTC
   - Conversion audio pour l'IA

5. **useTextToSpeech** (1862 octets)
   - Synthèse vocale (TTS)
   - Support multilingue

6. **useTranslation** (597 octets)
   - Hook de traduction i18n
   - Changement de langue dynamique

### Composants clés

1. **Hospital3DMap.tsx** (17333 octets)
   - Rendu 3D principal avec Three.js
   - Affichage du modèle GLB
   - Interactions camera et contrôles
   - Affichage des POIs en 3D

2. **ServiceDirectory.tsx** (11110 octets)
   - Liste des services disponibles
   - Recherche et filtrage
   - Navigation vers les services

3. **AIAssistant.tsx** (10530 octets)
   - Interface chatbot
   - Entrée vocale et textuelle
   - Affichage des réponses IA

4. **QRCodeScreen.tsx** (11739 octets)
   - Génération de QR codes pour les sessions de navigation
   - Impression des codes

---

## 🗄️ Base de Données

### Schéma PostgreSQL + PostGIS

**Extension requise:** PostGIS 3+

### Structure des tables

Le schéma définit 12 tables dans le schema `lochops`:

```
Hospital (hôpital principal)
  ↓
Building (bâtiments) ───→ Model3D (modèles 3D)
  ↓
Floor (étages) ──────────→ Model3D
  ↓                 ↓
  ↓              NavNode (nœuds navigation)
  ↓                 ↓
  ↓              NavEdge (arêtes)
  ↓
POI (points d'intérêt) ←─ Service (services)
  ↓                         ↓
POITranslation         ServiceTranslation
  ↓                         ↓
Language (langues) ←────────┘

NavigationSession (sessions de navigation)
  → hospital, language, poi_from, poi_to
```

### Géométries PostGIS

- **POLYGON (SRID 4326)** - `Hospital.boundary`, `Building.footprint`
- **MULTIPOLYGON (SRID 4326)** - `Floor.plan_geom`
- **POINTZ (SRID 4326)** - `POI.geom`, `NavNode.geom` (3D avec Z)
- **LINESTRINGZ (SRID 4326)** - `NavEdge.geom` (3D avec Z)
- **MULTILINESTRINGZ (SRID 4326)** - `NavigationSession.path_geom`

### Fonction de navigation

**Fichier:** `navigation_functions.sql`

```sql
CREATE OR REPLACE FUNCTION calculate_path(
    start_node_id INTEGER,
    end_node_id INTEGER
) RETURNS TABLE(geom geometry) AS $$
    -- Utilise pgr_dijkstra pour calculer le plus court chemin
    -- Retourne les géométries des arêtes du chemin
$$;
```

**Dépendances:**
- Extension `pgrouting`
- Algorithme: Dijkstra

---

## 🔄 Flux de Données

### 1. Chargement initial

```
Utilisateur
  ↓
WelcomeScreen.tsx
  ↓
useGLBServices → Charge DalalJam.glb
  ↓
API GET /api/services/ → Services de la BDD
  ↓
ServiceDirectory.tsx → Affiche les services
```

### 2. Visualisation 3D

```
ModelViewerPage.tsx
  ↓
Hospital3DMapContainer.tsx
  ↓
Hospital3DMap.tsx
  ↓
Three.js + GLTFLoader → Rend DalalJam.glb
  ↓
Affiche les POIs en overlay
```

### 3. Navigation

```
Utilisateur sélectionne POI de départ et d'arrivée
  ↓
useNavigation.ts
  ↓
API GET /api/navigation-sessions/route/?from=X&to=Y
  ↓
Backend Django:
  - Trouve NavNode le plus proche de POI départ
  - Trouve NavNode le plus proche de POI arrivée
  - Appelle calculate_path(start, end)
  - pgr_dijkstra calcule le chemin
  - Retourne géométrie GeoJSON
  ↓
Frontend affiche le chemin en 3D
  ↓
Génère QR code (optionnel)
```

### 4. Assistant IA

```
Utilisateur pose une question (texte ou voix)
  ↓
useVoiceRecorder (si vocal) → Convertit en texte
  ↓
useAIChat → Envoie à l'API IA
  ↓
AIAssistant.tsx → Affiche la réponse
  ↓
useTextToSpeech → Lit la réponse (optionnel)
```

---

## 📱 Application Mobile

### Capacitor

**Configuration:** `capacitor.config.ts`

**Plateformes supportées:**
- Android (dossier `android/`)
- iOS (via @capacitor/ios)

**Build mobile:**
Voir `MOBILE_BUILD.md` pour les instructions détaillées

---

## 🌍 Internationalisation (i18n)

### Langues supportées

Définies dans la table `Language`:
- Code: `VARCHAR(5)` (ex: `fr`, `en`, `ar`)
- Name: Nom de la langue

### Tables de traduction

1. **ServiceTranslation**
   - `label`: Nom du service traduit
   - `description`: Description traduite

2. **POITranslation**
   - `label`: Nom du POI traduit

### Composant

**LanguageSwitcher.tsx** - Changement de langue dans l'interface

---

## 🧪 Tests

### Backend

**Fichier:** `core/tests_navigation.py`

Commande:
```bash
python manage.py test core.tests_navigation
```

### Frontend

Configuration ESLint pour le linting du code TypeScript/React

---

## 📊 Fichiers de configuration

### Backend
- `.env` / `.env.example` - Variables d'environnement
- `manage.py` - Script de gestion Django
- `requirements.txt` - Dépendances Python

### Frontend
- `package.json` / `package-lock.json` / `bun.lockb` - Dépendances
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript
- `vite.config.ts` - Vite
- `tailwind.config.ts` - Tailwind CSS
- `postcss.config.js` - PostCSS
- `eslint.config.js` - ESLint
- `components.json` - Configuration shadcn/ui

### Autres
- `diagrammeDe Classe.jpeg` - Diagramme UML
- `api_guide_react.md` - Guide d'utilisation de l'API
- `blender_export.py` - Script d'export Blender
- `script.py` - Scripts utilitaires
- `test_blender_export_mock.py` - Tests export Blender

---

## 🚀 Démarrage du projet

### Backend

```bash
cd /path/to/backekend

# Créer environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows

# Installer dépendances
pip install -r requirements.txt

# Configurer .env
cp .env.example .env
# Éditer .env avec vos paramètres DB

# Migrer (pour tables Django internes seulement)
python manage.py migrate

# Créer superuser
python manage.py createsuperuser

# Lancer serveur
python manage.py runserver
```

**Accès:**
- API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

### Frontend

```bash
cd /path/to/backekend/lochops_front

# Installer dépendances (avec npm ou bun)
npm install
# ou
bun install

# Configurer .env
# Créer .env avec VITE_API_URL=http://localhost:8000

# Lancer serveur de dev
npm run dev
```

**Accès:**
- App: http://localhost:5173/ (ou port indiqué par Vite)

---

## 📁 Fichiers importants

### Données
- `export_hopital_complet.sql` - Export complet des données
- `schema.sql` - Schéma de base de données
- `navigation_functions.sql` - Fonctions de navigation
- `DalalJam.glb` - Modèle 3D de l'hôpital Dalal Jam

### Documentation
- `README.md` - Documentation principale
- `api_guide_react.md` - Guide API pour React
- `MOBILE_BUILD.md` - Instructions build mobile
- `diagrammeDe Classe.jpeg` - Architecture UML

---

## 🔍 Points clés de l'architecture

### Forces

1. **Séparation Backend/Frontend** - Architecture découplée
2. **API RESTful complète** - 13 endpoints bien structurés
3. **Géospatial moderne** - PostGIS + pgRouting pour navigation 3D
4. **Visualisation 3D avancée** - Three.js avec React Three Fiber
5. **Multilingue** - Support complet i18n
6. **Mobile-ready** - Capacitor pour iOS/Android
7. **IA intégrée** - Assistant conversationnel
8. **Accessibilité** - Radix UI pour composants accessibles

### Particularités

1. **Modèles `managed = False`** - Django gère une DB existante
2. **Géométries 3D (Z)** - POIs et navigation en 3D
3. **GLB comme source de vérité** - Métadonnées dans le modèle 3D
4. **Composite PKs** - Traductions avec clés composites
5. **Sessions de navigation** - Tracking et analytics

### Technologies notables

- **PostGIS** - Extension spatiale PostgreSQL
- **pgRouting** - Calcul de chemins optimaux
- **Three.js** - Rendu 3D WebGL
- **Capacitor** - Bridge natif iOS/Android
- **shadcn/ui** - Système de design moderne
- **Tailwind CSS** - Utility-first CSS

---

## 📈 Statistiques du projet

- **Backend:** 12 modèles, 13 ViewSets, ~20 fichiers
- **Frontend:** 60 composants, 9 hooks, 3 pages
- **Base de données:** 12 tables, 5 types de géométries
- **Dépendances Python:** 6 packages principaux
- **Dépendances npm:** 73 packages

---

## 🎯 Cas d'usage principaux

1. **Navigation intérieure** - Calculer le chemin entre deux points dans l'hôpital
2. **Annuaire de services** - Trouver et localiser des services médicaux
3. **Visualisation 3D** - Explorer le bâtiment en 3D
4. **Assistant IA** - Poser des questions sur l'hôpital
5. **QR codes** - Générer des codes pour partager des itinéraires
6. **Multilingue** - Interface en plusieurs langues
7. **Mobile** - Utiliser l'app sur smartphone

---

*Document généré le 2025-12-07 par Antigravity*
*Projet: LocHops - Système de navigation hospitalière intelligente*
