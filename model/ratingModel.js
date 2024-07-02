const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: mongoose.Mixed,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
    },
    image: {
        type: String,
        required: true
    },

    // }, { timestamps: true })
})
const ratingModel = new mongoose.model('rating', ratingSchema);
module.exports = ratingModel;