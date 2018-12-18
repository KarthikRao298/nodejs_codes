/*
 * Code demonstrating sync/async dir create/delete
 * */


var fs = require('fs');

fs.mkdirSync('syncDir');

fs.mkdir('asyncDir', function (){

	fs.readFile('readMe.txt','utf8', function(err, data){

		fs.writeFile('./asyncDir/writeMe.txt', data)

	
	});

});


/*
fs.unlink('./asyncDir/writeMe.txt', function (){

	fs.rmdir('./asyncDir');
});



fs.rmdirSync('syncDir');

*/
