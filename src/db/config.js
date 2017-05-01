const mongoose = require('mongoose');
console.log('I am the mongoose before it runs');
console.log(Promise)
mongoose.Promise = Promise
console.log('I am the url: ' + process.env.MONGODB_URI);
const url = process.env.MONGODB_URI || 'mongodb://localhost/cgnwc'
console.log('I am the mongoose!!!')


mongoose.connect(url)
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${url}`)
})

module.exports = mongoose
