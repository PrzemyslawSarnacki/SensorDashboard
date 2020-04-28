from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView, ListCreateAPIView
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from .models import SensorLocation, SensorData, SensorType
from .serializers import SensorDetailSerializer, SensorListSerializer, SensorTypeCreateSerializer, SensorLocationSerializer


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

class SensorLocationView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SensorListSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        pk = self.kwargs['pk']
        print(pk)
        return SensorType.objects.filter(id=pk)

class SensorLocationUpdateView(UpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SensorLocationSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        return SensorLocation.objects.filter(id=pk)

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     instance.latitude = request.data.get("latitude")
    #     instance.longtitude = request.data.get("longtitude")
    #     instance.save()

    #     serializer = self.get_serializer(data=instance)
    #     print("ok")
    #     serializer.is_valid(raise_exception=True)
    #     print("ok1")
    #     self.perform_update(serializer)
    #     print("ok2")
    #     # return Response(serializer.data)

class SensorDataCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = SensorDetailSerializer
    queryset = SensorData.objects.all()

class SensorTypeCreateView(ListCreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = SensorTypeCreateSerializer
    queryset = SensorType.objects.all()
