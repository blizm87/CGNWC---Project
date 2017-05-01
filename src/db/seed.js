console.log('I am the seed before it runs');
require('./config.js');
// REQUIRE MODELS
const member = require('../models/members.js')

var cgnwcMember = new member({
  _id: 1234567890,
  f_name: 'Justin',
  m_name: 'Kyle',
  l_name: 'Samuels',
  fullName: 'Justin Kyle Samuels',
  title: 'Web Developer'
})

cgnwcMember.save();
