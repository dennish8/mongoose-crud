const mongoose = require('mongoose');

module.exports = mongoose.model('Customer', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    memberid: String,
    address: String,
    zipcode: Number,
    phone: Number,
}));