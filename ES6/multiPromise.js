// Promise 类有两个方法：Promise.all 和 Promise.allSettled - 
// 用于同时执行传入的所有 Promise（并发执行）。
// 根据任务的需要，可以使用其中任意一个或两个方法。

// 我们需要向已登录用户展示更多功能、产品和其他销售选项
// 这些调用之间没有依赖关系，它们只需要用户成功登录/注册后才能进行。

// getUserHistory(userid)    // 获取用户历史记录
// getProductList(userid)    // 获取产品列表
// getFutureSalesList(userid) // 获取未来促销活动


//Promise1
let getUserHistory = new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve({
                status : "Success",
                msg : "已获取用户浏览历史",
                code : 200
            })
        }, 4000)

        setTimeout(() => {
            reject({
                status : "Failed",
                msg : "获取用户浏览历史失败",
                code : 400
            })
        }, 4000)
})

//Promise2
let getProductList = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve({
            status : "Success",
            msg : "已获取用户产品历史",
            code : 200
        })
    }, 4000)

    setTimeout(() => {
        reject({
            status : "Failed",
            msg : "获取用户产品历史失败",
            code : 400
        })
    }, 4000)
})

//Promise3
let getFutureSalesList = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve({
            status : "Success",
            msg : "已获取用户未来促销历史",
            code : 200
        })
    }, 4000)

    setTimeout(() => {
        reject({
            status : "Failed",
            msg : "获取用户未来促销历史失败",
            code : 400
        })
    }, 3000)
})


// 可以对每个 Promise 进行并发执行
// 它们都会是异步的
// getUserHistory.then(()=>{ 输出 }).catch(()=>{ 失败 })
// getProductList.then(()=>{ 输出 })
// getFutureSalesList.then(()=>{ 输出 })

// 1. 只有当所有 Promise 都执行完毕（无论是成功还是失败），我们才应该继续处理

Promise.allSettled([
    getUserHistory,
    getProductList,
    getFutureSalesList
]).then((data)=>{
    console.log(data)
})


// 2. 如果上面的 Promise 中有任何一个失败，我们就不应该执行后续操作或显示下一个页面

Promise.all([
    getUserHistory,
    getProductList,
    getFutureSalesList
]).then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})
