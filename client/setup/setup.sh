#! /bin/bash

# setup wifi

# install apt packages

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install $(cat apt-packages) -y


# change to application root

cd ../

# install node

cd tmp
wget https://nodejs.org/dist/v7.4.0/node-v7.4.0-linux-armv7l.tar.gz
tar -xvf node-v7.4.0-linux-armv7l.tar.gz 
# cd node-v7.4.0-linux-armv7l
sudo cp -R ./node-v7.4.0-linux-armv7l/* /usr/local/