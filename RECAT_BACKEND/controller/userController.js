const User = require("../models/userModel.js");
const  {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cart = require("../models/cartModel.js");

exports.createUser = async (req,res) =>{
    try{
        
        const {name,email,password} = req.body;
        const user = new User({
            id:uuidv4(),
            name,
            email,
            password
        })
        await user.save();
        res.send(user);
    }catch(e){
        console.log(e);
    }
}

exports.login = async (req,res) => {
   
    const { email , password } = req.body;
    
    try {
        const user =await User.findOne({email});
        if (!user){
            res.status(400).json("invelid email or password");
        }
        const isMatches = await bcrypt.compare(password,user.password)

        if (!isMatches){
            return res.status(400).json("Invalid email or password");
        }
        const token = jwt.sign({user_id : user._id},"secret_token" ,{
            expiresIn : "1h",
        });        
        res.status(200).json(token);
    }catch(e){
        console.error(e);
    }
}

exports.deletCartProduct = async ( req , res ) =>{
    const { user_id } = req.user;
    const product_id = req.params.id;


    const cart = await Cart.findOne({ user_id });

    if ( !cart ){
        return res.status(404).json({ message : "can not found "})
    }
    const isProductValid = cart.products.find(
        (product) => product_id === product.produc_id
    );
    if ( !isProductValid ){
        return res.status(404).json({ message : "Product not found in cart" });
    }
    if (cart.products,lrngth <= 1){
        await Cart.deleteOne({ user_id });
        return res.status(200).json({message: "cart deleted successfully"})
    }
    else{
        cart.products = cart.products.filter((prod) => prod.id != product_id);
        cart.save();
        res.status(200).json({message:"Cart deleted Successfully"});
    }
}