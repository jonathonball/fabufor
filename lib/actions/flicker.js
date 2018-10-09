const {API} = require('node-luxafor2');
const Actions = require('./actions');
const tinycolor = require('tinycolor2');

/** Flicker like flame, custom preset */
class Flicker extends Actions {

    constructor() {
        super();
        return this;
    }

    go(lux, args) {
        this.lux = lux;
        this.args = args;
        // randomizing the arrays here probably doesn't have an effect
        let topColors = this.topColors = Actions.randomizeArray([
            "DarkGoldenrod",
            "SaddleBrown",
            "OrangeRed",
            "Black"
        ]);
        let bottomColors = this.bottomColors = Actions.randomizeArray([
            "DarkRed",
            "OrangeRed",
            "DarkGoldenrod",
            "rgb 255 24 0",
            "Red",
            "DarkRed",
            "Black"
        ]);
        // set two of the six leds to a steady color
        this.setColorByName(API.LED.LED_1, 'DarkGoldenrod');
        this.setColorByName(API.LED.LED_4, 'OrangeRed');
        this.leds = {
            led2: {
                name: 'led2',
                led: API.LED.LED_2,
                colors: topColors,
                min: 250,
                max: 400,
                color: 'black'
            },
            led3: {
                name: 'led3',
                led: API.LED.LED_3,
                colors: topColors,
                min: 400,
                max: 700,
                color: 'black'
            },
            led5: {
                name: 'led5',
                led: API.LED.LED_5,
                colors: bottomColors,
                min: 200,
                max: 300,
                color: 'black'
            },
            led6: {
                name: 'led6',
                led: API.LED.LED_6,
                colors: bottomColors,
                min: 400,
                max: 700,
                color: 'black'
            }
        };
        console.log('Ctrl+c to quit.');
        [
            this.leds.led2,
            this.leds.led3,
            this.leds.led5,
            this.leds.led6
        ].forEach((data) => {
            this.loop(data);
        });
    }

    setColorByName(led, name) {
        let color = tinycolor(name);
        let rgb = color.toRgb();
        this.lux.color(led, rgb.r, rgb.g, rgb.b);
    }

    loop(data) {
        setInterval((data) => {
            data.color = Actions.randomArrayElement(data.colors, data.color);
            this.setColorByName(data.led, data.color);
        }, Actions.randomInt(data.min, data.max), data);
    }

}

module.exports = Flicker;
