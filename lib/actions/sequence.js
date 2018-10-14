const {API} = require('node-luxafor2');
const Actions = require('./actions');
const tinycolor = require('tinycolor2');

/** Runs the light through a sequence of user specified colors */
class Sequence extends Actions {

    constructor() {
        super();
        this.sequenceIndex = 0;
        this.led = API.LED.ALL;
        return this;
    }

    go(lux, args) {
        let colors = args._;
        this.time = this.checkTime(args.time);
        this.colors = Actions.buildColorDictionary(colors);
        this.sequence = this.checkSequence(this.colors);
        lux.colorFade(this.led, ...this.getColor(), this.time);
        console.log('Ctrl+c to quit.');
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
     * Extracts color keys from a dictionary and ensures there are enough
     * @param {Object} dictionary - Keys as colors and values as tinycolors
     * @param {Array}
     */
    checkSequence(dictionary) {
        let keys = Object.keys(dictionary);
        if (! keys.length) {
            Actions.notifyExit('Missing color params');
        }
        if (keys.length < 2) {
            Actions.notifyExit('Not enough colors');
        }
        return keys;
    }

    /**
     * Gets rgb values for the current color and moves internal index
     * @return {Array} - [r, g, b]
     */
    getColor() {
        let color = this.colors[this.sequence[this.sequenceIndex]].toRgb();

        this.sequenceIndex++;
        if (this.sequenceIndex >= this.sequence.length) {
            this.sequenceIndex = 0;
        }

        return [color.r, color.g, color.b];
    }

}

module.exports = Sequence;
