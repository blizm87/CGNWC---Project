var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
  'f_name': String,
  'm_name': String,
  'l_name': String,
  'fullName': String,
  'title': String,
  'myId': String,
  createdAt: { type: Date, default: Date.now }
});

var member = mongoose.model('members', memberSchema);

module.exports = member;
