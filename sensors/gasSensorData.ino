#include <Arduino.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include "C:/Users/Przemyslaw/Projects/SensorDashboard/sensors/secretFile.h"

const int gasPin = A0; //GAS sensor output pin to Arduino analog A0 pin

void setup()
{

    const char ssid[] = WIFI_SSID;
    const char password[] = WIFI_PASSW;
    Serial.begin(9600);         //Serial connection
    WiFi.begin(ssid, password);   //WiFi connection
    pinMode(LED_BUILTIN, OUTPUT); // Initialize the LED_BUILTIN pin as an output

    while (WiFi.status() != WL_CONNECTED)
    { //Wait for the WiFI connection completion

        delay(500);
        Serial.println("Waiting for connection");
    }
}

void loop()
{

    if (WiFi.status() == WL_CONNECTED)
    {                                       //Check WiFi connection status
        StaticJsonDocument<200> JSONbuffer; //Declaring static JSON buffer
        long sensorValue = analogRead(gasPin);
        // 13 is ID for gas sensor
        JSONbuffer["sensor_type"] = 13;
        JSONbuffer["value"] = sensorValue;
        char JSONmessageBuffer[300];
        serializeJsonPretty(JSONbuffer, JSONmessageBuffer, sizeof(JSONmessageBuffer));
        Serial.println(JSONmessageBuffer);

        HTTPClient http; //Declare object of class HTTPClient

        http.begin("http://sensor-dashboards.herokuapp.com/api/add-data/"); //Specify request destination
        http.addHeader("Content-Type", "application/json");   //Specify content-type header

        int httpCode = http.POST(JSONmessageBuffer); //Send the request
        String payload = http.getString(); //Get the response payload
        digitalWrite(LED_BUILTIN, LOW);
        delay(1000);
        digitalWrite(LED_BUILTIN, HIGH);

        Serial.println("httpCode:"); //Print HTTP return code
        Serial.println(httpCode); //Print HTTP return code
        Serial.println("Payload:");  //Print request response payload
        Serial.println(payload);  //Print request response payload

        http.end();  //Close connection
        delay(3000); // Wait for two seconds (to demonstrate the active low LED)
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }
    delay(24*3600*1000);
}