# Purpose
Fabulous front-end for using module node-luxafor2.

# Installation
Using Ubuntu:

```
$ sudo apt-get install libusb-dev libudev-dev
$ sudo echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f372" MODE="0666"' > /etc/udev/rules.d/99_luxafor.rules
$ sudo reboot
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
