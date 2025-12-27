# 🏥 LocHops Backend - Guide de Démarrage Rapide

Assistant de navigation hospitalière intelligent avec support multilingue (FR/EN).

## 🚀 Démarrage Rapide

### Option 1: Script Automatique (Recommandé)

```bash
./start.sh
```

Ce script interactif vous guidera à travers toutes les étapes de configuration.

### Option 2: Installation Manuelle

#### 1. Créer l'environnement virtuel

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

#### 2. Installer les dépendances

```bash
pip install -r requirements.txt
```

#### 3. Configurer la base de données

**Option A: PostgreSQL (Production)**

Assurez-vous que PostgreSQL est installé et en cours d'exécution:

```bash
sudo systemctl start postgresql
```

Créez la base de données:

```bash
sudo -u postgres psql
CREATE DATABASE loc_hops;
CREATE USER postgres WITH PASSWORD 'lala@postgres';
GRANT ALL PRIVILEGES ON DATABASE loc_hops TO postgres;
\q
```

**Option B: SQLite (Développement - Plus Simple)**

Créez un fichier `local_settings.py`:

```python
# Configuration locale - SQLite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}
```

Puis ajoutez à la fin de `back_loc_hops/settings.py`:

```python
# Import local settings if exists
try:
    from local_settings import *
except ImportError:
    pass
```

#### 4. Appliquer les migrations

```bash
python manage.py migrate
```

#### 5. Créer un superutilisateur (optionnel)

```bash
python manage.py createsuperuser
```

#### 6. Démarrer le serveur

```bash
python manage.py runserver
```

Le serveur sera accessible sur **http://localhost:8000**

## 📡 API Endpoints

### Chat Assistant

**Endpoint:** `POST /api/assistant/chat/`

**Request:**
```json
{
  "message": "Où est le service des urgences ?",
  "language": "fr"
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

### Test avec curl

```bash
curl -X POST http://localhost:8000/api/assistant/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour", "language": "fr"}'
```

## 🧪 Vérification de l'Installation

```bash
# Vérifier la configuration
python manage.py check

# Tester la connexion à la base
python manage.py dbshell

# Lister les POIs (dans le shell Django)
python manage.py shell
>>> from assistant.models import Poi
>>> Poi.objects.all()
```

## 📊 Structure du Projet

```
back_loc_hops/
├── assistant/              # Application principale
│   ├── models.py          # Modèle POI
│   ├── views.py           # Logique métier
│   └── urls.py            # Routes
├── back_loc_hops/         # Configuration Django
│   ├── settings.py        # Configuration
│   └── urls.py            # Routes principales
├── manage.py              # Utilitaire Django
├── requirements.txt       # Dépendances
├── start.sh              # Script de démarrage
└── ANALYSE_PROJET.md     # Documentation complète
```

## 🔧 Commandes Utiles

```bash
# Activer l'environnement virtuel
source venv/bin/activate

# Démarrer le serveur
python manage.py runserver

# Accéder au shell Django
python manage.py shell

# Créer des migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Accéder à l'admin
# http://localhost:8000/admin/
```

## 🌍 Langues Supportées

- **Français (fr):** Langue par défaut
- **Anglais (en):** Traduction automatique des services

## 🔍 Exemples de Requêtes

### Français
- "Bonjour"
- "Où est le service des urgences ?"
- "Je cherche la radiologie"
- "Je veux aller au laboratoire"

### Anglais
- "Hello"
- "Where is the emergency room?"
- "I'm looking for radiology"
- "Take me to the lab"

## ⚠️ Problèmes Courants

### Erreur de connexion PostgreSQL

Si vous obtenez une erreur d'authentification PostgreSQL:

1. Vérifiez que PostgreSQL est en cours d'exécution:
   ```bash
   sudo systemctl status postgresql
   ```

2. Vérifiez le mot de passe dans `settings.py`

3. Ou utilisez SQLite (voir Option B ci-dessus)

### Module Django non trouvé

Assurez-vous d'avoir activé l'environnement virtuel:
```bash
source venv/bin/activate
```

### Port déjà utilisé

Si le port 8000 est déjà utilisé:
```bash
python manage.py runserver 8080
```

## 📚 Documentation Complète

Pour une analyse détaillée du projet, consultez:
- **[ANALYSE_PROJET.md](./ANALYSE_PROJET.md)** - Architecture et fonctionnalités

## 🆘 Support

Pour toute question ou problème:
1. Consultez `ANALYSE_PROJET.md`
2. Vérifiez les logs du serveur
3. Utilisez `python manage.py check` pour diagnostiquer

## 📝 Licence

Projet académique - Master 2 GDIL

---

**Développé avec ❤️ pour la navigation hospitalière intelligente**
