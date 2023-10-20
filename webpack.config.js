const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    devServer: {
        port: 9002,
    },

    // entry: {
    //     'app': "./src/index.js",
    //     'service-worker': "./src/sw.js",
    // },
    // output: {
    //     filename: "[name].js",
    // },
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader',
                  },
                ],
            },
        ]
    }, 
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new MiniCssExtractPlugin(),
        new InjectManifest({
            swSrc:'./src/sw.js',
        }),
    ],
};
