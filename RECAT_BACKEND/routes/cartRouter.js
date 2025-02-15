const express = require('express');

const { getcart, deletcart, addproducts } = require("../controller/CartController");
const auth = require("../middleware/auth");

const cartroutes = express.Router();


cartroutes.get('/getcart' , auth , getcart );
cartroutes.post('/deletcart', auth , deletcart);
cartroutes.post('/addtocart' , auth ,addproducts)

module.exports = cartroutes;

