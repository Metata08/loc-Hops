#!/bin/bash

# Script de démarrage du projet LocHops Backend
# Ce script guide l'utilisateur à travers le processus de configuration

echo "=========================================="
echo "🚀 Configuration du projet LocHops Backend"
echo "=========================================="
echo ""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier Python
echo -e "${YELLOW}📌 Vérification de Python...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓ $PYTHON_VERSION installé${NC}"
else
    echo -e "${RED}✗ Python 3 n'est pas installé${NC}"
    exit 1
fi

# Vérifier PostgreSQL
echo -e "\n${YELLOW}📌 Vérification de PostgreSQL...${NC}"
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✓ PostgreSQL est installé${NC}"
    
    # Vérifier si le service est actif
    if systemctl is-active --quiet postgresql; then
        echo -e "${GREEN}✓ PostgreSQL est en cours d'exécution${NC}"
    else
        echo -e "${RED}✗ PostgreSQL n'est pas en cours d'exécution${NC}"
        echo -e "${YELLOW}Tentative de démarrage...${NC}"
        sudo systemctl start postgresql
    fi
else
    echo -e "${RED}✗ PostgreSQL n'est pas installé${NC}"
    echo "Installez PostgreSQL avec: sudo apt install postgresql postgresql-contrib"
    exit 1
fi

# Vérifier l'environnement virtuel
echo -e "\n${YELLOW}📌 Vérification de l'environnement virtuel...${NC}"
if [ -d "venv" ]; then
    echo -e "${GREEN}✓ Environnement virtuel existe${NC}"
else
    echo -e "${YELLOW}Création de l'environnement virtuel...${NC}"
    python3 -m venv venv
    echo -e "${GREEN}✓ Environnement virtuel créé${NC}"
fi

# Activer l'environnement virtuel
echo -e "\n${YELLOW}📌 Activation de l'environnement virtuel...${NC}"
source venv/bin/activate
echo -e "${GREEN}✓ Environnement virtuel activé${NC}"

# Installer les dépendances
echo -e "\n${YELLOW}📌 Installation des dépendances...${NC}"
pip install -q -r requirements.txt
echo -e "${GREEN}✓ Dépendances installées${NC}"

# Configuration de la base de données
echo -e "\n${YELLOW}=========================================="
echo "📊 Configuration de la base de données"
echo "==========================================${NC}"
echo ""
echo "La configuration actuelle dans settings.py est:"
echo "  - Base de données: loc_hops"
echo "  - Utilisateur: postgres"
echo "  - Mot de passe: lala@postgres"
echo "  - Hôte: localhost"
echo "  - Port: 5432"
echo ""
echo -e "${YELLOW}Options:${NC}"
echo "  1. Utiliser cette configuration (vous devrez peut-être configurer PostgreSQL)"
echo "  2. Utiliser SQLite pour le développement (plus simple)"
echo ""
read -p "Votre choix (1 ou 2): " DB_CHOICE

if [ "$DB_CHOICE" == "2" ]; then
    echo -e "\n${YELLOW}Configuration pour SQLite...${NC}"
    # Créer un fichier de configuration local
    cat > local_settings.py << EOF
# Configuration locale - SQLite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}
EOF
    echo -e "${GREEN}✓ Configuration SQLite créée${NC}"
    echo -e "${YELLOW}Note: Ajoutez 'from local_settings import *' à la fin de settings.py${NC}"
fi

# Test de connexion
echo -e "\n${YELLOW}📌 Test de la configuration Django...${NC}"
if python manage.py check --deploy 2>/dev/null; then
    echo -e "${GREEN}✓ Configuration Django valide${NC}"
else
    echo -e "${YELLOW}⚠ Avertissements de configuration détectés (normal en développement)${NC}"
fi

# Migrations
echo -e "\n${YELLOW}📌 Application des migrations...${NC}"
if python manage.py migrate 2>/dev/null; then
    echo -e "${GREEN}✓ Migrations appliquées${NC}"
else
    echo -e "${RED}✗ Erreur lors des migrations${NC}"
    echo -e "${YELLOW}Vérifiez la configuration de votre base de données${NC}"
fi

# Créer un superutilisateur
echo -e "\n${YELLOW}=========================================="
echo "👤 Création d'un superutilisateur (optionnel)"
echo "==========================================${NC}"
read -p "Voulez-vous créer un superutilisateur? (o/n): " CREATE_SUPER

if [ "$CREATE_SUPER" == "o" ] || [ "$CREATE_SUPER" == "O" ]; then
    python manage.py createsuperuser
fi

# Résumé
echo -e "\n${GREEN}=========================================="
echo "✅ Configuration terminée!"
echo "==========================================${NC}"
echo ""
echo "Pour démarrer le serveur:"
echo -e "${YELLOW}  source venv/bin/activate${NC}"
echo -e "${YELLOW}  python manage.py runserver${NC}"
echo ""
echo "Le serveur sera accessible sur:"
echo -e "${GREEN}  http://localhost:8000${NC}"
echo ""
echo "API disponible:"
echo -e "${GREEN}  POST http://localhost:8000/api/assistant/chat/${NC}"
echo ""
echo "Admin Django:"
echo -e "${GREEN}  http://localhost:8000/admin/${NC}"
echo ""
echo "Documentation complète:"
echo -e "${GREEN}  Voir ANALYSE_PROJET.md${NC}"
echo ""
