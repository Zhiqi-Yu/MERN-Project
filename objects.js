// Objects :  Are a collection of key-value pairs, where keys are strings and values can be any data type.
// They are used to store and manage data in a structured way. Are reference type data structures that allow you to group related data and functionality together.
// Objects can be created using object literals, constructors, or the Object.create() method.

// Example of an object literal // a class like structure
// This object represents an employee with properties and methods.
var Employee = {
    name: "John Doe",
    age: 30,
    position: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js"],
    
    // Method to display employee details
    displayDetails: function() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}`);
    }
}

//Employee.name = "Mitchell"; // Updating the name property
//Employee.displayDetails(); // Output: Name: John Doe, Age: 30, Position: Software Engineer
//Employee.name = "Ryan"; // Updating the name property //will not reflect in ln:20 execution

// We can also add new properties or methods to the object
// Employee.department = "Engineering"; // Adding a new property
// Employee.displayDetails = function() { // Updating the displayDetails method
//     console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}, Department: ${this.department}`);
// }
// Employee.displayDetails(); // Output: Name: John Doe, Age: 30, Position: Software Engineer, Department: Engineering

// Example of extending an object with object contructor method -
// 1. Using New keyword

// var FinanceEmployee = new Object(Employee); // Creating a new object based on Employee
// FinanceEmployee.name = "Himavan"; // Updating the name property

// FinanceEmployee.displayDetails(); // Output: Name: John Doe, Age: 30, Position: Software Engineer

//Employee.displayDetails(); //Name: Himavan, Age: 30, Position: Software Engineer

// 2. Using Object.create() method
// This method creates a new object with the specified prototype object and properties.
// It allows for inheritance and is a more efficient way to create objects that share properties and methods

var FinanceEmployee = Object.create(Employee); // Creating a new object based on Employee
FinanceEmployee.name = "Himavan"; // Updating the name property
FinanceEmployee.skills = ["Finance", "Accounting"]; // Adding new skills
FinanceEmployee.address = "123 Finance St"; // Adding a new property

//FinanceEmployee.displayDetails(); // Output: Name: John Doe, Age: 30, Position: Software Engineer

// method overriding
FinanceEmployee.displayDetails = function() { // Updating the displayDetails method
    console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}, Address: ${this.address}, Skills: ${this.skills.join(", ")}`);
}

FinanceEmployee.displayDetails();

Employee.displayDetails(); //Name: Himavan, Age: 30, Position: Software Engineer

//this whole stuff is possible because of prototypal inheritance in JavaScript.

console.log(FinanceEmployee.__proto__); // Output: Employee object, showing that FinanceEmployee inherits from Employee

//3. Empty Prototype Object
// You can also create an empty object and then add properties and methods to it.
var EmptyObject = {}; // Creating an empty object
console.log(EmptyObject.__proto__);

// 4. Null Prototype Object
// You can create an object with a null prototype, which means it does not inherit from Object 
var NullPrototypeObject = Object.create(null); // Creating an object with a null prototype
console.log(NullPrototypeObject.__proto__); // Output: null, showing that it does


// 5. Merging Objects
// You can merge multiple objects into one using Object.assign() or the spread operator.
var Person = {
    firstName: "Jane", address: "123 Main St", Mobile: "123-456-7890"}

var CartPurchase = {
    item: "Laptop", quantity: 1, price: 1200, address: "456 Tech Ave" }

var ProductDelivery = {Person, CartPurchase}

console.log(ProductDelivery); // Output: { Person: { firstName: 'Jane', address: '123 Main St', Mobile: '123-456-7890' }, CartPurchase: { item: 'Laptop', quantity: 1, price: 1200, address: '456 Tech Ave' } }

// CartPurchase.Mobile = "123-456-0987"; // Updating the Mobile property in CartPurchase

// console.log(ProductDelivery); //it does not follow the immutability principle

// Mergin using Object.assign()
// the properties of the second object will overwrite the properties of the first object if they have the same key.
// This is useful for combining data from multiple sources or for creating a new object with properties from
var MergedObject = Object.assign({}, Person, CartPurchase); // Merging objects into 

console.log(MergedObject); // Output: { firstName: 'Jane', address: '456 Tech Ave', Mobile: '123-456-0987', item: 'Laptop', quantity: 1, price: 1200 }

CartPurchase.Mobile = "123-456-0987"; // Updating the Mobile property in MergedObject

console.log(MergedObject); // Follow the immutability principle, so the original object remains unchanged


// Create a Person object with properties and methods
// Extend/ Inherit the person as a student

// Create an account object with amount details and ask for credit or debit card to be delivered at new address
// Merge the student, and account objects into a new object called UserAccount