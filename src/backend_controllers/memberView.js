const Members = require('../models/members.js');

// GET ALL
function getAll(request, response){
  Members.find(function(error, members) {
    if(error) response.json({message: 'Could not find members!' + error});

    response.json({members: members});
  });
}


// GET ONE
function getOne(request, response) {
  var id = request.params.id;

  President.findById({_id: id}, function(error, member) {
    if(error) response.json({message: 'Could not find member' + error});

      response.json({member: member});
  });
}

module.exports = {
  getAll: getAll,
  getOne: getOne
}
