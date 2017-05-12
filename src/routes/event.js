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
  var strId = Id.toString();
  var newEventData = {
    'e_date': req.body.date,
    'e_time': req.body.time,
    'e_desc': req.body.description,
    'e_loc': req.body.location,
    'e_add': req.body.address,
    'myId': strId
  }

  var newEvent = new Events(newEventData)
  newEvent.save();

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
