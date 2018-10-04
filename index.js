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

luxafor.init();
var Action = null;

if (yargs.preset) {
    Action = new Actions.Preset();
} else if (yargs.strobe) {
    Actions.Actions.requireColor(yargs);
    Action = new Actions.Strobe();
} else if (yargs.wave) {
    Action = new Actions.Wave();
} else if (yargs.pattern) {
    Action = new Actions.Pattern();
} else {
    if (yargs.fade) {
        Actions.Actions.notifyExit('Not implemented');
    } else {
        Action = new Actions.Color();
    }
}

if (Action) {
    Action.go(luxafor, yargs);
} else {
    Actions.Actions.notifyExit('No action was specified.');
}
