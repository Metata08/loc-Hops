import psycopg2
import sys

# Paramètres de connexion
DB_NAME = "lochops"
DB_USER = "mg4"
DB_PASS = "ameth200"
DB_HOST = "localhost"
DB_PORT = "5432"

def list_columns():
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            host=DB_HOST,
            port=DB_PORT
        )
        cur = conn.cursor()
        
        print("Colonnes de la table 'navedge':")
        cur.execute("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'navedge';
        """)
        
        rows = cur.fetchall()
        for row in rows:
            print(f"- {row[0]} ({row[1]})")
            
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Erreur : {e}")

if __name__ == "__main__":
    list_columns()
