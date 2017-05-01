const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

var viewMembers = require('../backend_controllers/memberView.js');

// http://127.0.0.1:3000/members
router.route('/')

  //GET all presidents
  .get(viewMembers.getAll)

router.route('/:id')

  // GET return specific president
  .get(viewMembers.getOne)

  // PATCH update existing president
  // .put(presidentsController.updatePresident)

  // DELETE remove specific president from DB
  // .delete(presidentsController.removePresident);


module.exports = router
