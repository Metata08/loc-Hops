from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin
from .models import (
    Hospital, Building, Floor, Model3D, Service, Poi, NavNode, NavEdge,
    Language, ServiceTranslation, PoiTranslation, NavigationSession
)

@admin.register(Hospital)
class HospitalAdmin(GISModelAdmin):
    list_display = ('name', 'address')

@admin.register(Building)
class BuildingAdmin(GISModelAdmin):
    list_display = ('code', 'default_name', 'hospital')

@admin.register(Floor)
class FloorAdmin(GISModelAdmin):
    list_display = ('name', 'level_index', 'building')

@admin.register(Model3D)
class Model3DAdmin(admin.ModelAdmin):
    list_display = ('id', 'file_path', 'format', 'building', 'floor')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('code', 'icon_name')

@admin.register(Poi)
class PoiAdmin(GISModelAdmin):
    list_display = ('id', 'type', 'is_entry_point', 'floor', 'service')

@admin.register(NavNode)
class NavNodeAdmin(GISModelAdmin):
    list_display = ('id', 'kind', 'floor')

@admin.register(NavEdge)
class NavEdgeAdmin(GISModelAdmin):
    list_display = ('id', 'is_accessible', 'length_m', 'kind')

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')

@admin.register(ServiceTranslation)
class ServiceTranslationAdmin(admin.ModelAdmin):
    list_display = ('service', 'language', 'label')

@admin.register(PoiTranslation)
class PoiTranslationAdmin(admin.ModelAdmin):
    list_display = ('poi', 'language', 'label')

@admin.register(NavigationSession)
class NavigationSessionAdmin(GISModelAdmin):
    list_display = ('id', 'created_at', 'via_qr', 'via_print', 'hospital')
