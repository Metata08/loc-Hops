import bpy
import bmesh
import os

# CONFIGURATION
FLOOR_ID = 1
NETWORK_OBJ_NAME = "Reseau_Navigation"
POI_PREFIX = "POI_" # Le préfixe de vos objets marqueurs
OUTPUT_FILENAME = "export_hopital_complet.sql"

# Chemin fichier
basedir = bpy.path.abspath("//")
if not basedir: basedir = "/tmp"
filepath = os.path.join(basedir, OUTPUT_FILENAME)

obj = bpy.data.objects.get(NETWORK_OBJ_NAME)

if obj is None:
    print(f"Erreur : L'objet '{NETWORK_OBJ_NAME}' n'existe pas.")
else:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("-- EXPORT COMPLET : NOEUDS, ARETES ET POIS\n")
        f.write("BEGIN;\n")
        
        # --- PARTIE 1 : LE RESEAU (NavNode / NavEdge) ---
        mesh = obj.data
        bm = bmesh.new()
        bm.from_mesh(mesh)
        
        f.write(f"\n-- 1. Insertion des NavNode (Points de passage)\n")
        # On garde une trace des coordonnées pour ne pas dupliquer les points si un POI est dessus
        # Mais pour faire simple ici, on ré-exporte tout proprement.
        
        for v in bm.verts:
            x, y, z = round(v.co.x, 3), round(v.co.y, 3), round(v.co.z, 3)
            # Insertion du Node
            sql = f"INSERT INTO \"NavNode\" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint({x}, {y}, {z}), 4326), {FLOOR_ID}, 'connector');"
            f.write(sql + "\n")

        f.write(f"\n-- 2. Insertion des NavEdge (Lignes du chemin)\n")
        for e in bm.edges:
            length = round(e.calc_length(), 3)
            v1 = e.verts[0].co
            v2 = e.verts[1].co
            line_wkt = f"LINESTRINGZ({v1.x:.3f} {v1.y:.3f} {v1.z:.3f}, {v2.x:.3f} {v2.y:.3f} {v2.z:.3f})"
            
            # Requête pour lier les noeuds
            sql = f"""INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint({v1.x:.3f}, {v1.y:.3f}, {v1.z:.3f}), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint({v2.x:.3f}, {v2.y:.3f}, {v2.z:.3f}), 4326) LIMIT 1), 
    {length}, 
    ST_SetSRID(ST_GeomFromText('{line_wkt}'), 4326), 
    true
);"""
            f.write(sql + "\n")

        # --- PARTIE 3 : LES SERVICES (POI) ---
        f.write(f"\n-- 3. Insertion des POI (Lieux identifiés)\n")
        
        # On scanne toute la scène pour trouver les objets qui commencent par "POI_"
        for scene_obj in bpy.context.scene.objects:
            if scene_obj.name.startswith(POI_PREFIX):
                # On nettoie le nom (ex: "POI_Radiologie" -> "Radiologie")
                poi_name = scene_obj.name.replace(POI_PREFIX, "")
                
                # Coordonnées du marqueur
                px, py, pz = round(scene_obj.location.x, 3), round(scene_obj.location.y, 3), round(scene_obj.location.z, 3)
                
                # SQL INSERT pour la table POI
                # Note: On laisse service_id à NULL pour l'instant car Blender ne connait pas les IDs de services.
                # On utilise le 'type' pour stocker le nom temporairement pour faire la liaison plus tard.
                
                sql_poi = f"""
INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    '{poi_name}', 
    false, 
    ST_SetSRID(ST_MakePoint({px}, {py}, {pz}), 4326), 
    {FLOOR_ID}
);"""
                f.write(sql_poi + "\n")

        f.write("COMMIT;\n")

    # Feedback
    def show_message(message = "", title = "Info", icon = 'INFO'):
        def draw(self, context):
            self.layout.label(text=message)
        bpy.context.window_manager.popup_menu(draw, title = title, icon = icon)
    
    show_message(f"Export complet avec POIs vers : {OUTPUT_FILENAME}", "Succès")