/*

- Implement all data types including symbol and bigInt
- Implement all types of functions at least one example each
- Try exploring overloading in functions changing number of parameters but keeping function name same
- See how we are able to access a function even before its definition

*/
// 1. number
var num = 42;
console.log(typeof num, num);

// 2. string
var s = "hello";
console.log(typeof s, s);

// 3. boolean
var isTrue = true;
console.log(typeof isTrue, isTrue);

// 4. undefined
var nothing;
console.log(typeof nothing, nothing);

// 5. null
var empty = null;
console.log(typeof empty, empty);

// 6 symbol
var sym = Symbol("id");
console.log(typeof sym, sym);

// 7. bigint
var big = 1231231233n;
console.log(typeof big, big);

// 8. object
var person = {name:"alice", age:30};
console.log(typeof person, person);

console.log("======================== functions below ======================")

// functions
function greet(name){
    return "hallo, " + name;
}
console.log(greet("oscar"));

var add = function(a,b){
    return a+b;
}
console.log(add(3,4));

// 这是固定语法结构，先用大括号把他包起来表示他是表达式而不是声明
// 然后第二个括号 表示调用该参数 并传入参数
(function(num){
    console.log("IIFE executed with: ", num);
})(888);

function Person(name, age){
    this.name = name;
    this.age = age;
}
var p = new Person("Jack", 28);
console.log(p.name, p.age);

function outer(){
    var secret = "12345";
    return function inner(){
        return "The secret is " + secret;
    };
}
var reveal = outer();
console.log(reveal());
// 这里 reveal本身是个变量，值是函数对象ineer，所以reveal() 才是执行inner()


// "overload"



console.log("======================= access a function even before its definition part  ==========================")
// access a function even before its definition
// js在执行代码前，会先进行预处理（编译阶段），这时会把所有的函数声明和变量声明（用var的）提升到作用域顶部。
sayHi();

function sayHi(){
    console.log("Hi everyone!");
}
