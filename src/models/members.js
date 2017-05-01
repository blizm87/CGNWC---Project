var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
  '_id': Number,
  'f_name': String,
  'm_name': String,
  'l_name': String,
  'fullName': String,
  'title': String,
  createdAt: { type: Date, default: Date.now }
});

var member = mongoose.model('members', memberSchema);

module.exports = member;
