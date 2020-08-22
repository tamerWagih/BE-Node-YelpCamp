const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
    {
        name: "Cloud's Rest",
        image:
            'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque doloremque debitis veritatis maxime, molestiae ut minus modi vitae numquam aliquid quibusdam consequatur porro minima molestias, ad vero nisi possimus aspernatur dignissimos cupiditate magni, eos quia deserunt! Sint maiores animi ipsam!',
    },
    {
        name: 'Desert Mesa',
        image:
            'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque doloremque debitis veritatis maxime, molestiae ut minus modi vitae numquam aliquid quibusdam consequatur porro minima molestias, ad vero nisi possimus aspernatur dignissimos cupiditate magni, eos quia deserunt! Sint maiores animi ipsam!',
    },
    {
        name: 'Canyon Floor',
        image:
            'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque doloremque debitis veritatis maxime, molestiae ut minus modi vitae numquam aliquid quibusdam consequatur porro minima molestias, ad vero nisi possimus aspernatur dignissimos cupiditate magni, eos quia deserunt! Sint maiores animi ipsam!',
    },
];

function seedDB() {
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Campgrounds removed!');
            // add few Campgrounds
            // data.forEach((seed) => {
            //     Campground.create(seed, (err, campground) => {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log('A campground added');
            //             // Add Some Comments
            //             Comment.create(
            //                 {
            //                     text:
            //                         'This place is great, but I wish there was internet',
            //                     author: 'Homer',
            //                 },
            //                 (err, comment) => {
            //                     if (err) {
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log('created new Comment');
            //                     }
            //                 }
            //             );
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedDB;
