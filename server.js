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

app.get("/tattoos/regen", (req, res) => {
    const startTattoos = [
        { design: 'Cat with Switchblade', artist: 'Miguel Olascuaga', cost: '350', hours: '2', dateTattoed: '04-04-2017' },
        { design: 'Rhyme and Reason', artist: 'Miguel Olascuaga', cost: '150', hours: '.5', dateTattoed: '01-02-2018' },
        { design: 'Crying Heart', artist: 'Javier Rivera', cost: '200', hours: '2.25', dateTattoed: '01-10-2019'},
        { design: 'Persephone & Hades', artist: 'Miguel Olascuaga', cost: '420', hours: '3', dateTattoed: '10-12-2020'},
        { design: 'Loofy', artist: 'Lauren Purson', cost: '600', hours: '5', dateTattoed: '01-23-21' },
        { design: 'Freehand Floral', artist: 'Miguel Olßascuaga', cost: '1200', hours: '13', dateTattoed: '01-29-22' } 
    ]
    Tattoo.deleteMany({})
        .then(() => {
            Tattoo.create(startTattoos)
                .then(data => {
                    res.json(data)
                })
        })
})

// Get request (index)
app.get("/tattoos", (req, res) => {
    Tattoo.find({})
        .then(tattoos => {
            res.json({ tattoos: tattoos})
            console.log('index connected')
        })
        .catch(err => console.log(err))
    })

// Show request (finds and shows single resource)
app.get("/tattoos/:id", (req, res) => {
    const id = req.params.id

    Tattoo.findById(id)
        .then(tattoo => {
            res.json({ tattoo: tattoo})
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port : ${PORT}`))

// END