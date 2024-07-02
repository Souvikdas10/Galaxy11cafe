const mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },



}, { timestamps: true })
const adminModel = new mongoose.model('admin', adminSchema);
module.exports = adminModel;