let express = require('express') // express server framework starting point
let cors = require('cors') // to allow cross origin requests

const app = express() //initialize express application
const defaultRouter = require('./routes/defaultRoutes') // import the default routes

app.use(cors()) // use cors to allow cross origin requests
//child applications can also be created and used as mounted apps
//json middle-ware for setting request content type to json in body
app.use(express.json({limit:'2mb', extended:false})); 

const defaultApp = express() // create a new express application instance

const studentRouter = require('./routes/studentRoutes') // import the student routes
const studentApp = express() // create a new express application instance for student routes


const userRouter = require('./routes/userRoutes') // import the student routes
const userApp = express() // create a new express application instance for student routes

globalThis.__dirname = __dirname // set the global __dirname variable to the current directory

// we can use static middleware to serve static files
//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware 
app.use('/static', express.static('public')) //localhost:9000/static/loadUserInfo.js

//application mounting for student routes
app.use("/student",studentApp) // use the default router for all routes
studentApp.use('/', studentRouter) // use the default router for all routes

//application mounting for student routes
app.use("/user",userApp) // use the default router for all routes path : localhost:9000/user/api/signinup
userApp.use('/', userRouter) // use the default router for all routes

//application mounting
app.use("/",defaultApp) // use the default router for all routes
defaultApp.use('/', defaultRouter) // use the default router for all routes


app.listen(9000)
console.log('Server is running on http://localhost:9000')