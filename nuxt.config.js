const webpack = require('webpack')

module.exports = {
    srcDir: 'src/client/',
    head: {
        titleTemplate: '%s - Nuxt',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
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
    loading: {
        color: '#2d8cf0'
    },
    build: {
        extractCSS: true,
        vendor: ['iview', 'axios', 'moment', 'jquery'],
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery'
            })
        ]
    },
    plugins: ['~plugins']
}
