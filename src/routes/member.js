const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Members = require('../models/members.js');

router.get('/', (req, res, next) => {
  let president = req.query.president;
  let vicePresident = req.query.vicePresident;
  let resultArr = [];

  Members.find({title: president}, function(error, pres) {
    if(error) response.json({message: 'Could not find members!' + error});

    Members.find({title: vicePresident}, function(error, vps) {
      if(error) response.json({message: 'Could not find members!' + error});
      resultArr.push(vps[0]);
      resultArr.push(pres[0]);
      resultArr.push(vps[1]);

      res.json({results: resultArr});
    });
  });

});

// var viewMembers = require('../backend_controllers/memberView.js');

// http://127.0.0.1:3000/members
// router.route('/')

  //GET all presidents
  // .get(viewMembers.getAll)

// router.route('/:id')

  // GET return specific member
  // .get(viewMembers.getOne)

  // PATCH update existing member
  // .put(presidentsController.updatePresident)

  // DELETE remove specific member from DB
  // .delete(presidentsController.removePresident);


module.exports = router
