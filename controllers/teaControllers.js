/////////////////////////
// Import Dependencies
////////////////////////
const express = require("express")
const Tea = require("../models/tea")

///////////////////////
// Create Router
//////////////////////
const router = express.Router()

///////////////////////
// Routes
//////////////////////
// Get request (INDEX ROUTE)
.get("/teas", (req, res) => {
    Tea.find({})
        .then(teas => {
            res.json({ teas: teas})
            console.log('index connected')
        })
        .catch(err => console.log(err))
    })

// Show request (READ ROUTE)
router.get("/teas/:id", (req, res) => {
    const id = req.params.id

    Tea.findById(id)
        .then(tea => {
            res.json({ tea: tea})
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// Post request (CREATE ROUTE)
router.post("/teas", (req, res) => {
    Tea.create(req.body)
        .then(tea => {
            res.status(201).json({tea: tea.toObject() })
        })
        .catch(error => console.log(error))
})

// Put request (UPDATE ROUTE)
router.put("/teas/:id", (req, res) => {
    const id = req.params.id

    Tea.findByIdAndUpdate(id, req.body, {new: true})
    .then(tea => {
        console.log('the tea from update:', tea)
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})

// Delete request (DESTROY ROUTE)
router.delete("/teas/:id", (req, res) => {
    const id = req.params.id

    Tea.findByIdAndRemove(id)
    .then(() => {
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})


///////////////////////
// Export the router
//////////////////////
module.exports = router