const express = require('express')
const router = express.Router()
const { body, validationResult, check } = require('express-validator'); 
const User = require ("../models/Users")
const Tariner = require("../models/Trainer")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Trainer = require('../models/Trainer');
router.post(
    "/",
    body("email","Invalid email").isEmail(), //check if it is valid email format
    body("password","Password cannot be blank").exists(),
    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){ // send error if there are some errors
            return res.status(400).json({errors:errors.array()})
        }
        //extracting the email and password provided from the frontend

        const {email,password} = req.body
        try {
            let user = await User.findOne({email}) // finding the user with the given email id
            if(!user){
                var trainer = await Trainer.findOne({email})
                if(!trainer){
                    return res.status(400).json({error:"Invalid credentials!"})
                }
                // if the user with the email id does not exist, then send bad request with message
            }

            // if user exist with given email id then check the password provided by user with the password stored in the databse.

            //the compare method takes a plain password and the hash, it automatically compares the hash with the plain password and return boolean value.
            if(user){
                const passwordComparison = await bcrypt.compare(password,user.password)
                if(!passwordComparison){ 
                    // if the password doesn't match, send bad request with error message
                    return res.status(400).json({error:"Invalid credentials!"})
                }
    
                //if password matches, send the jwt token to the user
                const data = {
                    user:{
                        id:user.id
                    }
                  }
                  //creating the jwt token
                  const jwtToken = jwt.sign(data,process.env.JWT_SECRET)
                  res.json({status:200,jwtToken})
            }
            else if(trainer){
                const passwordComparison = await bcrypt.compare(password,trainer.password)
                if(!passwordComparison){ 
                    // if the password doesn't match, send bad request with error message
                    return res.status(400).json({error:"Invalid credentials!"})
                }
    
                //if password matches, send the jwt token to the user
                const data = {
                    user:{
                        id:trainer.id
                    }
                  }
                  //creating the jwt token
                  const jwtToken = jwt.sign(data,process.env.JWT_SECRET)
                  res.json({status:200,jwtToken})
            }
            else{
                res.json({"status":500,error:"Invalid credentials"})
            }
        } catch (error) {
            res.status(500).send("An unknown error occurred")
        }
})

module.exports = router