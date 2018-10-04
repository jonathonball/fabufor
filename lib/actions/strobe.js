const {API} = require('node-luxafor2');
const Actions = require('./actions');

/** Runs the light through a strobe routine */
class Strobe extends Actions {

    constructor() {
        super();
        return this;
    }

    go(lux, args) {
        Actions.requireColor(args);
        let led = this.getLed(args.led);
        lux.strobe(
            led,
            args.red,
            args.green,
            args.blue,
            args.time,
            args.repeat
        );
    }

}

module.exports = Strobe;
