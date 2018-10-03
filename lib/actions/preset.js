const {API} = require('node-luxafor2');
const Actions = require('./actions');

/** Sets the light to a factory defined color */
class Preset extends Actions {

    constructor() {
        super();
        return this;
    }

    go(lux, args) {
        let color = this.getPresetColor(args.preset);
        lux.simpleColor(color);
    }

}

module.exports = Preset;
