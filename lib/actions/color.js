const {API} = require('node-luxafor2');
const Actions = require('./actions');

/** Runs the light through a wave routine */
class Color extends Actions {

    constructor() {
        super();
        return this;
    }

    go(lux, args) {
        Actions.requireColor(args);
        let led = this.getLed(args.led);
        lux.color(led, args.red, args.green, args.blue);
    }

}

module.exports = Color;
