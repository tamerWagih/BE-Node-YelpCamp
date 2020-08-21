const mongoose = require('mongoose');


//Schema Setup

const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Comment', commentSchema);
