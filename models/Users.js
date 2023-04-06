const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserSchema = new Schema({
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
});

const User = mongoose.model('user',UserSchema)
module.exports=User