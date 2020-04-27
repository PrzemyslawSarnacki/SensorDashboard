from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView
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
    queryset = SensorData.objects.all()

class SensorDataCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = SensorDetailSerializer
    queryset = SensorData.objects.all()

class SensorTypeCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = SensorTypeCreateSerializer
    queryset = SensorType.objects.all()
