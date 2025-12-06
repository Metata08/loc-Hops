import bpy
import bmesh
import math
import os

# Configuration
HOSPITAL_NAME = "DalalJam"
SRID = 4326
# Use the user's preferred filename
OUTPUT_FILENAME = "export_hopital_complet.sql"
NETWORK_OBJ_NAME = "Reseau_Navigation"
POI_PREFIX = "POI_"
DEFAULT_FLOOR_ID = 1

def get_output_path():
    """Determines the output path based on the blend file location."""
    basedir = bpy.path.abspath("//")
    if not basedir: 
        basedir = "/tmp"
    return os.path.join(basedir, OUTPUT_FILENAME)

def get_floor_id(obj):
    """
    Determines the floor ID based on the collection the object belongs to.
    Assumes collections are named 'Floor_0', 'Floor_1', etc.
    Returns DEFAULT_FLOOR_ID if no matching collection is found.
    """
    if not obj:
        return DEFAULT_FLOOR_ID
        
    for collection in obj.users_collection:
        if collection.name.startswith("Floor_"):
            try:
                return int(collection.name.split("_")[1])
            except ValueError:
                pass
    return DEFAULT_FLOOR_ID

def format_point(v):
    """Formats a Blender vector (x, y, z) to PostGIS ST_MakePoint string."""
    # Rounding to 3 decimal places as in the user's script
    return f"ST_SetSRID(ST_MakePoint({v.x:.3f}, {v.y:.3f}, {v.z:.3f}), {SRID})"

def format_linestring(v1, v2):
    """Formats two vectors into a PostGIS LINESTRINGZ."""
    return f"ST_SetSRID(ST_GeomFromText('LINESTRINGZ({v1.x:.3f} {v1.y:.3f} {v1.z:.3f}, {v2.x:.3f} {v2.y:.3f} {v2.z:.3f})'), {SRID})"

def clean_string(s):
    """Escapes single quotes for SQL."""
    if s:
        return s.replace("'", "''")
    return ""

def export_hospital(f):
    """Exports the Hospital record."""
    f.write(f"-- Hospital: {HOSPITAL_NAME}\n")
    f.write(f"INSERT INTO \"Hospital\" (name, address, boundary) VALUES ('{HOSPITAL_NAME}', 'Dakar, Senegal', NULL);\n\n")

def export_buildings(f):
    """Exports the Building record."""
    f.write(f"-- Building: Main\n")
    hospital_subquery = f"(SELECT id FROM \"Hospital\" WHERE name = '{HOSPITAL_NAME}' LIMIT 1)"
    f.write(f"INSERT INTO \"Building\" (code, default_name, hospital_id) VALUES ('B1', 'Batiment Principal', {hospital_subquery});\n\n")

def export_floors(f):
    """Exports Floor records based on collections."""
    f.write(f"-- Floors\n")
    building_subquery = f"(SELECT id FROM \"Building\" WHERE code = 'B1' LIMIT 1)"
    
    # Find all floor collections
    floors = set()
    for col in bpy.data.collections:
        if col.name.startswith("Floor_"):
            try:
                level = int(col.name.split("_")[1])
                floors.add(level)
            except ValueError:
                pass
    
    if not floors:
        floors.add(DEFAULT_FLOOR_ID) # Ensure at least one floor
        
    for level in sorted(floors):
        f.write(f"INSERT INTO \"Floor\" (level_index, name, building_id) VALUES ({level}, 'Etage {level}', {building_subquery});\n")
    f.write("\n")

