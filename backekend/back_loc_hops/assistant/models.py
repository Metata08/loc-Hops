from django.db import models

class Poi(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255)
    is_entry_point = models.BooleanField(default=False)
    geom = models.TextField(null=True, blank=True)
    floor_id = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = "poi"   # nom EXACT de ta table
        managed = False    # Django ne crée/modifie pas cette table

    def __str__(self):
        return f"{self.type} (étage {self.floor_id})"
