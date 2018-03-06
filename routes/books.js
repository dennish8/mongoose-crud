const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/books.models');

//READ
router.get('/',(req,res,next)=>{
    Book.find()
    .exec()
    .then((books)=>{
        res.status(200).json({
            books:books,
            message:`Book list`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`Book list couldn't be shown`
        })
    })
})
//CREATE
router.post('/',(req,res,next)=>{
    let new_book = {}
    new_book._id = new mongoose.Types.ObjectId();
    new_book.isbn = req.body.isbn;
    new_book.title = req.body.title;
    new_book.author = req.body.author;
    new_book.category = req.body.category;
    new_book.stock = req.body.stock;
    const book = new Book(new_book);
    book.save()
    .then((book)=>{
        res.status(201).json({
            book:book,
            message:`New book added`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`New book could not be added`
        });
    })
})
//READ one
router.get('/:id',(req,res,next)=>{
    let ObjectId = require('mongodb').ObjectID;
    let id = ObjectId(req.params.id)
    Book.findById(id)
    .exec()
    .then((book)=>{
        res.status(200).json({
            book: book,
            message: `Book was fetched`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            err: err,
            message:`Book could not be fetched`
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
    let update_book ={};
    update_book.isbn = req.body.isbn;
    update_book.title = req.body.title;
    update_book.author = req.body.author;
    update_book.category = req.body.category;
    update_book.stock = req.body.stock;
    Book.findOneAndUpdate(query,update_book)
    .exec()
    .then((book)=>{
        res.status(200).json({
            book:book,
            message:`Book was updated`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`Unable to update book. ${err}`
        })
    })
})
//DELETE
router.delete('/:id',(req,res,next)=>{
    let ObjectId = require('mongodb').ObjectID;
    let id = ObjectId(req.params.id)
    Book.remove({
        _id: id
    })
    .exec()
    .then((book)=>{
        res.status(200).json({
            book:book,
            message:`Book was deleted`
        })
    })
    .catch((err)=>{
       re.status(500).json({
           message: "Unable to delet book"
       }) 
    })
})

module.exports = router;