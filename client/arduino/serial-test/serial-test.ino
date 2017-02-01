#define HWSERIAL Serial1

boolean commandReady = false;  // whether the string is complete

int activeCommand = 0;

const int NUM_LEDS = 1;

int commandDataLength[] = {0, 0, NUM_LEDS * 3};
int dataBuffer[1024]; // rgb values for each LED
int bufferIndex = 0;

int LED_PIN = 13;
int LED_STATE = HIGH;

void setup() {
  // initialize serial:
  HWSERIAL.begin(115200, SERIAL_8N1);
  // reserve 200 bytes for the inputString:

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LED_STATE);
}

void loop() {
  hwSerialEvent();

  if (commandReady) {
    executeCommand(activeCommand);
    // reset buffer
    commandReady = false;
    activeCommand = 0;
    bufferIndex = 0;
  }
}

void executeCommand(int command){
  switch (command){
    case 1:
      toggleLedPin();
      break;
    case 2:
      writeLEDs(dataBuffer, commandDataLength[2]);
      break;
  }
}

void hwSerialEvent() {
  while (HWSERIAL.available()) {
    // get the new byte:
    int inByte = HWSERIAL.read();

    // activeCommand == 0 means no active command
    if (activeCommand == 0){
      //set new command
      activeCommand = inByte;
      // for commands that don't expect data, the command is ready
      if (commandDataLength[activeCommand] == 0){
        commandReady = true;
        break;
      }
    }

    if (bufferIndex < commandDataLength[activeCommand]){
      dataBuffer[bufferIndex++] = inByte;
    } else {
      commandReady = true;
    }
  }
}

void toggleLedPin(){
  if (LED_STATE == LOW){
    LED_STATE = HIGH;
  } else {
    LED_STATE = LOW;
  }

  digitalWrite(LED_PIN, LED_STATE);
}

void writeLEDs(int data[], int length){
  toggleLedPin();
}
