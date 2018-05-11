const webpack = require('webpack')

module.exports = {
    srcDir: 'src/client/',
    head: {
        titleTemplate: '%s - iview project',
        script: [
            { src: '//at.alicdn.com/t/font_552869_v7t8fglyb8tlc8fr.js' }
        ]
    },
    css: [
        '~assets/css/normalize.css',
        '~assets/css/common.css'
    ],
    router: {
        middleware: 'index'
    },
    build: {
        vendor: ['iview', 'axios', 'moment', 'jquery'],
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery'
            })
        ]
    },
    plugins: ['~plugins']
}
