const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')

const lib = [
    'pdfmake/build/pdfmake.min.js',
    'pdfmake/build/vfs_fonts.js',
    'moment',
    'jquery',
    'iview',
    'vue',
    'vue-router',
    'axios',
    'vanilla-tilt'
]

module.exports = {
    devtool: '#source-map',
    entry: {
        lib: lib
    },
    output: {
        path: path.join(__dirname, './src/server/public/lib'),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join('./src/server/public/lib', 'manifest.json'),
            name: '[name]',
            context: __dirname
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: path.join(__dirname, './src/server/public/lib')
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}
