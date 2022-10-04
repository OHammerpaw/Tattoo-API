// Importing dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

// Import models
const Tea = require('./models/tea')

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

app.get("/teas/seed", (req, res) => {
    const startTeas = [
        {  name: 'Mesmerised', ingredients: 'Earl Grey Lavender, Valentines, Hibiscus', minutesBrew: '3', brewTemp: '212', caffinated: 'true' },
        {  name: 'Sugar Cookie Sleigh Ride', ingredients: 'Milk Thistle, Roasted Barley, Orange Peel, Vanilla Bean', minutesBrew: '5', brewTemp: '212', caffinated: 'false' },
        {  name: 'Pumpkin Spice', ingredients: 'Black Tea, Ginger, Cinnamon, Cloves, Pumpkin Flavor ', minutesBrew: '5', brewTemp: '212', caffinated: 'true'},
        {  name: "Wizard's Grey", ingredients: 'Earl Grey Moonlight, Bklackberry, Chocolate', minutesBrew: '3', brewTemp: '212', caffinated: 'true'},
        {  name: 'Polar Bears are Brilliant', ingredients: 'Ginger, White Pear, Vanilla Green', minutesBrew: '3', brewTemp: '180', caffinated: 'true' },
        {  name: 'Bilbo Brew', ingredients: 'Irish Breakfast, Sweet Potato, Vanilla Green, Cinnamon Bits', minutesBrew: '3', brewTemp: '195', caffinated: 'true' } 
    ]
    Tea.deleteMany({})
        .then(() => {
            Tea.create(startTeas)
                .then(data => {
                    res.json(data)
                })
        })
})

// Get request (INDEX ROUTE)
app.get("/teas", (req, res) => {
    Tea.find({})
        .then(teas => {
            res.json({ teas: teas})
            console.log('index connected')
        })
        .catch(err => console.log(err))
    })

// Show request (READ ROUTE)
app.get("/teas/:id", (req, res) => {
    const id = req.params.id

    Tea.findById(id)
        .then(tea => {
            res.json({ tea: tea})
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// Post request (CREATE ROUTE)
app.post("/teas", (req, res) => {
    Tea.create(req.body)
        .then(tea => {
            res.status(201).json({tea: tea.toObject() })
        })
        .catch(error => console.log(error))
})

// Put request (UPDATE ROUTE)
app.put("/teas/:id", (req, res) => {
    const id = req.params.id

    Tea.findByIdAndUpdate(id, req.body, {new: true})
    .then(tea => {
        console.log('the tea from update:', tea)
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})

// Delete request (DESTROY ROUTE)
app.delete("/teas/:id", (req, res) => {
    const id = req.params.id

    Tea.findByIdAndRemove(id)
    .then(() => {
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})

// Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port : ${PORT}`))

// END