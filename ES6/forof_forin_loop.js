console.log("================= for...in...loop =============")
let person = {
    fname : "Jack",
    lname : "Doe",
    age : 25,
    session : "Mern Stack"
};

for (const key in person){
    console.log(key, person[key]);
}

/*
fname Jack
lname Doe
age 25
session Mern Stack
*/


let arr = [8, 9, 10];
for (const key in arr){
    console.log(key, arr[key]);
}
/*
0 8
1 9
2 10
*/

console.log("================= for...of...loop =============")
let numbers = [8, 9, 10]
numbers.push("Himavan");
numbers["name"] = "Oscar"; // 自定义属性，for in可以遍历到，但是for of不会遍历到
for(const value of numbers){
    console.log(value);
}
/*
8
9
10
Himavan
*/

/*
一句话总结 ： for in 用于遍历对象的key， for of 用于遍历对象的value
和关键词无关，用const value in numbers 也是遍历key。
*/