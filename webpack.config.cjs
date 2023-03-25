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
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
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