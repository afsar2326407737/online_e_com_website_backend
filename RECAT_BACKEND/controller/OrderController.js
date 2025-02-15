const Cart = require("../models/cartModel");
const Orders = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.orderpost = async(req,res) =>{
    const {user_id} = req.user;
    const {username,useraddress,userphone} = req.body;
    const cart = await Cart.findOne({user_id});
    
    if ( !cart ){
        return res.status(400).json({message : "cart not founded"});
    }
    const user = await User.findOne({
        _id:user_id
    })
    try {
        const delevery = new Date();
        delevery.setDate(delevery.getDate()+10);
        const order = new Orders({
            useremail : user.email,
            username,
            useraddress,
            userphone,
            product : cart.products,
            orderdate : new Date(),
            delevery : delevery
        });
        await order.save(),
        res.status(200).json({order});
    }catch(e){
        console.error(e);
        res.status(400).json({message : "error message"})
    }
}

exports.getorder = async ( req , res ) =>{
    try{
        const {user_id} = req.user;
        var order = await Orders.findOne({
            user_id
        })
        if (!order){
            return res.status(404).json({message : "Order Not founded"})
        }
        const pro = await Promise.all(order.products.map(async(item) => {
            const prod = await Product.findOne({_id : item.product_id});
            return {
                id : item.product_id,
                title : prod.title,
                price : prod.price,
                category : prod.category,
                image : prod.image,
                quantity : item.quantity
            }
        }))
        order = order.toObject();
        order.products=pro;
        res.status(200).json(order);
    }
    catch(e){
        console.log(e);
        
    }
    return;
}
