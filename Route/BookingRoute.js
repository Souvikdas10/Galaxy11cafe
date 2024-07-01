const express = require('express');
const Route = express.Router()
const ApiController = require('../Controller/bookingController')



Route.post('/api/booking', ApiController.booking)
// Route.post('/signUp',userimage.any, ApiController.signUp)
// Route.post('/signIn', ApiController.signIn)



module.exports = Route;