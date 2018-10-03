const {Luxafor} = require('node-luxafor2');
const luxafor = new Luxafor();
const tinycolor = require('tinycolor2');
const yargs = require('./lib/yargs');
const Actions = require('./lib/actions');

luxafor.init();
var Action = null;

if (yargs.preset) {
    Action = new Actions.Preset();
} else if (yargs.strobe) {
    Action = new Actions.Strobe();
}
Action.go(luxafor, yargs);
