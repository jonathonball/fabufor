const {API} = require('node-luxafor2');
const Actions = require('./actions');

/** Runs the light through a wave routine */
class ColorFade extends Actions {

    constructor() {
        super();
        return this;
    }

    go(lux, args) {
        Actions.requireColor(args);
        let led = this.getLed(args.led);
        lux.colorFade(led, args.red, args.green, args.blue, args.time);
    }

}

module.exports = ColorFade;
