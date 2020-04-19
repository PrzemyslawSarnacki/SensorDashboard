from django.db import models


class SensorLocation(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    latitude = models.DecimalField(max_digits=22, decimal_places=16)
    longtitude = models.DecimalField(max_digits=22, decimal_places=16)


class SensorType(models.Model):
    name = models.CharField(max_length=100)
    sensor_location = models.ForeignKey(SensorLocation, related_name='location', on_delete=models.CASCADE)
    code = models.SlugField(max_length=50)
    min_value = models.FloatField()
    max_value = models.FloatField()
    unit = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class SensorData(models.Model):
    value = models.FloatField()
    time = models.DateField(auto_now_add=True)
    sensor_type = models.ForeignKey(SensorType, related_name='data', on_delete=models.CASCADE)

    class Meta:
        ordering = ['time']

    def __str__(self):
        return f"{self.time} - {self.sensor_type} - {self.value}"
