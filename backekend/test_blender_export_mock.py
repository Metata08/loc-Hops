import sys
import unittest
from unittest.mock import MagicMock, Mock

# Mock bpy and bmesh modules BEFORE importing the script
sys.modules['bpy'] = MagicMock()
sys.modules['bmesh'] = MagicMock()
sys.modules['math'] = MagicMock() # math is standard but let's be safe if we rely on specific behavior

import blender_export

class TestBlenderExport(unittest.TestCase):
    def setUp(self):
        # Reset mocks
        sys.modules['bpy'].reset_mock()
        sys.modules['bmesh'].reset_mock()
        
        # Setup basic bpy structure
        self.mock_bpy = sys.modules['bpy']
        
        # Mock collections as an iterable object with a get method
        self.mock_collections = MagicMock()
        self.mock_collections.__iter__.return_value = []
        self.mock_bpy.data.collections = self.mock_collections
        
        self.mock_bpy.data.objects = MagicMock()
        self.mock_bpy.context = MagicMock()
        
        # Setup bmesh
        self.mock_bmesh = sys.modules['bmesh']
        self.mock_bm = MagicMock()
        self.mock_bmesh.new.return_value = self.mock_bm
        
        # Output file
        blender_export.OUTPUT_FILE = "/tmp/test_export.sql"

    def test_get_floor_id(self):
        obj = MagicMock()
        col1 = MagicMock()
        col1.name = "Floor_2"
        col2 = MagicMock()
        col2.name = "Other"
        obj.users_collection = [col2, col1]
        
        self.assertEqual(blender_export.get_floor_id(obj), 2)
        
    def test_export_hospital(self):
        with open(blender_export.OUTPUT_FILE, "w") as f:
            blender_export.export_hospital(f)
            
        with open(blender_export.OUTPUT_FILE, "r") as f:
            content = f.read()
            self.assertIn("INSERT INTO \"Hospital\"", content)
            self.assertIn("'DalalJam'", content)

    def test_export_nav_graph(self):
        # Setup NavGraph object
        nav_obj = MagicMock()
        nav_obj.type = 'MESH'
        nav_obj.matrix_world = MagicMock()
        # Identity matrix behavior for simplicity
        nav_obj.matrix_world.__matmul__.side_effect = lambda v: v 
        
        # Mock get to return nav_obj when "Reseau_Navigation" is requested
        def get_side_effect(name):
            if name == "Reseau_Navigation":
                return nav_obj
            return None
        self.mock_bpy.data.objects.get.side_effect = get_side_effect
        
        # Setup Vertices
        v1 = MagicMock()
        v1.co = MagicMock()
        v1.co.x, v1.co.y, v1.co.z = 0.0, 0.0, 0.0
        
        v2 = MagicMock()
        v2.co = MagicMock()
        v2.co.x, v2.co.y, v2.co.z = 10.0, 0.0, 0.0
        
        # Mock vector subtraction and length on the COORDINATES
        mock_diff = MagicMock()
        mock_diff.length = 10.0
        
        v1.co.__sub__.return_value = mock_diff
        v2.co.__sub__.return_value = mock_diff 
        
        # Mock verts as object that is iterable and has ensure_lookup_table
        mock_verts = MagicMock()
        mock_verts.__iter__.return_value = [v1, v2]
        self.mock_bm.verts = mock_verts
        
        # Setup Edges
        e1 = MagicMock()
        e1.verts = [v1, v2]
        
        mock_edges = MagicMock()
        mock_edges.__iter__.return_value = [e1]
        self.mock_bm.edges = mock_edges
        
        with open(blender_export.OUTPUT_FILE, "w") as f:
            blender_export.export_nav_graph(f)
            
        with open(blender_export.OUTPUT_FILE, "r") as f:
            content = f.read()
            self.assertIn("INSERT INTO \"NavNode\"", content)
            self.assertIn("INSERT INTO \"NavEdge\"", content)
            # Check geometry format
            self.assertIn("ST_MakePoint(0.000, 0.000, 0.000)", content)

    def test_export_pois(self):
        # Setup POI Object
        poi1 = MagicMock()
        poi1.name = "POI_Accueil"
        poi1.get.side_effect = lambda k, d=None: True if k == "is_entry_point" else d
        poi1.matrix_world.translation.x = 5
        poi1.matrix_world.translation.y = 5
        poi1.matrix_world.translation.z = 0
        
        # Mock users_collection for floor ID
        col_floor = MagicMock()
        col_floor.name = "Floor_1"
        poi1.users_collection = [col_floor]
        
        # Mock scene objects
        self.mock_bpy.context.scene.objects = [poi1]
        
        with open(blender_export.OUTPUT_FILE, "w") as f:
            blender_export.export_pois(f)
            
        with open(blender_export.OUTPUT_FILE, "r") as f:
            content = f.read()
            self.assertIn("INSERT INTO \"POI\"", content)
            self.assertIn("'Accueil'", content) # Name stripped of prefix
            self.assertIn("true", content) # is_entry_point
            self.assertIn("ST_MakePoint(5.000, 5.000, 0.000)", content)

if __name__ == '__main__':
    unittest.main()
