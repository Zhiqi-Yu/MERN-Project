let myMap = new Map();
let myString = "key is string", objectKey = {}, functionKey = function(){}, numberKey = 2025;

myMap.set(myString, "This is a string key")
myMap.set(objectKey, "This is a object key")
myMap.set(functionKey, "This is a function key")
myMap.set(numberKey, "This is a number key")

// console.log(myMap.entries()); 1.
/* 1. output: 
[Map Entries] {
  [ 'key is string', 'This is a string key' ],
  [ {}, 'This is a object key' ],
  [ [Function: functionKey], 'This is a function key' ],
  [ 2025, 'This is a number key' ]
}
*/

// 2.
console.log(myMap.get({}));
console.log(myMap.get(objectKey));
/* 2. output
undefined
This is a object key
*/
// 说明了 在Map的get方法里，是按照地址来比较key的，而不是key的值

console.log(myMap.get(2025)); // 3.
/* 3. output
This is a number key

这里看上去好像又可以通过值来获取key了。
实际上是因为 数字是基本数据类型，在内存里是按值存储，
而之前的是引用类型，则是按地址存储
*/

// 一些基本方法
// console.log(myMap.has(functionKey)) // true
// console.log(myMap.delete(2025)) // true
// console.log(myMap.has(numberKey)) // false
// console.log(myMap.size) 



console.log("==========Set part below===========")
let mySet = new Set(["Himavan","Oscar","Ryan","Mitchell","Json"]);
console.log(mySet.entries());
console.log(mySet.add("Himavan"));
console.log(mySet.add("Jack"));
console.log(mySet.delete("Himavan"));
console.log(mySet);
console.log(mySet.size);
console.log(mySet.values());