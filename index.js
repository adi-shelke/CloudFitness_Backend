const connectDb = require("./db")
const express = require('express')
connectDb()

const app = express()
const port = 3002
app.use(express.json())  // to use req.body

//Initializing the express

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/login',require("./routes/login"))
app.use('/api/signup/',require("./routes/signup"))
app.use('/api/getuser',require("./routes/getuser"))

app.listen(port, () => {
  console.log(`CloudFitness listening at ${port}`)
})