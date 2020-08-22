const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');

//Index Route
router.get('/', (req, res) => {
    console.log(req.user);
    Campground.find({}, (err, allCampgrounds) => {
        if (err) console.log(err);
        else {
            res.render('campgrounds/index', {
                campgrounds: allCampgrounds,
                currentUser: req.user,
            });
        }
    });
});

//Create Route
router.post('/', isLogedIn, (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id, 
        username: req.user.username
    };
    const newCampground = { name: name, image: image, description: desc, author: author };
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect('/campgrounds');
        }
    });
});

//New Route
router.get('/new', isLogedIn, (req, res) => {
    res.render('campgrounds/new');
});

//Show Route
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Campground.findById(id)
        .populate('comments')
        .exec((err, foundCampground) => {
            if (err) {
                console.log(err);
            } else {
                console.log(foundCampground);
                res.render('campgrounds/show', { campground: foundCampground });
            }
        });
});

function isLogedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


module.exports = router;
