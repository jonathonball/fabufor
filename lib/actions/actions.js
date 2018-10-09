const {API} = require('node-luxafor2');
const tinycolor = require('tinycolor2');

/** Retrieves info from the API and relays it to the application and user */
class Actions {

    constructor() {
        return this;
    }

    getKey(keys, k) {
        if (k.toUpperCase() in keys) {
            return keys[k];
        }
        return false;
    }

    static notifyExit(msg, extra = null) {
        console.error(msg);
        if (extra) {
            console.error(Object.keys(extra).join(', '));
        }
        console.error('Try --help if you are having problems.');
        process.exit(1);
    }

    getLed(led) {
        if (! led) {
            Actions.notifyExit('Missing LED selection.  Choose from:', API.LED);
        }
        let result = this.getKey(API.LED, led);
        if (! result) {
            Actions.notifyExit('Invalid LED selection.  Choose from:', API.LED);
        }
        return result;
    }

    getPresetColor(color) {
        let result = this.getKey(API.COLOR, color);
        if (! result) {
            Actions.notifyExit('Invalid preset color.  Choose from', API.COLOR);
        }
        return result;
    }

    getWaveType(wave) {
        let result = this.getKey(API.WAVE_TYPE, wave);
        if (! result) {
            Actions.notifyExit('Invalid wave type. Choose from', API.WAVE_TYPE);
        }
        return result;
    }

    static getUserColor(userColor) {
        let color = tinycolor(userColor);
        if (color.isValid()) {
            return color;
        }
        Actions.notifyExit('Invalid color specified: ' + userColor);
    }

    static requireColor(args) {
        if (args.red === undefined ||
            args.green === undefined ||
            args.blue === undefined) {
            Actions.notifyExit('No color provided.');
        }
    }

    /**
     * Build a dictionary of tinycolor color translations
     * @param {Array} color - Array of strings representing colors
     * @return {Object}
     */
    static buildColorDictionary(colors) {
        let dictionary = {};
        [...colors].forEach((color) => {
            dictionary[color] = Actions.getUserColor(color);
        });
        return dictionary;
    }

    /**
     * Randomizes an array
     * @param {Array} arr - plain Javascript Array
     * @return {Array}
     */
    static randomizeArray(arr) {
        let length = arr.length;
        if (! length) {
            return arr;
        }
        let newIndex = 0;
        let index, temp = null;
        for (index = 0; index < length; index++) {
            newIndex = Actions.randomInt(0, length);
            temp = arr[index];
            arr[index] = arr[newIndex];
            arr[newIndex] = temp;
        }
        return arr;
    }

    /**
     * Return a random int between min inclusive and max exclusive
     * @param {Number} min - Low number in range included in output
     * @param {Number} max - High number in range not included in output
     * @return {Number}
     */
    static randomInt(min, max) {
        [min, max] = (min < max) ? [min, max] : [max, min];
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Get a random array element
     * @param {Array} arr - plain Javascript array
     * @return {Mixed}
     */
    static randomArrayElement(arr, last = undefined) {
        let index = Actions.randomInt(0, arr.length);
        if (last && arr[index] === last) {
            return Actions.randomArrayElement(arr, last);
        }
        return arr[index];
    }

}

module.exports = Actions;
