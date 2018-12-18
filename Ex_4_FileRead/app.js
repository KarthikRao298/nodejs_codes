/*
 * Code demonstrating sync/async file read/write
 * */


var fs = require('fs');

/* Sync calls */
var readMe = fs.readFileSync('readMe.txt','utf8');

console.log(readMe);

fs.writeFileSync('writeMe.txt', readMe);

/* Async read call */
fs.readFile('readMe.txt','utf8', function(err, data){

	console.log(data);


});


console.log('calling async write call');


/* Async write call */
fs.readFile('readMe.txt','utf8', function(err, data){

	fs.writeFile('writeMe2.txt', data, function(err, data){

		console.log('data has been written to writeMe2.txt');
	});
});


console.log('This will be printed first');

