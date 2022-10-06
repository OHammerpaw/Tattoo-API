///////////////////////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////////////////////
const mongoose = require('./connection')

// we're going to pull the Schema from mongoose
// we'll use a syntax called "destructuring"
const { Schema } = mongoose

// comment schema
const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },
    review: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

//////////////////////////////////////////////////
// Export our schema
//////////////////////////////////////////////////
module.exports = reviewSchema