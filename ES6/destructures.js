let x = 1;
let y = 2;
let z = 3;

[x,y,z] = [y,z,x];
console.log(x);
console.log(y);
console.log(z);

//Questions for practice

//Create an object with studentInfo, print firstname, total marks and Individual Subject Marks, using object and nested destructuring 
const student = {
    firstName : 'zhangsan', 
    masks : {math: 95, english: 92}
};

// const {firstName, masks:{math = 96, history = 88, english}} = student;
// console.log(firstName, english, math, history); //zhangsan 92 95 88

//along with that also create a lastname and Ecology as (marks) "95", without making any change in Student
const {firstName, lastName = 'happy', masks:{math = 96, history = 88, english = 85, ecology = 95}} = student;
console.log(lastName, math, english, ecology); // happy 95 92 95

//create an array of your aspirations, print first three to achieve in 2025,26,27 and keep others in ...rest operator, using array destructuring 
aspirations = {
    2025 : 'find a good job!',
    2026 : 'go to see a WorldCup Game in the United States',
    2027 : 'keep learning the underlying knowledge of code, and go to a big company in 3 years! ',
    2028 : 'Practice a hobby in your free time --- Poker magic',
    2029 : 'save enough money to buy a new car for my parents',
    2030 : 'everything fulfilled in the past 5 years !'
}

// const {2025 : goal2025, 2026 : goal2026, 2027 : goal2027, ...rest} = aspirations;
// console.log(goal2025, goal2026, goal2027);
// console.log(rest);
/*
    {
  '2028': 'Practice a hobby in your free time --- Poker magic',
  '2029': 'save enough money to buy a new car for my parents',
  '2030': 'everything fulfilled in the past 5 years !'
}
*/


//create an example of swapping, default value and other explained features of array destructuring
console.log("=====================array destructuring=========================")
let [a, b, c] = [1, 2, 3];
console.log(a,b,c); // before swapping : 1 2 3
[b, c, a] = [a, b, c]
console.log(a, b, c) // after swapping : 3 1 2

const [d = 10, e = 20 , f = 30] = [110, 220];
console.log(d, e, f) // 110 220 30

const number = [3,4,5,6,7,8,9]
const [g, h, i, j, k, ...rest] = number;
console.log(g, h, i, j, k);
console.log(rest);