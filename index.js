const {Luxafor} = require('node-luxafor2');
const luxafor = new Luxafor();
const yargs = require('./lib/yargs');
const Actions = require('./lib/actions');
const tinycolor = require('tinycolor2');

let userColor = yargs.color;
if (userColor) {
    userColor = tinycolor(yargs.color).toRgb();
    yargs.red = yargs.r = userColor.r;
    yargs.green = yargs.g = userColor.g;
    yargs.blue = yargs.b = userColor.b;
}

if (yargs.color && Actions.Actions.isBlack(yargs)) {
    console.warn("Warning: You specified a color but the result was black.");
}
if (yargs.red === undefined || yargs.green === undefined || yargs.blue === undefined) {
    Actions.Actions.notifyExit('No color provided.');
}

luxafor.init();
var Action = null;

if (yargs.preset) {
    Action = new Actions.Preset();
} else if (yargs.strobe) {
    Action = new Actions.Strobe();
} else if (yargs.wave) {
    Action = new Actions.Wave();
}

if (Action) {
    Action.go(luxafor, yargs);
} else {
    Actions.notifyExit('No action was specified.');
}
