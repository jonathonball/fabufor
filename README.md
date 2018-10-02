# Purpose
Fabulous front-end for using module node-luxafor2.

# Installation
Using Ubuntu:

```
$ sudo apt-get install libusb-dev libudev-dev
$ sudo echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f372" MODE="0666"' > /etc/udev/rules.d/99_luxafor.rules
$ sudo reboot
```
