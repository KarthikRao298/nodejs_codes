
//setup express to use for routing
var express = require('express');
var app = express();

//post handling
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//session handling
var session = require('express-session');
var cookieParser = require('cookie-parser');



var studentObj = require('./models/student');

/*
 * over ride the console log method
 */
_log = console.log;
global.console.log = function() {
    var traceobj = new Error("").stack.split("\n")[2].split(":");
    var file = traceobj[0].split(process.env.PWD + '/')[1];
    var line = traceobj[1];
    var new_args = [file + ":" + line + " >>"];
    new_args.push.apply(new_args, arguments);
    _log.apply(null, new_args);
};



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/students');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('connection successful');


});

/*
 * Set a schema and create a model based on the studentInfo object.
 * Set the schema so it requires the firstName and the lastName fields.
 */
var studentSchema = new mongoose.Schema({
  
	firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        degree: String,
        program: String

});

var studModel = mongoose.model ('studModel', studentSchema);

/*
 * Save 4 or more students (student information) to the Students database.
 * You must have at least two students with the same first name (e.g. "Jade").
 * Add a link to the index.html that results in displaying a table listing all the students in the database
 */
var stud_1 = new studModel({ firstName: 'Jade', lastName: 'Bing', degree:'MS', program:'Computer Science' });
var stud_2 = new studModel({ firstName: 'Jade', lastName: 'Ros', degree:'MS', program:'Computer Science' });
var stud_3 = new studModel({ firstName: 'Chandler', lastName: 'Bing', degree:'MS', program:'Computer Science' });
var stud_4 = new studModel({ firstName: 'Rachel', lastName: 'Green', degree:'MS', program:'Computer Science' });


  stud_1.save(function (err, stud_1) {
    if (err) return console.error(err);
  });
  stud_2.save(function (err, stud_2) {
    if (err) return console.error(err);
  });
  stud_3.save(function (err, stud_3) {
    if (err) return console.error(err);
  });
  stud_4.save(function (err, stud_4) {
    if (err) return console.error(err);
  });

app.use(cookieParser());
app.use(session({secret: "nbad session secret"}));

//set view engine to EJS
app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/resources', express.static('resources'));

/*  illustration of handling a general (root) request 
 *  the route definition resposnds by sending a text response
 */
/* 
app.get('/', function (req, res) {
  res.send('This is the Student Information home page');
});
*/

/* the following illustrates handling a general (root) request by sending an HTML file 
*  this serves as the landing/home page of the application 
*  the route definition responds by sending an HTML fille
*/
var path = require('path'); //Do no forget npm install path --save
var rootDir = path.join(__dirname + '/../');
console.log("dir " + rootDir);
app.get('/', function (req, res) {
  var path = process.cwd();
  console.log("path from where node was started" + path);
  //res.sendFile(rootDir + '/views/index.html');
	
	console.log(stud_1.firstName, stud_1.lastName, stud_1.degree, stud_1.program);
	console.log(stud_2.firstName, stud_2.lastName, stud_2.degree, stud_2.program);
	console.log(stud_3.firstName, stud_3.lastName, stud_3.degree, stud_3.program);
	console.log(stud_4.firstName, stud_4.lastName, stud_4.degree, stud_4.program);


  res.sendFile(path + '/views/index.html');
});

/* the following illustrates handling a request using different routes that are used to
 * to specify user action 
 * this route definition serves as the controller for a sepecific request 
 * mapped to the URL pattern /studentInfo
*/

// our goal is to apply an MVC model to seperate the application componenets into the three modules
//this first design passes control completely to the view by
//passing the request object query string without any handling
//this would not be considered as a good design 
/*
app.get('/studentInfo*', function (req, res) {
  res.render(__dirname + '/../views/main', { student: req.query });
});
*/

//this design handles the request and sends data to the model, 
//the model returns the needed data to complete a successful response by packaging 
//it in the form the view understands and able to render/display correctly
//this design is recommended since it follows an MVC architecture
app.get('/studentInfo*', function (request, response) {
  //check if student information is stored in the session.
  var studentSessionInfo = request.session.theStudent;
  if(studentSessionInfo != null){

    response.render('main', { student: studentSessionInfo });

  }else {
      console.log("no data in the session (theStudent session attribute did not exist)");
      var path = process.cwd();
      console.log("path from where node was started" + path);
      response.sendFile(path + '/views/index.html');
    }
});

