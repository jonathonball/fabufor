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

    _random(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    _rgbString(r, g, b) {
        return "rgb(" + [r, g, b].join(',') + ")";
    }

    _colorName(r, g, b) {
        return namer(this._rgbString(r, g, b)).html[0].name;
    }

    _checkTargeting() {
        let stdev = stats.stdev([this.targetR, this.targetG, this.targetB]);
        if (stdev < 50) {
            this.retarget();
        }
    }

    _percentRemain(current, target) {
        [current, target] = (current > target) ? [target, current] : [current, target];
        let diff = Math.floor(Math.abs(target - current));
        if (diff < 3) return 0;
        return Math.floor((100 * diff) / target);
    }

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

    _update(value, target) {
        if (value < target) {
            return value + this._move(value, target);
        }
        if (value > target) {
            return value - this._move(value, target);
        }
        return value;
    }

    _clamp(n) {
        if (n < 0) return 0;
        if (n > 255) return 255;
        return n;
    }

    retarget() {
        this.targetR = this._random(255);
        this.targetG = this._random(255);
        this.targetB = this._random(255);
        this.targetCode = this._rgbString(this.targetR, this.targetG, this.targetB);
        this.targetName = this._colorName(this.targetR, this.targetG, this.targetB);
        this._checkTargeting();
    }

    update() {
        this.r = this._clamp(this._update(this.r, this.targetR));
        this.g = this._clamp(this._update(this.g, this.targetG));
        this.b = this._clamp(this._update(this.b, this.targetB));
        this.name = this._colorName(this.r, this.g, this.b);
        this.code = this._rgbString(this.r, this.g, this.b);
    }

    upToDate() {
        return (
            this.r == this.targetR
            && this.g == this.targetG
            && this.b == this.targetB
        );
    }

    debug() {
        let output = "At " + this.code + ": " + this.name + " "
                   + "moving towards " + this.targetCode + ": " + this.targetName;
        console.log(output);
    }

}

module.exports = LuxColor;
