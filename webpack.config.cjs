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
    optimization: {
        minimize: false
    },
    resolve: {
        fallback: {
            crypto: false,
            fs: false,
            path: false
        }
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
            {
                test: /\.wasm$/,
                type: "asset/inline",
            },
        ],
    },
};