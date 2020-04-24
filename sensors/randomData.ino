#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include "secretFile.h"

void setup()
{

    const char *ssid = WIFI_SSID;
    const char *password = WIFI_PASSW;
    Serial.begin(115200);             //Serial connection
    WiFi.begin(ssid, password); //WiFi connection
    pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output

    while (WiFi.status() != WL_CONNECTED)
    { //Wait for the WiFI connection completion

        delay(500);
        Serial.println("Waiting for connection");
    }
}

void loop()
{

    if (WiFi.status() == WL_CONNECTED)
    { //Check WiFi connection status
        StaticJsonDocument<200> JSONbuffer; //Declaring static JSON buffer
        // JsonObject &JSONencoder = JSONbuffer.createObject();
        long randNumber = random(0, 25);
        JSONbuffer["sensor_type"] = 1;
        JSONbuffer["value"] = randNumber;
        char JSONmessageBuffer[300];
        serializeJsonPretty(JSONbuffer, JSONmessageBuffer, sizeof(JSONmessageBuffer));
        Serial.println(JSONmessageBuffer);

        HTTPClient http; //Declare object of class HTTPClient

        http.begin("http://192.168.1.20:8000/api/add-data/"); //Specify request destination
        http.addHeader("Content-Type", "application/json");     //Specify content-type header

        int httpCode = http.POST(JSONmessageBuffer); //Send the request
        // int httpCode = http.POST("{"sensor_type" : 1, "value": 1}");   //Send the request
        String payload = http.getString(); //Get the response payload
        digitalWrite(LED_BUILTIN, LOW);
        delay(1000);
        digitalWrite(LED_BUILTIN, HIGH);
        Serial.println(httpCode); //Print HTTP return code
        Serial.println(payload);  //Print request response payload

        http.end(); //Close connection
        delay(3000);                      // Wait for two seconds (to demonstrate the active low LED)

    }
    else
    {
        Serial.println("Error in WiFi connection");
    }
    delay(3000);
}