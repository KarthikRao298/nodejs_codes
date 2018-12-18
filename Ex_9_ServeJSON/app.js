/*
 * reate a Nodejs server that sends JSON data in response to a http request
 */


var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res){

	console.log('request was made: ' + req.url);

	res.writeHead(200, {'content-Type': 'application/json'});

//	var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');

//	myReadStream.pipe(res);
	var myObj = {
		name: 'Ryu',
		age:21,
		job:'Ninja'
	};

	res.end(JSON.stringify(myObj));

});



server.listen(3000, '127.0.0.1');
console.log('server listening to port 3000');

