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

class SensorListSerializer(serializers.ModelSerializer):
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
