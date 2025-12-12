import psycopg2
import sys

# Paramètres de connexion
DB_NAME = "lochops"
DB_USER = "mg4"
DB_PASS = "ameth200"
DB_HOST = "localhost"
DB_PORT = "5432"

def update_function():
    try:
        print(f"Connexion à la base de données {DB_NAME} en tant que {DB_USER}...")
        # Connexion à la base de données
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.autocommit = True
        cur = conn.cursor()
        
        print("Connexion réussie.")
        
        # Définition de la fonction SQL corrigée (minuscules sans guillemets)
        # On supprime d'abord l'ancienne fonction pour éviter les conflits de type de retour
        drop_sql = "DROP FUNCTION IF EXISTS calculate_path(integer, integer);"
        cur.execute(drop_sql)
        print("Ancienne fonction supprimée (si elle existait).")

        sql_function = """
        CREATE OR REPLACE FUNCTION calculate_path(start_node_id INT, end_node_id INT)
        RETURNS TABLE (
            seq INT,
            path_seq INT,
            node BIGINT,
            edge BIGINT,
            cost FLOAT,
            agg_cost FLOAT,
            geom GEOMETRY
        ) AS $$
        BEGIN
            RETURN QUERY
            SELECT
                pgr.seq,
                pgr.path_seq,
                pgr.node,
                pgr.edge,
                pgr.cost,
                pgr.agg_cost,
                e.geom
            FROM pgr_dijkstra(
                'SELECT id, node_from_id AS source, node_to_id AS target, length_m AS cost FROM navedge WHERE is_accessible = true',
                start_node_id,
                end_node_id,
                directed := false
            ) AS pgr
            LEFT JOIN navedge e ON pgr.edge = e.id
            ORDER BY pgr.seq;
        END;
        $$ LANGUAGE plpgsql;
        """
        
        print("Mise à jour de la fonction calculate_path...")
        cur.execute(sql_function)
        
        print("✅ Fonction mise à jour avec succès !")
        
        # Vérification
        cur.execute("SELECT proname FROM pg_proc WHERE proname = 'calculate_path';")
        result = cur.fetchone()
        if result:
            print(f"Vérification: La fonction '{result[0]}' existe bien.")
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Erreur : {e}")
        sys.exit(1)

if __name__ == "__main__":
    update_function()
