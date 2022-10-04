/////////////////////////
// Dependencies
////////////////////////
require("dotenv").config()
const express = require("express")
const path = require("path")
const TeaRouter = require('./controllers/teaControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')

/////////////////////////
// Create Express Aplication Object
////////////////////////
const app = express()

/////////////////////////
// Middleware
////////////////////////
middleware(app)

/////////////////////////
// Home Route
////////////////////////
app.get("/", (req, res) => {
    res.send("Yay! The server is running!")
})

/////////////////////////
// Register Routes
////////////////////////
app.use('/teas', TeaRouter)
app.use('/users', UserRouter)

/////////////////////////
// Server Listener
////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port : ${PORT}`))

// END