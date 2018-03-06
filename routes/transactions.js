const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Transaction = require('../models/transactions.models');

//READ
router.get('/',(req,res,next)=>{
    Transaction.find()
    .populate('Customer')
    .populate('Book')
    .then((transactions)=>{
        res.status(200).json({
            transactions:transactions,
            message:`Transaction list`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`Transaction list couldn't be shown`
        })
    })
})
//CREATE
router.post('/',(req,res,next)=>{
    let new_transaction = {}
    new_transaction._id = new mongoose.Types.ObjectId();
    new_transaction.member = req.body.member;
    new_transaction.out_date = req.body.out_date;
    new_transaction.due_date = req.body.due_date;
    new_transaction.in_date = req.body.in_date;
    new_transaction.fine = req.body.fine;
    new_transaction.booklist = req.body.booklist;
    const transaction = new Transaction(new_transaction);
    transaction.save()
    .then((transaction)=>{
        res.status(201).json({
            transaction:transaction,
            message:`New transaction added`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`New transaction could not be added`
        });
    })
})
//READ one
router.get('/:id',(req,res,next)=>{
    let ObjectId = require('mongodb').ObjectID;
    let id = ObjectId(req.params.id)
    Transaction.findById(id)
    .exec()
    .then((transaction)=>{
        res.status(200).json({
            transaction: transaction,
            message: `Transaction was fetched`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            err: err,
            message:`Transaction could not be fetched`
        })
    })
    
})
//UPDATE
router.put('/:id',(req,res,next)=>{
    let ObjectId = require('mongodb').ObjectID;
    let id = ObjectId(req.params.id)
    let query = {
        _id:id
    }
    let update_transaction = {}
    update_transaction.member = req.body.member;
    update_transaction.out_date = req.body.out_date;
    update_transaction.due_date = req.body.due_date;
    update_transaction.in_date = req.body.in_date;
    update_transaction.fine = req.body.fine;
    update_transaction.booklist = req.body.booklist;
    Transaction.findOneAndUpdate(query,update_transaction)
    .exec()
    .then((transaction)=>{
        res.status(200).json({
            transaction:transaction,
            message:`Transaction was updated`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`Unable to update transaction. ${err}`
        })
    })
})
//DELETE
router.delete('/:id',(req,res,next)=>{
    let ObjectId = require('mongodb').ObjectID;
    let id = ObjectId(req.params.id)
    Transaction.remove({
        _id: id
    })
    .exec()
    .then((transaction)=>{
        res.status(200).json({
            transaction:transaction,
            message:`Transaction was deleted`
        })
    })
    .catch((err)=>{
       re.status(500).json({
           message: "Unable to delete transaction"
       }) 
    })
})

module.exports = router;