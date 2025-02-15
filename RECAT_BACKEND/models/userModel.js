const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        require:[true , "name is requiered"],
    } ,
    email : {
        type:String,
        require:[true , "required email"],
    }  ,
    password : {
        type:String,
        require:[true,"required password "],
    }  ,
})


UserSchema.pre ("save" , async function(next){
    if (!this.isModified("password")){
        return next();
    }                  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})


const User = new mongoose.model('user',UserSchema)
module.exports = User;