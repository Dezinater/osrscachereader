const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'osrscachereader.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'osrscachereader',
            type: 'umd',
        },
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: {
                    loader: "worker-loader",
                    options: {
                        filename: '[name].[hash:8].js',
                        // notice here
                        inline: "fallback"
                    }
                },
            },
        ],
    },
};