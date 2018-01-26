const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const bundleConfig = require('./src/server/public/lib/bundle-config.json')
const manifest = require('./src/server/public/lib/manifest.json')
const fs = require('fs')

fs.open('./src/client/config/env.js', 'w', function (err, fd) {
    if (err) return err
    const buf = 'export default "development";'
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {
        if (err) return err
    })
})

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../views/index.ejs',
            template: './src/client/template/index.ejs',
            bundleName: '/lib/' + bundleConfig.lib.js,
            inject: false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new Visualizer({
            filename: '../views/stats.ejs'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: manifest
        }),
        new CleanWebpackPlugin('src/server/public/*.*')
    ]
})
