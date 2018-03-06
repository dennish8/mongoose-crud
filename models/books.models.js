const mongoose = require('mongoose');

module.exports = mongoose.model('Book',mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isbn: String,
    title: String,
    author: String,
    category: String,
    stock: Number,
}))