const express = require('express');
const { createUser, login } = require('../controller/userController');
const userroutes = express.Router();

userroutes.post('/signup',createUser);
userroutes.post('/login' , login);


module.exports = userroutes;