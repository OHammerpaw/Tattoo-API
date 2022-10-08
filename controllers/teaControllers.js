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
router.get("/", (req, res) => {
    Tea.find({})
    .populate("review.author", "username")
        .then(teas => {
           const username = req.session.username
           const loggedIn = req.session.loggedIn
           const userId = req.session.userId

           res.render('teas/index', { teas, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
    })

//GET route for new tea page
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
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.redirect('/teas')
        })
        .catch(err => res.redirect(`/error?error=${err}`))
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
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request to show update page
router.get('/edit/:id', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const teaId = req.params.id

    Tea.findById(teaId)
        .then(tea => {
            res.render('teas/edit', { tea, username, loggedIn, userId })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// Put request (UPDATE ROUTE)
router.put("/:id", (req, res) => {
    
    const id = req.params.id

    req.body.caffinated = req.body.caffinated === 'on' ? true : false
    console.log('req.body after changing checkbox value', req.body)
    Tea.findById(id)
    .then(tea => {
        if(tea.owner == req.session.userId) {
            return tea.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
    })
    .then(() => {
        res.redirect(`/fruits/${id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
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
        .catch(err => res.redirect(`/error?error=${err}`))
})





// Delete request (DESTROY ROUTE)
router.delete("/:id", (req, res) => {
    const teaId = req.params.id

    Tea.findByIdAndRemove(teaId)
    .then(tea => {
        res.redirect('/teas')
    })
    .catch(error => {
        res.redirect(`/error?error=${err}`)
    })
})


///////////////////////
// Export the router
//////////////////////
module.exports = router