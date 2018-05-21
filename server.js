const lux = require('luxafor')();
const LuxColor = require('./lib/lux-color');

let debug = (process.argv.indexOf('--debug') !== -1) ? true : false;
var luxColor = new LuxColor();
lux.init(() => {
    lux.setColor(luxColor.r, luxColor.g, luxColor.b);
});
luxColor.on('time', () => {
    lux.setColor(luxColor.r, luxColor.g, luxColor.b);
    if (debug) {
        luxColor.debug();
    }
});
