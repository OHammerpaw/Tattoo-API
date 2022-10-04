/////////////////////////
// Schema and model for tea resource
////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose

const TeaSchema = new Schema({
    name: String,
    ingredients: String,
    minutesBrew: Number,
    brewTemp: Number,
    caffinated: Boolean
})

const Tea = model("Tea", TeaSchema)

/////////////////////////
// Export our model
////////////////////////
module.exports = Tea