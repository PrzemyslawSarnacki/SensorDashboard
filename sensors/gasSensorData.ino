#include <Arduino.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include "C:/Users/Przemyslaw/Projects/SensorDashboard/sensors/secretFile.h"
#include <MQUnifiedsensor.h>


//Definicje
#define placa "Arduino UNO" 
#define Voltage_Resolution 5  
#define pin A0 //Wejście analogowe A0
#define type "MQ-131" //typ czujnika - MQ131
#define ADC_Bit_Resolution 10 // Rozdzielczość bitowa
#define RatioMQ131CleanAir 15 //RS / R0 = 15 ppm

//Deklaracja sensora MQ131
MQUnifiedsensor MQ131(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);

void setup()
{

    const char ssid[] = WIFI_SSID;
    const char password[] = WIFI_PASSW;
    Serial.begin(9600);         //Połączenie szeregowe (predkosc 9600)
    WiFi.begin(ssid, password);   //Połączenie WiFi z siecią o danym ssid i haśle
    pinMode(LED_BUILTIN, OUTPUT); // Initialize the LED_BUILTIN pin as an output

    while (WiFi.status() != WL_CONNECTED)
    { //Zaczekaj WiFI na zakończenie procesu łączenia z siecią

        delay(500);
        Serial.println("Waiting for connection");
    }

  MQ131.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ131.init(); 
  Serial.print("Calibrating please wait.");
  float calcR0 = 0;
  for(int i = 1; i<=10; i ++)
  {
    MQ131.update(); // Pobierz dane z czujnika
    calcR0 += MQ131.calibrate(RatioMQ131CleanAir);
    Serial.print(".");
  }
  MQ131.setR0(calcR0/10);
  Serial.println("  done!.");
  
  if(isinf(calcR0)) {Serial.println("Warning: Conection issue founded, R0 is infite (Open circuit detected) please check your wiring and supply"); while(1);}
  if(calcR0 == 0){Serial.println("Warning: Conection issue founded, R0 is zero (Analog pin with short circuit to ground) please check your wiring and supply"); while(1);}

  MQ131.serialDebug(true);
  Serial.println("Ignore Ratio = RS/R0, for this example we will use readSensorR0Rs, the ratio calculated will be R0/Rs. Thanks :)");

}

void loop()
{

    if (WiFi.status() == WL_CONNECTED)//Spradź status połączenia WiFi 
    {                                       
        StaticJsonDocument<200> JSONbuffer; //Deklaracja bufora JSON 
        MQ131.setA(605.18); MQ131.setB(-3.937); // Ustalenie współczynników dla poszczególnego gazu (CO) 
        float CO = MQ131.readSensor(); // Odczytanie wartosci wg. ustalonych współczynnikow 
        // 13 to ID dla CO
        JSONbuffer["sensor_type"] = 13;
        JSONbuffer["value"] = CO;
        char JSONmessageBuffer[300];
        serializeJsonPretty(JSONbuffer, JSONmessageBuffer, sizeof(JSONmessageBuffer));
        Serial.println(JSONmessageBuffer);

        HTTPClient http; //Declararacja obiektu klasy HTTPClient

        http.begin("http://sensor-dashboards.herokuapp.com/api/add-data/"); //Adres pod, którym wykonywane bedzie żądanie
        http.addHeader("Content-Type", "application/json");   //Opis naglowka

        int httpCode = http.POST(JSONmessageBuffer); //Wyslanie żądania 
        String payload = http.getString(); //Sprawdzenie payloadu 
        digitalWrite(LED_BUILTIN, LOW);
        delay(1000);
        digitalWrite(LED_BUILTIN, HIGH);

        Serial.println("httpCode:"); 
        Serial.println(httpCode); //Wyswietl kod HTTP (Jeśli, będzie to 200 to znaczy, że operacja powiodła się)
        Serial.println("Payload:"); 
        Serial.println(payload);  //Payload

        http.end();  //Zamknij połączenie
        delay(3000); 
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }
    Serial.println("Deep sleep"); 
    ESP.deepSleep(24*60*60e6); //Uśpij na 24h
}