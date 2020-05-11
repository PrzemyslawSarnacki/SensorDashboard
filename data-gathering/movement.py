import time
import requests

# Simple script for mocking changes in location of sensor

def update(sensor_type, latitude, longtitude):
    api_url = f"http://192.168.1.20:8000/api/update-location/{sensor_type}/"
    headers = {'Media-Type': 'application/json'}
    print(sensor_type)
    r = requests.put(api_url, headers=headers, data={"name": "Warsaw Sensor Center", "city": "Warsaw", "latitude": latitude, "longtitude": longtitude})
    print(r.status_code)
    
def move(distance, step=1 ,init_latitude=51, init_longtitude=21):
    for i in range(1, distance, step):
        init_latitude += 0.2 * i
        init_longtitude +=  i
        update(1, init_latitude, init_longtitude)
        time.sleep(5)

move(10)
