const EventEmitter = require('events');
const namer = require('color-namer');
const stats = require('stats-lite');

class LuxColor extends EventEmitter {

    constructor() {
        super();
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.retarget();
        setInterval(() => {
            this.update();
            if (this.upToDate()) {
                this.retarget();
            }
            this.emit('time');
        }, 250);
    }

    /**
     * Return a random value
     * @param {Number} max - Max value of random number
     * @return {Number}
     */
    _random(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * Return a css style rgb() string
     * @param {Number} r - red value
     * @param {Number} g - green value
     * @param {Number} b - blue value
     * @return {String}
     */
    _rgbString(r, g, b) {
        return "rgb(" + [r, g, b].join(',') + ")";
    }

    /**
     * Return the name of the closest HTML color to the provided RGB values
     * @param {Number} r - red value
     * @param {Number} g - green value
     * @param {Number} b - blue value
     * @return {String}
     */
    _colorName(r, g, b) {
        return namer(this._rgbString(r, g, b)).html[0].name;
    }

    /**
     * Checks if targeted color is greyscale
     * Calls this.retarget() if current target is invalid
     */
    _checkTargeting() {
        let stdev = stats.stdev([this.targetR, this.targetG, this.targetB]);
        if (stdev < 50) {
            this.retarget();
        }
    }

    /**
     * Return the percentage that current is of target
     * @param {Number} current - Value to test
     * @param {Number} target - Value to test against
     * @return {Number}
     */
    _percentRemain(current, target) {
        [current, target] = (current > target) ? [target, current] : [current, target];
        let diff = Math.floor(Math.abs(target - current));
        if (diff < 3) return 0;
        return Math.floor((100 * diff) / target);
    }

    /**
     * Return distance to move an RGB value towards a target value
     * @param {Number} current - Starting value
     * @param {Number} target - Ending value
     * @param {Number} - Amount to move
     */
    _move(current, target) {
        let percentLeftToMove = this._percentRemain(current, target);
        switch (true) {
            case (percentLeftToMove > 90):
                return 8;
                break;
            case (percentLeftToMove > 75):
                return 5;
                break;
            case (percentLeftToMove > 50):
                return 3;
                break;
            case (percentLeftToMove > 20):
                return 2;
                break;
            default:
                return 1;
        }
    }

    /**
     * Determine direction an RGB value is moving and return the delta
     * @param {Number} value - Starting value
     * @param {Number} target - Ending value
     * @return {Number} - The updated value
     */
    _update(value, target) {
        if (value < target) {
            return value + this._move(value, target);
        }
        if (value > target) {
            return value - this._move(value, target);
        }
        return value;
    }

    /**
     * Apply a peicewise function to a number
     * @param {Number} n - Value to clamp
     * @return {Number} - Clamped value
     */
    _clamp(n) {
        if (n < 0) return 0;
        if (n > 255) return 255;
        return n;
    }

    /**
     * Find a new target set of RGB values
     */
    retarget() {
        this.targetR = this._random(255);
        this.targetG = this._random(255);
        this.targetB = this._random(255);
        this.targetCode = this._rgbString(this.targetR, this.targetG, this.targetB);
        this.targetName = this._colorName(this.targetR, this.targetG, this.targetB);
        this._checkTargeting();
    }

    /**
     * Move current RGB values towards the target RGB values
     */
    update() {
        this.r = this._clamp(this._update(this.r, this.targetR));
        this.g = this._clamp(this._update(this.g, this.targetG));
        this.b = this._clamp(this._update(this.b, this.targetB));
        this.name = this._colorName(this.r, this.g, this.b);
        this.code = this._rgbString(this.r, this.g, this.b);
    }

    /**
     * Determine if the current RGB values have reached the target RGB values
     * @return {Boolean}
     */
    upToDate() {
        return (
            this.r == this.targetR
            && this.g == this.targetG
            && this.b == this.targetB
        );
    }

    /**
     * Use internal data to send color information to STDOUT on every iteration
     */
    debug() {
        let output = "At " + this.code + ": " + this.name + " "
                   + "moving towards " + this.targetCode + ": " + this.targetName;
        console.log(output);
    }

}

module.exports = LuxColor;
