let buf2 = Buffer.alloc(256);
let len = buf2.write("We are learning node implementation, by using buffer data without using any file.");
console.log("Output from a buffer " + len); // 81
console.log(buf2.toString("utf8"));
console.log(buf2.toString("base64"));

console.log("=== buf 26 ===")
let buf26 = Buffer.alloc(26); // 创建一个长为26的空缓冲区
for(let i = 0; i < 26; i++){
    buf26[i] = i+97;   
}

console.log(buf26.toString('ascii'));

// console.log(buf26)

console.log( buf26.toString('ascii')); // outputs: abcdefghijklmnopqrstuvwxyz 
console.log( buf26.toString('ascii',0,5)); // outputs: abcde 
console.log( buf26.toString('utf8',0,5)); // outputs: abcde 
console.log( buf26.toString('base64',0,5)); // outputs: YWJjZGU= 
console.log( buf26.toString('base64')); // outputs: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo= 
console.log( buf26.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde