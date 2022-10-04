
const mongoose = require("mongoose")

const { Schema, model } = mongoose

const TeaSchema = new Schema({
    name: String,
    ingredients: String,
    minutesBrew: Number,
    brewTemp: Number,
    caffinated: Boolean
})

const Tea = model("Tea", TeaSchema)


module.exports = Tea