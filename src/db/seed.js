console.log('I am the seed before it runs');
require('./config.js');

// REQUIRE MODELS
const member = require('../models/members.js')
const event = require('../models/events.js')

var cgnwcMember = new member({
  _id: 1234567890,
  f_name: 'Justin',
  m_name: 'Kyle',
  l_name: 'Samuels',
  fullName: 'Justin Kyle Samuels',
  title: 'Web Developer'
})

member.find({_id: 1234567890}, function(error, member){
  if(error) {
    console.log(error)
    cgnwcMember.save();
  } else {
      console.log('Member seed data is already present!')
  }
})


var cgnwcEvent = new event({
  _id: 5678901234,
  e_date: 'January 13, 2017',
  e_time: '7:30PM - 9:00PM',
  e_desc: 'Kick Off and Meet & Greet',
  e_loc: 'Ritz Carlton',
  e_add: 'Coconut Grove, FL'
})

event.find({_id: 5678901234}, function(error, event){
  if(error) {
    console.log(error)
    cgnwcEvent.save();
  } else {
      console.log('Event seed data is already present!')
  }
})

cgnwcEvent.save();

