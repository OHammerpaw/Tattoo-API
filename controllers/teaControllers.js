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
.get("/", (req, res) => {
    Tea.find({})
    .populate("review.author", "username")
        .then(teas => {
            res.json({ teas: teas})
            console.log('index connected')
        })
        .catch(err => console.log(err))
    })

// GET request (Only Fruits Owned by Logged In User)
router.get('/mine', (req, res) => {
    Tea.find({ owner: req.session.userId })
    .populate("review.author", "username")
        .then(teas => {
            res.status(200).json({ teas: teas})
        })
        .catch(error => res.json(error))
})

// Show request (READ ROUTE)
router.get("/:id", (req, res) => {
    const id = req.params.id

    Tea.findById(id)
        .populate("owner", "username")
        .populate("review.author", "username")
        .then(tea => {
            res.json({ tea: tea})
        })
        .catch(err => console.log(err))
})

// Post request (CREATE ROUTE)
router.post("/", (req, res) => {
    req.body.owner = req.session.userId
    Tea.create(req.body)
        .then(tea => {
            res.status(201).json({tea: tea.toObject() })
        })
        .catch(error => console.log(error))
})

// Put request (UPDATE ROUTE)
router.put("/:id", (req, res) => {
    const id = req.params.id

    Tea.findById(id)
    .then(tea => {
        if(tea.owner == rew.session.userId) {
            res.sendStatus(204)
            return tea.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
    })
    .catch(err => console.log(err))
})

// Delete request (DESTROY ROUTE)
router.delete("/:id", (req, res) => {
    const id = req.params.id

    Tea.findById(id)
    .then(tea => {
        if (tea.owner == req.session.userId) {
            res.sendStatus(204)
            return tea.deleteOne()
        } else {
            res.sendStatus(401)
        }
    })
    .catch(err => console.log(err))
})


///////////////////////
// Export the router
//////////////////////
module.exports = router