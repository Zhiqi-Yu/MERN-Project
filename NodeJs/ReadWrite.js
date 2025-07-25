const {log} = require("console");
let fs = require("fs");
const { Session } = require("inspector/promises");

fs.readFile("Test.json", "utf-8", (err, data) => {
    if(err) return console.log("读取出错", err);
    console.log("文件内容", data);
});

console.log("=== 分界线 ===")

// 创建一个 JavaScript 对象，包含用户信息
let userDetails = {
    name : "Oscar",
    age : 22,
    city : "Somewhere on earth ",
    session : "MernStack"
}

// 使用异步方式读取文件（Text.json）
fs.readFile('Text.json','utf-8',(err, fileData)=>{
    // 打印从文件中读取到的内容（作为字符串），前缀提示信息
    console.log("information" + fileData)

    // 打印是否有错误信息，如果文件不存在、格式错误会有错误对象
    console.log("errr", err)

    // 创建一个可写的文件流，目标文件是 Text.json，编码为 utf-8
    let writerStream = fs.createWriteStream("Text.json","utf8");

    // 再打印一次 fileData 内容（可删）
    console.log(fileData)

    // 如果读取的文件有内容（非空字符串），就进行追加操作
    if (fileData) {           
        // 将字符串格式的 JSON 内容解析为 JavaScript 数组
        let oldData = JSON.parse(fileData)    

        // 打印解析后的数组（旧的用户数据）
        console.log(oldData)

        // 将旧数据和新用户对象合并（展开旧数组并追加新对象）
        // 然后将整个新数组转换为 JSON 字符串写入文件
        writerStream.write(JSON.stringify([...oldData, userDetails]));

        // 写入结束，关闭写入流
        writerStream.end();
    } else {
        // 如果文件内容为空（例如第一次运行或文件不存在），
        // 则写入一个新的 JSON 数组，包含一条默认数据
        writerStream.write(JSON.stringify([
            { 
                name : "Eric Phegly",
                age : 22,
                city : "California ",
                session : "MernStack"
            }
        ]));

        // 写入结束，关闭写入流
        writerStream.end();
    }
})

// 注意：虽然上面是异步代码，但这行会最先执行，因为不会等待前面代码完成
console.log('The a-synchronous operation ends here!!!')
