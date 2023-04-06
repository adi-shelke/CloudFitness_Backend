const express = require('express')
const router = express.Router()
const User = require("../models/Users")
const Trainer = require("../models/Trainer")
const jwt = require("jsonwebtoken") // to authenticate user based on the JWT token
const bcrypt = require("bcryptjs")
const fetchuser = require("../middleware/fetchuser")

router.post(
    "/getuser",
    fetchuser,
    async (req,res)=>{
    try {
        const userId=req.user.id
        const user = await User.findById(userId).select("-password")
        res.json({status:200,user})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
router.post(
    "/gettrainer",
    fetchuser,
    async (req,res)=>{
    try {
        const userId=req.user.id
        const user = await Trainer.findById(userId).select("-password")
        res.json({status:200,user})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports=router