// Spread Operator - is used to spread the data present in array or object and also allows us to have a shallow copy 
// of the same.
// it is done by using three dots before the object
// 把数组/对象里的内容“展开”出来. 可以用于 复制数组/对象（浅拷贝）、合并对象

let nameList = ["Ryan", "Himavan", "Mitchell", "Oscar", "Jason"]

// console.log(nameList[0])
// console.log(...nameList)

//merging object using spread operator, similar to object.assign

var Person = {
    firstName: "Jane", address: "123 Main St", Mobile: "123-456-7890"}

var CartPurchase = {
    item: "Laptop", quantity: 1, price: 1200, address: "456 Tech Ave" }

//var ProductDelivery = {Person, CartPurchase}
var ProductDelivery = {...Person, ...CartPurchase} //while merging target object will have the precedence
console.log(ProductDelivery);

//preserves the immutability
CartPurchase.Mobile = "23012012012"
console.log(CartPurchase);




//Rest - Used as a parameter to any function and as well as in objects like array to assign rest of the array
// same way like spread we can use three dots to make it work ...

let numberList = [1,2,3,4,5,6,7,8,9]

let sum = (p1,p2,p3,p4)=>p1+p2+p3+p4

console.log(sum(numberList[0], numberList[1],numberList[2],numberList[3]));
console.log(sum(...numberList));//extract using spread operator

//using rest parameters 
//this has to be the last parameter in your function
//let largeSum = (...params) => params.reduce((prev,curr)=>prev+curr,0)

let largeSum = (...params) => {
                    return params.reduce(
                            (prev,curr)=>{
                                return prev+curr },0)
        }

console.log(largeSum(numberList[0],numberList[1],numberList[2],numberList[3]));
console.log(largeSum(...numberList));

//instead of using spread we use apply
console.log(largeSum.apply(null, numberList)) //using apply function attached with each function to accept parameters as an array


//Questions :
console.log("===Do some practice ~ ===")
//Spread Operator - 
//create a list of vaccines and print
//create doctor object and print his qualifications and other details using spread
//create a vaccine object with details like - name, no of doses required, price etc and merge it with nearest doctor object using spread
let vaccines = ["Pfizer", "Moderna", "AstraZeneca", "Covaxin"];
console.log(...vaccines);

let doctor = {
    name: "Dr. John Smith",
    qualifications: ["MBBS", "MD", "PhD"],
    experience: "15 years"
}
console.log({...doctor});

let vaccine = {
    name: "Pfizer",
    dosesRequired: 2,
    price: 50,
    storage: "Ultra-code freezer"
}
let mergeItem = {...doctor, ...vaccine};
console.log(mergeItem);

//Rest Parameter - 
//create a function which accepts start and end of number and generates a array of that size, [100....150]
//then use this array to pass as spread operator into a function named largesum
//in largesum we should accept the array in rest parameter (...arrayOfNums), and then add the numbers
function generateArray(start, end){
    let arr = [];
    for(let i = start; i <= end; i++){
        arr.push(i);
    }
    return arr;
}
let numberArray = generateArray(100, 150);
console.log("generate an array: ", numberArray);

function largeNumber(...arrayOfNums){
    return arrayOfNums.reduce((acc, curr) => acc+curr, 0);
}
console.log("large number is : ", largeNumber(...numberArray)); // 6375
