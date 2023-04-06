const mongoose = require("mongoose")
const { Schema } = mongoose;

const TrainerSchema = new Schema({
  name:{
    type:String,
    required:true 
  },
  email:{
    type:String,
    required:true,
    unique:true //To have unique email id for every user in the database
  },
  password:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  fees:{
    type:Number,
    required:true
  },
});

const Trainer = mongoose.model('trainer',TrainerSchema)
module.exports=Trainer