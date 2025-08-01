// 31st July - 2025 : ES6, eventloop and core JS questions

// All questions are mandatory - 14 out of 15 needs to be done, 1st question is equal to two question so can't be left
// 7th requires proper elaboration and example

// 1. How to preserve the immutability on my heroes list? Solve below problems using the same
// a. Get heroes who are not evils
// b. Print Unique family names
// c. Print Hero Names from given objects, and append sir in each of them before printing
// d. Do we have any hero in Marvel Family who is not evil

const heroes = [
  { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
  { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
  { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
  { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
  { name: 'Batman',         family: 'DC Comics', isEvil: false },
  { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
  { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
  { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
  { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
]
// Queastion a
console.log("===== Question 1 a =====")
let notEvilHeros = heroes.filter(hero => hero.isEvil === false);
console.log(notEvilHeros);
// Question b
console.log("===== Question 1 b =====")
let uniqueFamilyName = [...new Set(heroes.map(hero => hero.family))];
console.log(uniqueFamilyName);
// Question c
console.log("===== Question 1 c =====")
let heroAppendSir = heroes.map(hero => hero.name + " Sir");
console.log(heroAppendSir);
// Question d
console.log("===== Question 1 d =====")
let notEvilInMarvel = heroes.some(hero => hero.family === "Marvel" && hero.isEvil === false);
console.log(notEvilInMarvel);

/* for the question : How to preserve the immutability on my heroes list?
--> Use non-mutating array methods like filter, map, some,reduce, 
and avoid modifying original objects or arrays directly — instead, return new arrays or new objects.
*/


//2. Use the spread and rest operator to create a function which can multiply numbers from 1...n (n is the number of choice), 
//   using apply keyword we need to implement this one
console.log("===== Question 2 =====")
function multiplyNumberFrom1toN(n){
    let nums = [];
    for(let i = 1; i <= n; i++){
        nums.push(i);
    }
    return multiply2.apply(null, nums);
}
function multiply2(...numbers){
    return numbers.reduce((acc, curr) => acc * curr, 1);
}
console.log(multiplyNumberFrom1toN(5)); // 120
console.log(multiplyNumberFrom1toN(6)); // 720

//3. Print the last name through destructuring and add a contact number:9119119110 as well
const person = {
    userDetails :{
        first: "FirstName",
        last: "LastName"
    }
}
console.log("===== Question 3 =====")
let {userDetails:{last}} = person;
console.log(last);
const newPerson = {
    ...person,
    number:9119119110
}
console.log(newPerson);

//4. Give me an example of const data manipulation
console.log("===== Question 4 =====")
const a = 30;
// a = 20; // TypeError: Assignment to constant variable.
const b ={age : 20};
b.age = 15;
console.log(b); // { age: 15 }

//5. What is the difference between for-of and for-in show with examples
console.log("===== Question 5 =====")

// for_in_loop is used to iterate over the key of an object, and for_of_loop is used to iterate over the value of an object
let arr = ['a', 'b', 'c']
for(const c in arr){
    console.log(c) // 0 1 2
}
for(const d of arr){
    console.log(d) // a b c
}

//6. Give me an example of bind and write its usage, comparison with arrow function
console.log("===== Question 6 =====")

/*bind() explicitly binds this and is suitable for ordinary functions.
Arrow functions automatically inherit the outer this and cannot be used as constructors or explicitly bound. */

// no bind, no arrow function
let person1 = {
  name: 'Bob',
  greet: function () {
    setTimeout(function () {
      console.log('Hello, ' + this.name); 
    }, 1000);
  }
};
person1.greet();// Hello, undefined

// with bind, no arrow function
const person1Fixed = {
  name: 'Bob',
  greet: function () {
    setTimeout(function () {
      console.log('Hello, ' + this.name);
    }.bind(this), 1000); 
  }
};
person1Fixed.greet();// Hello, Bob

// with arrow function
const person1Fixed2 = {
  name: 'Bob',
  greet: function () {
    setTimeout(() => {
      console.log('Hello, ' + this.name);
    }, 1000); 
  }
};
person1Fixed2.greet();// Hello, Bob

//7. Create an example showing usage of event loop in concurrent execution cycle
console.log("===== Question 7 =====")

console.log("Start"); // 1. syc

setTimeout(() => {
  console.log("Timeout callback"); // 2. macro-task
}, 0);

Promise.resolve().then(() => {
  console.log("Promise resolved"); // 3. micro-task
});

console.log("End"); // 4. syc

/* output:
Start
End
Promise resolved
Timeout callback
*/

//8. create an example showing usage of short hand and default param.
console.log("===== Question 8 =====")

function createUser(name = "Guest", age = 18) {
  return {
    name, // shorthand 
    age,
    greet() { 
      console.log(`Hello, my name is ${name} and I am ${age} years old.`);
    }
  };
}

const user1 = createUser("Alice", 25);
user1.greet(); // Hello, my name is Alice and I am 25 years old.

const user2 = createUser();
user2.greet(); // Hello, my name is Guest and I am 18 years old.

//9. Create two objects with some properties and merge them using Object method and ES6 way
console.log("===== Question 9 =====")
const obj1 = { name: "Jack", age: 25, city: "CA"};
const obj2 = { city: "New York", country: "USA" };

// (1). Object.assign()
const merged1 = Object.assign({}, obj1, obj2);
console.log(merged1); // { name: 'Jack', age: 25, city: 'New York', country: 'USA' }

// (2). ES 6 spread operator
const merged2 = { ...obj1, ...obj2 };
console.log(merged2); // the same

//10. Give me an example of map and set collection each with at least four properties implemented - like get, set, clear, etc
console.log("===== Question 10 =====")

// Map
const myMap = new Map();
myMap.set('name', 'Jack');
myMap.set('age', 25);
myMap.set('city', 'New York');

console.log(myMap.get('name'));     // Jack
console.log(myMap.has('age'));      // true
console.log(myMap.size);            // 3
myMap.delete('city');
console.log(myMap.size);            // 2
myMap.clear();                      
console.log(myMap.size);            // 0

// Set
const mySet = new Set();
mySet.add('apple');
mySet.add('banana');
mySet.add('cherry');

console.log(mySet.has('banana'));   // true
console.log(mySet.size);            // 3
mySet.delete('apple');
console.log(mySet.size);            // 2
mySet.clear();                   
console.log(mySet.size);            // 0

//11. Create a promise object that get resloved after two seconds and rejected after three. Also it returns five ES6 features on resolved
console.log("===== Question 11 =====")

const myPromise = new Promise((resolve, reject) => {
  // Resolve the promise after 2 seconds
  setTimeout(() => {
    resolve([
      "let/const declarations",
      "Arrow functions",
      "spread and rest",
      "Iterators",
      "Promise"
    ]);
  }, 2000);

  // Try to reject after 3 seconds (will be ignored if already resolved)
  setTimeout(() => {
    reject("Error: Rejected after 3 seconds");
  }, 3000);
});

myPromise
  .then((features) => {
    console.log("Promise resolved with ES6 features:");
    features.forEach((f, i) => console.log(`${i + 1}. ${f}`));
  })
  .catch((error) => {
    console.log("Promise rejected:", error);
  });


//12. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)
console.log("===== Question 12 =====")
console.log("The same as Question No. 2")
//13. Use the question #11 to build promises using async and await - with multithread
console.log("===== Question 13 =====")
// Unfamiliar

//14. Create an example of generator function of your choice
console.log("===== Question 14 =====")
function* generateSquares(n){
    for(let i = 1; i <= n; i++){
        yield i * i;
    }
}
const squares = generateSquares(5);
// console.log(squares);
for(let square of squares){
    console.log(square); // 1 4 9 16 25
}

//15. Explain your knowledge on function and object protoype what is the purpose of the same - example
console.log("===== Question 15 =====")

/*
In JavaScript, both functions and objects are linked to a prototype object, 
which allows inheritance and method sharing through the prototype chain mechanism.

The prototype property of functions is used to define methods and properties shared across instances.
The __proto__ of an object points to its prototype, enabling access to inherited properties or methods.
*/
// (1). Define a base object: Employee
const Employee = {
  name: "John Doe",
  age: 30,
  position: "Software Engineer",
  skills: ["JavaScript", "React"],
  displayDetails: function () {
    console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}`);
  }
};

// (2). Add or update properties dynamically (Note: does not affect prototype chain)
Employee.department = "Engineering";
Employee.name = "Ryan"; // Overwrites existing name

// (3). Create a new object using Object.create to set Employee as prototype
const FinanceEmployee = Object.create(Employee); // Now FinanceEmployee.__proto__ === Employee
FinanceEmployee.name = "Himavan"; // Overrides inherited property
FinanceEmployee.skills = ["Finance", "Accounting"];
FinanceEmployee.address = "123 Finance St";

// Override inherited method (method shadowing)
FinanceEmployee.displayDetails = function () {
  console.log(`Finance Dept => Name: ${this.name}, Skills: ${this.skills.join(", ")}`);
};

// Call displayDetails on both objects
FinanceEmployee.displayDetails(); // Custom method
Employee.displayDetails();        // Original method from prototype

// (4). Show prototype chains
console.log(Employee.__proto__ === Object.prototype);           // true
console.log(FinanceEmployee.__proto__ === Employee);            // true

// (5). Object with null prototype (no inherited methods like toString)
const NullObject = Object.create(null);
console.log(NullObject.toString); // undefined

// (6). Merge two objects using Object.assign (not prototype-related)
const contact = { phone: "123-456-7890", address: "456 Tech Park" };
const mergedProfile = Object.assign({}, FinanceEmployee, contact);
console.log(mergedProfile);

// Check prototype of merged object (still Employee, since Object.assign copies props only)
console.log(mergedProfile.__proto__ === Employee); // false
console.log(Object.getPrototypeOf(mergedProfile) === Object.prototype); // true
console.log("===== Question End =====")