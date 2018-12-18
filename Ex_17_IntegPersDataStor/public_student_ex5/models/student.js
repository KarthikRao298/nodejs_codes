/* @nanajjar */

var student = function(firstName,lastName,degree, program) {
    var studentObj = {
        firstName:firstName,
        lastName:lastName,
        degree:degree,
        program:program};
  
        return studentObj;
  
  };

  module.exports.student = student;