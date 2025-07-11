let lion = "roar", birds = "chirp", cow = "moo", dogs = "bark"; 

let animalSound = {
    lion : lion,
    birds : birds,
    dogs : dogs,
    cow : cow
}

console.log(animalSound); 
// { lion: 'roar', birds: 'chirp', dogs: 'bark', cow: 'moo' }

let animalSoundES6 = {
    lion,
    dogs,
    cow,
    birds
}
console.log(animalSoundES6);
// { lion: 'roar', dogs: 'bark', cow: 'moo', birds: 'chirp' }

// log method converts JSON object to string json by its self when we pass json object as parameter - implicit JSON.stringify()
console.log("animal sound: ", animalSoundES6); // console.log 一个对象时，就会显示为字符串
// 结果为 animal sound:  { lion: 'roar', dogs: 'bark', cow: 'moo', birds: 'chirp' }
console.log("animal sound: " + animalSoundES6); // console.log 拼接字符串时， 隐式调用toString() 
// 结果为 animal sound: [object Object]

// 如果要用拼接字符串 应该这样写：
console.log("Animal Sound: " + JSON.stringify(animalSound));
// 输出: Animal Sound: {"lion":"roar","birds":"chirp",...}
