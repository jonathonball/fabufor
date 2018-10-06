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

}

module.exports = Actions;
