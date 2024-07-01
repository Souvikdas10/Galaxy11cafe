const BookingModel=require('../model/bookingModel')
const moment = require('moment-timezone');
// Assuming you have a booking date and time in a specific timezone
// const bookingDateTime = '2024-07-01T15:00:00';
// const bookingDateTime = Date.now;
// const timeZone = 'India'; // Example timezone
// // Convert to GMT
// const gmtDateTime = moment.tz(bookingDateTime, timeZone).tz('GMT').format();
// // console.log(`Booking Date and Time in GMT: ${gmtDateTime}`);

exports.booking = async (req, res) => {

    try {
        const bookSlot = new BookingModel({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            date_of_booking:req.body.date_of_booking,
            // date_of_booking: process.env.timestamp.split('GMT'),
            // date_of_booking:gmtDateTime,
        })
        const result = await bookSlot.save()
        res.status(201).json({ success: true, message: "Booking successfully", data: result })
    }
    catch (error) {
        console.log("Booking failed", error);
        res.status(404).json({ success: false, message: "user not added" })
    }

}



