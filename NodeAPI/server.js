let express = require('express')

const app = express() //initialize express application

//very first endpoint using express
app.get('/', (req, res) => {
  res.send('Hello Oscar!')
})

app.get('/first', (req, res) => {
  res.json({
        message: 'This is my first api'
    })
})

app.get('/second', (req, res) => {
  res.send("<h1> This is the second api </h1>")
})


app.listen(9000)
console.log('Server is running on http://localhost:9000')