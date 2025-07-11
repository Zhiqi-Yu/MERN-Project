function add(a, b){
    return a + b;
}
console.log(add(3, 4)); // 7

const add2 = (c, d) => c + d;
console.log(add2(6, 7)); // 13

const square = x => x * x;
console.log(square(8)); // 64

console.log("part 2 ========================")

let User = {
    firstName : "zhangsan",
    addr : "123 NewYork Street",
    getUserDetails : function(){
        console.log(`Name : ${this.firstName} and Address : ${this.addr}`)
        // console.log(this); // 当前对象
        let that = this;
        // console.log(that); // 当前对象

        setTimeout(function(){
            // console.log(this); // 此时的this是timeout对象，因为在等待时间结束之后， 不是User 而是Node的内部定时器对象来调用this了。
            // 如果是浏览器里，则是window对象了。
            console.log(that); // 如果用that的话 就没问题了。
        }, 2000)

        console.log("Using Array Function Now: ")
        
        setTimeout(() => {
            console.log(this); // no problem. "this" in the arrow function is a copy of parent scope
            console.log(that); // no problem
            console.log(`Inside TimeOut - Name : ${this.firstName} and Address is : ${this.addr}`)
        }, 3000)
    }
}
User.getUserDetails();


/*
firstName = "lisi"
getUserDetails = () => {
    firstName = "zhangsan"
    console.log(`Name: +  ${firstName} `)
}
getUserDetails();
*/