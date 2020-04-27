from django.urls import path
from .views import SensorDetailView, SensorListView, SensorDataCreateView, SensorTypeCreateView


urlpatterns = [
    path('sensor-list/', SensorListView.as_view(), name='sensor-list'),
    path('sensor-detail/<pk>/', SensorDetailView.as_view(), name='sensor-detail'),
    path('add-data/', SensorDataCreateView.as_view(), name='add-data'),
    path('add-sensor/', SensorTypeCreateView.as_view(), name='add-sensor'),
]
