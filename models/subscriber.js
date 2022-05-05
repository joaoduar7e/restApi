const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userChannel: {
        type: String,
        required: true
    },
    userDate: {
        type: Date,
        required: false,
        default: Date.now()
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)