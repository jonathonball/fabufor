const {API} = require('node-luxafor2');

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
        process.exit(1);
    }

    getLed(led) {
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

    static isBlack(color) {
        if (color.r === 0 && color.g === 0 && color.b === 0) {
            return true;
        }
        return false;
    }

    static requireColor(args) {
        if (args.red === undefined ||
            args.green === undefined ||
            args.blue === undefined) {
            Actions.notifyExit('No color provided.');
        }
    }

}

module.exports = Actions;
