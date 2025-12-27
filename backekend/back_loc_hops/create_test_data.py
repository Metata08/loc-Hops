#!/usr/bin/env python
"""
Script pour créer des données de test dans la base de données SQLite
"""
import os
import sys
import django

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back_loc_hops.settings')
django.setup()

from django.db import connection

def create_poi_table():
    """Crée la table POI dans SQLite"""
    with connection.cursor() as cursor:
        # Supprimer la table si elle existe
        cursor.execute("DROP TABLE IF EXISTS poi")
        
        # Créer la table POI
        cursor.execute("""
            CREATE TABLE poi (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type VARCHAR(255) NOT NULL,
                is_entry_point BOOLEAN DEFAULT 0,
                geom TEXT,
                floor_id INTEGER
            )
        """)
        
        print("✓ Table 'poi' créée avec succès")

def insert_sample_data():
    """Insère des données d'exemple"""
    with connection.cursor() as cursor:
        sample_pois = [
            ('urgences', 1, 'POINT(0 0)', 0),
            ('radiologie', 0, 'POINT(10 10)', 1),
            ('laboratoire', 0, 'POINT(20 20)', 1),
            ('maternité', 0, 'POINT(30 30)', 2),
            ('pharmacie', 1, 'POINT(40 40)', 0),
            ('pédiatrie', 0, 'POINT(50 50)', 2),
            ('accueil', 1, 'POINT(60 60)', 0),
            ('cardiologie', 0, 'POINT(70 70)', 1),
            ('chirurgie', 0, 'POINT(80 80)', 2),
            ('consultation', 0, 'POINT(90 90)', 1),
        ]
        
        cursor.executemany(
            "INSERT INTO poi (type, is_entry_point, geom, floor_id) VALUES (?, ?, ?, ?)",
            sample_pois
        )
        
        print(f"✓ {len(sample_pois)} POIs insérés avec succès")

def verify_data():
    """Vérifie les données insérées"""
    from assistant.models import Poi
    
    count = Poi.objects.count()
    print(f"\n📊 Nombre total de POIs: {count}")
    
    print("\n📍 Liste des POIs:")
    for poi in Poi.objects.all():
        entry = "✓" if poi.is_entry_point else " "
        print(f"  [{entry}] {poi.type:20s} - Étage {poi.floor_id}")

if __name__ == "__main__":
    print("=" * 50)
    print("🏥 Création des données de test LocHops")
    print("=" * 50)
    print()
    
    try:
        create_poi_table()
        insert_sample_data()
        verify_data()
        
        print("\n" + "=" * 50)
        print("✅ Données de test créées avec succès!")
        print("=" * 50)
        print("\nVous pouvez maintenant tester l'API:")
        print("  curl -X POST http://localhost:8000/api/assistant/chat/ \\")
        print("    -H 'Content-Type: application/json' \\")
        print("    -d '{\"message\": \"Où est le service des urgences?\", \"language\": \"fr\"}'")
        
    except Exception as e:
        print(f"\n❌ Erreur: {e}")
        sys.exit(1)
