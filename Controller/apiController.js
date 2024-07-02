const Booking = require('../model/bookingModel');
const ProductModel = require('../model/productModel');
const ratingModel = require('../model/ratingModel');
const RatingModel = require('../model/ratingModel');
const BannerModel = require('../model/bannerImg');
const asyncHandler = require('express-async-handler');
const path= require('path');

exports.product = async (req, res) => {
    try {
        const proData = await ProductModel.find()
        res.status(200).json({ success: true, msg: " product fetch Successfully", data: proData, status: 200 })
    } catch (error) {
        res.status(400).json({ success: true, msg: error.message })

    }
}


exports.createBanner = async (req, res) => {
    try {
        const bannerimg = await BannerModel.find()
        res.status(200).json({ success: true, msg: " Banner Image show", data: bannerimg, status: 200 })
    } catch (error) {
        res.status(400).json({ success: true, msg: error.message })

    }
}

exports.createReating = async (req, res) => {
    try {
        const ratings = await new ratingModel({
            name: req.body.name,
            description: req.body.description,
            rating: req.body.rating,
        });
        if (req.file) {
            ratings.image = req.file.path
        }

        const result = await ratings.save();
        res.status(201).json({ message: 'Rating created successfully!', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error, Try again' });
    }
}

exports.rating = async (req, res) => {
    try {
        const ratingData = await RatingModel.find()
        res.status(200).json({ success: true, msg: " Rating fetch Successfully", data: ratingData, status: 200 })
    } catch (error) {
        res.status(400).json({ success: true, msg: error.message })

    }
}



exports.createBooking = asyncHandler(async (req, res, next) => {

    try {
        const booking = new Booking({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });


        const result = await booking.save();
        res.status(201).json({ message: 'Booking created successfully!', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating booking' });
    }
});

exports.getBookings = asyncHandler(async (req, res, next) => {
    try {
        const bookings = await Booking.find().sort({ date: 1, startTime: 1 });
        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

exports.getAvailableTimeSlots = asyncHandler(async (req, res, next) => {
    const date = req.query.date;

    try {
        const bookings = await Booking.find({ date });

        const availableTimeSlots = [];
        for (let hour = 9; hour < 21; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const endTime = `${hour.toString().padStart(2, '0')}:${(minute + 30).toString().padStart(2, '0')}`;
                let isAvailable = true;

                bookings.forEach((booking) => {
                    if (booking.startTime === startTime && booking.endTime === endTime) {
                        isAvailable = false;
                    }
                });

                if (isAvailable) {
                    availableTimeSlots.push({ startTime, endTime });
                }
            }
        }

        res.status(200).json(availableTimeSlots);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching available time slots' });
    }
});

