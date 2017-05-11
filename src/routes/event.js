const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Events = require('../models/events.js');
var Id = mongoose.Types.ObjectId();

router.get('/', (req, res, next) => {

  Events.find(function(error, events) {
    if(error) res.json({message: 'Could not find events!' + error});

      res.json({results: events});
  });

});

router.post('/', (req, res, next) =>{
  console.log('I AM THE POST FOR ADDING EVENT')
  console.log(req.body)
  console.log(Id)
  var strId = Id.toString();
  console.log(typeof strId)

  var newEventData = {
    'e_date': req.body.date,
    'e_time': req.body.time,
    'e_desc': req.body.description,
    'e_loc': req.body.location,
    'e_add': req.body.address,
    'myId': strId
  }

  console.log(newEventData)

  var newEvent = new Events(newEventData)
  newEvent.save();
  console.log(process.env.PORT)
  const url = 'localhost:'+process.env.PORT+'/#!/events' || 'localhost:3000/#!/events';
  console.log(url)
  res.redirect(url)
})

router.delete('/:id', (req, res, next) => {
  console.log('I AM THE DELETE BUTTON')
  Events.findOneAndRemove({myId: req.params.id}, function(err){
    if(err) {
      console.log(err);
    }
    console.log('Event has sucessfully been deleted!');
  })
})

module.exports = router
