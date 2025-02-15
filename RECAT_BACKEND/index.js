const express = require('express');
const app = express();
const cors = require('cors');


const mongoose = require("mongoose");
const productRouter = require('./routes/productRoute.js');
const bodyParser = require('body-parser');
const userroutes = require('./routes/userRouter.js');
const cartroutes = require('./routes/cartRouter.js');
const orderrouter = require('./routes/ordersRouter.js');
app.use(cors());
app.use(bodyParser.json({limit : "50mb"})); //express.json

mongoose.connect(
    "mongodb://localhost:27017/"
).then (()=>{
    console.log("connected");
}).catch((e)=>{
    console.error(e);
})
app.use('/product',productRouter);
app.use('/user' , userroutes);
app.use('/cart' , cartroutes);
app.use('/order' , orderrouter);

app.listen(3000 , () =>{
    console.log("service is running in the port 3000");
}) 