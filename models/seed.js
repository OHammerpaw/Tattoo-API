/////////////////////////
// Import Dependencies
////////////////////////
const mongoose = require('./connection')
const Tea = require('./tea')

/////////////////////////
// Seed Script Code
////////////////////////
const db = mongoose.connection

db.on('open', () => {
    const startTeas = [
        {  name: 'Mesmerised', ingredients: 'Earl Grey Lavender, Valentines, Hibiscus', minutesBrew: '3', brewTemp: '212', caffinated: 'true' },
        {  name: 'Sugar Cookie Sleigh Ride', ingredients: 'Milk Thistle, Roasted Barley, Orange Peel, Vanilla Bean', minutesBrew: '5', brewTemp: '212', caffinated: 'false' },
        {  name: 'Pumpkin Spice', ingredients: 'Black Tea, Ginger, Cinnamon, Cloves, Pumpkin Flavor ', minutesBrew: '5', brewTemp: '212', caffinated: 'true'},
        {  name: "Wizard's Grey", ingredients: 'Earl Grey Moonlight, Bklackberry, Chocolate', minutesBrew: '3', brewTemp: '212', caffinated: 'true'},
        {  name: 'Polar Bears are Brilliant', ingredients: 'Ginger, White Pear, Vanilla Green', minutesBrew: '3', brewTemp: '180', caffinated: 'true' },
        {  name: 'Bilbo Brew', ingredients: 'Irish Breakfast, Sweet Potato, Vanilla Green, Cinnamon Bits', minutesBrew: '3', brewTemp: '195', caffinated: 'true' } 
    ]

    Tea.deleteMany({})
        .then(deletedTeas => {
            console.log('this is what .remove returns', deletedTeas)

            Tea.create(startTeas)
                .then(data => {
                    console.log('here are the newly created druits', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})