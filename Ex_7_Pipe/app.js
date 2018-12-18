/*
 * create a Nodejs server that sends text read from a file in response to a http request
 * usig pipes
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res){

	console.log('request was made: ' + req.url);

	res.writeHead(200, {'content-Type': 'text/plain'});

	var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');

	myReadStream.pipe(res);


});



server.listen(3000, '127.0.0.1');
console.log('server listening to port 3000');
