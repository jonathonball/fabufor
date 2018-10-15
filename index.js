#!/usr/bin/env node

const {Luxafor} = require('node-luxafor2');
const luxafor = new Luxafor();
const yargs = require('./lib/yargs');
const Actions = require('./lib/actions');

if (yargs.color) {
    let namedColor = Actions.Actions.getUserColor(yargs.color);
    yargs.red = yargs.r = namedColor._r;
    yargs.green = yargs.g = namedColor._g;
    yargs.blue = yargs.b = namedColor._b;
}

luxafor.init();
var Action = null;

if (yargs.preset) {
    Action = new Actions.Preset();
} else if (yargs.strobe) {
    Action = new Actions.Strobe();
} else if (yargs.wave) {
    Action = new Actions.Wave();
} else if (yargs.pattern) {
    Action = new Actions.Pattern();
} else if (yargs.sequence) {
    Action = new Actions.Sequence();
} else if (yargs.random) {
    Action = new Actions.Random();
} else if (yargs.flicker) {
    Action = new Actions.Flicker();
} else {
    if (yargs.fade) {
        Action = new Actions.ColorFade();
    } else {
        Action = new Actions.Color();
    }
}

if (Action) {
    Action.go(luxafor, yargs);
} else {
    Actions.Actions.notifyExit('No action was specified.');
}
