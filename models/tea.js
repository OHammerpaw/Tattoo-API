/////////////////////////
// Schema and model for tea resource
////////////////////////
const mongoose = require('./connection')
const reviewSchema = require('./review')

const { Schema, model } = mongoose

const TeaSchema = new Schema({
    name: String,
    minutesBrew: Number,
    brewTemp: Number,
    caffinated: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    review: [reviewSchema]

}, { timestamps: true})

const Tea = model("Tea", TeaSchema)

/////////////////////////
// Export our model
////////////////////////
module.exports = Tea