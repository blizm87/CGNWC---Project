const mongoose = require('mongoose');
mongoose.Promise = Promise
const url = process.env.MONGODB_URI || 'mongodb://localhost/cgnwc'

mongoose.connect(url)
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${url}`)
}, function(err){
  console.log('I am the error');
  console.log(err)
})

module.exports = mongoose
