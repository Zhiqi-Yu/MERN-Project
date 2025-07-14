// Iterators are pointers to the Iterable collections which allows us to run through the each object and extract, update/mutate the subset
// with these Iterators we are allowed to have preservation of immutability principal alive.

// Filter, Map, Some and Reduce - methods/iterators added to each array of objects or array of data
// Four new Iterators are included to achieve these funcationalities
// 1. Filter, 2. Map, 3. Some , 4. Reduce

let personsList = [
    {id : 1, name : "John", savedby : "CaptainAmerica"},
    {id : 2, name : "Alice", savedby : "SpiderMan"},
    {id : 3, name : "Roger", savedby : "CaptainAmerica"},
    {id : 4, name : "Adam", savedby : "IronMan"},
    {id : 5, name : "Alex", savedby : "SpiderMan"},
    {id : 6, name : "Robin", savedby : "Batman"}
]

// filter：筛选符合条件的元素，返回子集数组（长度 ≤ 原数组）
console.log("================= filter =============")
let spiderManPeople = personsList.filter(person => person.savedby === "SpiderMan");
console.log(spiderManPeople);

// map：对每个元素执行操作，返回转换后的数组（长度 = 原数组）
console.log("================= map =============")
let spiderManNames = personsList.map(person => person.savedby === "SpiderMan" ? person.name : "");
console.log(spiderManNames);
let spiderManNames2 = personsList.map(person => person.savedby === "SpiderMan" ? person.name : "").filter(p => p!="");
console.log(spiderManNames2);

// some 就是 看看有没有符合条件的，只要有一个就返回true
console.log("================= some =============")
let anyOneSavedByHulk = personsList.some(person => person.savedby === "Hulk");
console.log(anyOneSavedByHulk); // false
let anyOneSavedByIronMan = personsList.some(person => person.savedby === "IronMan");
console.log(anyOneSavedByIronMan); // true

/*
reduce 是用来遍历数组并累积计算的函数，它会把每次迭代的“累加结果”传给下一次，最终返回一个值（可以是数字、对象、数组等）。
prevVal → 累加器，存储上一次迭代的结果
currVal → 当前遍历的数组元素
index → 当前元素在数组中的索引（从 0 开始）
list → 调用 reduce 的原始数组
*/
console.log("================= reduce =============")
let uniqueSuperHeroes = personsList.reduce((prevVal, currVal, index, list) => {
    // console.log("currVal", currVal);
    // console.log("prevVal", prevVal);

    prevVal[currVal.savedby] = prevVal[currVal.savedby] ? prevVal[currVal.savedby] + 1 : 1

    return prevVal;
}, {})

console.log(uniqueSuperHeroes);