/*
set - 1 
//1. What would be answer to this
	console.log("Before: ", a);
	var a = 10;
	console.log("After: ", a);
	
Before: undefinded
After: 10
	
//2. Global Scope
	// a doesn't exist in global scope

	function hoistExample() {
	  var a;
	  a = 10;
	}

	hoistExample();
	console.log(a); 

ReferenceError: a is not defined
	
//3. Function expression not hoisted

	testFunc();
	var testFunc = function funcHoist() {
	  console.log("I am being hoisted.");
	}	
TypeError: testFunc is not a function
because hoist will not happen when it is given to a variable

//4. SetTimeouts

	setTimeout(function(){
		console.log("first timeout");
		setTimeout(function(){
			console.log("inner timeout");			
		},0);	
		
		setTimeout(function(){
			console.log("second timeout");
		},2000);
		
		setTimeout(function(){
			console.log("third timeout");
		},3000);
	},5000);

in the first big brackets, everyone should have to wait for 5 seconds first, then we get "first timeout"
then the three inner timers are all set up and start counting independently — they are asynchronous
	
//5. Function Hoisting
	console.log(funcs);
	var funcs;
	function funcs(){
		funcs = 3;
	}
	funcs();
	console.log(funcs);

[Function: funcs]
3

In JavaScript, function declarations are hoisted as a whole and take precedence over variable declarations. However, at runtime, 
if a function reassigns itself (such as funcs = 3), the original function reference will be overwritten and become a normal variable.

//6. Function Hoisting
	console.log(funcs);
	var funcs;
	var funcs = function (){
		funcs = 5;
	}
	funcs();
	console.log(funcs);

undefined
5

since funcs = function(), so function does not hosting
	
//7. Create an object without prototype chain or i do not want it to be inherited further
	var x = Object.create(null)
	var y = Object.create({})
	
	console.log(x);
	console.log(y);
	// Called as a constructor
	new Object([value])
	
//8. What will be the output
	let k = "kk";
	k = "yy";
	
	const k;
	const k = "kk";
	
	const k = "ky";
	let k = "kz";

SyntaxError: Identifier 'k' has already been declared
var is function-scoped, hoisted with undefined, and allows redeclaration.
let is block-scoped, hoisted without initialization (TDZ), and cannot be redeclared.
const is block-scoped, must be initialized at declaration, and cannot be reassigned.
	
//9. Output of the following
	var x;
	console.log(typeof x);
	
	x = 5;
	console.log(typeof x);
	
	x = "MEAN";
	console.log(typeof x);

undefined
number
string

//10. Output of the following	
	var array=[1,2,3,4,5];
	console.log(array.slice(2));

[3, 4, 5]
Extract the array starting from index 2 until the end (excluding the previous elements of the original array)
	
//set 2
1. OutPut of the following

function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function(y) { return x + y; };
  }
}

console.log(sum(2,3));   // Outputs - 5
console.log(sum(2)(3));  // Outputs - 5


2. Create a function to populate user details. 
	func - populateDetail prints Adress and accepts a callBackFunction which prints Name, Age and Topic
	


function printUserBasics(user){
    console.log("Name: ", user.name);
    console.log("Age: ", user.age);
    console.log("Topic: ", user.topic);
}

function populateDetail(user, callBackFunction){
    console.log("Address: ", user.address);
    callBackFunction(user);
}
var user1 = {
    name: "Alice",
    age: 28,
    topic: "JavaScript2",
    address: "123 NewYork Street"
};
populateDetail(user1, printUserBasics);

    
3.  Javascript currying is achieved by returning functions from functions. Here, the outer function (print) supplies the printing
     to be used while the returned function allows the caller to supply the name of the printer.



function print(printFunction){
    return function(printName){
        printFunction("Printing with: " + printName);
    }
}

print(console.log)("HP LaserJet");


4. output of the following
console.log(typeof typeof 1);
string

4.1 Example of bind function on browser, we must be able to change the object on click
4.2 Create object without protoype and the inherit it futher

var base = Object.create(null);
base.role = "base";

var child = Object.create(base);
child.name = "child";

console.log(child.role);
console.log(child.name);

base
child

*/


