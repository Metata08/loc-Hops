# Configuration locale pour le développement
# Ce fichier permet d'utiliser SQLite au lieu de PostgreSQL

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}

# Vous pouvez ajouter d'autres configurations locales ici
DEBUG = True
