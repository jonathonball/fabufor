const luxafor = require('node-luxafor2')();
const tinycolor = require('tinycolor2');
const yargs = require('./lib/yargs');

//const isPresetColor = property => property in luxafor.API.COLOR;

const getPresetColor = function(color) {
    color = color.toUpperCase();
    if (! color in luxafor.API.COLOR) {
        console.error('Invalid preset color.  Choose from:');
        console.error(Object.keys(luxafor.API.COLOR).join(', '));
        process.exit(1);        
    }
    return luxafor.API.COLOR[color];
}

const getLed = function(led) {
    led = led.toUpperCase();
    if (! led in luxafor.API.LED) {
        console.error('Invalid LED selection.  Choose from:');
        console.error(Object.keys(luxafor.API.LED).join(', '));
        process.exit(1);
    }
    return luxafor.API.LED[led];
}

luxafor.init();

if (yargs.preset) {
    luxafor.simpleColor(getPresetColor(yargs.preset));
} else if (yargs.strobe) {
    luxafor.strobe(
        getLed(yargs.led),
        yargs.red,
        yargs.green,
        yargs.blue,
        yargs.time,
        yargs.repeat
    );
}
