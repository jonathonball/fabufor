const {API} = require('node-luxafor2');
const Actions = require('./actions');

/** Runs the light through a built-in routine */
class Pattern extends Actions {

    constructor() {
        super();
        return this;
    }

    getPattern(pattern) {
        let result = this.getKey(API.PATTERNS, pattern);
        if (! result) {
            Actions.notifyExit('Invalid pattern type. Choose from', API.PATTERNS);
        }
        return result;
    }

    go(lux, args) {
        let pattern = this.getPattern(args.pattern);
        lux.pattern(pattern, args.repeat);
    }

}

module.exports = Pattern;
