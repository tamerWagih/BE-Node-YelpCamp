const express = require('express');
const app = express();
const bodyParser = require('body-parser');

campgrounds = [
    { name: 'Salmon Greek', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/b7/aa/51/camping-area.jpg'}, 
    { name: 'Granite Hill', image: 'https://i.pinimg.com/originals/d4/3a/ce/d43ace987bb734625cf089b79cf5acc9.jpg'}, 
    { name: 'Mountin Goat\'s Rest', image: 'https://media-cdn.tripadvisor.com/media/photo-s/13/b8/8a/28/olakira-camp-asilia-africa.jpg'},
    { name: 'Salmon Greek', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/b7/aa/51/camping-area.jpg'}, 
    { name: 'Granite Hill', image: 'https://i.pinimg.com/originals/d4/3a/ce/d43ace987bb734625cf089b79cf5acc9.jpg'}, 
    { name: 'Mountin Goat\'s Rest', image: 'https://media-cdn.tripadvisor.com/media/photo-s/13/b8/8a/28/olakira-camp-asilia-africa.jpg'},
    { name: 'Salmon Greek', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/b7/aa/51/camping-area.jpg'}, 
    { name: 'Granite Hill', image: 'https://i.pinimg.com/originals/d4/3a/ce/d43ace987bb734625cf089b79cf5acc9.jpg'}, 
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});