//define route handling for post requests
app.post('/studentInfo*', urlencodedParser, function (request, response) {
  //get data objects - this can be outside of this call if needed somewhere else.
  //var studentObj = require('./../models/student');

  //get the request query
  var studentReqParams = request.body;

  //printing debug message to the console
  console.log("query string is ");
  console.log(studentReqParams);

  //input validation layer would go here and can be resposnible for returning needed data
  //we will assume that if present a valid request query string and values exist 
  //if not present we show home page
  if ((Object.keys(studentReqParams).length != 0)) {
    console.log('request with query string was sent');

    //send values to model and get data object
    student = studentObj.student(studentReqParams.firstName, studentReqParams.lastName, studentReqParams.degree, studentReqParams.program);

    //printing debug message to the console
    //notice that when the request comes from the form submission it will always have parameters
    //what changes is whether values for those parameters are set (form input fields filled) or were left empty
    console.log("student data object is ");
    console.log(student);

    //before sending response add student info to session
    request.session.theStudent = student;


var studDoc = new studModel({ firstName: studentReqParams.firstName, 
							lastName: studentReqParams.lastName,
							degree:studentReqParams.degree,
							program:studentReqParams.program });

studModel.findOneAndUpdate(
    {firstName: studentReqParams.firstName, lastName:studentReqParams.lastName}, // find a document with that filter

    {$set : { firstName: studentReqParams.firstName, 
							lastName: studentReqParams.lastName,
							degree:studentReqParams.degree,
							program:studentReqParams.program }}, // document to insert when nothing was found, TBD in a better way
	
	
	//studDoc,/* TBD : why this doesn't work */
	{upsert: true, new: true, runValidators: true}, // options
    function (err, doc) { // callback
    console.log("student data object is ");

					var student = { firstName: studentReqParams.firstName, 
							lastName: studentReqParams.lastName,
							degree:studentReqParams.degree,
							program:studentReqParams.program };

        if (err) {
    console.log("Error ");
			
            console.error(err);
    response.render('main', { student: student, name:"test name" });
        } else {
    console.log("Record has been inserted/updated ");
			
            // handle document
			    //ready to send response. Pass the data to the correct view
    response.render('main', { student: student, name:"test name" });

        }
    }
);

	  
  }
  else {
    console.log("request did not includ any parameters");
    var path = process.cwd();
    console.log("path from where node was started" + path);
    response.sendFile(path + '/views/index.html');
  }
});


/*
 * display page
 */ 
app.get('/display', function(req,res){
    console.log(req.query);
/*
	var student_1 = new studentObj.student ( 'Jade1', 'Bing', 'MS', 'Computer Science' );
	var student_2 = new studentObj.student ( 'Jade2', 'Bing', 'MS', 'Computer Science' );
	var student_3 = new studentObj.student ( 'Jade3', 'Bing', 'MS', 'Computer Science' );
	var student_4 = new studentObj.student ( 'Jade4', 'Bing', 'MS', 'Computer Science' );

	var studentList = [student_1,student_2, student_3, student_4];
*/


 
		studModel.find(function (err, studs) {
			if (err) return console.error(err);
			//console.log(studs);
		}).then( function (doc){

//			console.log(doc);


			console.log(doc.length);
			res.render('display',{studentList: doc});

		})
	



});

/*
 * Add a search box (input field) that will accept a student first name as input 
 * and results in displaying a table listing all students in the database that
 * match the string provided in the search box
 *
 */

//define route handling for post requests
app.post('/display*', urlencodedParser, function (req, res) {

  //get the request query
  var studentReqParams = req.body;

  //printing debug message to the console
  console.log("query string is ");
  console.log(studentReqParams);

  if ((Object.keys(studentReqParams).length != 0)) {
    console.log('request with query string was sent, studentReqParams.firstName:',studentReqParams.firstName);

		studModel.find({'firstName':studentReqParams.firstName}, function (err, studs) {
			if (err) return console.error(err);
			//console.log(studs);
		}).then( function (doc){

			studentList1 = [doc];
		//	console.log(studentList1);
			console.log(studentList1.length);


			res.render('display',{studentList: doc});
		})


  }
  else {
    console.log("request did not includ any parameters");
    var path = process.cwd();
    console.log("path from where node was started" + path);
    response.sendFile(path + '/views/index.html');
  }
});





// this route defintion illustrates using a list of route params
// another illustration not seperating the controller module from the model module
// mainly to show using route params working
/*
app.get('/studentInfo/:firstName/:lastName/:degree/:program', function (request, response) {
  var sentFirstName = request.params.firstName;
  var sentLastName = request.params.lastName;
  var sentDegree = request.params.degree;
  var sentProgram = request.params.program;

  //create data
  //this illustrates not defining functions for the data objects and having the model created within the controller
  //this is not recommended since it doesn't provide a clear seperation of MVC modules
  var student = { firstName: sentFirstName, lastName: sentLastName, degree: sentDegree, program: sentProgram };
  console.log("student data object is ");
  console.log(student);
  //ready to send response. Pass the data to the correct view
  response.render('main', { student: student });
});
*/




//start local server and listen on the default HTTP port 8080
app.listen(8080, '127.0.0.1');
