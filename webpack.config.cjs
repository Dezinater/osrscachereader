const path = require('path');

module.exports = {
    entry: './src/index-dev.js',
    output: {
        filename: 'osrscachereader.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'osrscachereader',
            type: 'umd',
        },
    },
};