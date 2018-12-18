/*
 * create a Nodejs server that can can deliver multiple responses to http request
 */


var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res){

	console.log('request was made: ' + req.url);

	res.writeHead(200, {'content-Type': 'text/html'});

	if (req.url === '/home'|| req.url ==='/'){

	var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
	myReadStream.pipe(res);

	} else if  (req.url === '/item'){
	
	res.writeHead(200, {'content-Type': 'text/html'});		
	fs.createReadStream(__dirname + '/item.html', 'utf8').pipe(res);
	

	} else if  (req.url === '/api/ninjas'){
	
			var myObj = [{
		name: 'Ryu',
		age:21,
	}, {name: 'Mia',
		age:23,}];

	res.writeHead(200, {'content-Type': 'application/json'});
	res.end(JSON.stringify(myObj));

	} else {
	
	res.writeHead(200, {'content-Type': 'text/html'});
	fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
	
	
	}

});



server.listen(3000, '127.0.0.1');
console.log('server listening to port 3000');
