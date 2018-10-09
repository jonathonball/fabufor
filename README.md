# Purpose
Fabulous front-end for controlling a Luxafor light via node-luxafor2 in node.js.

# Installation
As mentioned in the MIT license, you run these commands at your own risk.
## Using Ubuntu:
```
$ sudo apt update && sudo apt upgrade
$ sudo apt install libusb-dev libudev-dev
$ sudo su -
$ echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f372" MODE="0666"' > /etc/udev/rules.d/99_luxafor.rules
$ reboot
$ yarn add global fabufor
# or
$ npm install -g fabufor
```

## Using Fedora:
```
$ sudo dnf install systemd-devel
$ sudo su -
# echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f372" MODE="0666"' > /etc/udev/rules.d/99_luxafor.rules
# udevadm control --reload
# udevadm trigger
# exit
$ yarn add global fabufor
 -- OR --
$ npm install -g fabufor
```

# Usage
```
Lighting:
  --led, -l  Which light to control                                     [string]

Color Controls:
  --red, -r     Red component                                           [number]
  --green, -g   Green component                                         [number]
  --blue, -b    Blue component                                          [number]
  --color, -c   The name of a color to set                              [string]
  --preset, -p  One of the preset colors built into the hardware        [string]

Presentation Controls:
  --time, -t    Adjust the time interval                                [number]
  --repeat, -e  Number of times to repeat, 0 for infinite               [number]
  --speed, -s   Adjust the speed element                                [number]
  --fade, -f    Set color with a slow transition. Persists.            [boolean]

Modes:
  --strobe, -o    Make the light strobe                                [boolean]
  --wave, -w      Specify a wave pattern                                [string]
  --pattern, -a   Display one of the built-in patterns                  [string]
  --sequence, -q  Run the light through a sequence of named colors     [boolean]
  --random, -m    Transition through randomized colors                 [boolean]

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
```

# Examples
```
# wave red 5 times
fabufor --wave UNKNOWN_1 --color red --repeat 5 --speed 10

# strobe teal 5 times
fabufor --strobe --color teal --led ALL --time 10 --repeat 5

# set the entire light to blue
fabufor --led ALL --color blue
```
