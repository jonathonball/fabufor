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

    notifyExit(msg, extra = null) {
        console.error(msg);
        if (extra) {
            console.error(Object.keys(extra).join(', '));
        }
        process.exit(1);
    }

    getLed(led) {
        let result = this.getKey(API.LED, led);
        if (! result) {
            this.notifyExit('Invalid LED selection.  Choose from:', API.LED);
        }
        return result;
    }

    getPresetColor(color) {
        let result = this.getKey(API.COLOR, color);
        if (! result) {
            this.notifyExit('Invalid preset color.  Choose from', API.COLOR);
        }
        return result;
    }

}

module.exports = Actions;
