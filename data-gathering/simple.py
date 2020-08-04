import requests

def store():
    api_url = "https://sensor-dashboards.herokuapp.com/api/add-data/"
    headers = {'Media-Type': 'application/json'}
    r = requests.post(api_url, headers=headers, data={"sensor_type": 13, 'value': 106})
    print(r.status_code)

store()