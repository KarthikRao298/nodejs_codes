/* @nanajjar */

var student = function(firstName,lastName,degree, program, graduationyear, email) {
    var studentObj = {
        firstName:firstName,
        lastName:lastName,
        degree:degree,
        program:program,
        graduationyear: graduationyear,
        email:email

    };
  
        return studentObj;
  
  };

  module.exports.student = student;