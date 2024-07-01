const dotenv = require('dotenv').config()
const moment = require('moment-timezone');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    date_of_booking: {
        type: Date,
        default: Date.now,
        required:true
    }
   
    // status: {
    //     type: Boolean,
    //     default: true
    // }



    // }, { timestamps: true })
})
const BookingModel = new mongoose.model('booking', BookingSchema);
module.exports = BookingModel;