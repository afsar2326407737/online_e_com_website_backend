const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const user = require('../models/userModel');
exports.addproducts = async(req,res) => {
    const{user_id}= req.user;    
    const{product_id,quantity}= req.body;
    let cart= await Cart.findOne({user_id});

    if(!cart){
        const newcart= new Cart({
            user_id,
            products:[
                {
                    product_id,
                    quantity,
                }
            ],
            
        }); 
        await newcart.save();
        res.status(200).json(newcart);
    }
    else{
    
    const productIndex= cart.products.findIndex((prod)=>prod.product_id===product_id);
    if(productIndex!=-1){
        cart.products[productIndex].quantity=quantity;
    }
    else{
        cart.products.push({product_id,quantity});
    }
    cart.save();
    return res.status(201).json({message:"Cart is created/ updated successfully"});
    } 
}

exports.getcart = async ( req , res ) => {
    const {user_id} = req.user;

    const cart = await Cart.findOne({user_id});
    try {
        var subtotal=0;
        if ( !cart ){
            return res.status(404).json({message : "user not found"});
        }
        const array = await Promise.all(cart.products.map(async(item) => {
            const single = await Product.findOne({_id:item.product_id});
            subtotal = item.quantity * single.price;
            return {
                product_id : single.id,
                title : single.title,
                description : single.description,
                price : single.price,
                image : single.image,
                quantity : single.quantity,
            }
        }));
        res.status(200).json({result : array ,total: subtotal});
         
    }
    catch (e){
        console.error(e);
    }
}

exports.deletcart = async (req , res ) =>{
    const {user_id} = req.user;
    const {product_id} = req.body;
    if (!user_id){
        return res.status(400).json({messaege : "the user you jwt is invalid"});
    }
    try{
        var findcart = await Cart.findOne({user_id});
        if (!findcart){
            return res.status(400).json({message : "the cart product not founded"});
        }
        if ( findcart.products.length === 0){
            return res.status(400).json({message : "there is no product in the cart"});
        }
        findcart.products = findcart.products.filter((item) => (
            item.product_id != product_id
        ))
        await Cart.findOneAndUpdate({user_id},{
            products : findcart.products
        })
        return res.status(200).json(findcart);
    }catch(e){
        console.log(e)
    }
}