# Purpose
Will slowly strobe a Luxafor light from a random target color to another random color, one after another.

# Installation
Using Ubuntu:

```
$ sudo apt-get install libusb-dev libudev-dev
$ sudo echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f372" MODE="0666"' > /etc/udev/rules.d/99_luxafor.rules
$ sudo reboot
$ cd your-install-dir
$ npm install
$ node . --debug
```
