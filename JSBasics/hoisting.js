// var _name = "wangwu";
function Print(){
    console.log(_name);
    // var _name = "zhangsan";

}
var _name = "zhaoliu";
Print();
// var _name = "lisi";

console.log("=============")
console.log(PrintMyName); // undefined - function expression is not hoisted
PrintMyName();
/* 
PrintMyName(); // TypeError: PrintMyName is not a function - as it is hoisted
as a variable with value undefined
如果这行注释掉的话，在上面console.log() 执行的时候 就会报错，因为PrintMyName是提升上去了，
但是是undefined
*/
var PrintMyName = function() {
    console.log("PrintMyName Function is executed");
}