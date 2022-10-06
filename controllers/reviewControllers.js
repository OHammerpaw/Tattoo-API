////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Tea = require("../models/tea")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:teaId", (req, res) => {
    const teaId = req.params.teaId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    Tea.findById(teaId)
        .then(tea => {
            tea.review.push(req.body)
            return tea.save()
        })
        .then(tea => {
            res.status(200).json({ tea: tea })
        })
        .catch(error => console.log(error))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:teaId/:revId', (req, res) => {
    const teaId = req.params.teaId 
    const revId = req.params.revId
    Tea.findById(teaId)
        .then(tea => {
            const theReview = tea.review.id(revId)
            console.log('this is the review that was found', theReview)
            if (req.session.loggedIn) {
                if (theReview.author == req.session.userId) {
                    theReview.remove()
                    tea.save()
                    res.sendStatus(204)
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        })
        .catch(error => console.log(error))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router