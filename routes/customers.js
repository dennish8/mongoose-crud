const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Customer = require('../models/customers.models');

//READ
router.get('/',(req,res,next)=>{
    Customer.find()
    .exec()
    .then((customers)=>{
        res.status(200).json({
            customers:customers,
            message:`Customer list`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`Customer list couldn't be shown`
        })
    })
})
//CREATE
router.post('/',(req,res,next)=>{
    let new_customer = {}
    new_customer._id = new mongoose.Types.ObjectId();
    new_customer.name = req.body.name;
    new_customer.memberid = req.body.memberid;
    new_customer.address = req.body.address;
    new_customer.zipcode = req.body.zipcode;
    new_customer.phone = req.body.phone;
    const customer = new Customer(new_customer);
    customer.save()
    .then((customer)=>{
        res.status(201).json({
            customer:customer,
            message:`New customer added`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`New customer could not be added`
        });
    })
})
//READ one
router.get('/:id',(req,res,next)=>{
    let ObjectId = require('mongodb').ObjectID;
    let id = ObjectId(req.params.id)
    Customer.findById(id)
    .exec()
    .then((customer)=>{
        res.status(200).json({
            customer: customer,
            message: `Customer was fetched`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            err: err,
            message:`Customer could not be fetched`
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
    let update_customer = {}
    update_customer.name = req.body.name;
    update_customer.memberid = req.body.memberid;
    update_customer.address = req.body.address;
    update_customer.zipcode = req.body.zipcode;
    update_customer.phone = req.body.phone;
    Customer.findOneAndUpdate(query,update_customer)
    .exec()
    .then((customer)=>{
        res.status(200).json({
            customer:customer,
            message:`Customer was updated`
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:`Unable to update customer. ${err}`
        })
    })
})
//DELETE
router.delete('/:id',(req,res,next)=>{
    let ObjectId = require('mongodb').ObjectID;
    let id = ObjectId(req.params.id)
    Customer.remove({
        _id: id
    })
    .exec()
    .then((customer)=>{
        res.status(200).json({
            customer:customer,
            message:`Customer was deleted`
        })
    })
    .catch((err)=>{
       re.status(500).json({
           message: "Unable to delete customer"
       }) 
    })
})

module.exports = router;