from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HospitalViewSet, BuildingViewSet, FloorViewSet, Model3DViewSet,
    ServiceViewSet, PoiViewSet, NavNodeViewSet, NavEdgeViewSet,
    LanguageViewSet, ServiceTranslationViewSet, PoiTranslationViewSet,
    NavigationSessionViewSet
)

router = DefaultRouter()
router.register(r'hospitals', HospitalViewSet)
router.register(r'buildings', BuildingViewSet)
router.register(r'floors', FloorViewSet)
router.register(r'model3ds', Model3DViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'pois', PoiViewSet)
router.register(r'navnodes', NavNodeViewSet)
router.register(r'navedges', NavEdgeViewSet)
router.register(r'languages', LanguageViewSet)
router.register(r'service-translations', ServiceTranslationViewSet)
router.register(r'poi-translations', PoiTranslationViewSet)
router.register(r'navigation-sessions', NavigationSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
