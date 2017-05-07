const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Members = require('../models/events.js');

router.get('/', (req, res, next) => {

  Members.find(function(error, events) {
    if(error) response.json({message: 'Could not find events!' + error});

      res.json({results: events});
  });

});

module.exports = router