def export_nav_graph(f):
    """Exports NavNodes and NavEdges from the navigation mesh."""
    f.write(f"-- Navigation Graph (Object: {NETWORK_OBJ_NAME})\n")
    
    obj = bpy.data.objects.get(NETWORK_OBJ_NAME)
    if not obj or obj.type != 'MESH':
        print(f"Warning: Object '{NETWORK_OBJ_NAME}' not found or is not a mesh.")
        f.write(f"-- Warning: Object '{NETWORK_OBJ_NAME}' not found.\n")
        return

    # Ensure we are in object mode to access data correctly
    if bpy.context.active_object and bpy.context.active_object.mode != 'OBJECT':
        bpy.ops.object.mode_set(mode='OBJECT')

    mesh = obj.data
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bm.verts.ensure_lookup_table()
    bm.edges.ensure_lookup_table()

    # 1. Export Nodes
    f.write("-- NavNodes\n")
    for v in bm.verts:
        # Transform coordinate to world space
        world_v = obj.matrix_world @ v.co
        floor_id = get_floor_id(obj)
        
        geom_str = format_point(world_v)
        # Using subquery for floor_id to ensure referential integrity
        floor_subquery = f"(SELECT id FROM \"Floor\" WHERE level_index = {floor_id} LIMIT 1)"
        
        f.write(f"INSERT INTO \"NavNode\" (geom, floor_id, kind) VALUES ({geom_str}, {floor_subquery}, 'connector');\n")

    # 2. Export Edges
    f.write("\n-- NavEdges\n")
    for e in bm.edges:
        v1 = obj.matrix_world @ e.verts[0].co
        v2 = obj.matrix_world @ e.verts[1].co
        
        length = (v1 - v2).length
        geom_str = format_linestring(v1, v2)
        
        # Lookups using geometry
        node_from_sql = f"(SELECT id FROM \"NavNode\" WHERE geom = {format_point(v1)} LIMIT 1)"
        node_to_sql = f"(SELECT id FROM \"NavNode\" WHERE geom = {format_point(v2)} LIMIT 1)"
        
        f.write(f"INSERT INTO \"NavEdge\" (node_from_id, node_to_id, length_m, geom, is_accessible) VALUES ({node_from_sql}, {node_to_sql}, {length:.3f}, {geom_str}, true);\n")

    bm.free()
    f.write("\n")

def export_pois(f):
    """Exports POIs by scanning objects with the specific prefix."""
    f.write(f"-- POIs (Prefix: {POI_PREFIX})\n")
    
    poi_found = False
    
    # Scan all objects in the scene
    for obj in bpy.context.scene.objects:
        if obj.name.startswith(POI_PREFIX):
            poi_found = True
            
            # Clean name: "POI_Radiologie" -> "Radiologie"
            poi_name = obj.name.replace(POI_PREFIX, "")
            poi_name = clean_string(poi_name)
            
            world_v = obj.matrix_world.translation
            floor_id = get_floor_id(obj)
            
            # Custom properties (if they exist, otherwise default)
            is_entry = obj.get("is_entry_point", False)
            if isinstance(is_entry, int):
                is_entry = bool(is_entry)
            
            geom_str = format_point(world_v)
            floor_subquery = f"(SELECT id FROM \"Floor\" WHERE level_index = {floor_id} LIMIT 1)"
            
            f.write(f"INSERT INTO \"POI\" (type, is_entry_point, geom, floor_id) VALUES ('{poi_name}', {str(is_entry).lower()}, {geom_str}, {floor_subquery});\n")
            
            # Create translation entry (assuming French default)
            poi_lookup = f"(SELECT id FROM \"POI\" WHERE geom = {geom_str} AND type = '{poi_name}' LIMIT 1)"
            f.write(f"INSERT INTO \"POITranslation\" (poi_id, lang_code, label) VALUES ({poi_lookup}, 'fr', '{poi_name}');\n")

    if not poi_found:
        f.write(f"-- No objects found starting with '{POI_PREFIX}'\n")

    f.write("\n")

def main():
    output_path = get_output_path()
    print(f"Starting export to {output_path}...")
    
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(f"-- Export from Blender for Hospital: {HOSPITAL_NAME}\n")
            f.write(f"-- Generated by blender_export.py\n")
            f.write("BEGIN;\n\n")
            
            # Order is important for Foreign Keys
            export_hospital(f)
            export_buildings(f)
            export_floors(f)
            export_nav_graph(f)
            export_pois(f)
            
            f.write("COMMIT;\n")
            
        print("Export completed successfully.")
        
        # Blender UI Feedback if running in GUI
        def show_message(message = "", title = "Info", icon = 'INFO'):
            def draw(self, context):
                self.layout.label(text=message)
            bpy.context.window_manager.popup_menu(draw, title = title, icon = icon)
            
        show_message(f"Export complet vers : {output_path}", "Succès")
        
    except Exception as e:
        print(f"Error during export: {e}")

if __name__ == "__main__":
    main()
