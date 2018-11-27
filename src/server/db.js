import mongoose from 'mongoose'
import bluebird from 'bluebird'

// import config from './config'

mongoose.Promise = bluebird

const DB_URL = 'mongodb://gcvin:gcvin@ds119565.mlab.com:19565/mongo'
// const DB_URL = config.DB.url

mongoose.connect(DB_URL)

mongoose.connection.on('connected', function() {
  // console.log('Mongoose connection open to ' + DB_URL)
})

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

export default mongoose
