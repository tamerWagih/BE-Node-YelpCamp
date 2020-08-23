const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware/index');

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
router.post('/', middleware.isLoggedIn, (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username,
    };
    const newCampground = {
        name: name,
        price: price, 
        image: image,
        description: desc,
        author: author,
    };
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
router.get('/new', middleware.isLoggedIn, (req, res) => {
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

//Edit Campground Routes
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', { campground: foundCampground });
    });
});
//Update Campground Route
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(
        req.params.id,
        req.body.campground,
        (err, updatedCampground) => {
            if (err) {
                res.redirect('/campgrounds');
            } else {
                res.redirect('/campgrounds/' + req.params.id);
            }
        }
    );
});

//Destroy Campground Route
router.delete('/:id', middleware.checkCampgroundOwnership,(req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});




module.exports = router;
