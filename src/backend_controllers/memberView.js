const Members = require('../models/members.js');

// GET ALL
function getAll(request, response){
  console.log('hello')
  var title = request.params.title;
  console.log(request.params)
  Members.find(function(error, members) {
    if(error) response.json({message: 'Could not find members!' + error});

    response.json({members: members});
  });
}


// GET ONE
function getOne(request, response) {
  var id = request.params.id;

  Members.findById({_id: id}, function(error, member) {
    if(error) response.json({message: 'Could not find member' + error});

      response.json({member: member});
  });
}

// GET BY TITLE
function getByTitle(request, response) {
  console.log('Hi there')
  var title = request.params.title;
  Members.find(function(error, members) {
    if(error) response.json({message: 'Could not find members!' + error});

    response.json({members: members});
  });
}

module.exports = {
  getAll: getAll,
  getOne: getOne,
  getByTitle: getByTitle
}
