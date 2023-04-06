require('dotenv').config()
const mongoose = require("mongoose")
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected")
  } catch (error) {
    console.log(error.message)
  }
}
module.exports=connectDb