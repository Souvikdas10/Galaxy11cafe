const dotenv = require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const cors = require('cors');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3500
const dbLink = process.env.MONGODB_URL;

const ApiRoute = require('./Route/apiRoute');
const AdminRoute = require('./Route/AdminRoute');



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(ApiRoute);
app.use(AdminRoute);




mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server Running http://localhost:${PORT}`);
            console.log("Database Connected");
            // console.log(process.env.today);
        })
    })