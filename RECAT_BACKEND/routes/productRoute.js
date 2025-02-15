const express = require('express');
const {getProducts, createProduct} = require("../controller/ProductsController")
const auth = require('../middleware/auth');
const {addproducts} = require('../controller/CartController');

const routes = express.Router();

routes.get('/' ,getProducts);
routes.post('/post',createProduct);


module.exports = routes;