const mongoose = require('mongoose');

module.exports = mongoose.model('Transaction', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    days: Number,
    out_date: Date,
    in_date: Date,
    fine: Number,
    booklist: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }],
}));


// {
//     "_id" : ObjectId("5715ba7b80b065a3dd0ba0ba"),
//     "member" : ObjectId("5715b79880b065a3dd0ba0b8"),
//     "days" : 6,
//     "out_date" : ISODate("2016-04-19T14:56:59.301Z"),
//     "due_date" : ISODate("2016-04-25T14:56:59.301Z"),
//     "in_date" : ISODate("2016-04-27T14:56:59.301Z"),
//     "fine" : 2000,
//     "booklist" :
//       [
//         ObjectId("5715b4f38c41ba33b7fa36e3"),
//         ObjectId("5715b5cd8c41ba33b7fa36e4")
//       ]
//   }