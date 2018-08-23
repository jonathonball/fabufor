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
        describe: 'Set light using the name of an HTML color',
        type: 'string',
        conflicts: 'rgb'
    })
    .option('rgb', {
        describe: 'Set light using three space separated RGB integer values',
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
if (yargs.rgb) {
    userRgb = {
        red: yargs.rgb[0],
        green: yargs.rgb[1],
        blue: yargs.rgb[2]
    }
}

lux.init(() => {
    if (userRgb) {
        lux.setColor(userRgb.red, userRgb.green, userRgb.blue);
        if (yargs.verbose) {
            console.log("Setting color to " + userColor.name);
        }
        process.exit();
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
