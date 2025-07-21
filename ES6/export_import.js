// in common js pattern we use - require("file name with path") to import and 
// we use module.exports to send the object from the module

// but in ES6 we can directly use import and export keywords to do the same

//we are in user.js file
import xProduct from "./product" // default import doesn't need a bracket, file extention is optional //defaultProduct is imported as xProduct
import { productList, priceList } from "./product" //named import, canbe many from one file and imported via {}

//aliases can be used to avoid object conflicts
import { priceList as constantPriceList} from "./contants"

//we can import many wild card operator or * operator
import * as constants from "./contants" //importing in a variable and then use it as below

console.log(constants.c1)
console.log(constants.c2)
console.log(constants.c3)

// another file product.js
export const productList = [{}] //named export
export const priceList = [{}] //named export

//default export - these are allowed to be only one from a file
//default exports should have to be similar as the name of the file
export default defaultProduct = [{}] //default export 


// another file contants.js
// export const priceList = [{}] //named export

// exported many named constants
export const c1 = 2
export const c2 = 2.1
export const c3 = 3
export const c4 = 4


//we need to have a es6 transpilation configuration to use export and import keywords