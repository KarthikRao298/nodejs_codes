/*
 * code demonstrating creating a server in nodejs
 *
 */
var http = require('http');

var server = http.createServer(function (req,res){

	console.log('request was made: ' + req.url);

	res.writeHead(200, {'content-Type': 'text/plain'});
	res.end ('Hello sample text');


});



server.listen(3000, '127.0.0.1');
console.log('server listening to port 3000');
