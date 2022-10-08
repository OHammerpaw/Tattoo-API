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
    if (req.session.loggeedIn) {
        res.redirect('/teas')
    } else {
        res.render('index.liquid')
    }
})

/////////////////////////
// Register Routes
////////////////////////
app.use('/teas', TeaRouter)
app.use('/users', UserRouter)
app.use( '/review', ReviewRouter)


// renders an error page
app.get('/error', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', { error, username, loggedIn, userId })
})

//catch all error route
app.all('*', (req, res) => {
    res.redirect('/error')
})


/////////////////////////
// Server Listener
////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port : ${PORT}`))

// END