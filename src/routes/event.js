const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Events = require('../models/events.js');

router.get('/', (req, res, next) => {

  Events.find(function(error, events) {
    if(error) res.json({message: 'Could not find events!' + error});

      res.json({results: events});
  });

});

router.post('/', (req, res, next) =>{
  Events.insertOne(function(error, events){
    if(error) res.json({message: 'Could not insert entry!' + error})

    var newEvent = new eventSchema({
      'e_date': String, // Posted data from params post
      'e_time': String, // Posted data from params post
      'e_desc': String, // Posted data from params post
      'e_loc': String, // Posted data from params post
      'e_add': String, // Posted data from params post
    })

    newEvent.save();

    res.send('Entry has been inserted');
  })
})

router.delete('/:id', (req, res, next) => {
  Events.findOneAndRemove({_id: req.params.id}, function(err){
    if(err) {
      console.log(err);
    }

    console.log('Event has sucessfully been deleted!');
  })
})

module.exports = router
