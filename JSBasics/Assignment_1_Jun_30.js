// 30th June-2025 : Practice Assessment 1 - JavaScript Basics

//Q1. Create a file with name basics and show all the features that you know about javascript? (minimum 5 and maximum 8 topics)
// Try explaining in 1-2 lines : example - Prototype : An object which behaves as a link between two functions and provides inheritance

// I wrote Q1 in "basics.txt", NOT "basics.js" !!!!!!!!!!!!!!!

//Q2. As javascript is not a type safe and has auto cast feature - try showing below values from the same variable
// and its type as well :values are - "Robert ", .0266, false, {myname : "Test Me"}, 25166665, undefined, true, "Robert Jr.", null, {}, -32767

/*
var temp = "Robert ";
console.log("1.", typeof temp, temp);
console.log(" ");

var temp = .0266;
console.log("2.", typeof temp, temp);
console.log(" ");

var temp = false;
console.log("3.", typeof temp, temp);
console.log(" ");

var temp = {myname : "Test Me"};
console.log("4.", typeof temp, temp);
console.log(" ");

var temp = 25166665;
console.log("5.", typeof temp, temp);
console.log(" ");

var temp = undefined;
console.log("6.", typeof temp, temp);
console.log(" ");

var temp = true;
console.log("7.", typeof temp, temp);
console.log(" ");

var temp = "Robert Jr.";
console.log("8.", typeof temp, temp);
console.log(" ");

var temp = null;
console.log("9.", typeof temp, temp);
console.log(" ");

var temp = {};
console.log("10.", typeof temp, temp);
console.log(" ");

var temp = -32767;
console.log("11.", typeof temp, temp);
console.log(" ");

// outputs are:
1. string Robert 
 
2. number 0.0266
 
3. boolean false
 
4. object { myname: 'Test Me' }
 
5. number 25166665
 
6. undefined undefined
 
7. boolean true
 
8. string Robert Jr.
 
9. object null
 
10. object {}
 
11. number -32767
 
*/

//Q3. Create a function with name showUserInfo, this function expects three params, firstname, lastname and age
//  print all the details in the given function
/*
function showUserInfo(firstname, lastname, age){
    console.log(firstname, lastname, age);
}
showUserInfo("LeBron", "James", 40);
showUserInfo("Taylor", "Swift", 35);

// outputs:
LeBron James 40
Taylor Swift 35
*/

//Q4. Create a function with name doaddition, pass three parameters and return the sum of all the three numbers
// below output needs to be monitored - doaddition(2,3,4), doaddition(2), doaddition(2.3,3), doaddition("first", 2, "three")
// analyse the outputs we get and try explaining the reasons behind!!
/*
function doaddition(a, b, c){
    console.log (a+b+c);
}
doaddition(2, 3, 4);               // output：9
doaddition(2);                     // output：NaN（2 + undefined + undefined）
doaddition(2.3, 3);                // output：NaN（2.3 + 3 + undefined）
doaddition("first", 2, "three");   // output："first2three" (String concatenation)
*/

//Q5. Give me an example of your choice for each of the below concepts
// a. closure, 
// b. hoisting, 
// c. constructor function

/* // Closure
function outer_layer(){
    var a = 10;
    return function inner_layer(){
        var b = 20;
        console.log(a);
        console.log(a+b);
    }
}
let closureExample = outer_layer();
closureExample();
// output
10
30
*/

/* // hoisting
console.log(a);
var a = 10;
// output: undefinded
*/

/* // constructor function
function User(username, password){
    this.username = username;
    this.password = password; 
    this.show_info = function(){
        console.log("my username is " + this.username + ", " + "my password is " + this.password)
    }
}
var user1 = new User("admin", "123456");
user1.show_info();

// output: my username is admin, my password is 123456
*/

//Q6. What is the purpose of call, apply and bind ? and why they are used ? whats the difference between bind and apply ?
/*
call, apply, and bind are used to change the this context of a function.
call() and apply() invoke the function immediately.
call() takes arguments separately.
apply() takes arguments as an array.
bind() does not execute the function immediately.
It returns a new function with this permanently set, useful for delayed execution.
*/

//Q7. Create an example of bind using Student object, where a function returns data with SetTimeOut and we fix it by bind.

/*
const Student = {
  name: "Alice",
  course: "JavaScript",

  showDetails: function () {
    console.log("Outer:", this.name); // correct context

    // After 2 seconds, this function runs
    setTimeout(function () {
      console.log("Inner:", this.name, "is learning", this.course); // `this` is undefined or global object
      // output: Inner: undefined is learning undefined
    }.bind(this), 2000); // Fixes `this` using bind
  }
};

Student.showDetails();
*/


//Q8. Create an example of creating object with null prototype. What would be the purpose of the same?
/*
var student = Object.create(null);
the purpose is to create a pure clean object with no inherited properties or methods
*/

//Q9. How do we merge different objects properties using Object class function
/*
// use the assign methods
const a = {x:1, y:2};
const b = {y:3, z:4};
const merge = Object.assign({}, a, b);
console.log(merge); // output: { x: 1, y: 3, z: 4 }
*/

//Q10. Create an example of arithmatic operations using BigInt and show the output of the same

const bigA = 123456n;
const bigB = 100n;

console.log("Add: ", bigA + bigB);
console.log("Subtract: ", bigA - bigB);
console.log("Multiply: ", bigA * bigB);
console.log("Division: ", bigA / bigB);

/*
output:
Add:  123556n
Subtract:  123356n
Multiply:  12345600n
Division:  1234n
*/