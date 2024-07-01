const dotenv = require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3500
const dbLink = process.env.MONGODB_URL;

const ApiRoute = require('./Route/BookingRoute');
const { log } = require('console');



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// app.use('/uploads', express.static('uploads'))
// app.use(express.static(path.join(__dirname, 'public')));

app.use(ApiRoute);




mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server Running http://localhost:${PORT}`);
            console.log("Database Connected");
            // console.log(process.env.today);
        })
    })