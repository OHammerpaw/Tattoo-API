// Importing dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

// Import models
const Tattoo = require('./models/tattoo')

// Database connection
const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewURLParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log("An error occured: \n", error))

// Create express application object
const app = express()

// Middleware
app.use(morgan("tiny"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(express.json())

// Routes
app.get("/", (req, res) => {
    res.send("Yay! The server is running!")
})





// Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port : ${PORT}`))

// END