// Promise - 是一个对象，它像一个包装器（wrapper）一样，
// 用于存储调用或回调函数（发送到服务器的异步操作），
// 它为服务器调用的响应提供作用域，并将其包装在另一个对象中以便后续使用 Promise 的响应


// 我们有以下函数来实现特定流程

function Authentication(user, authorizationCallBack) {
    // 调用服务器的认证 API，用于正确的登录/注册流程，返回用户信息
}

function Authorization(user_id, sessionToken, navigationCallBack) {
    // 调用服务器以获取用户角色信息
}

function NavigateToApplication(user_id) {
    // 在所有可用页面中返回用户应该被重定向到的页面以及他上次访问的页面
}

// 当我们有多个依赖的回调函数一个接一个执行时，
// 由于无法模块化管理或无法控制响应行为，
// 会导致调用集合进入无限循环，这种情况被称为 “回调地狱（callback hell）”

// 我们可以通过合理的模块化来优化它

// function SignInFlow(user, authCallback) {
    
//     let user_id = authCallback(user, Authorization) //调用服务器验证用户身份并获取 user_id

//     if (user_id == "valid" || user_id == "active") {
//         let sessionToken = authCallback(sessionId, NavigateToApplication) //获取用户信息以便决定导航位置

//         // sessionToken - 由于服务器故障未收到任何响应

//         if (sessionToken == "valid" || sessionToken.userRole == "matches") {
//             let navigationLink = NavigateToApplication(sessionToken.userRole);
//             sendApi(navigationLink)
//         } else {
//             //重新调用 SignInFlow
//         }

//     } else {
//         //重新调用 SignInFlow
//     }
// }

console.log("Promise 开始")

// 创建一个 Promise 对象
let Authpromise = new Promise((resolve, reject)=>{

    //let user_id = authCallback(user, Authorization) //模拟调用服务器耗时 2 秒

    // if (user_id == "valid" || user_id == "active") {
    setTimeout(() => {
        resolve({
            "status": "200",
            "data" : "user_id",
            "msg" : "认证成功"
        })
    }, 2000);
        
    //} else {
    setTimeout(() => {
        reject({
            "status": "404",
            "data" : "null",
            "msg" : "认证失败"
        })
    },1000)
    //}
})

console.log(Authpromise)

let authResult = Authpromise.then((data,err)=>{
                       console.log("Promise 成功回调 ", data)
                }).catch((err)=>{
                    console.log("Promise 错误回调 ", err)
                        // 使用错误信息
                })

console.log("Promise 完成", Authpromise)