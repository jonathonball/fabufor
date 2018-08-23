const lux = require('luxafor')();
const LuxColor = require('./lib/lux-color');
const hexRgb = require('hex-rgb');
const yargs = require('yargs')
    .option('verbose', {
        alias: 'v',
        describe: 'Show color information on STDOUT',
        type: 'boolean'
    })
    .option('color', {
        alias: 'c',
        describe: 'The name of a color',
        type: 'string',
        conflicts: 'rgb'
    })
    .option('rgb', {
        describe: 'Three integers describing a color',
        type: 'number',
        nargs: 3,
        conflicts: 'color'
    })
    .help('h')
    .alias('h', 'help')
    .argv;

var luxColor = new LuxColor();
var userRgb = null;

if (yargs.color) {
    let userColor = luxColor.colorNameToRgb(yargs.color);
    userRgb = hexRgb(userColor.hex);
}

lux.init(() => {
    if (yargs.verbose) {
        console.log("Setting color to " + userColor.name);
    }
    if (userRgb) {
        lux.setColor(userRgb.red, userRgb.green, userRgb.blue);
    } else {
        lux.setColor(luxColor.r, luxColor.g, luxColor.b);
    }
});

luxColor.on('time', () => {
    if (! userRgb) {
        lux.setColor(luxColor.r, luxColor.g, luxColor.b);
    }
    if (yargs.verbose) {
        luxColor.debug();
    }
});
