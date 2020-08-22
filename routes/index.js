const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

//Root Route
router.get('/', (req, res) => {
    res.render('landing');
});

//Register Form Route
router.get('/register', (req, res) => {
    res.render('register');
});

//Register handle Route
router.post('/register', (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                return res.render('/register');
            }
            passport.authenticate('local')(req, res, () => {
                res.redirect('/campgrounds');
            });
        }
    );
});

//Login Form Route
router.get('/login', (req, res) => {
    res.render('login');
});

//Login handle Route
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
    }),
    (req, res) => {}
);

//Logout Route
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/campgrounds');
});

//middleWare
function isLogedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
