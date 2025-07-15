//Question :
///////////////////////////

let persons = [
    {id : 1, name : "John", tags : "javascript"},
    {id : 2, name : "Alice", tags : "dontnet"},
    {id : 3, name : "Roger", tags : "java"},
    {id : 4, name : "Adam", tags : "javascript"},
    {id : 5, name : "Alex", tags : "java"}
];

//1. List the person with javascript tag
console.log("================ Question 1: ================");
let jsPerson = persons.filter( person => person.tags === "javascript");
console.log(jsPerson);

//2. List the name of person using java and put programmer after their name, change the name key to Developer
console.log("================ Question 2: ================");
let updatedJavaPerson = persons.map( person => {
    if(person.tags === "java"){
        return {
            id: person.id,
            Developer: person.name + " programmer",
            tags: person.tags
        };
    }
    return person;
})
console.log(updatedJavaPerson);

//3. If we have anyone with tag python
console.log("================ Question 3: ================");
let anyPythonPerson = persons.some( person => person.tags === "python");
console.log(anyPythonPerson);

//4. Find the number of unique tags and their count present in list
console.log("================ Question 4: ================");
let tagCount = persons.reduce((acc, curr) => {
    acc[curr.tags] = acc[curr.tags] ? acc[curr.tags] + 1 : 1;
    return acc;
}, {})
console.log(tagCount);

//5. create a funtion with name multiply which accepts three parameters, and returns multiplication of all
//   but if we dont pass any parameter it returns 0
console.log("================ Question 5: ================");
function multiply(a = 1, b = 1, c = 1){
    if(arguments.length === 0){
        return 0;
    }
    return a*b*c;
}
multy1 = multiply(2, 3, 5);
multy2 = multiply(6, 8);
multy3 = multiply();
console.log(multy1, multy2, multy3);

//6. create an array of 1 - 5 and add arr[newval] = at 6th place, print the output using for of and for in loop
console.log("================ Question 6: ================");
let arr2 = [1,2,3,4,5];
arr2["newval"] = "at 6th place";
console.log("===for..of loop===");
for(const value of arr2){
    console.log(value);
} // only get values

console.log("===for..in loop===");
for(const key in arr2){
    console.log(key, arr2[key]);
} // get every keys

//7. create an example of const where we can update on property of the object, where it says const is mutable
console.log("================ Question 7: ================");
const User = {
    userId: "123",
    userName: "Oscar",
    password: "123456"
}
console.log("Original User: ");
console.log(User);

User.userName = "Mike";
User.password = "987654";
console.log("User after change: ");
console.log(User);
// User = {fname: "Joe"} // TypeError: Assignment to constant variable.

//8. create a for loop using var and let, print each value in timeout after 2 second and try to 
//   demonstrate functional scope of var and lexical of let 
console.log("================ Question 8: ================");
console.log("===Using var===");
for(var i = 1; i <= 3; i ++){
    setTimeout(() => {
        console.log(i);
    }, 2000);
} // output 4 4 4 

console.log("===Using let===");
for(let j = 1; j <= 3; j ++){
    setTimeout(() => {
        console.log(j);
    }, 2000);
} // output 1 2 3
/*
The i declared by var in the loop is function scope, and all callbacks share the same i. When it is printed 2 seconds later, i has become 4.

let is block scope, and a new j is generated each time the loop is executed. The timer callback captures the value of j at that time.
*/

//9. Create an example of object destructuring using student with details 
console.log("================ Question 9: ================");
const student = {
    studentId: 112350,
    firstName: "Jennifer",
    lastName: "Perry",
    age: 20,
    marks:{
        math: 80,
        science: 92,
        biology: 86
    }
}
const{studentId, firstName, marks:{science}} = student;
console.log(studentId); // 112350
console.log(firstName); // Jennifer
console.log(science); // 92
// console.log(biology); // biology is not defined.

//10. Demonstrate all aspects of array destructuring - including -> rest,  swap and other points
console.log("================ Question 10: ================");
const {lastName, age, ...restObg} = student;
console.log(restObg);

const arr5 = [10, 20, 30];
let [a, b, c] = arr5;
[b, c, a] = [a, b, c];
console.log(a, b, c); // 30 10 20