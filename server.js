/////////////////////////
// Dependencies
////////////////////////
require("dotenv").config()
const express = require("express")
const path = require("path")
const TeaRouter = require('./controllers/teaControllers')
const UserRouter = require('./controllers/userControllers')
const ReviewRouter = require('./controllers/reviewControllers')
const middleware = require('./utils/middleware')

/////////////////////////
// Create Express Application Object
////////////////////////
const app = require('liquid-express-views')(express())

/////////////////////////
// Middleware
////////////////////////
middleware(app)

/////////////////////////
// Home Route
////////////////////////
app.get("/", (req, res) => {
    res.render('index.liquid')
})

/////////////////////////
// Register Routes
////////////////////////
app.use('/teas', TeaRouter)
app.use('/users', UserRouter)
app.use( '/review', ReviewRouter)

/////////////////////////
// Server Listener
////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port : ${PORT}`))

// END