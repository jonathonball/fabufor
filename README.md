# Purpose
Will slowly strobe a Luxafor light from a random target color to another random color, one after another.

# Installation
Using Ubuntu:

```
$ sudo apt-get install libusb-dev libudev-dev
$ sudo echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f372" MODE="0666"' > /etc/udev/rules.d/99_luxafor.rules
$ sudo reboot
```

# Usage
```
$ cd your-install-dir
$ ./start.sh --debug
```

# Command line options
## `--version`
Show version number and exit
## `--verbose`, `v`
Show color information on STDOUT
## `--color`, `-c`
Set light using the name of an HTML color
## `--rgb`
Set light using three space separated RGB integer values
