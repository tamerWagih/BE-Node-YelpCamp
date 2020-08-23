const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middlewareObj = {};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect('back');
            } else {
                if (String(foundComment.author.id) == String(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that')
        res.redirect('back');
    }
};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash('error', 'Campgroud not found');
                res.redirect('back');
            } else {
                if (String(foundCampground.author.id) == String(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else { 
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that'); 
    res.redirect('/login');
};

module.exports = middlewareObj;
