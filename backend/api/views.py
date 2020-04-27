from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView, ListCreateAPIView
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from .models import SensorLocation, SensorData, SensorType
from .serializers import SensorDetailSerializer, SensorListSerializer, SensorTypeCreateSerializer


class SensorListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SensorListSerializer
    queryset = SensorType.objects.all()

class SensorDetailView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SensorDetailSerializer
    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        pk = self.kwargs['pk']
        return SensorData.objects.filter(sensor_type=pk)

class SensorDataCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = SensorDetailSerializer
    queryset = SensorData.objects.all()

class SensorTypeCreateView(ListCreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = SensorTypeCreateSerializer
    queryset = SensorType.objects.all()
