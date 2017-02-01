# IoT Client

This client is written for a raspberry PI 3 and a Teensy 3.1.

RPI handles Web connectivity and the Teensy works as an LED controller.

RPI and Teensy communicate via UART serial in mode 8N1 at a baud rate of 1500000.

# Raspberry PI setup

Follow the proceture [here](http://spellfoundry.com/2016/05/29/configuring-gpio-serial-port-raspbian-jessie-including-pi-3/) to set up the uart on your pi properly.

This will later be replicated in a [shell script](https://github.com/itemir/raspberry_pi_utils) for easy installation. 

This installation method disables bluetooth.

