// OOPS - JavaScript 中的面向对象编程
// JavaScript 是一种基于原型的语言，这意味着对象可以从其他对象继承属性和方法。
// 这与 Java 或 C# 等基于类的语言不同，在这些语言中，类定义了对象的结构和行为。

// 继承 - JavaScript 中的继承是通过原型实现的。每个对象都有一个原型，原型是另一个对象，对象可以从原型继承属性和方法。
// 多态 - JavaScript 不支持重载，因为 JavaScript 不检查参数类型。
// 支持覆盖，因为您可以在子对象中定义与父对象中方法同名的方法。
// 多态是通过方法覆盖实现的，子对象可以提供特定的
// 抽象 - 通过使用对象和函数实现。您可以创建表示现实世界实体的对象，并定义操作这些对象的方法。
// 封装 - 通过闭包实现，闭包允许您创建函数外部无法访问的私有变量和方法。
// Java 和 C# 中用于实现封装的访问修饰符（public、private、protected、internal 等）在 JavaScript 中不可用。

// 闭包 - 是指可以访问自身作用域、外部函数作用域和全局作用域的函数。

function outerFunction(accountName, accuntType) {
    var accountName = accountName || "Default Account"; //Public variable
    var accuntType = accuntType || "Default Type"; //Public variable
    var balance = 1000; // Private variable
    var password = "secret"; // Private variable

    function innerFunction(passcode) {
        if (passcode === password) {
            return{
                accountName: accountName,
                accuntType: accuntType,
                balance: balance
            }            
        } else {
            return {
                error: "Access Denied: Incorrect Password"
            }
        }
    }

    return innerFunction; // Returning the inner function
}

var myAccount = outerFunction("John Doe", "Savings");
console.log(myAccount("secret")); // { accountName: 'John Doe', accuntType: 'Savings', balance: 1000 }
console.log(myAccount("wrongpassword")); // { error: 'Access Denied: Incorrect Password

/*
所以就是说 var myAccount 这个变量实际上就是innerFunction函数（因为outerFunction会返回一个innerFunction()嘛）
然后myAccount传参 就相当于给innerFunction传参
所以密码对了的时候 就会返回余额之类的信息，之所以能读得到就是因为inner是outer内部的方法
闭包 就是一个函数可以 “记住” 它外部函数的变量，即使外部函数已经执行完了。这也是为什么他能读取到余额
所以就是利用这种方法来实现 对余额的保护

额外说一点 就是 
能被return的变量 就是public的。这个和 前两个公共变量的 || "default xxx" 没关系，这句只是当他是undefined的时候 设置默认值用的
所以按理来说 balance也是public的
只有密码是private
*/