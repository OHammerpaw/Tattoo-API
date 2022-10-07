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
           const username = req.session.username
           const loggedIn = req.session.loggedIn
           const userId = req.session.userId

           res.render('teas/index', { teas, username, loggedIn, userId })
        })
        .catch(err => console.log(err))
    })

//GET route for new fruit page
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('teas/new', { username, loggedIn, userId })
})

// Post request (CREATE ROUTE)
router.post("/", (req, res) => {
    req.body.caffinated = req.body.caffinated === 'on' ? true : false
    req.body.owner = req.session.userId
    Tea.create(req.body)
        .then(tea => {
            res.redirect('/teas')
        })
        .catch(error => console.log(error))
})

// GET request (Only Fruits Owned by Logged In User)
router.get('/mine', (req, res) => {
    Tea.find({ owner: req.session.userId })
    .populate("review.author", "username")
        .then(teas => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.render('teas/index', { teas, username, loggedIn, userId })
        })
        .catch(error => res.json(error))
})

// GET request to show update page
router.get('/edit/:id', (req, res) => {
    res.send('edit page')
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

// Show request (READ ROUTE)
router.get("/:id", (req, res) => {
    const id = req.params.id

    Tea.findById(id)
        .populate("owner", "username")
        .populate("review.author", "username")
        .then(tea => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.render('teas/show', { tea, username, loggedIn, userId })
        })
        .catch(err => console.log(err))
})





// Delete request (DESTROY ROUTE)
router.delete("/:id", (req, res) => {
    const teaId = req.params.id

    Tea.findByIdAndRemove(teaId)
    .then(tea => {
        res.redirect('/teas')
    })
    .catch(error => {
        res.json({ error })
    })
})


///////////////////////
// Export the router
//////////////////////
module.exports = router