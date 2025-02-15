const  jwt = require('jsonwebtoken');

const auth = ( req , res , next ) => {
    const token = req.header("Authorization").split(" ")[1];

    if (!token){
        return res.status(401).json({erro : "No TOken , authorization denied "});
    }
    try{
        const decoded = jwt.verify(token,"secret_token")
        req.user = decoded;
        next()
    }catch(e){
        res.status(401).json({error : "Token is not valid "})
        console.log(e);
    }
}

module.exports = auth;