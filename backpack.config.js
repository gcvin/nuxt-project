module.exports = {
    webpack: (config, options, webpack) => {
        config.entry.main = './src/server/index.js'
        return config
    }
}
