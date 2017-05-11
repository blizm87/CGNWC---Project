var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  'e_date': String,
  'e_time': String,
  'e_desc': String,
  'e_loc': String,
  'e_add': String,
  createdAt: { type: Date, default: Date.now }
});

var event = mongoose.model('events', eventSchema);

module.exports = event;
