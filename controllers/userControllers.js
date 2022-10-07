/////////////////////////
// Import Dependencies
////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')


/////////////////////////
// Create router
////////////////////////
const router = express.Router()

/////////////////////////
// Routes
////////////////////////

//GET roue for signup
router.get('/signup', (req, res) => {
    res.render('users/signup')
})

// POST route for signup
router.post('/signup', async (req, res) => {
    console.log('this is our initial req.body', req.body)
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    console.log('req.body after hash', req.body)

    //create a new user
    User.create(req.body)
        .then(user => {
            console.log(user)
            res.redirect('/users/login')
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// GET route for logging in
router.get('/login', (req, res) => {
    res.render('users/login')
})

// POST route for login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    User.findOne({ username })
        .then(async (user) => {
            if (user) {
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    console.log('this is req.session', req.session)

                    res.redirect('/teas')
                } else {
                    res.json({ error: 'username or password incorrect' })
                }
            } else {
                re.json({ error: 'user does not exist' })
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// GET route to the logout page
router.get('/logout', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('users/logout', { username, loggedIn, userId })
})

// a route for logout
router.delete('/logout', (req, res) => {
    req.session.destroy(err => {
        console.log('req.session after logout', req.session)
        console.log('err on logout', err)

        res.sendStatus(204)
    })
})

/////////////////////////
// Routes
////////////////////////
module.exports = router