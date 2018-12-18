/*
 * Create a module function called sumArray that takes in an array of integers and returns
 * the sum of the array elements.
 *
 * Create a JS file with the name <your NinerNET username>App.js
 * (for me as an example this would be nanajjarApp.js). This file should call the
 * sumArray function passing in an example array and displaying the total on the console.
 *
 * Test your files by running the following command: node <your NinerNET username>App
 *
 * Take a screenshot of the output on your console.
 */

function sumArray (inputArr) {

	var sum = 0;
	for (var i=0; i<inputArr.length; i++){
	
	sum = sum + inputArr[i];
	}
	return sum;
}


var intArr = [1,2,3,4,5,6,7,8,9,10];
var sum = sumArray(intArr);
console.log("The sum of the array is",sum);


