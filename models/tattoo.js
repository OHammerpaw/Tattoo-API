
const mongoose = require("mongoose")

const { Schema, model } = mongoose

const tattoosSchema = new Schema({
    design: String,
    artist: String,
    cost: Number,
    dateTattoed: Date
})

const Tattoo = model("Tattoo", tattoosSchema)


module.exports = Tattoo