const mongoose = require('mongoose');
console.log('I am the mongoose before it runs');
mongoose.Promise = Promise
const url = process.env.MONGODB_URI || 'mongodb://localhost/cgnwc'
console.log('I am the mongoose!!!')


mongoose.connect(url)
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${url}`)
})

module.exports = mongoose
