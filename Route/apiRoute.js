const express = require('express');
const Route = express.Router()
const ApiController = require('../Controller/apiController')
const uploadImage=require('../middleware/uploadImg')


Route.get('/api/products', ApiController.product)
Route.post('/api/create-banner', ApiController.createBanner)

Route.post('/api/create-Ratings',uploadImage.single('image'), ApiController.createReating)
Route.get('/api/ratings', ApiController.rating)

Route.post('/bookings', ApiController.createBooking);
Route.get('/bookings', ApiController.getBookings);
Route.get('/available-time-slots', ApiController.getAvailableTimeSlots);


module.exports = Route;