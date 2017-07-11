console.log('I am the seed before it runs');

require('./configSeed.js');
const mongoose = require('mongoose');

console.log('I am the seed after requiring configSeed');

let IdOne = mongoose.Types.ObjectId();
let strIdOne = IdOne.toString();
let IdTwo = mongoose.Types.ObjectId();
let strIdTwo = IdTwo.toString();
let IdThree = mongoose.Types.ObjectId();
let strIdThree = IdThree.toString();
let IdFour = mongoose.Types.ObjectId();
let strIdFour = IdFour.toString();
let IdFive = mongoose.Types.ObjectId();
let strIdFive = IdFive.toString();
let IdSix = mongoose.Types.ObjectId();
let strIdSix = IdSix.toString();


// REQUIRE MODELS
const member = require('../models/members.js')
const event = require('../models/events.js')

// POPULATE SCHEMA
var cgnwcMember = new member({
  f_name: 'Justin',
  m_name: 'Kyle',
  l_name: 'Samuels',
  fullName: 'Justin Kyle Samuels',
  title: 'Web Developer',
  myId: strIdOne
})

    cgnwcMember.save()

var cgnwcEvent1 = new event({
  e_date: 'January 13, 2017',
  e_time: '7:30PM - 9:00PM',
  e_desc: 'Kick Off and Meet & Greet',
  e_loc: 'Ritz Carlton',
  e_add: 'Coconut Grove, FL',
  myId: strIdTwo
})
    cgnwcEvent1.save();

var cgnwcEvent2 = new event({
  e_date: 'January 21, 2017',
  e_time: '10:30AM - 1:30PM',
  e_desc: '“CGNWC” Scholarship Mentee Meeting, Financial Literacy, Social Decorum',
  e_loc: 'KROMA Art Gallery',
  e_add: 'Coconut Grove, FL',
  myId: strIdThree
})
    cgnwcEvent2.save();

var cgnwcEvent3 = new event({
  e_date: 'March 18, 2017',
  e_time: '10:30AM - 1:30PM',
  e_desc: '“CGNWC” Scholarship Mentee Meeting, Entrepreneurism/Career Readiness, Social Decorum',
  e_loc: 'ChamberSOUTH (Chamber of Commerce)',
  e_add: 'South Miami, FL',
  myId: strIdFour
})
    cgnwcEvent3.save();

var cgnwcEvent4 = new event({
  e_date: 'April 15, 2017',
  e_time: '10:30AM - 1:30PM',
  e_desc: '“CGNWC” Scholarship Mentee Meeting, Health and Wellness, Social Decorum',
  e_loc: 'Ritz Carlton',
  e_add: 'Coconut Grove, FL',
  myId: strIdFive
})
    cgnwcEvent4.save();

var cgnwcEvent5 = new event({
  e_date: 'May 20, 2017',
  e_time: '10:30AM - 2:30PM',
  e_desc: '“CGNWC” Scholarship Mentee Meeting Last meeting. This will be an extended meeting to include a review of all covered material. Formal Dining tutorial included.',
  e_loc: 'Ritz Carlton',
  e_add: 'Coconut Grove, FL',
  myId: strIdSix
})
    cgnwcEvent5.save();

mongoose.connection.close();
