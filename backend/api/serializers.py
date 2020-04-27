from rest_framework import serializers
from .models import SensorType, SensorLocation, SensorData

class SensorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = (
            'id',
            'sensor_type',
            'value',
            'time',
        )

class SensorLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorLocation
        fields = (
            'id',
            'name',
            'city',
            'latitude', 
            'longtitude',
        )

class SensorListSerializer(serializers.ModelSerializer):
    sensor_location = serializers.SerializerMethodField()

    class Meta:
        model = SensorType
        fields = (
            'id',
            'name',
            'sensor_location',
            'code',
            'min_value',
            'max_value',
            'unit',
            'description',
        )
    
    def get_sensor_location(self, obj):
        return SensorLocationSerializer(obj.sensor_location).data

class SensorTypeCreateSerializer(serializers.ModelSerializer):
    sensor_location = serializers.SerializerMethodField()

    class Meta:
        model = SensorType
        fields = (
            'id',
            'name',
            'sensor_location',
            'code',
            'min_value',
            'max_value',
            'unit',
            'description',
        )
    
    def get_sensor_location(self, obj):
        return SensorLocationSerializer(obj.sensor_location).data
