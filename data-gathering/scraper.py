import re
import datetime
import requests
from bs4 import BeautifulSoup

# Simple script for scaping covid data and posting it. It's purpouse is to kinda imitate sensors

class Scraper:
    def __init__(self, keywords, country, sensor_type):
        self.markup = requests.get(f"https://www.worldometers.info/coronavirus/country/{country}/").text
        self.keywords = keywords
        self.sensor_type = sensor_type
        self.new_cases = None
        self.new_deaths = None

    def parse(self):
        soup = BeautifulSoup(self.markup, 'html.parser')
        links = soup.findAll("li", {"class": "news_li"})
        print(links[1].get_text())
        try:
            numbers = re.findall("[0-9]+", links[1].get_text().replace(",", ""))
            if len(numbers) == 2:
                pass
            elif len(numbers) == 1:
                numbers.append("0")
        except IndexError:
            numbers = ["0", "0"]
        self.new_cases, self.new_deaths = numbers[0:2]
        print(self.new_cases, self.new_deaths)

    def store(self):
        api_url = "http://192.168.1.20:8000/api/add-data/"
        headers = {'Media-Type': 'application/json'}
        print(self.sensor_type)
        r = requests.post(api_url, headers=headers, data={"sensor_type": self.sensor_type, 'value': self.new_cases})
        print(r.status_code)

COUNTRIES = {
    "poland": 2,
    "sweden": 3,
    "us": 4,
    "iran": 5,
    "china": 6,
    "russia": 7,
    "ukraine": 8,
    "germany": 9,
    "spain": 10,
    "uk": 11,
}
print(COUNTRIES.values())
for country, sensor_type in COUNTRIES.items():
    s = Scraper(['database'], country, sensor_type)
    s.parse()
    s.store()
  
# s.store()
# if datetime.datetime.now().hour == 23:
#     s.email()
