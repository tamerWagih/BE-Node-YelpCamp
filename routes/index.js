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
router.post('/register', function (req, res) {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            return res.render("register", {error: err.message});
        }
        passport.authenticate('local')(req, res, function () {
            req.flash(
                'success',
                'Successfully Signed Up! Nice to meet you ' + req.body.username
            );
            res.redirect('/campgrounds');
        });
    });
});

//Login Form Route
router.get('/login', (req, res) => {
    res.render('login');
});

//Login handle Route
router.post("/login", function (req, res, next) {
    passport.authenticate("local",
      {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome to YelpCamp " + req.body.username
      })(req, res)
  });

//Logout Route
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'Logged you out!');
    res.redirect('/campgrounds');
});


module.exports = router;
