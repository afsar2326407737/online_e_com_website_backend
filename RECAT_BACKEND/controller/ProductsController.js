const Products = require("../models/productModel");
const {v4:uuidv4} = require('uuid');

exports.getProducts = async (req,res) =>{
    try {
        const product = await Products.find();
        res.status(200).json(product);        
    }
    catch(e){
        console.log(e);
    }
};

exports.createProduct = async (req,res) =>{
    const {title , price , description , category,rating , image } = req.body;
    const product = new Products({
        id:uuidv4(),
        title,
        price,
        description,
        category,
        rating,
        image,
    })
    await product.save();
    res.status(200).json("Created Succesfully");
}