#include "FastLED.h"
#define NUM_LEDS 39

int inByte = 0;         // incoming serial byte
int inIndex = 0;
int colorBytes[NUM_LEDS * 3];

CRGBArray<NUM_LEDS> leds;

const int LED_PIN = 13;

void setup() {
	// FastLED.addLeds<NEOPIXEL,LED_PIN>(leds, NUM_LEDS);

	pinMode(LED_PIN, OUTPUT);


	// start serial port at 9600 bps:
	Serial.begin(115200);
	while (!Serial) {
	    ; // wait for serial port to connect. Needed for native USB port only
	}

	establishContact();  // send a byte to establish contact until receiver responds
}

void loop() {
	while (Serial.available() > 0) {
   		// get incoming byte:
		inByte = Serial.read();
		if (inByte == 'c'){
			// reset the led strip
			inIndex = 0;
			// prepare for serial rgb values
			continue;
		}
		

		if (inByte == '\n'){
			// execute the draw call
			for (int i = 0; i < NUM_LEDS; i++){
				// leds[i] = CRGB( colorBytes[ i * 3 ], colorBytes[ i * 3 + 1 ], colorBytes[ i * 3 + 2 ]);
			}
			continue;
		}

		// buffer the rgb values
		// colorBytes[inIndex++] = inByte;

		if (inByte == 0){
			digitalWrite(LED_PIN, LOW);
		} else if (inByte == 1){
			digitalWrite(LED_PIN, HIGH);
		} 
	}
}

void establishContact() {
	while (Serial.available() <= 0) {
		Serial.print('A');   // send a capital A

		digitalWrite(LED_PIN, HIGH);
		delay(100);
		digitalWrite(LED_PIN, LOW);
		delay(100);
	}
}
