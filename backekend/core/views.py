from rest_framework import viewsets
from .models import (
    Hospital, Building, Floor, Model3D, Service, Poi, NavNode, NavEdge,
    Language, ServiceTranslation, PoiTranslation, NavigationSession
)
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection
import json
from .serializers import (
    HospitalSerializer, BuildingSerializer, FloorSerializer, Model3DSerializer,
    ServiceSerializer, PoiSerializer, NavNodeSerializer, NavEdgeSerializer,
    LanguageSerializer, ServiceTranslationSerializer, PoiTranslationSerializer,
    NavigationSessionSerializer
)

class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer

class FloorViewSet(viewsets.ModelViewSet):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer

class Model3DViewSet(viewsets.ModelViewSet):
    queryset = Model3D.objects.all()
    serializer_class = Model3DSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class PoiViewSet(viewsets.ModelViewSet):
    queryset = Poi.objects.all()
    serializer_class = PoiSerializer

class NavNodeViewSet(viewsets.ModelViewSet):
    queryset = NavNode.objects.all()
    serializer_class = NavNodeSerializer

class NavEdgeViewSet(viewsets.ModelViewSet):
    queryset = NavEdge.objects.all()
    serializer_class = NavEdgeSerializer

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class ServiceTranslationViewSet(viewsets.ModelViewSet):
    queryset = ServiceTranslation.objects.all()
    serializer_class = ServiceTranslationSerializer

class PoiTranslationViewSet(viewsets.ModelViewSet):
    queryset = PoiTranslation.objects.all()
    serializer_class = PoiTranslationSerializer

class NavigationSessionViewSet(viewsets.ModelViewSet):
    queryset = NavigationSession.objects.all()
    serializer_class = NavigationSessionSerializer

    @action(detail=False, methods=['get'])
    def route(self, request):
        """
        Calculate shortest path between two POIs.
        Usage: /api/navigation-sessions/route/?from=1&to=2
        """
        from_poi_id = request.query_params.get('from')
        to_poi_id = request.query_params.get('to')

        if not from_poi_id or not to_poi_id:
            return Response({'error': 'Please provide "from" and "to" POI IDs.'}, status=400)

        try:
            with connection.cursor() as cursor:
                # 1. Find nearest node to Start POI
                cursor.execute("""
                    SELECT id FROM navnode 
                    ORDER BY geom <-> (SELECT geom FROM poi WHERE id = %s) 
                    LIMIT 1
                """, [from_poi_id])
                start_node = cursor.fetchone()

                # 2. Find nearest node to End POI
                cursor.execute("""
                    SELECT id FROM navnode 
                    ORDER BY geom <-> (SELECT geom FROM poi WHERE id = %s) 
                    LIMIT 1
                """, [to_poi_id])
                end_node = cursor.fetchone()

                if not start_node or not end_node:
                    return Response({'error': 'Could not find nearest navigation nodes for given POIs.'}, status=404)

                start_node_id = start_node[0]
                end_node_id = end_node[0]

                # 3. Calculate Path using the SQL function
                # We fetch the geometry as GeoJSON directly
                cursor.execute("""
                    SELECT ST_AsGeoJSON(ST_Union(geom)) 
                    FROM calculate_path(%s, %s)
                """, [start_node_id, end_node_id])
                
                result = cursor.fetchone()
                
                if not result or not result[0]:
                    return Response({'error': 'No path found.'}, status=404)
                
                geojson_geometry = json.loads(result[0])
                
                return Response({
                    'type': 'Feature',
                    'geometry': geojson_geometry,
                    'properties': {
                        'start_poi': from_poi_id,
                        'end_poi': to_poi_id,
                        'start_node': start_node_id,
                        'end_node': end_node_id
                    }
                })

        except Exception as e:
            return Response({'error': str(e)}, status=500)
