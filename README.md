# Installation
Using Ubuntu:

```
$ apt-get install libusb-dev libudev-dev
$ sudo echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f372" MODE="0666"' > /etc/udev/rules.d/99_luxafor.rules
$ reboot
$ cd your-install-dir
$ npm install
$ node . --debug
```
