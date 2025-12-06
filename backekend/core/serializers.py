from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import (
    Hospital, Building, Floor, Model3D, Service, Poi, NavNode, NavEdge,
    Language, ServiceTranslation, PoiTranslation, NavigationSession
)

class ServiceTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTranslation
        fields = ['language', 'label', 'description']

class ServiceSerializer(serializers.ModelSerializer):
    translations = ServiceTranslationSerializer(source='service_translations', many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'code', 'icon_name', 'translations']

class PoiTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoiTranslation
        fields = ['language', 'label']

class PoiSerializer(GeoFeatureModelSerializer):
    translations = PoiTranslationSerializer(source='poi_translations', many=True, read_only=True)

    class Meta:
        model = Poi
        geo_field = 'geom'
        fields = ['id', 'type', 'is_entry_point', 'z_m', 'floor', 'service', 'translations']

class HospitalSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Hospital
        geo_field = 'boundary'
        fields = '__all__'

class BuildingSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Building
        geo_field = 'footprint'
        fields = '__all__'

class FloorSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Floor
        geo_field = 'plan_geom'
        fields = '__all__'

class Model3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model3D
        fields = '__all__'

class NavNodeSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = NavNode
        geo_field = 'geom'
        fields = '__all__'

class NavEdgeSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = NavEdge
        geo_field = 'geom'
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class NavigationSessionSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = NavigationSession
        geo_field = 'path_geom'
        fields = '__all__'
