const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const methodOverride = require('method-override');
const flash = require('connect-flash');
const Campground = require('./models/campground')
const Comment = require('./models/comment')
const User = require('./models/user')
const seedDB = require('./seeds');
const comment = require('./models/comment');
const campground = require('./models/campground');
//Routes
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(flash());

// seedDB();

//Passport Config
app.use(require('express-session')({
    secret: 'We are a star dust', 
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
