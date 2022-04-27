const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');


const app = express();

app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', 'views');

const donateRoutes = require('./routes/donate');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));
// app.use('/admin', adminRoutes);
app.use(donateRoutes);

mongoose.connect('mongodb+srv://shadab:Shadab143117191@project.7u1c9.mongodb.net/ccl-proj?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connection Succesfull")
        app.listen(process.env.PORT || 5000);
    }).catch(err => {
        console.log(err);
    });