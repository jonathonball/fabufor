const yargs = require('yargs')
    .option('led', {
        group: 'Lighting:',
        alias: 'l',
        desc: 'Which light to control',
        nargs: 1,
        type: 'string'
    })
    .option('red', {
        group: 'Color Controls:',
        alias: 'r',
        desc: 'Red component',
        nargs: 1,
        type: 'string',
        number: true,
        implies: ['green', 'blue'],
    })
    .option('green', {
        group: 'Color Controls:',
        alias: 'g',
        desc: 'Green component',
        nargs: 1,
        type: 'string',
        number: true,
        implies: ['red', 'blue'],
    })
    .option('blue', {
        group: 'Color Controls:',
        alias: 'b',
        desc: 'Blue component',
        nargs: 1,
        type: 'string',
        number: true,
        implies: ['red', 'green'],
    })
    .option('color', {
        group: 'Color Controls:',
        alias: 'c',
        desc: 'The name of a color to set',
        nargs: 1,
        type: 'string',
        conflicts: ['red', 'green', 'blue']
    })
    .option('preset', {
        group: 'Color Controls:',
        alias: 'p',
        desc: 'One of the preset colors built into the hardware',
        nargs: 1,
        type: 'string',
        conflicts: ['led', 'red', 'green', 'blue', 'color']
    })
    .option('time', {
        group: 'Presentation Controls:',
        alias: 't',
        desc: 'Adjust the time interval',
        nargs: 1,
        type: 'string',
        number: true
    })
    .option('repeat', {
        group: 'Presentation Controls:',
        alias: 'e',
        desc: 'Number of times to repeat, 0 for infinite',
        nargs: 1,
        type: 'string',
        number: true
    })
    .option('speed', {
        group: 'Presentation Controls:',
        alias: 's',
        desc: 'Adjust the speed element',
        nargs: 1,
        type: 'string',
        number: true
    })
    .option('fade', {
        group: 'Presentation Controls:',
        alias: 'f',
        desc: 'Set color with a fade',
        type: 'boolean'
    })
    .option('strobe', {
        group: 'Modes:',
        alias: 'o',
        desc: 'Make the light strobe',
        type: 'boolean',
        implies: ['led', 'time', 'repeat']
    })
    .option('wave', {
        group: 'Modes:',
        alias: 'w',
        desc: 'Specify a wave pattern',
        type: 'string',
        nargs: 1,
        implies: ['repeat', 'speed'],
        conflicts: ['led', 'preset', 'strobe', 'pattern']
    })
    .option('pattern', {
        group: 'Modes:',
        alias: 'a',
        desc: 'Display one of the built-in patterns',
        type: 'string',
        nargs: 1,
        conflicts: ['led', 'red', 'blue', 'green', 'color', 'preset', 'strobe', 'wave'],
        implies: ['repeat']
    }).option('sequence', {
        group: 'Modes:',
        alias: 'q',
        desc: 'Run the light through a sequence of named colors',
        type: 'boolean',
        conflicts: ['led', 'red', 'blue', 'green', 'color', 'preset', 'strobe', 'wave']
    }).option('random', {
        group: 'Modes:',
        alias: 'm',
        desc: 'Transition through randomized colors',
        type: 'boolean',
        conflicts: ['led', 'red', 'blue', 'green', 'color', 'preset', 'strobe', 'wave', 'sequence']
    })
    .alias('h', 'help')
    .argv;

module.exports = yargs;
