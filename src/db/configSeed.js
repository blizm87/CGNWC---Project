const mongoose = require('mongoose');
mongoose.Promise = Promise
const url = process.env.MONGODB_URI || 'mongodb://localhost/cgnwc'

mongoose.connect(url)
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${url}`)
})
mongoose.disconnect(url)

module.exports = mongoose