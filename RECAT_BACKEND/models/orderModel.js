const express = require('express');
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    useremail : String,
    username : String,
    useraddress : String,
    userphone : Number,
    product : [{
        product_id : String,
        quantity : Number,
    }],
    orderdate : String,
    delivery : String,
});

const orderschema = new mongoose.model("orders" , OrderSchema);

module.exports = orderschema;

