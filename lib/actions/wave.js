const {API} = require('node-luxafor2');
const Actions = require('./actions');

/** Runs the light through a wave routine */
class Wave extends Actions {

    constructor() {
        super();
        return this;
    }

    go(lux, args) {
        let waveType = this.getWaveType(args.wave);
        lux.wave(
            waveType,
            args.red,
            args.green,
            args.blue,
            args.repeat,
            args.speed
        );
    }

}

module.exports = Wave;
