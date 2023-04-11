const jwt = require("jsonwebtoken") // to authenticate user based on the JWT token
require('dotenv').config() // to get the environment varibales from the .env file
const fetchuser=(req,res,next)=>{
    //get the user if from the jwt token and add the id to the req
    const token = req.header("jwttoken")
    if(!token){
        res.status(401).json({error:"Please authenticate"})
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        req.user=data.user
        next()
    } catch (error) {
        res.status(401).json({error:"Please authenticate"})
    }
}
module.exports=fetchuser