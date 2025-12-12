import psycopg2
import sys

# Paramètres de connexion
DB_NAME = "lochops"
DB_USER = "mg4"
DB_PASS = "ameth200"
DB_HOST = "localhost"
DB_PORT = "5432"

def test_navigation():
    try:
        print(f"Connexion à la base de données {DB_NAME}...")
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            host=DB_HOST,
            port=DB_PORT
        )
        cur = conn.cursor()
        
        # Test avec des IDs qui existent probablement (1 et 2)
        print("Test de la fonction calculate_path(1, 2)...")
        cur.execute("SELECT * FROM calculate_path(1, 2);")
        
        rows = cur.fetchall()
        print(f"✅ Succès ! {len(rows)} lignes retournées.")
        for row in rows:
            print(row)
            
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Erreur SQL : {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_navigation()
