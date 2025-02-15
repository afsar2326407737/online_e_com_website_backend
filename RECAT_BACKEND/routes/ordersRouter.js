const express = require('express');
const auth = require('../middleware/auth');
const { orderpost } = require('../controller/OrderController');

const orderrouter = express.Router();

orderrouter.post('/placeOrder',auth , orderpost);

module.exports = orderrouter;