const express = require('express')
const router = express.Router()
const { body, validationResult, check } = require('express-validator'); // to validate the data entered in request body
const User = require("../models/Users")
const Tariner = require("../models/Trainer")
const bcrypt = require("bcryptjs")
require('dotenv').config() // to get the environment varibales from the .env file
const jwt = require("jsonwebtoken"); // to authenticate user based on the JWT token
const Trainer = require('../models/Trainer');



router.post(
    "/createuser",
    body("name","Name must be at least 3 character long").isLength({min:3}),
    body("email","Invalid email").isEmail(),
    body("password","Password must be atleast 8 characters long").isLength({min:8}),

    async (req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        //check whether the email already exists
        let user = await User.findOne({email:req.body.email})
        if(user){
            //If the email already exists then send the bad request with the message
            return res.status(400).json({error:"The email already exists, try again with different email"})
        }
        const salt = await bcrypt.genSalt(10)
        let securedPass =await bcrypt.hash(req.body.password,salt)
        //If the email does not already exist then create the user
        user = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: securedPass,
            age:req.body.age,
            phone:req.body.phone,
          })

          const data = {
            user:{
                id:user.id
            }
          }
          const jwtToken = jwt.sign(data,process.env.JWT_SECRET) // generating a jwt token using the user data and the jwtsecret stored in the .env file
          res.json({status:200,jwtToken})
        //   console.log(jwtToken)
        //   res.json(user)
    } catch (error) {
        res.status(500).send("An unknown error occurred")
    }
})

router.post(
    "/createtrainer",
    body("name","Name must be at least 3 character long").isLength({min:3}),
    body("email","Invalid email").isEmail(),
    body("password","Password must be atleast 8 characters long").isLength({min:8}),
    body("fees","Fees field cannot be empty").exists(),

    async (req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        //check whether the email already exists
        let user = await Trainer.findOne({email:req.body.email})
        if(user){
            //If the email already exists then send the bad request with the message
            return res.status(400).json({error:"The email already exists, try again with different email"})
        }
        const salt = await bcrypt.genSalt(10)
        let securedPass =await bcrypt.hash(req.body.password,salt)
        //If the email does not already exist then create the user
        user = await Trainer.create({
            name: req.body.name,
            email:req.body.email,
            password: securedPass,
            age:req.body.age,
            phone:req.body.phone,
            fees:req.body.fees,
          })

          const data = {
            user:{
                id:user.id
            }
          }
          const jwtToken = jwt.sign(data,process.env.JWT_SECRET) // generating a jwt token using the user data and the jwtsecret stored in the .env file
          res.json({status:200,jwtToken})
        //   console.log(jwtToken)
        //   res.json(user)
    } catch (error) {
        res.status(500).send("An unknown error occurred")
    }
})

module.exports = router