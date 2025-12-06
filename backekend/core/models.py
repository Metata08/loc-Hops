from django.db import models
from django.contrib.gis.db import models as gis_models
import uuid

class Hospital(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    address = models.TextField(null=True, blank=True)
    boundary = gis_models.PolygonField(srid=4326, null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'hospital'

    def __str__(self):
        return self.name

class Building(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50, unique=True, null=True, blank=True)
    default_name = models.CharField(max_length=255, null=True, blank=True)
    footprint = gis_models.PolygonField(srid=4326, null=True, blank=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='buildings')

    class Meta:
        managed = False
        db_table = 'building'

    def __str__(self):
        return self.default_name or self.code

class Floor(models.Model):
    id = models.AutoField(primary_key=True)
    level_index = models.IntegerField()
    name = models.CharField(max_length=255, null=True, blank=True)
    height_m = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    plan_geom = gis_models.MultiPolygonField(srid=4326, null=True, blank=True)
    z_min_m = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    z_max_m = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='floors')

    class Meta:
        managed = False
        db_table = 'floor'

    def __str__(self):
        return f"{self.building.code} - Level {self.level_index}"

class Model3D(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField(null=True, blank=True)
    file_path = models.CharField(max_length=255)
    format = models.CharField(max_length=50, null=True, blank=True)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='model3ds')
    floor = models.ForeignKey(Floor, on_delete=models.SET_NULL, null=True, blank=True, related_name='model3ds')

    class Meta:
        managed = False
        db_table = 'model3d'

class Service(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50, unique=True)
    icon_name = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'service'

    def __str__(self):
        return self.code

class Poi(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255, null=True, blank=True)
    is_entry_point = models.BooleanField(default=False, null=True, blank=True)
    geom = gis_models.PointField(srid=4326, dim=3)
    z_m = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='pois', null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, related_name='pois', null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'poi'

    def __str__(self):
        return f"POI {self.id} ({self.type})"

class NavNode(models.Model):
    id = models.AutoField(primary_key=True)
    kind = models.CharField(max_length=50, null=True, blank=True)
    geom = gis_models.PointField(srid=4326, dim=3)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='navnodes')

    class Meta:
        managed = False
        db_table = 'navnode'

class NavEdge(models.Model):
    id = models.AutoField(primary_key=True)
    is_accessible = models.BooleanField(default=True, null=True, blank=True)
    length_m = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    kind = models.CharField(max_length=50, null=True, blank=True)
    geom = gis_models.LineStringField(srid=4326, dim=3, null=True, blank=True)
    node_from = models.ForeignKey(NavNode, on_delete=models.CASCADE, related_name='out_edges', db_column='node_from_id')
    node_to = models.ForeignKey(NavNode, on_delete=models.CASCADE, related_name='in_edges', db_column='node_to_id')

    class Meta:
        managed = False
        db_table = 'navedge'

class Language(models.Model):
    code = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'language'

    def __str__(self):
        return self.name

class ServiceTranslation(models.Model):
    # Mapping composite PK (service_id, lang_code) is tricky in Django.
    # Using OneToOneField as primary key as requested, though it implies 1:1.
    service = models.OneToOneField(Service, on_delete=models.CASCADE, primary_key=True, db_column='service_id')
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='service_translations', db_column='lang_code')
    label = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'servicetranslation'
        unique_together = (('service', 'language'),)

class PoiTranslation(models.Model):
    # Similar workaround for composite PK
    poi = models.OneToOneField(Poi, on_delete=models.CASCADE, primary_key=True, db_column='poi_id')
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='poi_translations', db_column='lang_code')
    label = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'poitranslation'
        unique_together = (('poi', 'language'),)

class NavigationSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    via_qr = models.BooleanField(default=False, null=True, blank=True)
    via_print = models.BooleanField(default=False, null=True, blank=True)
    path_geom = gis_models.MultiLineStringField(srid=4326, dim=3, null=True, blank=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='navigation_sessions')
    language = models.ForeignKey(Language, on_delete=models.RESTRICT, related_name='navigation_sessions_by_lang', db_column='language_code')
    poi_from = models.ForeignKey(Poi, on_delete=models.RESTRICT, related_name='navigation_sessions_as_start')
    poi_to = models.ForeignKey(Poi, on_delete=models.RESTRICT, related_name='navigation_sessions_as_end')

    class Meta:
        managed = False
        db_table = 'navigationsession'
