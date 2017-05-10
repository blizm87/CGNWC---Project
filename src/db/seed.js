console.log('I am the seed before it runs');
require('./config.js');

// REQUIRE MODELS
const member = require('../models/members.js')
const event = require('../models/events.js')

var cgnwcMember = new member({
  f_name: 'Justin',
  m_name: 'Kyle',
  l_name: 'Samuels',
  fullName: 'Justin Kyle Samuels',
  title: 'Web Developer'
})

cgnwcMember.save();

var cgnwcEvent = new event({
  e_date: 'January 13, 2017',
  e_time: '7:30PM - 9:00PM',
  e_desc: 'Kick Off and Meet & Greet',
  e_loc: 'Ritz Carlton',
  e_add: 'Coconut Grove, FL'
})

cgnwcEvent.save();
