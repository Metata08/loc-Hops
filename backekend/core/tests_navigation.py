from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
import json

class NavigationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/navigation-sessions/route/'

    @patch('django.db.connection.cursor')
    def test_route_success(self, mock_cursor):
        # Setup mock behavior
        cursor_instance = MagicMock()
        mock_cursor.return_value.__enter__.return_value = cursor_instance
        
        # Mock finding start node (id=10)
        # Mock finding end node (id=20)
        # Mock calculating path (geojson)
        
        # We need to handle multiple execute calls.
        # side_effect can be an iterable of return values for each call to fetchone/fetchall
        
        # Call 1: Start Node -> fetchone returns (10,)
        # Call 2: End Node -> fetchone returns (20,)
        # Call 3: Calculate Path -> fetchone returns (geojson_string,)
        
        cursor_instance.fetchone.side_effect = [
            (10,), # Start Node ID
            (20,), # End Node ID
            (json.dumps({
                "type": "MultiLineString",
                "coordinates": [[[0,0], [1,1]]]
            }),)   # Path Geometry
        ]
        
        response = self.client.get(self.url, {'from': '1', 'to': '2'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['type'], 'Feature')
        self.assertEqual(response.data['properties']['start_node'], 10)
        self.assertEqual(response.data['properties']['end_node'], 20)
        self.assertIn('geometry', response.data)

    @patch('django.db.connection.cursor')
    def test_route_missing_params(self, mock_cursor):
        response = self.client.get(self.url) # No params
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('django.db.connection.cursor')
    def test_route_node_not_found(self, mock_cursor):
        cursor_instance = MagicMock()
        mock_cursor.return_value.__enter__.return_value = cursor_instance
        
        # Start node found, End node NOT found
        cursor_instance.fetchone.side_effect = [
            (10,), # Start Node
            None   # End Node
        ]
        
        response = self.client.get(self.url, {'from': '1', 'to': '2'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
