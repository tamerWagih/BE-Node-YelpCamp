const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Schema Setup

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Granite Hill',
//         image:
//             'https://i.pinimg.com/originals/d4/3a/ce/d43ace987bb734625cf089b79cf5acc9.jpg',
//         description:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ut ipsam quam ab amet molestiae earum, deserunt harum exercitationem est?',
//     },
//     (err, campground) => {
//         if (err) console.log(err);
//         else {
//             console.log('Newly Created Campground');
//             console.log(campground);
//         }
//     }
// );

// campgrounds = [
//     {
//         name: 'Salmon Greek',
//         image:
//             'https://media-cdn.tripadvisor.com/media/photo-s/0e/b7/aa/51/camping-area.jpg',
//     },
//     {
//         name: 'Granite Hill',
//         image:
//             'https://i.pinimg.com/originals/d4/3a/ce/d43ace987bb734625cf089b79cf5acc9.jpg',
//     },
//     {
//         name: "Mountin Goat's Rest",
//         image:
//             'https://media-cdn.tripadvisor.com/media/photo-s/13/b8/8a/28/olakira-camp-asilia-africa.jpg',
//     },
//     {
//         name: 'Salmon Greek',
//         image:
//             'https://media-cdn.tripadvisor.com/media/photo-s/0e/b7/aa/51/camping-area.jpg',
//     },
//     {
//         name: 'Granite Hill',
//         image:
//             'https://i.pinimg.com/originals/d4/3a/ce/d43ace987bb734625cf089b79cf5acc9.jpg',
//     },
//     {
//         name: "Mountin Goat's Rest",
//         image:
//             'https://media-cdn.tripadvisor.com/media/photo-s/13/b8/8a/28/olakira-camp-asilia-africa.jpg',
//     },
//     {
//         name: 'Salmon Greek',
//         image:
//             'https://media-cdn.tripadvisor.com/media/photo-s/0e/b7/aa/51/camping-area.jpg',
//     },
//     {
//         name: 'Granite Hill',
//         image:
//             'https://i.pinimg.com/originals/d4/3a/ce/d43ace987bb734625cf089b79cf5acc9.jpg',
//     },
// ];

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) console.log(err);
        else {
            res.render('index', { campgrounds: allCampgrounds });
        }
    });
});

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = { name: name, image: image, description: desc };
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/campgrounds/:id', (req, res) => {
    const id = req.params.id;
    Campground.findById(id, (err, foundCampground) => {
        if(err) {
             console.log(err);
        }
        else {
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
