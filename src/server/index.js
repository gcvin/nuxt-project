import express from 'express'
import path from 'path'
// import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import { Nuxt, Builder } from 'nuxt'

import router from './router'
import mongoose from './db'

let config = require('../../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Init Nuxt.js
const nuxt = new Nuxt(config)

const app = express()
const MongoStore = require('connect-mongo')(session)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
// will print stacktrace
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: err
    })
})

const server = app.listen(process.env.PORT || 4000, function () {
    const port = server.address().port
    console.log(`Server listening at http://localhost:${port}`)
})

export default app
