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
        {  name: 'Mesmerised', minutesBrew: '3', brewTemp: '212', caffinated: 'true' },
        {  name: 'Sugar Cookie Sleigh Ride', minutesBrew: '5', brewTemp: '212', caffinated: 'false' },
        {  name: 'Pumpkin Spice', minutesBrew: '5', brewTemp: '212', caffinated: 'true'},
        {  name: "Wizard's Grey", minutesBrew: '3', brewTemp: '212', caffinated: 'true'},
        {  name: 'Polar Bears are Brilliant', minutesBrew: '3', brewTemp: '180', caffinated: 'true' },
        {  name: 'Bilbo Brew', minutesBrew: '3', brewTemp: '195', caffinated: 'true' } 
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