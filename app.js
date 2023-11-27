const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const UserController = require('./controllers/userController'); // adjust the path accordingly

const app = express();

const port = 3000;
const url = 'mongodb://127.0.0.1:27017/absensi-app';

mongoose.connect(url, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
})
  .then(() => {
    console.log('Mongo Connection Open');
  })
  .catch(err => {
    console.log('Mongo Connection Error');
    console.log(err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.isAuthenticated() ? req.user : null;
    next();
});

// Route
const userRoute = require('./routes/userRoute');
const absenRoute = require('./routes/absenRoute');

app.use('/', userRoute);
app.use('/', absenRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
