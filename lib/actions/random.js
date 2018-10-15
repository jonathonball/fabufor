const {API} = require('node-luxafor2');
const Actions = require('./actions');
const tinycolor = require('tinycolor2');

/** Runs the light through a sequence of random colors */
class Random extends Actions {

    constructor() {
        super();
        this.sequenceIndex = 0;
        this.led = API.LED.ALL;
        return this;
    }

    go(lux, args) {
        console.warn('Ctrl+c to quit.');
        let colors = args._;
        this.verbose = args.verbose;
        this.time = this.checkTime(args.time);
        this.fadeTime = (this.time <= 255) ? this.time : 255;
        lux.colorFade(this.led, ...this.getColor(), this.fadeTime);
        this.loop(lux);
    }

    /**
     * Runs through the sequence
     * @param {Luxafor} - instance of node-luxafor2
     */
    loop(lux) {
        setInterval((lux) => {
            lux.color(this.led, ...this.getColor());
        }, this.time + 10, lux);
    }

    /**
     * Checks that time value exists and is number
     * @param {Number} time
     * @return {Number}
     */
    checkTime(time) {
        if (! time) {
            Actions.notifyExit('Missing time param');
        }
        if (isNaN(time)) {
            Actions.notifyExit('Time param must be number');
        }
        return time;
    }

    /**
     * Gets rgb values for the current color
     * @return {Array} - [r, g, b]
     */
    getColor() {
        let color = tinycolor.random().toRgb();
        if (this.verbose) {
            console.log(color);
        }
        return [
            Math.floor(color.r),
            Math.floor(color.g),
            Math.floor(color.b)
        ];
    }

}

module.exports = Random;
